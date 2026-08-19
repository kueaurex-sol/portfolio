// "use client";
// import { useRef, useState, useEffect, useLayoutEffect } from "react";
// import gsap from "gsap";

// const CARDS = [
//   {
//     n: "01",
//     title: "Security & Compliance By Design",
//     body: "Every custom app, software, and AI model we deploy is architected with strict security-first protocols. We embed regional regulations, strict data governance, and industry-specific compliance norms directly into the core code from day one.",
//   },
//   {
//     n: "02",
//     title: "Ecosystem-Wide Transformation",
//     body: "We analyze your business holistically. By reframing legacy workflows and integrating advanced, evolutionary tech, we ensure your development scales seamlessly across your entire operational framework.",
//   },
//   {
//     n: "03",
//     title: "The Collaborative Evolution",
//     body: "We practice radical transparency through constant interaction. We don't just hand over a finished product; we co-author it with you, so your team knows exactly how it works and how to scale it.",
//   },
//   {
//     n: "04",
//     title: "Built for Velocity & Value",
//     body: "We bridge engineering with market traction. By pairing custom development with aggressive growth marketing engines, we ensure your digital assets acquire customers and deliver rapid ROI.",
//   },
// ];

// const BUBBLE_COUNT = 7;
// const AUTOPLAY_MS = 9000;
// // How far the "drag" shear leans before the card settles flat.
// const SKEW_ANGLE = 14;

// function TiltCard({ card, active = false }) {
//   const cardRef = useRef(null);

//   const handleMouseMove = (e) => {
//     const el = cardRef.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     const px = (e.clientX - rect.left) / rect.width;
//     const py = (e.clientY - rect.top) / rect.height;
//     const rotateY = (px - 0.5) * 14;
//     const rotateX = (0.5 - py) * 14;
//     el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
//   };

//   const handleMouseLeave = () => {
//     const el = cardRef.current;
//     if (!el) return;
//     el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
//   };

//   return (
//     <div
//       ref={cardRef}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-7 shadow-xl shadow-ink/10 backdrop-blur-xl transition-transform duration-300 ease-out will-change-transform ${active ? "is-active" : ""}`}
//     >
//       <div
//         className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 h-0 overflow-hidden bg-violet transition-[height] duration-[900ms] ease-out group-hover:h-full ${active ? "!h-full" : ""}`}
//       >
//         <div className="absolute inset-x-0 top-0 flex justify-center">
//           {[0, 1, 2].map((i) => (
//             <span
//               key={i}
//               className="ripple-ring absolute top-0 rounded-full"
//               style={{ animationDelay: `${i * 180}ms` }}
//             />
//           ))}
//         </div>
//         {Array.from({ length: BUBBLE_COUNT }).map((_, i) => {
//           const left = 8 + ((i * 137) % 84);
//           const size = 5 + (i % 3) * 4;
//           const delay = (i * 0.35).toFixed(2);
//           const duration = (2.2 + (i % 4) * 0.4).toFixed(2);
//           return (
//             <span
//               key={i}
//               className="bubble-rise absolute bottom-0 rounded-full bg-white/70"
//               style={{ left: `${left}%`, width: size, height: size, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
//             />
//           );
//         })}
//       </div>

//       <div className="relative z-10">
//         <h3
//           className={`mb-3 font-display text-lg font-semibold leading-snug text-ivory transition-colors duration-500 group-hover:text-white ${active ? "!text-white" : ""}`}
//         >
//           {card.title}
//         </h3>
//         <p
//           className={`text-sm leading-relaxed text-ivory/60 transition-colors duration-500 group-hover:text-white/90 ${active ? "!text-white/90" : ""}`}
//         >
//           {card.body}
//         </p>
//       </div>
//       <span
//         className={`relative z-10 mt-6 font-mono text-2xl font-bold text-violet/70 transition-colors duration-500 group-hover:text-white/80 ${active ? "!text-white/80" : ""}`}
//       >
//         {card.n}
//       </span>
//     </div>
//   );
// }

// // Small circular button, purple outline + purple arrow, transparent fill.
// // dir="prev" mirrors the arrow horizontally instead of needing a second SVG.
// function CarouselButton({ dir, onClick, label }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       aria-label={label}
//       className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-violet bg-transparent text-violet transition-transform active:scale-90"
//     >
//       <svg
//         width="18"
//         height="18"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         style={{ transform: dir === "prev" ? "scaleX(-1)" : undefined }}
//       >
//         <path d="M9 6l6 6-6 6" />
//       </svg>
//     </button>
//   );
// }

// function WhyChooseUs() {
//   const sectionRef = useRef(null);
//   const trackRef = useRef(null);
//   const cardWrapRefs = useRef([]);
//   const [activeIndex, setActiveIndex] = useState(-1);

//   // Mobile carousel index — separate from activeIndex (which only means
//   // "hover/active card styling" and stays -1 on desktop, per the original
//   // file's comment). mobileIndex drives which card is actually shown.
//   const [mobileIndex, setMobileIndex] = useState(0);
//   const mobileIndexRef = useRef(0);
//   const animatingRef = useRef(false);
//   const timerRef = useRef(null);
//   const isMobileRef = useRef(false);

//   const getDistance = () => {
//     const track = trackRef.current;
//     const section = sectionRef.current;
//     if (!track || !section) return 0;
//     return track.scrollWidth - section.clientWidth;
//   };
//   const xForIndex = (i) => -(getDistance() * i) / (CARDS.length - 1);

//   // direction: "next" | "prev" — controls which way the card leans as it
//   // drags in. The track's transform-origin is pinned to the bottom edge
//   // (set once, on mount) so skewX only ever shifts things sideways — the
//   // bottom edge tracks the slide exactly, the top edge leans ahead of or
//   // behind it, and nothing ever moves up or down.
//   const goTo = (newIndex, direction = "next", { reduce = false } = {}) => {
//     if (!isMobileRef.current) return;
//     const clamped = ((newIndex % CARDS.length) + CARDS.length) % CARDS.length;
//     if (animatingRef.current || clamped === mobileIndexRef.current) return;

//     animatingRef.current = true;
//     mobileIndexRef.current = clamped;
//     setMobileIndex(clamped);
//     setActiveIndex(clamped);

//     const track = trackRef.current;
//     // "next" slides left — lean the top edge further left, ahead of the
//     // bottom, so the top-left corner arrives first. "prev" slides right —
//     // lean the opposite way so the top-right corner arrives first.
//     const angle = direction === "next" ? SKEW_ANGLE : -SKEW_ANGLE;

//     if (reduce) {
//       gsap.set(track, { x: xForIndex(clamped), skewX: 0 });
//       animatingRef.current = false;
//       return;
//     }

//     const tl = gsap.timeline({
//       onComplete: () => {
//         animatingRef.current = false;
//       },
//     });

//     // A tiny counter-lean first (anticipation, like a wave drawing back
//     // before it breaks), then the fast kick into the full lean, then the
//     // x slide runs the whole time. The settle uses a low-period elastic
//     // ease so skewX genuinely ripples back and forth a few times before
//     // flattening out, rather than a single spring-back — all still pure
//     // skewX, so nothing ever moves vertically.
//     tl.to(track, { skewX: -angle * 0.22, duration: 0.06, ease: "sine.out" }, 0)
//       .to(track, { skewX: angle, duration: 0.14, ease: "power1.out" }, 0.06)
//       .to(track, { x: xForIndex(clamped), duration: 0.6, ease: "power3.inOut" }, 0)
//       .to(track, { skewX: 0, duration: 0.75, ease: "elastic.out(1, 0.32)" }, 0.2);
//   };

//   const resetAutoplay = () => {
//     clearInterval(timerRef.current);
//     if (!isMobileRef.current) return;
//     timerRef.current = setInterval(() => {
//       goTo(mobileIndexRef.current + 1, "next");
//     }, AUTOPLAY_MS);
//   };

//   const handlePrev = () => {
//     goTo(mobileIndexRef.current - 1, "prev");
//     resetAutoplay();
//   };

//   const handleNext = () => {
//     goTo(mobileIndexRef.current + 1, "next");
//     resetAutoplay();
//   };

//   useLayoutEffect(() => {
//     const section = sectionRef.current;
//     const track = trackRef.current;
//     if (!section || !track) return;

//     const mm = gsap.matchMedia();

//     mm.add("(max-width: 767px)", () => {
//       isMobileRef.current = true;

//       mobileIndexRef.current = 0;
//       setMobileIndex(0);
//       setActiveIndex(0);
//       gsap.set(track, { x: 0, skewX: 0, transformOrigin: "50% 100%" });

//       resetAutoplay();

//       return () => {
//         isMobileRef.current = false;
//         clearInterval(timerRef.current);
//         gsap.set(track, { x: 0, skewX: 0, transformOrigin: "50% 100%" });
//         setActiveIndex(-1);
//         setMobileIndex(0);
//         mobileIndexRef.current = 0;
//       };
//     });

//     return () => mm.revert();
//   }, []);

//   // Recompute position on resize (card width can change) — snaps
//   // instantly to the current index rather than animating, so a resize
//   // never looks like an unexpected slide.
//   useEffect(() => {
//     const handleResize = () => {
//       if (!isMobileRef.current) return;
//       gsap.set(trackRef.current, { x: xForIndex(mobileIndexRef.current), skewX: 0 });
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => () => clearInterval(timerRef.current), []);

//   return (
//     <section
//       id="why-choose-us"
//       ref={sectionRef}
//       className="relative overflow-hidden px-0 py-28 md:overflow-visible md:px-[8vw]"
//     >
//       <h2 className="mb-14 px-[8vw] text-center font-display text-3xl font-bold tracking-tight text-ivory md:px-0 md:text-4xl">
//         Why Choose Us
//       </h2>

//       {/* mobile: plain autoplaying carousel — no scroll-lock, no wheel/
//           touch hijacking. The track just animates via GSAP to the current
//           mobileIndex's x position, advanced either by the AUTOPLAY_MS
//           interval or the two circular buttons below.
//           desktop: original grid, untouched — activeIndex/mobileIndex
//           never used there, so :hover still drives each card's styling. */}
//       <div
//         ref={trackRef}
//         className="flex w-max items-stretch gap-0 px-0 md:mx-auto md:w-auto md:max-w-6xl md:grid md:grid-cols-2 md:gap-5 md:px-0 lg:grid-cols-4"
//       >
//         {CARDS.map((card, i) => (
//           <div
//             key={card.n}
//             ref={(el) => (cardWrapRefs.current[i] = el)}
//             className="h-[54vh] w-screen shrink-0 px-[6vw] md:h-auto md:w-auto md:shrink md:px-0"
//           >
//             <TiltCard card={card} active={i === activeIndex} />
//           </div>
//         ))}
//       </div>

//       {/* mobile-only controls: circular purple-outline prev/next buttons +
//           a small dot indicator row, centered below the card. */}
//       <div className="mt-8 flex items-center justify-center gap-6 md:hidden">
//         <CarouselButton dir="prev" onClick={handlePrev} label="Previous card" />

//         <div className="flex items-center gap-2">
//           {CARDS.map((card, i) => (
//             <span
//               key={card.n}
//               className={`h-2 rounded-full transition-all duration-300 ${
//                 i === mobileIndex ? "w-6 bg-violet" : "w-2 bg-violet/30"
//               }`}
//             />
//           ))}
//         </div>

//         <CarouselButton dir="next" onClick={handleNext} label="Next card" />
//       </div>
//     </section>
//   );
// }

// export default WhyChooseUs;
"use client";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";

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
const AUTOPLAY_MS = 9000;
// Same curve StoryCard's image-lift/wave-stack reveal uses — reusing it
// here is what makes this feel like the same animation language as the
// rest of the site, instead of a separate, unrelated motion style.
const ENTER_EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const ENTER_DURATION = "550ms";

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

function CarouselButton({ dir, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-violet bg-transparent text-violet transition-transform active:scale-90"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: dir === "prev" ? "scaleX(-1)" : undefined }}
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  );
}

function WhyChooseUs() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardWrapRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const timerRef = useRef(null);
  const isMobileRef = useRef(false);
  // Gates BOTH autoplay and the initial "which card is showing" reset —
  // this is what stops the carousel from silently advancing to card 2/3
  // while the user is still sitting in Hero, further up the page.
  const inViewRef = useRef(false);

  const getDistance = () => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return 0;
    return track.scrollWidth - section.clientWidth;
  };
  const xForIndex = (i) => -(getDistance() * i) / (CARDS.length - 1);

  // Single tween, same easing family as StoryCard's reveal (GSAP's
  // back.out approximates the cubic-bezier(0.34,1.56,0.64,1) StoryCard
  // uses for CSS transitions) — replaces the old 4-tween skewX timeline.
  // Chaining several overlapping transform tweens on the SAME element
  // forces the browser to recompute compositing on every one of those
  // ticks; a single tween is what actually removes the jank/lag, not
  // just a different-looking curve.
  const goTo = (newIndex, { reduce = false } = {}) => {
    if (!isMobileRef.current) return;
    const clamped = ((newIndex % CARDS.length) + CARDS.length) % CARDS.length;
    if (animatingRef.current || clamped === mobileIndexRef.current) return;

    animatingRef.current = true;
    mobileIndexRef.current = clamped;
    setMobileIndex(clamped);
    setActiveIndex(clamped);

    gsap.to(trackRef.current, {
      x: xForIndex(clamped),
      duration: reduce ? 0 : 0.65,
      ease: reduce ? "none" : "back.out(1.5)",
      onComplete: () => {
        animatingRef.current = false;
      },
    });
  };

  const resetAutoplay = () => {
    clearInterval(timerRef.current);
    if (!isMobileRef.current || !inViewRef.current) return;
    timerRef.current = setInterval(() => {
      goTo(mobileIndexRef.current + 1);
    }, AUTOPLAY_MS);
  };

  const handlePrev = () => {
    goTo(mobileIndexRef.current - 1);
    resetAutoplay();
  };

  const handleNext = () => {
    goTo(mobileIndexRef.current + 1);
    resetAutoplay();
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      isMobileRef.current = true;

      mobileIndexRef.current = 0;
      setMobileIndex(0);
      setActiveIndex(0);
      gsap.set(track, { x: 0 });

      // Fires whenever the section crosses into/out of view — autoplay
      // only ever runs while isIntersecting is true, and re-entering
      // always resets to card 0 rather than resuming wherever it left
      // off, so scrolling away and back always shows card 1 first.
      const io = new IntersectionObserver(
        ([entry]) => {
          inViewRef.current = entry.isIntersecting;

          if (entry.isIntersecting) {
            if (!animatingRef.current) {
              mobileIndexRef.current = 0;
              setMobileIndex(0);
              setActiveIndex(0);
              gsap.set(track, { x: 0 });
            }
            resetAutoplay();
          } else {
            clearInterval(timerRef.current);
          }
        },
        { threshold: 0.5 }
      );
      io.observe(section);

      return () => {
        isMobileRef.current = false;
        inViewRef.current = false;
        io.disconnect();
        clearInterval(timerRef.current);
        gsap.set(track, { x: 0 });
        setActiveIndex(-1);
        setMobileIndex(0);
        mobileIndexRef.current = 0;
      };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!isMobileRef.current) return;
      gsap.set(trackRef.current, { x: xForIndex(mobileIndexRef.current) });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="relative overflow-hidden px-0 py-28 md:overflow-visible md:px-[8vw]"
    >
      <h2 className="mb-14 px-[8vw] text-center font-display text-3xl font-bold tracking-tight text-ivory md:px-0 md:text-4xl">
        Why Choose Us
      </h2>

      <div
        ref={trackRef}
        className="flex w-max items-stretch gap-0 px-0 md:mx-auto md:w-auto md:max-w-6xl md:grid md:grid-cols-2 md:gap-5 md:px-0 lg:grid-cols-4"
      >
        {CARDS.map((card, i) => {
          const isEntering = i === mobileIndex;
          return (
            <div
              key={card.n}
              ref={(el) => (cardWrapRefs.current[i] = el)}
              className="h-[54vh] w-screen shrink-0 px-[6vw] md:h-auto md:w-auto md:shrink md:px-0"
            >
              {/* StoryCard-style pop-in: the arriving card scales/lifts
                  into place with the exact same duration + easing curve
                  StoryCard uses for its image reveal, so the two feel
                  like one consistent motion language across the site.
                  This is a plain CSS transition (like StoryCard), not
                  another GSAP tween — cheaper, and avoids stacking yet
                  another animated property onto the already-tweening
                  track. */}
              <div
                className="h-full w-full md:transform-none"
                style={{
                  transform: isEntering
                    ? "translateY(0px) scale(1)"
                    : "translateY(14px) scale(0.94)",
                  opacity: isEntering ? 1 : 0.55,
                  transitionProperty: "transform, opacity",
                  transitionDuration: ENTER_DURATION,
                  transitionTimingFunction: ENTER_EASE,
                  transitionDelay: isEntering ? "90ms" : "0ms",
                }}
              >
                <TiltCard card={card} active={i === activeIndex} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 md:hidden">
        <CarouselButton dir="prev" onClick={handlePrev} label="Previous card" />

        <div className="flex items-center gap-2">
          {CARDS.map((card, i) => (
            <span
              key={card.n}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === mobileIndex ? "w-6 bg-violet" : "w-2 bg-violet/30"
              }`}
            />
          ))}
        </div>

        <CarouselButton dir="next" onClick={handleNext} label="Next card" />
      </div>
    </section>
  );
}

export default WhyChooseUs;