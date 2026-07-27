"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    tag: "Discovery",
    title: "Scoping & Strategy Discovery",
    desc: "We don't start by guessing. We begin with an intensive discovery deep-dive to map your operational bottlenecks, business goals, and growth targets. By the end of this phase, you receive a crystal-clear project roadmap, defined technical requirements, and a guaranteed scope of work — ensuring zero surprises down the line.",
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
    desc: "Our engineering team brings the architecture to life using modern tech stacks and agile methodologies. We break the build down into bi-weekly sprints, offering you transparent, clickable milestones along the way. You can see the progress in real-time, allowing for continuous feedback and pivoting if business needs shift.",
    from: "#059669",
    to: "#064E3B",
    Icon: SprintIcon,
  },
  {
    tag: "Security",
    title: "Security & Quality Assessment",
    desc: "We treat security as a non-negotiable metric, not an afterthought. Your product undergoes rigorous automated and manual testing, including vulnerability scans, load testing, and compliance checks (such as GDPR or HIPAA depending on your region). We break our own code to ensure nobody else can.",
    from: "#DB2777",
    to: "#4C0519",
    Icon: ShieldIcon,
  },
  {
    tag: "Launch",
    title: "Seamless Deployment & Post-Launch Testing",
    desc: "We handle the complex choreography of going live with zero downtime to your active operations. Once deployed to production servers or app stores, we conduct an intensive round of post-launch smoke testing to verify that real-world user interactions, payment gateways, and data pipelines are functioning perfectly.",
    from: "#EA580C",
    to: "#431407",
    Icon: RocketIcon,
  },
  {
    tag: "Growth",
    title: "Client Offboarding & Growth Training",
    desc: "We don't just throw the keys over the fence. We conduct thorough, hands-on training sessions for your technical and non-technical staff. You receive detailed documentation, custom video walkthroughs, and a strategic framework on how to use and scale your new digital asset to drive ongoing business value.",
    from: "#0891B2",
    to: "#083344",
    Icon: GraduationIcon,
  },
];

function Framework() {
  const stepRefs = useRef([]);
  const cardWrapRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState(() => new Set());

  // Which step is "active" (for the left-hand list highlight only) is
  // decided purely by which step block is nearest the vertical center of
  // the viewport — a native browser API, no scroll math involved.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            (!best || entry.intersectionRatio > best.intersectionRatio)
          ) {
            best = entry;
          }
        }
        if (best) {
          const idx = Number(best.target.dataset.index);
          setActiveIndex((prev) => (prev === idx ? prev : idx));
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Separately: each right-side card plays a one-time "rotate into place"
  // animation the first time it scrolls into view, then stays at its
  // resting tilt (matching the reference, where the tilt itself is
  // constant — the only real motion there is the sticky slide).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setRevealed((prev) => {
          let changed = false;
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const idx = Number(entry.target.dataset.cardIndex);
              if (!next.has(idx)) {
                next.add(idx);
                changed = true;
              }
            }
          }
          return changed ? next : prev;
        });
      },
      { threshold: 0.35 }
    );

    cardWrapRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="framework" className="relative px-[8vw] py-28">
      <h2 className="mb-14 font-display text-3xl font-bold tracking-tight text-ivory md:text-4xl">
        Our Framework for Engineered Success
      </h2>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Left: each step is a real block in the page; the browser
            handles the "scroll past it" part on its own. */}
        <div>
          {STEPS.map((step, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={step.title}
                ref={(el) => (stepRefs.current[i] = el)}
                data-index={i}
                className="flex min-h-[65vh] flex-col justify-center border-b border-ink/10 last:border-b-0 md:min-h-[70vh]"
              >
                <div
                  className={`cursor-default rounded-xl px-4 transition-all duration-500 ${
                    isActive ? "bg-violet/10 py-5" : "py-4"
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-mono text-sm transition-colors duration-500 ${
                        isActive ? "text-violet" : "text-violet/50"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-lg font-semibold transition-colors duration-500 ${
                        isActive ? "text-ivory" : "text-ivory/40"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden pl-9 pr-4 pt-3 text-sm leading-relaxed text-ivory/60">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: each step gets its OWN sticky card, matched to the same
            per-step block height as the left column. As you scroll through
            a step, its card sticks in place; the instant that step's block
            scrolls past, the card un-sticks and is carried off by normal
            document flow while the next step's own sticky card is already
            waiting to take over the same on-screen spot (the reference
            video's slide handoff). On top of that, each card plays a
            one-time rotate-into-place animation the first time it scrolls
            into view, settling into a constant tilted "mockup" angle. */}
        <div className="relative hidden md:block">
          {STEPS.map((step, i) => {
            const isRevealed = revealed.has(i);
            return (
              <div
                key={step.title}
                ref={(el) => (cardWrapRefs.current[i] = el)}
                data-card-index={i}
                className="flex min-h-[65vh] items-center md:min-h-[70vh]"
              >
                <div
                  className="sticky top-24 h-[300px] w-full"
                  style={{ perspective: "1400px" }}
                >
                  {/* decorative shadow card peeking out behind, for depth */}
                  <div
                    className="absolute inset-x-4 -bottom-3 h-full rounded-2xl bg-ink/40 transition-transform duration-[900ms] ease-out"
                    style={{
                      transform: isRevealed
                        ? "rotateY(-18deg) rotateX(6deg)"
                        : "rotateY(-48deg) rotateX(18deg) scale(0.85)",
                    }}
                  />
                  <div
                    className="relative h-full w-full overflow-hidden rounded-2xl border border-violet-dim shadow-2xl transition-transform duration-[900ms] ease-out"
                    style={{
                      transform: isRevealed
                        ? "rotateY(-18deg) rotateX(6deg)"
                        : "rotateY(-48deg) rotateX(18deg) scale(0.85)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <StepIllustration step={step} index={i} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StepIllustration({ step, index }) {
  const { Icon } = step;
  return (
    <div
      className="relative h-full w-full p-6"
      style={{
        background: `linear-gradient(160deg, ${step.from} 0%, ${step.to} 100%)`,
      }}
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
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-[11px] tracking-wide text-white/70">
          0{index + 1} / {String(STEPS.length).padStart(2, "0")}
        </span>
      </div>

      <div className="flex h-[calc(100%-40px)] flex-col items-center justify-center text-center">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
          <Icon className="h-7 w-7 text-white" />
        </div>
        <span className="mb-1.5 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
          {step.tag}
        </span>
        <p className="max-w-xs font-display text-lg font-semibold leading-snug text-white">
          {step.title}
        </p>
      </div>

      <div className="absolute bottom-4 right-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-ink shadow-lg">
          Book a call ↗
        </span>
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