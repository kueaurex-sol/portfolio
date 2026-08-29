
"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import GradientText from "@/components/GradientText";

const STEPS = [
  {
    tag: "Discovery",
    title: "Scoping & Strategy Discovery",
    desc: "We don't start by guessing. We begin with an intensive discovery deep dive to map your operational bottlenecks, business goals, and growth targets. By the end of this phase, you receive a crystal clear project roadmap, defined technical requirements, and a guaranteed scope of work ensuring zero surprises down the line.",
    from: "#7C3AED",
    to: "#312E81",
    Icon: CompassIcon,
  },
  {
    tag: "Architecture",
    title: "System Architecture Planning",
    desc: "Before writing a single line of code, our architects design the blueprint of your digital ecosystem. We map out database structures, API integrations, data flows, and security protocols. This ensures your custom software, app, or AI model is built on a scalable foundation that easily handles high traffic and future tech updates.",
    from: "#2563EB",
    to: "#0F172A",
    Icon: BlueprintIcon,
  },
  {
    tag: "Build",
    title: "Agile Development & Sprint Cycles",
    desc: "Our engineering team brings the architecture to life using modern tech stacks and agile methodologies. We break the build down into bi weekly sprints, offering you transparent, clickable milestones along the way. You can see the progress in real time, allowing for continuous feedback and pivoting if business needs shift.",
    from: "#059669",
    to: "#064E3B",
    Icon: SprintIcon,
  },
  {
    tag: "Security",
    title: "Security & Quality Assessment",
    desc: "We treat security as a non negotiable metric, not an afterthought. Your product undergoes rigorous automated and manual testing, including vulnerability scans, load testing, and compliance checks (such as GDPR or HIPAA depending on your region). We break our own code to ensure nobody else can.",
    from: "#DB2777",
    to: "#4C0519",
    Icon: ShieldIcon,
  },
  {
    tag: "Launch",
    title: "Seamless Deployment & Post Launch Testing",
    desc: "We handle the complex choreography of going live with zero downtime to your active operations. Once deployed to production servers or app stores, we conduct an intensive round of post launch smoke testing to verify that real world user interactions, payment gateways, and data pipelines are functioning perfectly.",
    from: "#EA580C",
    to: "#431407",
    Icon: RocketIcon,
  },
  {
    tag: "Growth",
    title: "Client Offboarding & Growth Training",
    desc: "We don't just throw the keys over the fence. We conduct thorough, hands on training sessions for your technical and non technical staff. You receive detailed documentation, custom video walkthroughs, and a strategic framework on how to use and scale your new digital asset to drive ongoing business value.",
    from: "#0891B2",
    to: "#083344",
    Icon: GraduationIcon,
  },
];

//  --- shared wheel math, lifted from OptionWheel's per-item layout ----
// d = signed distance (in "steps") from this item to the current wheel
// position. mirror flips which way the curve bows (1 = curves like
// OptionWheel's side="left", -1 = curves like side="right").
function layoutWheelItem(el, d, { rowH, tilt, curve, fade, blur, minOpacity, mirror }) {
  if (!el) return;
  const tiltRad = (tilt * Math.PI) / 180;
  const R = tiltRad > 0.0005 ? rowH / tiltRad : 0;
  const dist = Math.abs(d);

  let x = 0;
  let y = d * rowH;
  let rot = 0;
  if (R > 0) {
    const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad));
    y = R * Math.sin(ang);
    x = -mirror * R * (1 - Math.cos(ang)) * curve;
    rot = (mirror * ang * 180) / Math.PI;
  }

  el.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rot.toFixed(3)}deg)`;
  el.style.opacity = String(Math.max(minOpacity, 1 - dist * fade));
  el.style.filter = blur > 0 ? `blur(${(dist * blur).toFixed(2)}px)` : "none";
}

// tuning knobs — same role as OptionWheel's props, fixed here since this
// is a one-off layout rather than a reusable component.
const CARD = { rowH: 300, tilt: 14, curve: 1, fade: 0.55, blur: 1.5, minOpacity: 0, mirror: -1 };
const SMOOTHING_MS = 180; // same idea as OptionWheel's `smoothing` prop

function Framework() {
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);

  const posRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(null);
  const lastRef = useRef(0);
  const reduceRef = useRef(false);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const n = STEPS.length;

  const applyFrame = useCallback(
    (pos) => {
      for (let i = 0; i < n; i++) {
        const d = i - pos;
        layoutWheelItem(cardRefs.current[i], d, CARD);
      }
      const idx = Math.round(Math.min(Math.max(pos, 0), n - 1));
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActiveIndex(idx);
      }
    },
    [n]
  );

  // same exponential-smoothing rAF loop as OptionWheel's runFrame — only
  // difference is what feeds `target` (scroll progress, not wheel-delta/drag)
  const runLoop = useCallback(
    (now) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;
      const tau = Math.max(SMOOTHING_MS, 1) / 1000;
      const k = 1 - Math.exp(-dt / tau);

      const target = targetRef.current;
      const cur = posRef.current;
      let next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.001;
      if (settled) next = target;
      posRef.current = next;
      applyFrame(next);

      rafRef.current = settled ? null : requestAnimationFrame(runLoop);
    },
    [applyFrame]
  );

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return; // already ticking, let it pick up the new target
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runLoop);
  }, [runLoop]);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // one step = one "slide": however many STEPS you have, the page gets
    // that many x 90vh of scroll distance before the sticky wheel releases.
    // Bump the 90 up/down to make each step take more/less scrolling.
    const setHeight = () => {
      wrapper.style.height = `${n * 90}vh`;
    };

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      // recomputed fresh from the wrapper's actual position every event —
      // a fast flick can't skip anything since nothing is being "chased,"
      // only measured from wherever the page currently is.
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      targetRef.current = progress * (n - 1);

      if (reduceRef.current) {
        posRef.current = targetRef.current;
        applyFrame(posRef.current);
      } else {
        startLoop();
      }
    };

    setHeight();
    onScroll();
    applyFrame(posRef.current);

    const onResize = () => {
      setHeight();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.fonts?.ready?.then(onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [applyFrame, startLoop, n]);

  return (
    <section id="framework" ref={wrapperRef} className="relative ">
      {/* Normal document flow, not sticky — scrolls up and out of view as
          the wheel below takes over, instead of staying pinned at the top
          for the whole pinned-scroll duration. Hidden on mobile entirely —
          mobile shows only the card wheel, nothing else. */}
      <div className=" px-4 pt-12 md:block md:px-[8vw] md:pt-16">
        <h2 className="font-display text-xl font-bold tracking-tight text-ivory md:text-3xl lg:text-4xl">
          Our Framework for Engineered Success
        </h2>
      </div>

      <div className="sticky top-0 h-screen overflow-hidden px-4 pt-12 md:px-[8vw] md:pt-0">
        
        <div className="relative grid h-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* left: plain vertical stack, no curve/wheel motion. Hidden on
              mobile — only the card wheel shows there. Both the dim
              plain-text version and the GradientText version of every
              title stay mounted at all times, stacked on top of each other
              — only opacity crossfades between them. Swapping which
              element was rendered (plain <span> vs <GradientText>) was
              what caused the jump: GradientText has different internal
              padding/line-height, so remounting it reflowed the row and
              shifted the number. This way the layout never changes,
              nothing remounts, only opacity animates. */}
              
          <div className="hidden md:flex flex-col justify-center gap-6">
            {STEPS.map((step, i) => {
              const isActive = activeIndex === i;
              return (
                <div key={step.title} className="flex items-baseline gap-4">
                  <span
                    className={`font-mono text-sm transition-colors duration-300 ${
                      isActive ? "text-violet" : "text-violet/50"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative inline-block">
                    {/* plain text — always rendered, reserves the layout
                        width/height so the gradient overlay has something
                        stable to sit on top of */}
                    <span
                      className={`font-display text-base font-semibold md:text-lg transition-opacity duration-500 ${
                        isActive ? "opacity-0" : "opacity-100 text-black"
                      }`}
                    >
                      {step.title}
                    </span>
                    {/* gradient text — absolutely stacked over the plain
                        version, crossfades in on activation */}
                    <span
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden={!isActive}
                    >
                      <GradientText
                        colors={["#A716D6", "#D9A6F5", "#7C11A3"]}
                        animationSpeed={7}
                        showBorder={false}
                        className="!m-0 !p-0 !font-display !text-base !font-semibold !leading-normal md:!text-lg"
                      >
                        {step.title}
                      </GradientText>
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* right wheel: icon + description cards, curving away from the
              right edge on desktop (mirror: -1). Always visible — this is
              the ONLY thing mobile shows for this section. On mobile the
              curve flattens (see isMobileRef in applyFrame) since there's
              no heading column beside it to curve away from. */}
          <div className="relative block col-span-1 md:col-span-1">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => (cardRefs.current[i] = el)}
                className="absolute left-0 top-1/2  w-full origin-right overflow-hidden rounded-2xl border border-violet-dim shadow-2xl "
                style={{ willChange: "transform, opacity, filter" }}
              >
                <StepIllustration step={step} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepIllustration({ step, index }) {
  const { Icon } = step;
  return (
    <div
      className="relative p-6"
      style={{ background: `linear-gradient(160deg, ${step.from} 0%, ${step.to} 100%)` }}
    >
      {/* decorative blobs */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
        style={{ background: step.from }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full opacity-20 blur-3xl"
        style={{ background: "#ffffff" }}
      />

      {/* fake browser bar */}
      <div className="mb-2  hidden items-center justify-between md:mb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/40 md:h-2.5 md:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-white/25 md:h-2.5 md:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-white/15 md:h-2.5 md:w-2.5" />
        </div>
        <span className="rounded-full border border-white/20 px-2.5 py-1 font-mono text-[10px] tracking-wide text-white/70 md:px-3 md:text-[11px]">
          0{index + 1} / {String(STEPS.length).padStart(2, "0")}
        </span>
      </div>

      {/* icon + title share one row now; description sits below with
          tighter side padding since there's no CTA competing for space */}
      <div className="flex h-[calc(100%-32px)] flex-col items-center justify-center md:h-[calc(100%-40px)]">
        <div className="mb-2 lg:mt-0 md:mt-0 mt-3 flex items-center gap-2 md:gap-3">
          <div className="flex lg:h-8 lg:w-8 md:h-8 md:w-8 h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm md:rounded-xl">
            <Icon className="h-4 w-4 text-white md:h-5 md:w-5" />
          </div>
          <p className="font-display text-sm font-semibold leading-snug text-white md:text-lg lg:text-lg">
            {step.title}
          </p>
        </div>
        <span className="lg:flex md:flex hidden mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 md:mb-2 md:text-xs">
          {step.tag}
        </span>
        <p className="max-w-sm text-xs lg:leading-relaxed md:leading-relaxed text-white/70 lg:text-sm md:text-sm lg:mt-0 md:mt-0 mt-2">{step.desc}</p>
      </div>
    </div>
  );
}

/* ---- Minimal line icons (no external assets, royalty-free) ---- */

function CompassIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M15 9l-2 6-4 2 2-6 4-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BlueprintIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 9h16M9 4v16" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14.5" cy="14.5" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SprintIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 12a8 8 0 1 1 3 6.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M4 18v-4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RocketIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3c3 1 5 4 5 8 0 2-1 4-2 5l-3 2-3-2c-1-1-2-3-2-5 0-4 2-7 5-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 17l-2 3M15 17l2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GraduationIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M2 9l10-4 10 4-10 4-10-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 11v4c0 1.5 3 3 6 3s6-1.5 6-3v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default Framework;