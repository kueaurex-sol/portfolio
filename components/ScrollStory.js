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

// ---- Hero -> About resting pose ----
// Mobile keeps y at 0 (screen-center) instead of parking the model near
// the top — assembly now visibly happens in the middle of the screen,
// and it stays there through About instead of drifting up first.
const HERO_TARGET_DESKTOP = {
  rotY: 0, rotX: 0, spin: 1, scale: 0.7, x: 2.2, y: -0.1, z: 0,
  explode: 0, modelOpacity: 1, ambient: 0.45,
};
const HERO_TARGET_MOBILE = {
  rotY: 0, rotX: 0, spin: 1, scale: 0.5, x: 0, y: 0, z: 0,
  explode: 0, modelOpacity: 1, ambient: 0.45,
};

// Waypoints the model passes through as the whole page scrolls. Each
// waypoint can optionally specify `triggerEl` (a ref, checked first) or
// `id` (a DOM id, fallback) plus its own triggerStart/triggerEnd — falls
// back to "top bottom"/"top top" if not given (used by "footer" below).
//
// The "about" waypoint uses aboutInnerRef directly (via triggerEl,
// resolved in the effect below) rather than an id lookup — About's own
// internal markup may already contain an id="about", and a duplicate DOM
// id would make getElementById's result unpredictable. Using the ref we
// already hold sidesteps that entirely.
//
// It's also keyed to "bottom bottom" -> "bottom top" instead of the old
// "top bottom" -> "top top": this fires only during About's LAST
// viewport-height of scroll (whatever About's total height is), so the
// model doesn't sit static at full opacity/docked-right for the entire
// time the user is scrolling through About — it fades and recenters
// right as About finishes, over exactly one viewport height every time.
const WAYPOINTS_DESKTOP = [
  {
    useAboutRef: true,
    triggerStart: "bottom bottom",
    triggerEnd: "bottom top",
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
const WAYPOINTS_MOBILE = [
  {
    useAboutRef: true,
    triggerStart: "bottom bottom",
    triggerEnd: "bottom top",
    state: {
      rotY: 0, rotX: 0, spin: 1,
      scale: 0.55, x: 0, y: 0.4, z: -1,
      modelOpacity: 0.18, ambient: 0.2, explode: 0,
    },
  },
  {
    id: "footer",
    state: {
      rotY: 0, rotX: 0, spin: 1,
      scale: 0.4, x: 0, y: 0.6, z: 0,
      modelOpacity: 0.3, ambient: 0.25, explode: 0,
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

  // Only About gets the Hero -> About reveal treatment (fade + rise via a
  // real CSS transform). Everything else (WhyChooseUs, Services,
  // Framework, TopStories, Faq) must NOT sit inside that transformed
  // wrapper: an ancestor with any transform — even a resting
  // translate(0px, 0px) — becomes a new containing block for
  // position:fixed descendants (CSS spec, not a GSAP quirk). Any
  // ScrollTrigger pin:true created inside a transformed ancestor can't
  // truly fix to the viewport, so GSAP has to freeze the pinned element's
  // exact box (width/height/padding, all in px) to fake it — which is
  // what was clipping WhyChooseUs's cards on mobile. Keeping everything
  // after About as plain, untransformed siblings avoids that entirely.
  const kids = Array.isArray(children) ? children : [children];
  const [aboutChild, ...restChildren] = kids;

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const heroTarget = isMobile ? HERO_TARGET_MOBILE : HERO_TARGET_DESKTOP;
    const WAYPOINTS = isMobile ? WAYPOINTS_MOBILE : WAYPOINTS_DESKTOP;

    const push = () => threeRef.current?.applyState(sceneState.current);

    if (reduce) {
      gsap.set(
        [eyebrowRef.current, lineOneRef.current, lineTwoRef.current, subRef.current, scrollCueRef.current],
        { opacity: 1 }
      );
      gsap.set(aboutInnerRef.current, { opacity: 1, y: 0 });
      Object.assign(sceneState.current, heroTarget, { explode: 0 });
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
            ...heroTarget,
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
        .to(aboutInnerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => gsap.set(aboutInnerRef.current, { clearProps: "transform" }),
        }, 0.5);

      // ---- everything after About: model becomes a centered, slowly
      // rotating background presence, then docks near the footer ----
      let prevState = heroTarget;

      WAYPOINTS.forEach(({ id, useAboutRef, state: target, triggerStart, triggerEnd }) => {
        const el = useAboutRef ? aboutInnerRef.current : document.getElementById(id);
        if (!el) return;
        const beforeState = prevState;
        let from = null;

        ScrollTrigger.create({
          trigger: el,
          start: triggerStart || "top bottom",
          end: triggerEnd || "top top",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (from === null) from = { ...sceneState.current };
            const p = self.progress;
            Object.keys(target).forEach((key) => {
              const a = from[key];
              const b = target[key];
              sceneState.current[key] = typeof a === "number" && typeof b === "number" ? a + (b - a) * p : b;
            });
            push();
          },
          onLeave: () => {
            Object.assign(sceneState.current, target);
            push();
          },
          onEnterBack: () => {
            Object.assign(sceneState.current, target);
            push();
          },
          onLeaveBack: () => {
            from = null;
            Object.assign(sceneState.current, beforeState);
            push();
          },
        });

        prevState = target;
      });
    });

    // WhyChooseUs and Services are React children of ScrollStory, so
    // their useLayoutEffects (which create their own pinned
    // ScrollTriggers) run BEFORE this one — React fires effects
    // bottom-up, children before parents. That means when they measure
    // their position on the page, Hero's pin-spacer (created just above,
    // in THIS effect) doesn't exist yet, so the page looks ~200%
    // shorter than it actually ends up being. Their triggers get created
    // with positions based on that too-short measurement, which is what
    // caused WhyChooseUs to pin while still in About, and Services to
    // already show its last card by the time you scrolled to it — both
    // were really "further along" than the page had scrolled.
    //
    // The refresh on window load / fonts.ready below does eventually fix
    // this, but that can fire seconds after mount (loading the .glb
    // model isn't instant), so scrolling right away hits the stale
    // measurements first. Refreshing here — synchronously, same tick,
    // before the browser's first paint — recalculates every trigger
    // against the now-correct DOM (Hero's pin-spacer already inserted)
    // before the user can ever see or scroll past the wrong version.
    ScrollTrigger.refresh();

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
            className="mb-6 lg:inline-block md:inline-block hidden rounded-full border border-violet-dim px-4 py-1.5 font-mono text-[11px] tracking-[3px] text-violet opacity-0"
          >
            DIGITAL TRANSFORMATION AGENCY
          </span>
          <h1 className="font-display  font-semibold leading-[1.15] tracking-tight text-ivory md:text-5xl lg:text-6xl text-2xl">
            <span ref={lineOneRef} className="block opacity-0">
              We build the tech. We drive <span className="text-violet">growth</span>.
            </span>
            <span ref={lineTwoRef} className="block opacity-0">
              You own the <span className="text-violet">market</span>.
            </span>
          </h1>
          <p ref={subRef} className="mx-auto mt-6 max-w-xl text-ivory/60 opacity-0 lg:text-lg md:text-lg text-sm">
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

      {/* Only About lives inside the transformed reveal wrapper. */}
      <div ref={aboutInnerRef} className="relative z-10 translate-y-8 opacity-0">
        {aboutChild}
      </div>

      {/* Everything after About renders as plain, untransformed siblings —
          see the comment above `kids`/`restChildren` for why this split
          matters: WhyChooseUs (and Services/Framework/TopStories) each
          pin their own section on mobile, and a pin can only truly fix to
          the viewport when nothing between it and <body> has a transform. */}
      <div className="relative z-10">{restChildren}</div>
    </>
  );
}