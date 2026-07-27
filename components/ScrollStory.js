"use client";

import { useRef, useLayoutEffect } from "react";
import { animate, stagger } from "animejs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeScene from "./ThreeScene";

gsap.registerPlugin(ScrollTrigger);

// Derived, not guessed: at this camera's distance (z=7) and FOV (40°), the
// visible height at the model's depth is 2 * 7 * tan(20°) ≈ 5.096 world
// units = 100vh. The model is normalized to 3.0 world units tall at
// scale=1 (see targetHeight in ThreeScene.js), so:
//   scale for Nvh = (N/100 * 5.096) / 3.0
// If you change the camera's z-position or fov in ThreeScene.js, recompute
// this — it will no longer be accurate otherwise.
const BACKGROUND_SCALE_50VH = 0.85;

// Waypoints the model passes through as the whole page scrolls. After Hero
// + About, it holds as a centered, slowly-rotating background element
// (no dismantling) until the footer, where it docks into the empty space
// beside the footer heading.
const WAYPOINTS = [
  {
    id: "why-choose-us",
    state: {
      rotY: 0, rotX: 0, spin: 1,
      scale: BACKGROUND_SCALE_50VH, x: 0, y: 0, z: -1,
      modelOpacity: 0.2, ambient: 0.25, explode: 0,
    },
  },
  {
    id: "footer",
    state: {
      rotY: 0, rotX: 0, spin: 1,
      scale: 0.55, x: 4.2, y: 0, z: 0,
      modelOpacity: 1, ambient: 0.5, explode: 0,
    },
  },
];

export default function ScrollStory({ children }) {
  const threeRef = useRef(null);
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const lineOneRef = useRef(null);
  const lineTwoRef = useRef(null);
  const subRef = useRef(null);
  const scrollCueRef = useRef(null);
  const aboutInnerRef = useRef(null);
  const onModelReadyRef = useRef(() => {});

  const sceneState = useRef({
    rotY: -0.18, rotX: 0.05, spin: 0, scale: 0.8, x: -2.4, y: -0.2, z: -1.5,
    modelOpacity: 0.3, ambient: 1, explode: 1,
  });

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const push = () => threeRef.current?.applyState(sceneState.current);

    if (reduce) {
      gsap.set(
        [eyebrowRef.current, lineOneRef.current, lineTwoRef.current, subRef.current, scrollCueRef.current],
        { opacity: 1 }
      );
      gsap.set(aboutInnerRef.current, { opacity: 1, y: 0 });
      Object.assign(sceneState.current, {
        explode: 0, spin: 0, scale: 0.7, x: 2.2, y: -0.1, z: 0, modelOpacity: 1,
      });
      push();
      return;
    }

    animate(eyebrowRef.current, { opacity: [0, 1], translateY: [10, 0], duration: 500, easing: "easeOutQuad", delay: 150 });
    animate([lineOneRef.current, lineTwoRef.current], {
      opacity: [0, 1], translateY: [28, 0], duration: 700, delay: stagger(140, { start: 350 }), easing: "easeOutExpo",
    });
    animate(subRef.current, { opacity: [0, 1], translateY: [14, 0], duration: 600, delay: 850, easing: "easeOutQuad" });
    animate(scrollCueRef.current, { opacity: [0, 0.7], duration: 500, delay: 1100, easing: "easeOutQuad" });

    const handleModelReady = () => {
      if (reduce) threeRef.current?.applyState({ explode: 0, spin: 0 });
    };
    onModelReadyRef.current = handleModelReady;

    const ctx = gsap.context(() => {
      // ---- Hero: pinned, scrubbed transition into the About resting pose ----
      // Model converges (explode 1->0), travels to its docked position, and
      // begins its continuous horizontal spin as it settles into place.
      const hero = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current, start: "top top", end: "+=200%",
          scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
        },
      });

      hero
        .to(
          sceneState.current,
          {
            rotY: 0,
            rotX: 0,
            spin: 1, // starts its continuous horizontal rotation the moment it docks in About, not later
            scale: 0.7,
            x: 2.2,
            y: -0.1,
            z: 0,
            explode: 0,
            modelOpacity: 1,
            ambient: 0.45,
            duration: 1,
            ease: "none",
            onUpdate: () => {
              push();
              const t = 1 - sceneState.current.explode;
              const fromStart = [255, 255, 255];
              const fromEnd = [237, 226, 251];
              const toStart = [248, 240, 253];
              const toEnd = [224, 201, 247];
              const lerp = (a, b) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
              const [r1, g1, b1] = lerp(fromStart, toStart);
              const [r2, g2, b2] = lerp(fromEnd, toEnd);
              document.documentElement.style.setProperty("--bg-from", `rgb(${r1},${g1},${b1})`);
              document.documentElement.style.setProperty("--bg-to", `rgb(${r2},${g2},${b2})`);
            },
          },
          0
        )
        .to(
          [eyebrowRef.current, lineOneRef.current, lineTwoRef.current, subRef.current, scrollCueRef.current],
          { opacity: 0, y: -16, duration: 0.25 },
          0.05
        )
        .to(aboutInnerRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.5);

      // ---- everything after About: model becomes a centered, slowly
      // rotating background presence (no dismantling), then docks beside
      // the footer heading in its empty right column ----
      //
      // Deliberately NOT using gsap.to() here. Multiple separate tweens
      // all targeting properties on the same shared `sceneState.current`
      // object (one per waypoint, all created at mount) can end up
      // fighting over ownership of those properties — which is what was
      // actually causing the model to intermittently scatter: explode
      // wasn't reliably staying at 0 because more than one tween believed
      // it owned that property. Doing the interpolation by hand per
      // ScrollTrigger sidesteps that entirely — there's no shared tween
      // to conflict, just plain arithmetic driven by each trigger's own
      // progress value.
      WAYPOINTS.forEach(({ id, state: target }) => {
        const el = document.getElementById(id);
        if (!el) return;
        let from = null;

        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "top top",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // snapshot whatever the scene currently looks like the moment
            // this section starts becoming active, so it always continues
            // smoothly from wherever the previous section left off
            if (from === null) from = { ...sceneState.current };
            const p = self.progress;
            Object.keys(target).forEach((key) => {
              const a = from[key];
              const b = target[key];
              sceneState.current[key] = typeof a === "number" && typeof b === "number" ? a + (b - a) * p : b;
            });
            push();
          },
          onLeaveBack: () => {
            from = null; // recapture if the user scrolls back up and forward through again
          },
        });
      });
    });

    // Fonts loading asynchronously (or any other late layout shift) can
    // silently change section heights after ScrollTrigger first measured
    // them — which throws off exactly the sections furthest down the page
    // (Why Choose Us, Footer) while leaving Hero/About looking fine. Forcing
    // a recheck once the page has actually settled fixes that misalignment.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }
    document.fonts?.ready?.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0">
        <ThreeScene ref={threeRef} onModelReady={() => onModelReadyRef.current()} />
      </div>

      <div ref={heroRef} className="relative z-10 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-3xl px-6 text-center">
          <span
            ref={eyebrowRef}
            className="mb-6 inline-block rounded-full border border-violet-dim px-4 py-1.5 font-mono text-[11px] tracking-[3px] text-violet opacity-0"
          >
            DIGITAL TRANSFORMATION AGENCY
          </span>
          <h1 className="font-display text-4xl font-semibold leading-[1.15] tracking-tight text-ivory md:text-5xl lg:text-6xl">
            <span ref={lineOneRef} className="block opacity-0">
              We build the tech. We drive <span className="text-violet">growth</span>.
            </span>
            <span ref={lineTwoRef} className="block opacity-0">
              You own the <span className="text-violet">market</span>.
            </span>
          </h1>
          <p ref={subRef} className="mx-auto mt-6 max-w-xl text-base text-ivory/60 opacity-0 md:text-lg">
            Stop patching together fragmented tools. We engineer high-performance software, custom
            AI systems, and aggressive growth marketing engines to scale in lockstep.
          </p>
        </div>
        <div
          ref={scrollCueRef}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] tracking-[2px] text-ivory/60 opacity-0"
        >
          <span>SCROLL</span>
          <span className="h-8 w-px bg-gradient-to-b from-ivory/60 to-transparent" />
        </div>
      </div>

      <div ref={aboutInnerRef} className="relative z-10 translate-y-8 opacity-0">
        {children}
      </div>
    </>
  );
}