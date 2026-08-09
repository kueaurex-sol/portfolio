
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientText from "./GradientText";

gsap.registerPlugin(ScrollTrigger);

const CARD_BG = "linear-gradient(140deg, #d4a6f5 0%, #a716d6 42%, #5c0f80 100%)";

function ServiceSection({
  eyebrow,
  title,
  whatIsHeading,
  whatIsBody,
  offeringsHeading,
  offerings,
  closingHeading,
  closingBody,
}) {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = cardRefs.current.filter(Boolean);

    if (reduce) {
      gsap.set(cards, { y: 0, opacity: 1, scale: 1 });
      return;
    }

    const mm = gsap.matchMedia();

    // Same pin + fly-in-and-stack sequence at every size — only the motion
    // MAGNITUDE changes per breakpoint (smaller travel/scale delta on
    // narrow screens, where there's less room to fly through and cards
    // are visually smaller to begin with).
    mm.add(
      {
        isMobile: "(max-width: 639px)",
        isTablet: "(min-width: 640px) and (max-width: 1023px)",
        isDesktop: "(min-width: 1024px)",
      },
      (context) => {
        const { isMobile, isTablet } = context.conditions;

        const flyDistance = isMobile ? 220 : isTablet ? 340 : 480;
        const stackOffset = isMobile ? 8 : isTablet ? 12 : 16;
        const scaleStep = isMobile ? 0.015 : isTablet ? 0.02 : 0.025;
        const scrollLengthPerCard = isMobile ? 55 : isTablet ? 62 : 70;

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${cards.length * scrollLengthPerCard}%`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          cards.forEach((card, i) => {
            tl.fromTo(
              card,
              { y: flyDistance, opacity: 0, scale: 0.92 },
              {
                y: -i * stackOffset,
                opacity: 1,
                scale: 1 - i * scaleStep,
                duration: 1,
                ease: "power2.out",
              },
              i
            );
          });
        }, sectionRef);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, [offerings.length]);

  return (
    <>
      <div
        ref={sectionRef}
        className="relative flex h-[100svh] flex-col overflow-hidden border-t border-ink/10 first:border-t-0"
      >
        <div className="mx-auto w-[88vw] px-4 pt-16 text-center sm:w-[80vw] sm:px-6 sm:pt-20 lg:w-[70vw] lg:pt-24">
          <span className="mb-4 inline-block rounded-full border border-violet-dim px-3 py-1 font-mono text-[10px] tracking-[2px] text-violet sm:mb-5 sm:px-4 sm:py-1.5 sm:text-[11px] sm:tracking-[3px]">
            {eyebrow}
          </span>
          <GradientText
            colors={["#A716D6", "#D9A6F5", "#7C11A3"]}
            animationSpeed={7}
            showBorder={false}
            className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
          >
            {title}
          </GradientText>

          <div className="mx-auto mt-4 max-w-2xl space-y-2 sm:mt-6 sm:space-y-3">
            <h3 className="font-display text-sm font-semibold text-ink sm:text-base lg:text-lg">
              {whatIsHeading}
            </h3>
            <p className="text-xs leading-relaxed text-ink/65 sm:text-sm">{whatIsBody}</p>
          </div>

          <h3 className="mt-5 font-display text-base font-bold text-ink sm:mt-8 sm:text-lg lg:text-xl">
            {offeringsHeading}
          </h3>
        </div>

        {/* stacking zone: cards fly in and settle here, anchored to the bottom.
            Height/width scale down at each breakpoint so the stack fits
            comfortably within a shorter mobile viewport. */}
        <div className="relative mx-auto mt-auto h-[46%] w-[88vw] px-4 pb-6 sm:h-[42%] sm:w-[80vw] sm:px-6 sm:pb-8 lg:h-[40%] lg:w-[70vw] lg:pb-10">
          {offerings.map((o, i) => (
            <div
              key={o.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className="absolute inset-x-4 bottom-0 h-44 overflow-hidden rounded-[22px] p-5 shadow-2xl shadow-ink/25 sm:inset-x-6 sm:h-52 sm:rounded-[28px] sm:p-6 lg:h-60 lg:rounded-[32px] lg:p-8"
              style={{ zIndex: i, background: CARD_BG }}
            >
              <span className="mb-1.5 inline-block font-mono text-[10px] tracking-[2px] text-white/70 sm:mb-2 sm:text-xs">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mb-1.5 font-display text-base font-bold text-white sm:mb-2 sm:text-lg lg:text-xl">
                {o.title}
              </h4>
              <p className="line-clamp-3 text-xs leading-relaxed text-white/85 sm:line-clamp-4 sm:text-sm">
                {o.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {closingHeading && (
        <div className="mx-auto max-w-2xl px-6 py-12 text-center sm:py-16">
          <h3 className="mb-3 font-display text-lg font-semibold text-ink sm:text-xl">
            {closingHeading}
          </h3>
          <p className="text-sm leading-relaxed text-ink/65 sm:text-base">{closingBody}</p>
        </div>
      )}
    </>
  );
}

export default ServiceSection;