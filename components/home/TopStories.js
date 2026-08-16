// "use client";
// import { FastAverageColor } from "fast-average-color";
// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import StoryCard from "@/components/StoryCard";
// import MeshBg from "../MeshBg";

// gsap.registerPlugin(ScrollTrigger);

// const STORIES = [
//   {
//     title: "Pacific International",
//     region: "DUBAI",
//     image: "/pacific.png",
//     des: "The Members Experience lets you personalize your favorite pacific",
//     vid: "url",
//   },
//   {
//     title: "Fiable Constructions",
//     region: "INDIA",
//     image: "/fiable.png",
//     des: "The Members Experience lets you personalize your favorite Fiable",
//     vid: "url",
//   },
//   {
//     title: "RP Infra",
//     region: "INDIA",
//     image: "/RP.png",
//     des: "The Members Experience lets you personalize your favorite RP Infra",
//     vid: "url",
//   },
// ];

// function TopStories() {
//   const imgRef = useRef(null);
//   const meshRef = useRef(null);
//   const [rgb, setRgb] = useState("100,100,255");

//   const sectionRef = useRef(null);
//   const cardRefs = useRef([]);

//   useEffect(() => {
//     if (!imgRef.current) return;

//     const fac = new FastAverageColor();

//     fac.getColorAsync(imgRef.current).then((color) => {
//       setRgb(color.value.slice(0, 3).join(","));
//     });
//   }, []);

//   useEffect(() => {
//     const reduce = window.matchMedia(
//       "(prefers-reduced-motion: reduce)",
//     ).matches;
//     const cards = cardRefs.current.filter(Boolean);

//     if (reduce) {
//       gsap.set(cards, { x: 0, opacity: 1 });
//       return;
//     }

//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         cards,
//         { x: 220, opacity: 0 },
//         {
//           x: 0,
//           opacity: 1,
//           duration: 0.8,
//           ease: "power3.out",
//           stagger: 0.15,
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top 65%",
//             toggleActions: "play none none reverse",
//             invalidateOnRefresh: true, // recompute start position on refresh rather than trusting the first (possibly premature) measurement
//           },
//         },
//       );
//     }, sectionRef);

//     // Layout can still be settling when this effect first runs — a pinned
//     // section earlier on the page, web fonts loading late, or images
//     // resizing can all shift where this section actually starts, which
//     // silently throws off an already-computed trigger position. Forcing a
//     // recheck once things have genuinely settled fixes triggers firing too
//     // early (or late) relative to where the section really is.
//     const refresh = () => ScrollTrigger.refresh();
//     if (document.readyState === "complete") {
//       refresh();
//     } else {
//       window.addEventListener("load", refresh);
//     }
//     document.fonts?.ready?.then(refresh);

//     return () => {
//       window.removeEventListener("load", refresh);
//       ctx.revert();
//     };
//   }, []);
// useEffect(() => {
//     const el = meshRef.current;
//     if (!el) return; // guard: bail if the DOM node isn't mounted yet

//     const vars = [
//       '--g1-x', '--g1-y',
//       '--g2-x', '--g2-y',
//       '--g3-x', '--g3-y',
//       '--g4-x', '--g4-y',
//       '--g5-x', '--g5-y',
//       '--g6-x', '--g6-y',
//     ];

//     const tweens = vars.map((v) =>
//       gsap.to(el, {
//         [v]: `${Math.random() * 80 + 10}%`,
//         duration: gsap.utils.random(8, 16),
//         repeat: -1,
//         yoyo: true,
//         ease: 'sine.inOut',
//       })
//     );

//     // cleanup on unmount — kills all 12 tweens
//     return () => tweens.forEach((t) => t.kill());
//   }, []);
//   return (
//     <section
//       ref={sectionRef}
//       id="top-stories"
//       className="relative px-[8vw] py-28 h-screen overflow-hidden bg-white/28"
//     >
//       <MeshBg />
//       <h2 className="mb-14 text-center font-display text-3xl font-bold tracking-tight text-ivory md:text-4xl">
//         Top Stories
//       </h2>
//       <div className="mx-auto flex max-w-4xl gap-14 ">
//         {STORIES.map((story, i) => (
//           <div key={story.title} ref={(el) => (cardRefs.current[i] = el)}>
//             <StoryCard story={story} />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default TopStories;

"use client";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StoryCard from "@/components/StoryCard";
import MeshBg from "../MeshBg";

gsap.registerPlugin(ScrollTrigger);

const STORIES = [
  {
    title: "Pacific International",
    region: "DUBAI",
    image: "/pacific.png",
    des: "The Members Experience lets you personalize your favorite pacific",
    vid: "url",
  },
  {
    title: "Fiable Constructions",
    region: "INDIA",
    image: "/fiable.png",
    des: "The Members Experience lets you personalize your favorite Fiable",
    vid: "url",
  },
  {
    title: "RP Infra",
    region: "INDIA",
    image: "/RP.png",
    des: "The Members Experience lets you personalize your favorite RP Infra",
    vid: "url",
  },
];

function TopStories() {
  const imgRef = useRef(null);
  const meshRef = useRef(null);
  const [rgb, setRgb] = useState("100,100,255");

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  // -1, not 0: only ever set for real by the mobile carousel below (see
  // the WhyChooseUs fix — starting this at a real index makes card 0
  // permanently "active" on desktop where the carousel logic never
  // runs). Not currently used for a hover-style highlight here like
  // WhyChooseUs, but keeping the same convention in case StoryCard ever
  // wants an `active` prop.
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!imgRef.current) return;

    const fac = new FastAverageColor();

    fac.getColorAsync(imgRef.current).then((color) => {
      setRgb(color.value.slice(0, 3).join(","));
    });
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const mm = gsap.matchMedia();

    // Desktop-only: the "fly in from the right" reveal. This animates
    // each card's own x — which is exactly the property the mobile
    // carousel below needs to drive on the shared track — so it's gated
    // out of mobile entirely instead of fighting the carousel for
    // control of the same transform.
    mm.add("(min-width: 768px)", () => {
      const cards = cardRefs.current.filter(Boolean);

      if (reduce) {
        gsap.set(cards, { x: 0, opacity: 1 });
        return;
      }

      const ctx = gsap.context(() => {
        gsap.fromTo(
          cards,
          { x: 220, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          },
        );
      }, sectionRef);

      return () => ctx.revert();
    });

    // Mobile: scroll-locked, one-card-at-a-time carousel — identical
    // pattern to WhyChooseUs. Native scroll is fully disabled the moment
    // the section comes into view (via IntersectionObserver, which can't
    // be "skipped" by a fast fling the way discrete wheel/touch events
    // can), so every card change is driven only by our own goTo() calls,
    // exactly one per gesture, no matter how hard or how long the user
    // scrolls/swipes.
    mm.add("(max-width: 767px)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      gsap.set(cardRefs.current.filter(Boolean), { x: 0, opacity: 1 });

      let index = 0;
      let animating = false;
      let locked = false;
      let lastScrollY = window.scrollY;
      let releasedAt = 0;

      let wheelBusy = false;
      let wheelGapTimer = null;
      let touchStartY = null;
      let touchStartX = null;
      let touchConsumed = false;

      const getDistance = () => track.scrollWidth - section.clientWidth;
      const xForIndex = (i) => -(getDistance() * i) / (STORIES.length - 1);
      const sectionTop = () => section.getBoundingClientRect().top + window.scrollY;

      function goTo(newIndex) {
        if (animating || newIndex === index || newIndex < 0 || newIndex > STORIES.length - 1) return;
        animating = true;
        index = newIndex;
        setActiveIndex(index);
        gsap.to(track, {
          x: xForIndex(index),
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => { animating = false; },
        });
      }

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
          clearTimeout(wheelGapTimer);
          wheelGapTimer = setTimeout(() => { wheelBusy = false; }, 150);
          return;
        }

        wheelBusy = true;
        wheelGapTimer = setTimeout(() => { wheelBusy = false; }, 150);

        if (e.deltaY > 0) {
          if (index < STORIES.length - 1) {
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

        touchConsumed = true;

        if (dy > 0) {
          if (index < STORIES.length - 1) {
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

      const io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const currentY = window.scrollY;
          const scrollingDown = currentY > lastScrollY;
          lastScrollY = currentY;

          if (Date.now() - releasedAt < 400) return;

          if (entry.isIntersecting && !locked) {
            lockAt(scrollingDown ? 0 : STORIES.length - 1);
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

    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }
    document.fonts?.ready?.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  useEffect(() => {
    const el = meshRef.current;
    if (!el) return;

    const vars = [
      '--g1-x', '--g1-y',
      '--g2-x', '--g2-y',
      '--g3-x', '--g3-y',
      '--g4-x', '--g4-y',
      '--g5-x', '--g5-y',
      '--g6-x', '--g6-y',
    ];

    const tweens = vars.map((v) =>
      gsap.to(el, {
        [v]: `${Math.random() * 80 + 10}%`,
        duration: gsap.utils.random(8, 16),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    );

    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top-stories"
      className="relative px-0 py-28 h-screen overflow-hidden bg-white/28 md:px-[8vw]"
    >
      <MeshBg />
      <h2 className="mb-14 px-[8vw] text-center font-display text-3xl font-bold tracking-tight text-ivory md:px-0 md:text-4xl">
        Top Stories
      </h2>

      {/* mobile: scroll-locked, one-card-at-a-time carousel — full
          viewport-width cards, stepped exactly one card per gesture,
          same pattern as WhyChooseUs.
          desktop: original centered flex row, untouched. */}
      <div
        ref={trackRef}
        className="flex w-max items-stretch gap-0 px-0 md:mx-auto md:w-auto md:max-w-4xl md:gap-14"
      >
        {STORIES.map((story, i) => (
          <div
            key={story.title}
            ref={(el) => (cardRefs.current[i] = el)}
            className="w-screen shrink-0 px-[6vw] md:w-auto md:shrink md:px-0"
          >
            <StoryCard story={story} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopStories;