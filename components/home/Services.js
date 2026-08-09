
"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Core Product Engineering",
    tag: "ENGINEERING",
    body: "Custom software and scalable platforms built for how your business actually operates.",
    meta: "Full-stack builds",
    art: "/service-1.svg",
  },
  {
    title: "Digital Transformation",
    tag: "TRANSFORMATION",
    body: "Reframing legacy workflows and integrating advanced, evolutionary tech across your operations.",
    meta: "Systems, reimagined",
    art: "/service-2.svg",
  },
  {
    title: "Integrated Suites",
    tag: "SUITES",
    body: "Unified commerce and automation ecosystems that pair engineering with growth marketing.",
    meta: "End-to-end ecosystems",
    art: "/service-3.svg",
  },
];

// alternating tilt + lift so the three cards read as a fanned deck rather
// than a flat grid — desktop only, applied via md: below. On mobile the
// cards are full width and flat (no room for a fanned tilt).
const CARD_TRANSFORM = [
  "md:rotate-[5deg] md:translate-y-3",
  "md:rotate-[-5deg] md:-translate-y-4",
  "md:rotate-[5deg] md:translate-y-3",
];

function Services() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // gsap.matchMedia() (not a one-time matchMedia().matches check) so
    // this correctly engages/disengages if the viewport crosses 767px at
    // runtime — e.g. rotating a phone, or resizing a dev tools device
    // emulator without a full page reload. A one-time check only reflects
    // whatever width the page happened to load at, which is why this was
    // stuck showing just card 1 when tested by toggling device emulation
    // mid-session.
    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      // Deferred to the next animation frame. React fires useLayoutEffect
      // bottom-up — children before parents — and this component is a
      // child of ScrollStory (passed as its `children`). That means THIS
      // effect runs before ScrollStory's own effect creates Hero's pin.
      // If we measured "top top" right now, Hero wouldn't have its
      // pin-spacer yet, so the page would look ~200% shorter than it
      // really ends up being — which is exactly why this was already
      // showing the last card by the time you scrolled here (its whole
      // pinned range had effectively already happened, position-wise).
      // Waiting one animation frame guarantees ScrollStory's effect (and
      // Hero's pin) has already run, since that happens synchronously in
      // the same initial commit, well before the browser gets to the
      // next frame.
      let tween = null;
      const raf = requestAnimationFrame(() => {
        // Horizontal-panel-scroll pattern: a REAL gsap.to() tween tied to
        // scrollTrigger (GSAP's own documented pattern for this), not a
        // bare ScrollTrigger.create({ onUpdate }) with manual gsap.set().
        // The bare version has no attached animation, so there's no
        // proxy tween running on GSAP's own ticker to smooth/self-correct
        // the track's position — it can visually stall. A real tween
        // gets that proxy for free, same as the Hero timeline relies on.
        const getDistance = () => track.scrollWidth - section.clientWidth;

        tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Anything elsewhere on the page that measured #services'
        // position in the same tick as mount (one frame before this pin
        // -spacer exists) is now stale relative to it — same root cause
        // as the WhyChooseUs fix. Refreshing here recalculates every
        // registered trigger against the now-correct layout.
        ScrollTrigger.refresh();
      });

      // runs automatically when this query stops matching (crossing back
      // above 767px) or on unmount
      return () => {
        cancelAnimationFrame(raf);
        tween?.scrollTrigger?.kill();
        tween?.kill();
        gsap.set(track, { x: 0 }); // don't leave desktop's static layout offset
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden px-0 py-0 md:overflow-visible md:px-[5vw] md:py-36"
    >
      <h2 className="mb-24 px-[8vw] pt-28 text-center font-display text-4xl font-bold tracking-tight text-ivory md:px-0 md:pt-0 md:text-5xl">
        Our Services
      </h2>

      {/* mobile: full-width track, one card per screen, horizontal drive
          comes from the pinned ScrollTrigger above.
          desktop: original static centered flex row, untouched. */}
      <div
        ref={trackRef}
        className="flex w-max items-center gap-0 px-0 md:mx-auto md:w-[90vw] md:max-w-6xl md:justify-center md:gap-6 md:px-0"
      >
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            className={`group relative h-[80vh] w-screen shrink-0 overflow-hidden p-10 shadow-2xl shadow-ink/20 transition-all duration-500 ease-out md:h-[520px] md:w-[26vw] md:max-w-[400px] md:min-w-[300px] md:rounded-[36px] md:hover:z-20 md:hover:-translate-y-5 md:hover:rotate-0 ${CARD_TRANSFORM[i]}`}
            style={{
              zIndex: i === 1 ? 10 : 5 - i,
              background: " linear-gradient(140deg,  #f1f1f5 0%,  #d7d5df 22%,  #b04be0 48%,  #6f667d 72%,  #383640 100%)",
            }}
          >
            {/* metallic sheen streak */}
            <div
              className="pointer-events-none absolute inset-0 z-10 opacity-70 mix-blend-overlay"
              style={{
                background:
                  "linear-gradient(115deg, transparent 15%, rgba(255,255,255,0.85) 38%, transparent 55%)",
              }}
            />

            {/* hover-reveal artwork — peeks up from the bottom, arched top
                edge, deliberately short so it never covers the title */}
            <div
              className="absolute inset-x-0 bottom-0 z-0 h-[36%] translate-y-[105%] overflow-hidden transition-transform duration-500 ease-out group-hover:translate-y-0"
              style={{ borderRadius: "50% 50% 0 0 / 50px 50px 0 0" }}
            >
              <img src={s.art} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </div>

            <div className="relative z-20 flex h-full flex-col justify-between">
              <div>
                <span className="mb-4 inline-block font-mono text-xs tracking-[3px] text-violet">
                  {s.tag}
                </span>
                <h3 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] lg:text-4xl">
                  {s.title}
                </h3>
              </div>

              <div className="transition-transform duration-500 ease-out md:group-hover:-translate-y-[130px]">
                <div className="mb-4 h-px bg-gradient-to-r from-violet/80 to-transparent" />
                <p className="mb-3 text-base leading-relaxed text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]">
                  {s.body}
                </p>
                <p className="font-mono text-[11px] tracking-[2px] text-white/55">{s.meta}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;