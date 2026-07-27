// const FAQS = [
//   {
//     n: "01",
//     q: "How do you guarantee that a complex project won't suffer from \"scope creep\" or budget overruns?",
//     a: "We mitigate this risk entirely during Phase 1 (Scoping & Strategy). Before any development contract is signed, we deliver a granular Technical Specification Document that defines exactly what is \"in scope\" and \"out of scope.\"",
//   },
//   {
//     n: "02",
//     q: "We have complex legacy software. Can you integrate newer AI models and modern apps without breaking our existing systems?",
//     a: "Absolutely. We specialize in ecosystem-wide integration — our architects build secure, middle-tier APIs and custom web hooks that extract data from your legacy databases and feed them safely into modern applications or custom AI models, so your day-to-day business continuity stays uninterrupted.",
//   },
// ];

// function Faq() {
//   return (
//     <section id="faq" className="relative bg-void px-[8vw] py-28">
//       <h2 className="mb-14 font-display text-4xl font-bold tracking-tight text-ivory">FAQ</h2>
//       <div className="mx-auto max-w-3xl space-y-10">
//         {FAQS.map((item) => (
//           <div key={item.n} className="flex gap-6 border-b border-ink/10 pb-10">
//             <span className="font-display text-4xl font-bold text-violet/60">{item.n}</span>
//             <div>
//               <p className="mb-2 font-display text-lg font-medium text-ivory">{item.q}</p>
//               <p className="text-sm leading-relaxed text-ivory/60">
//                 <span className="text-violet/80">The Answer: </span>
//                 {item.a}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Faq;
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import GradientText from "./GradientText";
import GradientText from "@/components/GradientText";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    n: "01",
    q: "How do you guarantee that a complex project won't suffer from \"scope creep\" or budget overruns?",
    a: "We mitigate this risk entirely during Phase 1 (Scoping & Strategy). Before any development contract is signed, we deliver a granular Technical Specification Document that defines exactly what is \"in scope\" and \"out of scope.\"",
  },
  {
    n: "02",
    q: "We have complex legacy software. Can you integrate newer AI models and modern apps without breaking our existing systems?",
    a: "Absolutely. We specialize in ecosystem-wide integration — our architects build secure, middle-tier APIs and custom web hooks that extract data from your legacy databases and feed them safely into modern applications or custom AI models, so your day-to-day business continuity stays uninterrupted.",
  },
  // PLACEHOLDER — replace with your real question/answer #3
  {
    n: "03",
    q: "PLACEHOLDER — replace with your real question here.",
    a: "PLACEHOLDER — replace with your real answer here.",
  },
  // PLACEHOLDER — replace with your real question/answer #4
  {
    n: "04",
    q: "PLACEHOLDER — replace with your real question here.",
    a: "PLACEHOLDER — replace with your real answer here.",
  },
  // PLACEHOLDER — replace with your real question/answer #5
  {
    n: "05",
    q: "PLACEHOLDER — replace with your real question here.",
    a: "PLACEHOLDER — replace with your real answer here.",
  },
];

function Faq() {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = itemRefs.current.filter(Boolean);

    if (reduce) {
      gsap.set(items, { opacity: 1, y: 0 });
      if (items[0]) gsap.set(items[0], { opacity: 1 });
      return;
    }

    gsap.set(items, { opacity: 0, y: 24 });

    const ctx = gsap.context(() => {
      // Pinned for the whole sequence, same pattern as the Services page.
      // Each FAQ fades in, then fades back out as the next one takes its
      // place — one visible at a time, sharing the same spot — so nothing
      // ever needs its own internal scrollbar regardless of how many FAQs
      // there are.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${items.length * 60}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      items.forEach((item, i) => {
        tl.to(item, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, i);
        if (i < items.length - 1) {
          tl.to(item, { opacity: 0, y: -24, duration: 0.4, ease: "power2.in" }, i + 0.75);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="relative flex h-screen overflow-hidden bg-void">
      {/* large rotated heading, stuck to the left edge for the whole sequence */}
      <div className="flex w-[16vw] min-w-[130px] shrink-0 items-center justify-center border-r border-ivory/10">
        <GradientText
          colors={["#A716D6", "#D9A6F5", "#7C11A3"]}
          animationSpeed={7}
          showBorder={false}
          className="-rotate-90 whitespace-nowrap font-display text-6xl font-bold tracking-tight md:text-8xl"
        >
          FAQ
        </GradientText>
      </div>

      {/* one FAQ visible at a time, cross-fading as you scroll */}
      <div className="relative flex-1 px-[6vw]">
        <div className="relative mx-auto h-80 max-w-2xl">
          {FAQS.map((item, i) => (
            <div
              key={item.n}
              ref={(el) => (itemRefs.current[i] = el)}
              className="absolute inset-0 flex flex-col justify-center gap-6"
            >
              <div className="flex gap-6">
                <span className="font-display text-3xl font-bold text-violet/60">{item.n}</span>
                <div>
                  <p className="mb-3 font-display text-xl font-medium text-ivory md:text-2xl">{item.q}</p>
                  <p className="line-clamp-5 text-sm leading-relaxed text-ivory/60 md:text-base">
                    <span className="text-violet/80">The Answer: </span>
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;