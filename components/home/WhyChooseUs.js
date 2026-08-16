// "use client";

// import { useRef, useState, useLayoutEffect } from "react";
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

// function WhyChooseUs() {
//   const sectionRef = useRef(null);
//   const trackRef = useRef(null);
//   const cardWrapRefs = useRef([]);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useLayoutEffect(() => {
//     const section = sectionRef.current;
//     const track = trackRef.current;
//     if (!section || !track) return;

//     const mm = gsap.matchMedia();

//     mm.add("(max-width: 767px)", () => {
//       const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//       // ---- carousel state ----
//       let index = 0;
//       let animating = false;   // true only while the GSAP tween is running
//       let locked = false;      // true while native scroll is disabled
//       let lastScrollY = window.scrollY;
//       let releasedAt = 0;

//       // ---- gesture-level locks (this is what caps it at exactly one
//       // card per gesture, independent of how long the tween takes or how
//       // long the physical scroll/swipe lasts) ----
//       let wheelBusy = false;
//       let wheelGapTimer = null;
//       let touchStartY = null;
//       let touchStartX = null;
//       let touchConsumed = false;

//       const getDistance = () => track.scrollWidth - section.clientWidth;
//       const xForIndex = (i) => -(getDistance() * i) / (CARDS.length - 1);
//       const sectionTop = () => section.getBoundingClientRect().top + window.scrollY;

//       function goTo(newIndex) {
//         if (animating || newIndex === index || newIndex < 0 || newIndex > CARDS.length - 1) return;
//         animating = true;
//         index = newIndex;
//         setActiveIndex(index);
//         gsap.to(track, {
//           x: xForIndex(index),
//           duration: reduce ? 0 : 0.6,
//           ease: "power3.inOut",
//           onComplete: () => { animating = false; },
//         });
//       }

//       // Fully disables real scrolling and snaps the section to align with
//       // the viewport. Once this runs, native scroll position can't move
//       // at all — so a fast fling/momentum-scroll has nothing to race
//       // past. Every card change from here on is driven only by our own
//       // goTo() calls.
//       function lockAt(startIndex) {
//         locked = true;
//         index = startIndex;
//         setActiveIndex(index);
//         gsap.set(track, { x: xForIndex(index) });
//         window.scrollTo({ top: sectionTop(), behavior: "auto" });
//         document.documentElement.style.overflow = "hidden";
//         document.body.style.overflow = "hidden";
//       }

//       function unlock() {
//         locked = false;
//         releasedAt = Date.now();
//         document.documentElement.style.overflow = "";
//         document.body.style.overflow = "";
//       }

//       function onWheel(e) {
//         if (!locked) return;

//         if (wheelBusy) {
//           e.preventDefault();
//           // Keep extending the "gesture still going" window as long as
//           // events keep arriving — a long trackpad momentum-fling stays
//           // classified as ONE gesture instead of resetting mid-flight.
//           clearTimeout(wheelGapTimer);
//           wheelGapTimer = setTimeout(() => { wheelBusy = false; }, 150);
//           return;
//         }

//         wheelBusy = true;
//         wheelGapTimer = setTimeout(() => { wheelBusy = false; }, 150);

//         if (e.deltaY > 0) {
//           if (index < CARDS.length - 1) {
//             e.preventDefault();
//             goTo(index + 1);
//           } else {
//             unlock();
//           }
//         } else if (e.deltaY < 0) {
//           if (index > 0) {
//             e.preventDefault();
//             goTo(index - 1);
//           } else {
//             unlock();
//           }
//         }
//       }

//       function onTouchStart(e) {
//         if (!locked) return;
//         touchStartY = e.touches[0].clientY;
//         touchStartX = e.touches[0].clientX;
//         touchConsumed = false;
//       }

//       function onTouchMove(e) {
//         if (!locked || touchStartY === null || touchConsumed) return;

//         const dy = touchStartY - e.touches[0].clientY;
//         const dx = touchStartX - e.touches[0].clientX;
//         if (Math.abs(dx) > Math.abs(dy)) return;

//         const threshold = 45;
//         if (Math.abs(dy) < threshold) { e.preventDefault(); return; }

//         // Fire once for this entire touch, then go inert until
//         // touchend — no re-anchoring, so continuing to drag the same
//         // finger further can't trigger a second card.
//         touchConsumed = true;

//         if (dy > 0) {
//           if (index < CARDS.length - 1) {
//             e.preventDefault();
//             goTo(index + 1);
//           } else {
//             unlock();
//           }
//         } else {
//           if (index > 0) {
//             e.preventDefault();
//             goTo(index - 1);
//           } else {
//             unlock();
//           }
//         }
//       }

//       function onTouchEnd() {
//         touchStartY = null;
//         touchStartX = null;
//         touchConsumed = false;
//       }

//       window.addEventListener("wheel", onWheel, { passive: false });
//       window.addEventListener("touchstart", onTouchStart, { passive: true });
//       window.addEventListener("touchmove", onTouchMove, { passive: false });
//       window.addEventListener("touchend", onTouchEnd);

//       // IntersectionObserver samples actual visibility once per frame —
//       // unlike touchmove/wheel, it can't be "skipped" by a fast fling,
//       // because it doesn't depend on the size of the scroll delta between
//       // checks, only on whether the section was visible at each check.
//       const io = new IntersectionObserver(
//         (entries) => {
//           const entry = entries[0];
//           const currentY = window.scrollY;
//           const scrollingDown = currentY > lastScrollY;
//           lastScrollY = currentY;

//           // Cooldown so the observer doesn't instantly re-lock the
//           // section right as we're intentionally releasing out of it.
//           if (Date.now() - releasedAt < 400) return;

//           if (entry.isIntersecting && !locked) {
//             lockAt(scrollingDown ? 0 : CARDS.length - 1);
//           }
//         },
//         { threshold: 0 }
//       );
//       io.observe(section);

//       return () => {
//         clearTimeout(wheelGapTimer);
//         io.disconnect();
//         window.removeEventListener("wheel", onWheel);
//         window.removeEventListener("touchstart", onTouchStart);
//         window.removeEventListener("touchmove", onTouchMove);
//         window.removeEventListener("touchend", onTouchEnd);
//         document.documentElement.style.overflow = "";
//         document.body.style.overflow = "";
//         gsap.set(track, { x: 0 });
//         setActiveIndex(0);
//       };
//     });

//     return () => mm.revert();
//   }, []);

//   return (
//     <section
//       id="why-choose-us"
//       ref={sectionRef}
//       className="relative overflow-hidden px-0 py-28 md:overflow-visible md:px-[8vw]"
//     >
//       <h2 className="mb-14 px-[8vw] text-center font-display text-3xl font-bold tracking-tight text-ivory md:px-0 md:text-4xl">
//         Why Choose Us
//       </h2>

//       {/* mobile: scroll-locked, one-card-at-a-time carousel — full
//           viewport-width cards, stepped exactly one card per gesture via
//           the wheel/touch handlers above, regardless of scroll speed.
//           desktop: original grid, untouched. */}
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
//     </section>
//   );
// }

// export default WhyChooseUs;
"use client";

import { useRef, useState, useLayoutEffect } from "react";
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
  const cardWrapRefs = useRef([]);
  // -1, not 0: this is only ever meant to mark the "current" card in the
  // MOBILE carousel (set explicitly via setActiveIndex inside the
  // matchMedia("(max-width: 767px)") block below). On desktop that block
  // never runs, so this state never changes — starting it at 0 meant
  // card index 0 permanently satisfied `i === activeIndex` and got stuck
  // in its "active" (hover-forced-open) look with no way to leave it,
  // regardless of actual mouse position. -1 can never match a real card
  // index, so desktop cards are only ever driven by real :hover.
  const [activeIndex, setActiveIndex] = useState(-1);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // ---- carousel state ----
      let index = 0;
      let animating = false;   // true only while the GSAP tween is running
      let locked = false;      // true while native scroll is disabled
      let lastScrollY = window.scrollY;
      let releasedAt = 0;

      // ---- gesture-level locks (this is what caps it at exactly one
      // card per gesture, independent of how long the tween takes or how
      // long the physical scroll/swipe lasts) ----
      let wheelBusy = false;
      let wheelGapTimer = null;
      let touchStartY = null;
      let touchStartX = null;
      let touchConsumed = false;

      const getDistance = () => track.scrollWidth - section.clientWidth;
      const xForIndex = (i) => -(getDistance() * i) / (CARDS.length - 1);
      const sectionTop = () => section.getBoundingClientRect().top + window.scrollY;

      function goTo(newIndex) {
        if (animating || newIndex === index || newIndex < 0 || newIndex > CARDS.length - 1) return;
        animating = true;
        index = newIndex;
        setActiveIndex(index);
        gsap.to(track, {
          x: xForIndex(index),
          duration: reduce ? 0 : 0.6,
          ease: "power3.inOut",
          onComplete: () => { animating = false; },
        });
      }

      // Fully disables real scrolling and snaps the section to align with
      // the viewport. Once this runs, native scroll position can't move
      // at all — so a fast fling/momentum-scroll has nothing to race
      // past. Every card change from here on is driven only by our own
      // goTo() calls.
      function lockAt(startIndex) {
        locked = true;
        index = startIndex;
        setActiveIndex(index);
        gsap.set(track, { x: xForIndex(index) });
        window.scrollTo({ top: sectionTop(), behavior: "auto" });
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
      }

      function unlock() {
        locked = false;
        releasedAt = Date.now();
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }

      function onWheel(e) {
        if (!locked) return;

        if (wheelBusy) {
          e.preventDefault();
          // Keep extending the "gesture still going" window as long as
          // events keep arriving — a long trackpad momentum-fling stays
          // classified as ONE gesture instead of resetting mid-flight.
          clearTimeout(wheelGapTimer);
          wheelGapTimer = setTimeout(() => { wheelBusy = false; }, 150);
          return;
        }

        wheelBusy = true;
        wheelGapTimer = setTimeout(() => { wheelBusy = false; }, 150);

        if (e.deltaY > 0) {
          if (index < CARDS.length - 1) {
            e.preventDefault();
            goTo(index + 1);
          } else {
            unlock();
          }
        } else if (e.deltaY < 0) {
          if (index > 0) {
            e.preventDefault();
            goTo(index - 1);
          } else {
            unlock();
          }
        }
      }

      function onTouchStart(e) {
        if (!locked) return;
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        touchConsumed = false;
      }

      function onTouchMove(e) {
        if (!locked || touchStartY === null || touchConsumed) return;

        const dy = touchStartY - e.touches[0].clientY;
        const dx = touchStartX - e.touches[0].clientX;
        if (Math.abs(dx) > Math.abs(dy)) return;

        const threshold = 45;
        if (Math.abs(dy) < threshold) { e.preventDefault(); return; }

        // Fire once for this entire touch, then go inert until
        // touchend — no re-anchoring, so continuing to drag the same
        // finger further can't trigger a second card.
        touchConsumed = true;

        if (dy > 0) {
          if (index < CARDS.length - 1) {
            e.preventDefault();
            goTo(index + 1);
          } else {
            unlock();
          }
        } else {
          if (index > 0) {
            e.preventDefault();
            goTo(index - 1);
          } else {
            unlock();
          }
        }
      }

      function onTouchEnd() {
        touchStartY = null;
        touchStartX = null;
        touchConsumed = false;
      }

      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);

      // IntersectionObserver samples actual visibility once per frame —
      // unlike touchmove/wheel, it can't be "skipped" by a fast fling,
      // because it doesn't depend on the size of the scroll delta between
      // checks, only on whether the section was visible at each check.
      const io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const currentY = window.scrollY;
          const scrollingDown = currentY > lastScrollY;
          lastScrollY = currentY;

          // Cooldown so the observer doesn't instantly re-lock the
          // section right as we're intentionally releasing out of it.
          if (Date.now() - releasedAt < 400) return;

          if (entry.isIntersecting && !locked) {
            lockAt(scrollingDown ? 0 : CARDS.length - 1);
          }
        },
        { threshold: 0 }
      );
      io.observe(section);

      return () => {
        clearTimeout(wheelGapTimer);
        io.disconnect();
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        gsap.set(track, { x: 0 });
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

      {/* mobile: scroll-locked, one-card-at-a-time carousel — full
          viewport-width cards, stepped exactly one card per gesture via
          the wheel/touch handlers above, regardless of scroll speed.
          desktop: original grid, untouched — activeIndex stays -1 here,
          so hover state comes purely from CSS :hover, per card. */}
      <div
        ref={trackRef}
        className="flex w-max items-stretch gap-0 px-0 md:mx-auto md:w-auto md:max-w-6xl md:grid md:grid-cols-2 md:gap-5 md:px-0 lg:grid-cols-4"
      >
        {CARDS.map((card, i) => (
          <div
            key={card.n}
            ref={(el) => (cardWrapRefs.current[i] = el)}
            className="h-[54vh] w-screen shrink-0 px-[6vw] md:h-auto md:w-auto md:shrink md:px-0"
          >
            <TiltCard card={card} active={i === activeIndex} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;