"use client";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import StoryCard from "@/components/StoryCard";

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

const STORIES = [
  { logo: "url", title: "Pacific International", region: "DUBAI", image: "/pacific.png", des: "The Members Experience lets you personalize your favorite pacific", vid: "url" },
  { logo: "url", title: "Fiable Constructions", region: "INDIA", image: "/fiable.png", des: "The Members Experience lets you personalize your favorite Fiable", vid: "url" },
  { logo: "url", title: "RP Infra", region: "INDIA", image: "/RP.png", des: "The Members Experience lets you personalize your favorite RP Infra", vid: "url" },
  { logo: "url", title: "Pacific International", region: "DUBAI", image: "/pacific.png", des: "The Members Experience lets you personalize your favorite pacific", vid: "url" },
  { logo: "url", title: "Fiable Constructions", region: "INDIA", image: "/fiable.png", des: "The Members Experience lets you personalize your favorite Fiable", vid: "url" },
  { logo: "url", title: "RP Infra", region: "INDIA", image: "/RP.png", des: "The Members Experience lets you personalize your favorite RP Infra", vid: "url" },
];

const CLOSE_DURATION = 0.9;
const OPEN_DURATION = 0.7;

function DetailOverlay({
  activeStory, detailRef, bgRef, detailImgRef, detailImgTagRef,
  detailScrollRef, textRef, onScroll, onClose,
}) {
  return (
    // z-40, not z-50 — must stay BELOW the navbar's own z-index so the
    // navbar remains visible and clickable while this is open
    <div ref={detailRef} className="fixed inset-0 z-40" style={{ visibility: "hidden" }}>
      <div ref={bgRef} className="absolute inset-0 bg-[#8A7198]" />
      <div
        ref={detailImgRef}
        className="fixed top-24 right-[8vw] w-[38vw] h-[46vh] rounded-lg overflow-hidden z-10"
      >
        <img ref={detailImgTagRef} src={activeStory.image} className="h-full w-full object-cover" />
      </div>
      {/* pt-32 pushes content below a ~navbar-height area so it never
          starts underneath the fixed navbar */}
      <div
        ref={detailScrollRef}
        onScroll={onScroll}
        className="relative z-20 h-full w-full overflow-y-auto px-[8vw] pt-32 pb-16"
      >
        <div ref={textRef} className="max-w-xl">
          <h2 className="mt-4 font-display text-5xl font-semibold text-ivory">{activeStory.title}</h2>
          <p className="mt-2 font-display text-2xl italic text-ivory/70">members experience</p>
          <p className="mt-8 text-base leading-8 text-ivory/70">{activeStory.des}</p>
          <p className="mt-6 text-xs tracking-[0.35em] text-ivory/30">REGION</p>
          <p className="mt-2 text-sm text-ivory/40">{activeStory.region}</p>
          <button onClick={onClose} className="mt-16 text-sm text-ivory/60 underline">
            ← Back to case studies
          </button>
        </div>
        <div className="h-[70vh]" />
      </div>
    </div>
  );
}

function CaseStudies() {
  const imgRef = useRef(null);
  const [rgb, setRgb] = useState("100,100,255");

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  const stRef = useRef(null);
  const detailRef = useRef(null);
  const bgRef = useRef(null);
  const detailImgRef = useRef(null);
  const detailImgTagRef = useRef(null);
  const detailScrollRef = useRef(null);
  const textRef = useRef(null);

  const [selected, setSelected] = useState(null);
  const [activeStory, setActiveStory] = useState(STORIES[0]);
  const [mounted, setMounted] = useState(false);

  const animatingRef = useRef(false);
  const scrollLockY = useRef(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!imgRef.current) return;
    const fac = new FastAverageColor();
    fac.getColorAsync(imgRef.current).then((color) => {
      setRgb(color.value.slice(0, 3).join(","));
    });
  }, []);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = cardRefs.current.filter(Boolean);
    const track = trackRef.current;
    const section = sectionRef.current;

    if (!track || !section) return;

    ScrollTrigger.getAll()
      .filter((st) => st.trigger === section)
      .forEach((st) => st.kill());

    if (reduce) {
      gsap.set(cards, { opacity: 1 });
      return;
    }

    gsap.set(cards, { opacity: 0, x: 80 });

    const getScrollDistance = () => track.scrollWidth - section.clientWidth;

    const horizontalTween = gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: "none",
    });

    stRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${getScrollDistance()}`,
      pin: true,
      scrub: 1,
      animation: horizontalTween,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.to(cards, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 });
      },
      onEnterBack: () => {
        gsap.to(cards, { opacity: 1, x: 0, duration: 0.4 });
      },
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
    };
  }, { scope: sectionRef });

  // Freeze scroll WITHOUT touching the ScrollTrigger/pin at all — the pinned
  // grid stays exactly where it is, so card positions never shift mid-transition
  const lockScroll = () => {
    scrollLockY.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollLockY.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
  };

  const unlockScroll = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    window.scrollTo(0, scrollLockY.current);
  };

const openCard = (i) => {
  if (animatingRef.current) return;
  const cardEl = cardRefs.current[i];
  const imgEl = cardEl?.querySelector("[data-flip-img]");
  if (!imgEl) return;

  animatingRef.current = true;

  gsap.killTweensOf([detailImgRef.current, bgRef.current, textRef.current]);
  Flip.killFlipsOf(detailImgRef.current);

  // reset any leftover inline styles from a previous close's absolute:true
  // Flip.fit, so this element's natural CSS position (fixed top-24 right-[8vw]
  // w-[38vw] h-[46vh]) is what gets measured as the destination — not
  // wherever the last card happened to leave it
  gsap.set(detailImgRef.current, { clearProps: "all" });

  const state = Flip.getState(imgEl);

  setActiveStory(STORIES[i]);
  setSelected(i);
  if (detailImgTagRef.current) detailImgTagRef.current.src = STORIES[i].image;

  lockScroll();

  requestAnimationFrame(() => {
    if (!detailImgRef.current) return;

    gsap.set(detailRef.current, { autoAlpha: 1, pointerEvents: "auto" });
    gsap.set(bgRef.current, { opacity: 1 });
    gsap.set(textRef.current, { opacity: 0, y: 24 });
    if (detailScrollRef.current) detailScrollRef.current.scrollTop = 0;

    Flip.from(state, {
      targets: detailImgRef.current,
      duration: OPEN_DURATION,
      ease: "power3.inOut",
      absolute: true,
      scale: true,
      onComplete: () => { animatingRef.current = false; },
    });

    gsap.to(textRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power2.out" });
  });
};

const closeCard = () => {
  if (selected === null || animatingRef.current) return;
  animatingRef.current = true;

  const i = selected;
  const cardEl = cardRefs.current[i];
  const cardImgEl = cardEl?.querySelector("[data-flip-img]");
  const detailImgEl = detailImgRef.current;

  if (!cardImgEl || !detailImgEl) {
    setSelected(null);
    animatingRef.current = false;
    unlockScroll();
    return;
  }

  gsap.set(detailRef.current, { pointerEvents: "none" });
  gsap.killTweensOf([detailImgEl, bgRef.current, textRef.current]);
  Flip.killFlipsOf(detailImgEl);

  gsap.to(textRef.current, { opacity: 0, y: 24, duration: 0.3, ease: "power2.in" });
  gsap.to(bgRef.current, { opacity: 0, duration: CLOSE_DURATION, ease: "power2.inOut" });

  Flip.fit(detailImgEl, cardImgEl, {
    duration: CLOSE_DURATION,
    ease: "power3.inOut",
    scale: true,
    absolute: true,
    onComplete: () => {
      gsap.set(detailRef.current, { autoAlpha: 0 });
      // also clear cardImgEl defensively — Flip.fit shouldn't touch the
      // "to" target, but this guarantees no residue can ever accumulate
      // on the grid card itself either
      gsap.set(cardImgEl, { clearProps: "transform" });
      setSelected(null);
      animatingRef.current = false;
      unlockScroll();
    },
  });
};


  const handleDetailScroll = (e) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) closeCard();
  };

  return (
    <section
      ref={sectionRef}
      id="top-stories"
      className="relative bg-[#8A7198] px-[8vw] py-28 h-screen overflow-hidden"
    >
      <div ref={trackRef} className="flex max-w-none gap-14 w-max pr-72 pt-14">
        {STORIES.map((s, i) => (
          <StoryCard key={i} story={s} ref={(el) => (cardRefs.current[i] = el)} onOpen={() => openCard(i)} />
        ))}
      </div>

      {mounted &&
        createPortal(
          <DetailOverlay
            activeStory={activeStory}
            detailRef={detailRef}
            bgRef={bgRef}
            detailImgRef={detailImgRef}
            detailImgTagRef={detailImgTagRef}
            detailScrollRef={detailScrollRef}
            textRef={textRef}
            onScroll={handleDetailScroll}
            onClose={closeCard}
          />,
          document.body
        )}
    </section>
  );
}

export default CaseStudies;