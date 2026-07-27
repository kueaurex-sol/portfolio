

"use client";

import { useRef } from "react";

const CARDS = [
  {
    n: "01",
    title: "Security & Compliance By Design",
    body: "Every custom app, software, and AI model we deploy is architected with strict security-first protocols. We embed regional regulations, strict data governance, and industry-specific compliance norms directly into the core code from day one.",
  },
  {
    n: "02",
    title: "Ecosystem-Wide Transformation",
    body: "We analyze your business holistically. By reframing legacy workflows and integrating advanced, evolutionary tech, we ensure your development scales seamlessly across your entire operational framework.",
  },
  {
    n: "03",
    title: "The Collaborative Evolution",
    body: "We practice radical transparency through constant interaction. We don't just hand over a finished product; we co-author it with you, so your team knows exactly how it works and how to scale it.",
  },
  {
    n: "04",
    title: "Built for Velocity & Value",
    body: "We bridge engineering with market traction. By pairing custom development with aggressive growth marketing engines, we ensure your digital assets acquire customers and deliver rapid ROI.",
  },
];

const BUBBLE_COUNT = 7;

function TiltCard({ card }) {
  const cardRef = useRef(null);

  // direct style mutation via ref, not React state — this runs on every
  // mousemove and a state-driven re-render at that frequency would be
  // needlessly expensive
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0-1
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 14; // max ~7deg either side
    const rotateX = (0.5 - py) * 14;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-7 shadow-xl shadow-ink/10 backdrop-blur-xl transition-transform duration-300 ease-out will-change-transform"
    >
      {/* violet fill rises from the bottom on hover. Three concentric rings
          expand outward from the top edge and fade to fully transparent —
          a real ripple, not a sideways sweep — in a pale violet tone so it
          blends with the fill rather than reading as a stray white shape.
          Finite, forwards-filled animation triggered by a plain
          ".group:hover" rule in globals.css (not Tailwind's animate-/
          group-hover: utilities, which have silently intercepted custom
          names before), so it plays once and stays gone. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-0 overflow-hidden bg-violet transition-[height] duration-[900ms] ease-out group-hover:h-full">
        <div className="absolute inset-x-0 top-0 flex justify-center">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="ripple-ring absolute top-0 rounded-full"
              style={{ animationDelay: `${i * 180}ms` }}
            />
          ))}
        </div>
        {Array.from({ length: BUBBLE_COUNT }).map((_, i) => {
          const left = 8 + ((i * 137) % 84); // pseudo-random but deterministic spread
          const size = 5 + (i % 3) * 4;
          const delay = (i * 0.35).toFixed(2);
          const duration = (2.2 + (i % 4) * 0.4).toFixed(2);
          return (
            <span
              key={i}
              className="bubble-rise absolute bottom-0 rounded-full bg-white/70"
              style={{ left: `${left}%`, width: size, height: size, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
            />
          );
        })}
      </div>

      <div className="relative z-10">
        <h3 className="mb-3 font-display text-lg font-semibold leading-snug text-ivory transition-colors duration-500 group-hover:text-white">
          {card.title}
        </h3>
        <p className="text-sm leading-relaxed text-ivory/60 transition-colors duration-500 group-hover:text-white/90">
          {card.body}
        </p>
      </div>
      <span className="relative z-10 mt-6 font-mono text-2xl font-bold text-violet/70 transition-colors duration-500 group-hover:text-white/80">
        {card.n}
      </span>
    </div>
  );
}

function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative px-[8vw] py-28">
      <h2 className="mb-14 text-center font-display text-3xl font-bold tracking-tight text-ivory md:text-4xl">
        Why Choose Us
      </h2>
      <div className="mx-auto grid max-w-6xl gap-5 [perspective:1200px] md:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((card) => (
          <TiltCard key={card.n} card={card} />
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;