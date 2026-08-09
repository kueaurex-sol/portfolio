
"use client";

import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

function TiltCard({ card, active = false }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 14;
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
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-7 shadow-xl shadow-ink/10 backdrop-blur-xl transition-transform duration-300 ease-out will-change-transform ${active ? "is-active" : ""}`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 h-0 overflow-hidden bg-violet transition-[height] duration-[900ms] ease-out group-hover:h-full ${active ? "!h-full" : ""}`}
      >
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
          const left = 8 + ((i * 137) % 84);
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
        <h3
          className={`mb-3 font-display text-lg font-semibold leading-snug text-ivory transition-colors duration-500 group-hover:text-white ${active ? "!text-white" : ""}`}
        >
          {card.title}
        </h3>
        <p
          className={`text-sm leading-relaxed text-ivory/60 transition-colors duration-500 group-hover:text-white/90 ${active ? "!text-white/90" : ""}`}
        >
          {card.body}
        </p>
      </div>
      <span
        className={`relative z-10 mt-6 font-mono text-2xl font-bold text-violet/70 transition-colors duration-500 group-hover:text-white/80 ${active ? "!text-white/80" : ""}`}
      >
        {card.n}
      </span>
    </div>
  );
}

function WhyChooseUs() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardWrapRefs = useRef([]); // outer <div> per card — used for the CaseStudies-style enter animation
  const [activeIndex, setActiveIndex] = useState(-1);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      let tween = null;
      let trigger = null;
      let lastActive = -1;

      // Same prefers-reduced-motion convention as ScrollStory/CaseStudies.
      // Unlike CaseStudies, we don't skip the pin here — the horizontal
      // slide IS how mobile users reach cards 2-4 (there's no vertical
      // fallback layout for this track), so killing the trigger would
      // strand them. We only skip the opacity/x "fly in" motion below.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const raf = requestAnimationFrame(() => {
        const cardEls = cardWrapRefs.current.filter(Boolean);
        const getDistance = () => track.scrollWidth - section.clientWidth;

        // Same CaseStudies-style reveal: cards start faded/offset and fly
        // in once the section is actually scrolled into view, instead of
        // just being visible immediately.
        if (!reduce) {
          gsap.set(cardEls, { opacity: 0, x: 80 });
        }

        tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
        });

        trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          animation: tween,
          invalidateOnRefresh: true,
          onEnter: () => {
            if (reduce) {
              gsap.set(cardEls, { opacity: 1, x: 0 });
            } else {
              gsap.to(cardEls, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 });
            }
          },
          onEnterBack: () => {
            gsap.to(cardEls, { opacity: 1, x: 0, duration: reduce ? 0 : 0.4 });
          },
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (CARDS.length - 1));
            if (idx !== lastActive) {
              lastActive = idx;
              setActiveIndex(idx);
            }
          },
        });

        ScrollTrigger.refresh();
      });

      return () => {
        cancelAnimationFrame(raf);
        trigger?.kill();
        tween?.kill();
        gsap.set(track, { x: 0 });
        gsap.set(cardWrapRefs.current.filter(Boolean), { clearProps: "opacity,transform" });
        setActiveIndex(-1);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="relative overflow-hidden px-0 py-28 md:overflow-visible md:px-[8vw]"
    >
      <h2 className="mb-14 px-[8vw] text-center font-display text-3xl font-bold tracking-tight text-ivory md:px-0 md:text-4xl">
        Why Choose Us
      </h2>

      {/* mobile: pinned horizontal slide, one card centered per "step" with
          a peek of the previous/next card on either side — track padding
          (11vw) is exactly (100vw - card width 78vw) / 2, so each card
          centers itself in the viewport as it becomes active, symmetric
          peek at both ends. Card width 78vw + padding 11vw*2 = 100vw, so
          the scroll-distance math below (scrollWidth - clientWidth) still
          lands exactly on "last card centered" without extra math.
          desktop: original grid, untouched by any of this. */}
      <div
        ref={trackRef}
        className="flex w-max items-stretch gap-4 px-[11vw] md:mx-auto md:w-auto md:max-w-6xl md:grid md:grid-cols-2 md:gap-5 md:px-0 lg:grid-cols-4"
      >
        {CARDS.map((card, i) => (
          <div
            key={card.n}
            ref={(el) => (cardWrapRefs.current[i] = el)}
            className="h-[54vh] w-[78vw] shrink-0 md:h-auto md:w-auto md:shrink"
          >
            <TiltCard card={card} active={i === activeIndex} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;