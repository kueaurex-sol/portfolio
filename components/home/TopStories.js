"use client";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StoryCard from "@/components/StoryCard";

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
  const [rgb, setRgb] = useState("100,100,255");

  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

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
            invalidateOnRefresh: true, // recompute start position on refresh rather than trusting the first (possibly premature) measurement
          },
        },
      );
    }, sectionRef);

    // Layout can still be settling when this effect first runs — a pinned
    // section earlier on the page, web fonts loading late, or images
    // resizing can all shift where this section actually starts, which
    // silently throws off an already-computed trigger position. Forcing a
    // recheck once things have genuinely settled fixes triggers firing too
    // early (or late) relative to where the section really is.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }
    document.fonts?.ready?.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top-stories"
      className="relative bg-[#8A7198] px-[8vw] py-28 h-screen overflow-hidden"
    >
      <h2 className="mb-14 text-center font-display text-3xl font-bold tracking-tight text-ivory md:text-4xl">
        Top Stories
      </h2>
      <div className="mx-auto flex max-w-4xl gap-14 ">
        {STORIES.map((story, i) => (
          <div key={story.title} ref={(el) => (cardRefs.current[i] = el)}>
            <StoryCard story={story} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopStories;
