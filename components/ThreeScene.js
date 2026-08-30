import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

function getOrientationOffset(modelKey) {
  // Each model gets its own default since they were exported with different
  // native orientations — tuning one can't accidentally break the other.
  // Test live with URL params (applies to whichever model is currently
  // active): ?ry=1.5708 (90°), ?ry=-1.5708, ?ry=3.1416&rx=3.1416 (180°+flip).
  // Once you find values that work, send them and I'll set them as the
  // permanent default for that model below.
  const DEFAULTS = {
    "robot-head": { x: 0, y: 0, z: 0 },
    trial: { x: Math.PI / 2, y: 0, z: 0 }, // first guess — likely needs tuning
  };
  const DEFAULT = DEFAULTS[modelKey] ?? { x: 0, y: 0, z: 0 };
  if (typeof window === "undefined") return DEFAULT;
  const params = new URLSearchParams(window.location.search);
  return {
    x: params.has("rx") ? parseFloat(params.get("rx")) : DEFAULT.x,
    y: params.has("ry") ? parseFloat(params.get("ry")) : DEFAULT.y,
    z: params.has("rz") ? parseFloat(params.get("rz")) : DEFAULT.z,
  };
}

// how far parts drift from center while orbiting apart, before they converge
const ORBIT_RADIUS = 0.9;

/**
 * ThreeScene — the recurring 3D element that travels through the whole page.
 *
 * Loads the real model. Defaults to /public/robot-head.glb — add
 * ?model=trial to the URL to load /public/trial.glb instead, so a new
 * model can be tried without disturbing the current default. While it's
 * downloading, a
 * depth-relief image (/public/hero.png + hero-depth.png) fills the space so
 * there's never a blank hero — the moment the model is ready, it crossfades
 * in and the relief fades out.
 *
 * Its 7 named parts are tracked individually so the scene can explode them
 * outward / assemble them back together via applyState({ explode }).
 *
 * applyState(partial) accepts any of:
 *   rotY, rotX    - radians, base orientation (held still when spin: 0)
 *   spin          - 0-1, when >0 adds a continuous horizontal (Y-axis)
 *                   turntable rotation on top of rotY — independent of the
 *                   orbit/explode system, meant for "sits as a background
 *                   element, slowly rotating" sections
 *   scale         - uniform scale multiplier (see BACKGROUND_SCALE below
 *                   for how to hit a specific vh height)
 *   x, y, z       - group position
 *   modelOpacity  - 0-1, opacity of the real model once loaded (independent
 *                   of the relief, which fades itself out automatically the
 *                   moment the model finishes loading)
 *   ambient       - 0-1, multiplies particle opacity
 *   explode       - 0-1, 0 = assembled and still, 1 = fully scattered and orbiting
 */
const ThreeScene = forwardRef(function ThreeScene({ onModelReady }, ref) {
  const mountRef = useRef(null);
  const groupRef = useRef(null);
  const meshRef = useRef(null);
  const particlesRef = useRef(null);
  const modelRef = useRef(null);
  const modelMaterialsRef = useRef([]);
  const partsRef = useRef([]); // [{ mesh, basePos, dir }]
  const reliefFadeRef = useRef(1); // 1 = relief visible, tweens to 0 on model-ready
  const groupSpinRef = useRef(0); // accumulated spin while parts are scattered (orbit phase only)

  const state = useRef({
    rotY: 0,
    rotX: 0,
    spin: 0,
    scale: 1,
    x: 0,
    y: 0,
    z: 0,
    modelOpacity: 1,
    ambient: 1,
    explode: 0,
  });

  useImperativeHandle(ref, () => ({
    applyState(partial) {
      Object.assign(state.current, partial);
    },
  }));

  useEffect(() => {
    const mount = mountRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // metallic PBR materials reflect their environment rather than being lit
    // like matte surfaces — without this they render almost black regardless
    // of how many lights are in the scene.
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(3, 2.5, 4);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xd026ff, 22, 25, 2);
    rimLight.position.set(-3, -1, 2.5);
    scene.add(rimLight);
    const violetFront = new THREE.PointLight(0xd026ff, 16, 25, 2);
    violetFront.position.set(2, 1.5, 4);
    scene.add(violetFront);
    const fillLight = new THREE.PointLight(0xffffff, 4, 20, 2);
    fillLight.position.set(0, 2, -3);
    scene.add(fillLight);

    const loader = new THREE.TextureLoader();

    // ---- relief (visible immediately, faded out once the model loads) ----
    const colorMap = loader.load("/hero.png");
    colorMap.colorSpace = THREE.SRGBColorSpace;
    const depthMap = loader.load("/hero-depth.png");
    const aspect = 2874 / 1261;
    const planeW = 7.4;
    const geometry = new THREE.PlaneGeometry(planeW, planeW / aspect, 260, Math.round(260 / aspect));
    const material = new THREE.MeshStandardMaterial({
      map: colorMap, displacementMap: depthMap, displacementScale: 0.55,
      roughness: 0.55, metalness: 0.15, transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);
    meshRef.current = mesh;

    // ---- the real model ----
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/"); // host the decoder files yourself
    gltfLoader.setDRACOLoader(dracoLoader);
    const isTrial =
      typeof window !== "undefined" && new URLSearchParams(window.location.search).get("model") === "trial";
    const modelPath = isTrial ? "/trial.glb" : "/robot-head.glb";
    const modelKey = isTrial ? "trial" : "robot-head";
    gltfLoader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        const orientation = getOrientationOffset(modelKey);
        model.rotation.set(orientation.x, orientation.y, orientation.z);

        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);
        const targetHeight = 3.0;
        const scaleFactor = targetHeight / (size.y || 1);
        model.scale.setScalar(scaleFactor);

        group.add(model);
        model.updateMatrixWorld(true);

        // collect each part + its outward explode direction + individual orbit params
        const materials = [];
        const parts = [];
        let partIndex = 0;
        model.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.transparent = true;
            materials.push(child.material);

            const partBox = new THREE.Box3().setFromObject(child);
            const partCenter = new THREE.Vector3();
            partBox.getCenter(partCenter);
            const dir = partCenter.clone();
            if (dir.lengthSq() < 1e-6) dir.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
            dir.normalize();

            // deterministic per-part variance so each part orbits at a
            // slightly different speed/radius — reads as organic, not
            // mechanically uniform
            const seed = partIndex / 7;
            parts.push({
              mesh: child,
              basePos: child.position.clone(),
              dir,
              orbitSpeed: 0.09 + seed * 0.3,
              orbitRadius: 5.2 + seed * 0.3,
              phase: seed * Math.PI * 2,
            });
            partIndex++;
          }
        });
        modelMaterialsRef.current = materials;
        partsRef.current = parts;
        modelRef.current = model;

        // sharpen textures at glancing angles — without this, curved/angled
        // surfaces (most of a helmet) look soft even at full resolution
        const maxAniso = renderer.capabilities.getMaxAnisotropy();
        materials.forEach((m) => {
          ["map", "normalMap", "roughnessMap", "metalnessMap", "emissiveMap"].forEach((slot) => {
            if (m[slot]) {
              m[slot].anisotropy = maxAniso;
              m[slot].needsUpdate = true;
            }
          });
        });

        onModelReady?.();
      },
      undefined,
      (error) => {
        console.error(`${modelPath} failed to load:`, error);
      }
    );

    // ambient particles
    const count = 160;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 + 1;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xd026ff, size: 0.015, transparent: true, opacity: 0.4 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    let frameId;
    const startTime = performance.now();
    const animate = () => {
      const t = (performance.now() - startTime) / 1000;
      const idleSway = reduce ? 0 : Math.sin(t * 0.3) * 0.08;
      const s = state.current;

      // Two independent rotation sources, both off by default:
      // 1. idleSway + groupSpinRef — only active during the orbit/explode
      //    phase (Hero), fully stops the instant explode reaches 0.
      // 2. spin — a deliberate continuous horizontal turntable rotation,
      //    used for "sits as a background element" sections. Completely
      //    separate from the orbit system, so it can't reintroduce the old
      //    always-on spin bug.
      const spinAmount = reduce ? 0 : t * 0.15 * s.spin;
      group.rotation.y = s.rotY + (idleSway + groupSpinRef.current) * s.explode + spinAmount;
      group.rotation.x = s.rotX;
      group.scale.setScalar(s.scale);
      group.position.set(s.x, s.y, s.z);

      // crossfade relief -> model over ~0.6s once the model is ready, instead of an instant pop
      const targetReliefFade = modelRef.current ? 0 : 1;
      reliefFadeRef.current += (targetReliefFade - reliefFadeRef.current) * (reduce ? 1 : 0.08);

      material.opacity = reliefFadeRef.current;
      mesh.visible = reliefFadeRef.current > 0.01;
      particles.material.opacity = 0.4 * s.ambient;

      if (modelMaterialsRef.current.length) {
        const modelOpacity = s.modelOpacity * (1 - reliefFadeRef.current);
        modelMaterialsRef.current.forEach((m) => { m.opacity = modelOpacity; });
      }

      if (partsRef.current.length) {
        partsRef.current.forEach(({ mesh: partMesh, basePos, dir, orbitSpeed, orbitRadius, phase }) => {
          // continuous orbit path around the part's own resting point —
          // active while explode > 0, fades to a dead stop as it converges
          const orbitAngle = t * orbitSpeed + phase;
          const orbitX = Math.cos(orbitAngle) * orbitRadius * s.explode;
          const orbitZ = Math.sin(orbitAngle) * orbitRadius * s.explode;
          const orbitY = Math.sin(orbitAngle * 1.3) * orbitRadius * 0.4 * s.explode;

          partMesh.position.set(
            basePos.x + dir.x * ORBIT_RADIUS * s.explode + orbitX,
            basePos.y + dir.y * ORBIT_RADIUS * s.explode + orbitY,
            basePos.z + dir.z * ORBIT_RADIUS * s.explode + orbitZ
          );
        });
      }

      // the whole assembly slowly revolves while parts are scattered, and
      // settles to a stop as they converge — reduce-motion users get none of this
      if (!reduce) groupSpinRef.current += 0.0035 * s.explode;

      if (!reduce) particles.rotation.y += 0.0006;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      colorMap.dispose();
      depthMap.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      pmrem.dispose();
      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach((m) => {
              Object.values(m).forEach((v) => v?.isTexture && v.dispose());
              m.dispose();
            });
          }
        });
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
});

export default ThreeScene;
