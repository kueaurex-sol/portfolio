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
//   const trackRef = useRef(null);
//   const cardRefs = useRef([]);
//   // -1, not 0: only ever set for real by the mobile carousel below (see
//   // the WhyChooseUs fix — starting this at a real index makes card 0
//   // permanently "active" on desktop where the carousel logic never
//   // runs). Not currently used for a hover-style highlight here like
//   // WhyChooseUs, but keeping the same convention in case StoryCard ever
//   // wants an `active` prop.
//   const [activeIndex, setActiveIndex] = useState(-1);

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

//     const mm = gsap.matchMedia();

//     // Desktop-only: the "fly in from the right" reveal. This animates
//     // each card's own x — which is exactly the property the mobile
//     // carousel below needs to drive on the shared track — so it's gated
//     // out of mobile entirely instead of fighting the carousel for
//     // control of the same transform.
//     mm.add("(min-width: 768px)", () => {
//       const cards = cardRefs.current.filter(Boolean);

//       if (reduce) {
//         gsap.set(cards, { x: 0, opacity: 1 });
//         return;
//       }

//       const ctx = gsap.context(() => {
//         gsap.fromTo(
//           cards,
//           { x: 220, opacity: 0 },
//           {
//             x: 0,
//             opacity: 1,
//             duration: 0.8,
//             ease: "power3.out",
//             stagger: 0.15,
//             scrollTrigger: {
//               trigger: sectionRef.current,
//               start: "top 65%",
//               toggleActions: "play none none reverse",
//               invalidateOnRefresh: true,
//             },
//           },
//         );
//       }, sectionRef);

//       return () => ctx.revert();
//     });

//     // Mobile: scroll-locked, one-card-at-a-time carousel — identical
//     // pattern to WhyChooseUs. Native scroll is fully disabled the moment
//     // the section comes into view (via IntersectionObserver, which can't
//     // be "skipped" by a fast fling the way discrete wheel/touch events
//     // can), so every card change is driven only by our own goTo() calls,
//     // exactly one per gesture, no matter how hard or how long the user
//     // scrolls/swipes.
//     mm.add("(max-width: 767px)", () => {
//       const section = sectionRef.current;
//       const track = trackRef.current;
//       if (!section || !track) return;

//       gsap.set(cardRefs.current.filter(Boolean), { x: 0, opacity: 1 });

//       let index = 0;
//       let animating = false;
//       let locked = false;
//       let lastScrollY = window.scrollY;
//       let releasedAt = 0;

//       let wheelBusy = false;
//       let wheelGapTimer = null;
//       let touchStartY = null;
//       let touchStartX = null;
//       let touchConsumed = false;

//       const getDistance = () => track.scrollWidth - section.clientWidth;
//       const xForIndex = (i) => -(getDistance() * i) / (STORIES.length - 1);
//       const sectionTop = () => section.getBoundingClientRect().top + window.scrollY;

//       function goTo(newIndex) {
//         if (animating || newIndex === index || newIndex < 0 || newIndex > STORIES.length - 1) return;
//         animating = true;
//         index = newIndex;
//         setActiveIndex(index);
//         gsap.to(track, {
//           x: xForIndex(index),
//           duration: 0.6,
//           ease: "power3.inOut",
//           onComplete: () => { animating = false; },
//         });
//       }

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
//           clearTimeout(wheelGapTimer);
//           wheelGapTimer = setTimeout(() => { wheelBusy = false; }, 150);
//           return;
//         }

//         wheelBusy = true;
//         wheelGapTimer = setTimeout(() => { wheelBusy = false; }, 150);

//         if (e.deltaY > 0) {
//           if (index < STORIES.length - 1) {
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

//         touchConsumed = true;

//         if (dy > 0) {
//           if (index < STORIES.length - 1) {
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

//       const io = new IntersectionObserver(
//         (entries) => {
//           const entry = entries[0];
//           const currentY = window.scrollY;
//           const scrollingDown = currentY > lastScrollY;
//           lastScrollY = currentY;

//           if (Date.now() - releasedAt < 400) return;

//           if (entry.isIntersecting && !locked) {
//             lockAt(scrollingDown ? 0 : STORIES.length - 1);
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
//         setActiveIndex(-1);
//       };
//     });

//     const refresh = () => ScrollTrigger.refresh();
//     if (document.readyState === "complete") {
//       refresh();
//     } else {
//       window.addEventListener("load", refresh);
//     }
//     document.fonts?.ready?.then(refresh);

//     return () => {
//       window.removeEventListener("load", refresh);
//       mm.revert();
//     };
//   }, []);

//   useEffect(() => {
//     const el = meshRef.current;
//     if (!el) return;

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

//     return () => tweens.forEach((t) => t.kill());
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       id="top-stories"
//       className="relative px-0 py-28 h-screen overflow-hidden bg-white/28 md:px-[8vw]"
//     >
//       <MeshBg />
//       <h2 className="mb-14 px-[8vw] text-center font-display text-3xl font-bold tracking-tight text-ivory md:px-0 md:text-4xl">
//         Top Stories
//       </h2>

//       {/* mobile: scroll-locked, one-card-at-a-time carousel — full
//           viewport-width cards, stepped exactly one card per gesture,
//           same pattern as WhyChooseUs.
//           desktop: original centered flex row, untouched. */}
//       <div
//         ref={trackRef}
//         className="flex w-max items-stretch gap-0 px-0 md:mx-auto md:w-auto md:max-w-4xl md:gap-14"
//       >
//         {STORIES.map((story, i) => (
//           <div
//             key={story.title}
//             ref={(el) => (cardRefs.current[i] = el)}
//             className="w-screen shrink-0 px-[6vw] md:w-auto md:shrink md:px-0"
//           >
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
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StoryCard from "@/components/StoryCard";
import MeshBg from "../MeshBg";

gsap.registerPlugin(ScrollTrigger);

const STORIES = [
  {
    logo: "url",
    title: "Pacific International",
    region: "DUBAI",
    image: "/pacific.png",
    des: "The Members Experience lets you personalize your favorite pacific",
    vid: "url",
    projectScope:"Business portfolio, services showcasing, and an online client enquiry system through the website.",
    problem:"Pacific International lacked a centralized, modern digital presence to effectively showcase their global service capabilities. Their existing communication channels resulted in fragmented, manual customer inquiries, making it difficult to capture, track, and qualify high-value business leads efficiently.",
    solution:"We engineered a sleek, high-performance business portfolio website designed to clearly categorize and showcase their full suite of services. The platform was integrated with a custom, secure online client enquiry system featuring automated routing. This streamlined lead capture, reduced response times, and provided a seamless user experience for prospective B2B clients.",
    testimonial:'"The new platform completely transformed how we present our business to the world. The automated enquiry system has significantly cut down our administrative overhead and allowed our team to respond to high-priority leads faster than ever before." — Management Team, Pacific International',
    websiteLink: "https://pacificinternationalservices.com/"
  },
  {
    logo: "url",
    title: "Fiable Constructions",
    region: "INDIA",
    image: "/fiable.png",
    des: "The Members Experience lets you personalize your favorite Fiable",
    vid: "url",
     projectScope:"Business portfolio, services showcasing, online client enquiry system through the website, dynamic projects adding system, SEO optimization, and growth marketing.",
    problem:"Fiable Constructions needed a way to highlight their growing portfolio of completed and ongoing projects without constantly relying on developers for manual site updates. Furthermore, low search engine visibility and a lack of structured digital marketing meant they were missing out on valuable local commercial and residential construction leads.",
    solution:"We developed a robust, scalable digital ecosystem featuring a dynamic dynamic projects adding system (CMS), allowing their team to upload new case studies, images, and milestones on the fly. To drive traffic, we implemented an aggressive on-page and technical SEO optimization strategy combined with data-backed growth marketing campaigns, funneling high-intent traffic directly into a custom online client enquiry system.",
    testimonial:'"Having the ability to showcase our new construction projects instantly has given us a massive competitive edge. Combined with the SEO boost and growth marketing strategies, our inbound project inquiries have increased dramatically." — Director, Fiable Constructions',
    websiteLink: "https://www.fiableconstructions.com/"
  },
  {
    logo: "url",
    title: "RP Infra",
    region: "INDIA",
    image: "/RP.png",
    des: "The Members Experience lets you personalize your favorite RP Infra",
    vid: "url",
     projectScope:"",
    problem:"",
    solution:"",
    testimonial:"",
    websiteLink: ""
  },
];

const AUTOPLAY_MS = 9000;
// How far the "drag" shear leans before the card settles flat.
const SKEW_ANGLE = 14;

// Small circular button, purple outline + purple arrow, transparent fill.
// dir="prev" mirrors the arrow horizontally instead of needing a second SVG.
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

function TopStories() {
  const imgRef = useRef(null);
  const meshRef = useRef(null);
  const [rgb, setRgb] = useState("100,100,255");

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  // Same convention as WhyChooseUs: activeIndex only means "card is the
  // current mobile slide" and stays -1 on desktop, where it's unused.
  const [activeIndex, setActiveIndex] = useState(-1);

  // Mobile carousel index — mirrors WhyChooseUs exactly.
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const timerRef = useRef(null);
  const isMobileRef = useRef(false);

  useEffect(() => {
    if (!imgRef.current) return;

    const fac = new FastAverageColor();

    fac.getColorAsync(imgRef.current).then((color) => {
      setRgb(color.value.slice(0, 3).join(","));
    });
  }, []);

  const getDistance = () => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return 0;
    return track.scrollWidth - section.clientWidth;
  };
  const xForIndex = (i) => -(getDistance() * i) / (STORIES.length - 1);

  // direction: "next" | "prev" — controls which way the card leans as it
  // drags in. transform-origin is pinned to the bottom edge (set once, on
  // mount) so skewX only ever shifts things sideways.
  const goTo = (newIndex, direction = "next", { reduce = false } = {}) => {
    if (!isMobileRef.current) return;
    const clamped = ((newIndex % STORIES.length) + STORIES.length) % STORIES.length;
    if (animatingRef.current || clamped === mobileIndexRef.current) return;

    animatingRef.current = true;
    mobileIndexRef.current = clamped;
    setMobileIndex(clamped);
    setActiveIndex(clamped);

    const track = trackRef.current;
    const angle = direction === "next" ? SKEW_ANGLE : -SKEW_ANGLE;

    if (reduce) {
      gsap.set(track, { x: xForIndex(clamped), skewX: 0 });
      animatingRef.current = false;
      return;
    }

    gsap
      .timeline({
        onComplete: () => {
          animatingRef.current = false;
        },
      })
      .to(track, { skewX: -angle * 0.22, duration: 0.06, ease: "sine.out" }, 0)
      .to(track, { skewX: angle, duration: 0.14, ease: "power1.out" }, 0.06)
      .to(track, { x: xForIndex(clamped), duration: 0.6, ease: "power3.inOut" }, 0)
      .to(track, { skewX: 0, duration: 0.75, ease: "elastic.out(1, 0.32)" }, 0.2);
  };

  const resetAutoplay = () => {
    clearInterval(timerRef.current);
    if (!isMobileRef.current) return;
    timerRef.current = setInterval(() => {
      goTo(mobileIndexRef.current + 1, "next");
    }, AUTOPLAY_MS);
  };

  const handlePrev = () => {
    goTo(mobileIndexRef.current - 1, "prev");
    resetAutoplay();
  };

  const handleNext = () => {
    goTo(mobileIndexRef.current + 1, "next");
    resetAutoplay();
  };

  useLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const mm = gsap.matchMedia();

    // Desktop-only: the "fly in from the right" reveal — unchanged.
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

    // Mobile: plain autoplaying carousel — same pattern as WhyChooseUs.
    // No scroll-lock, no wheel/touch hijacking; the track animates via
    // GSAP to the current mobileIndex's x position, advanced either by
    // the AUTOPLAY_MS interval or the two circular buttons below.
    mm.add("(max-width: 767px)", () => {
      isMobileRef.current = true;

      mobileIndexRef.current = 0;
      setMobileIndex(0);
      setActiveIndex(0);
      gsap.set(trackRef.current, { x: 0, skewX: 0, transformOrigin: "50% 100%" });

      resetAutoplay();

      return () => {
        isMobileRef.current = false;
        clearInterval(timerRef.current);
        gsap.set(trackRef.current, { x: 0, skewX: 0, transformOrigin: "50% 100%" });
        setActiveIndex(-1);
        setMobileIndex(0);
        mobileIndexRef.current = 0;
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

  // Recompute position on resize — snaps instantly to the current index
  // rather than animating.
  useEffect(() => {
    const handleResize = () => {
      if (!isMobileRef.current) return;
      gsap.set(trackRef.current, { x: xForIndex(mobileIndexRef.current), skewX: 0 });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => () => clearInterval(timerRef.current), []);

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
      className="relative overflow-hidden px-0 py-28 md:overflow-visible md:px-[8vw]"
    >
      <MeshBg />
      <h2 className="mb-14 px-[8vw] text-center font-display text-3xl font-bold tracking-tight text-ivory md:px-0 md:text-4xl">
        Top Stories
      </h2>

      {/* mobile: plain autoplaying carousel — same mechanics as
          WhyChooseUs's track (skew-drag + AUTOPLAY_MS + buttons/dots).
          desktop: original centered flex row, untouched. */}
      <div
        ref={trackRef}
        className="flex w-max items-stretch gap-0 px-0  md:w-auto md:max-w-4xl md:gap-14"
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

      {/* mobile-only controls: circular purple-outline prev/next buttons +
          a small dot indicator row, centered below the card. */}
      <div className="mt-8 flex items-center justify-center gap-6 md:hidden">
        <CarouselButton dir="prev" onClick={handlePrev} label="Previous story" />

        <div className="flex items-center gap-2">
          {STORIES.map((story, i) => (
            <span
              key={story.title}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === mobileIndex ? "w-6 bg-violet" : "w-2 bg-violet/30"
              }`}
            />
          ))}
        </div>

        <CarouselButton dir="next" onClick={handleNext} label="Next story" />
      </div>
    </section>
  );
}

export default TopStories;