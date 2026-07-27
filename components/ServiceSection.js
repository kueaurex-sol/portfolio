// // "use client";

// // import GradientText from "./GradientText";
// // import ScrollStack, { ScrollStackItem } from "./ScrollStack";

// // function ServiceSection({ eyebrow, title, whatIsHeading, whatIsBody, offeringsHeading, offerings, closingHeading, closingBody }) {
// //   return (
// //     <div className="border-t border-ink/10 py-24 first:border-t-0 first:pt-0">
// //       <div className="mx-auto mb-14 max-w-3xl text-center">
// //         <span className="mb-5 inline-block rounded-full border border-violet-dim px-4 py-1.5 font-mono text-[11px] tracking-[3px] text-violet">
// //           {eyebrow}
// //         </span>
// //         <GradientText
// //           colors={["#A716D6", "#D9A6F5", "#7C11A3"]}
// //           animationSpeed={7}
// //           showBorder={false}
// //           className="font-display text-4xl font-bold tracking-tight md:text-5xl"
// //         >
// //           {title}
// //         </GradientText>
// //       </div>

// //       <div className="mx-auto mb-16 max-w-2xl space-y-4 text-center">
// //         <h3 className="font-display text-xl font-semibold text-ink">{whatIsHeading}</h3>
// //         <p className="leading-relaxed text-ink/65">{whatIsBody}</p>
// //       </div>

// //       <h3 className="mb-6 text-center font-display text-2xl font-bold text-ink">{offeringsHeading}</h3>

// //       <div style={{ height: "640px" }} className="rounded-[40px]">
// //         <ScrollStack baseScale={0.86} itemScale={0.03} itemDistance={70} itemStackDistance={22} stackPosition="16%" scaleEndPosition="8%">
// //           {offerings.map((o, i) => (
// //             <ScrollStackItem key={o.title}>
// //               <span className="mb-3 inline-block font-mono text-xs tracking-[2px] text-white/70">
// //                 {String(i + 1).padStart(2, "0")}
// //               </span>
// //               <h4 className="mb-2 font-display text-xl font-bold text-white">{o.title}</h4>
// //               <p className="text-sm leading-relaxed text-white/85">{o.desc}</p>
// //             </ScrollStackItem>
// //           ))}
// //         </ScrollStack>
// //       </div>

// //       {closingHeading && (
// //         <div className="mx-auto mt-16 max-w-2xl text-center">
// //           <h3 className="mb-4 font-display text-xl font-semibold text-ink">{closingHeading}</h3>
// //           <p className="leading-relaxed text-ink/65">{closingBody}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default ServiceSection;
// "use client";

// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import GradientText from "./GradientText";

// gsap.registerPlugin(ScrollTrigger);

// // Metallic-violet card treatment, matching the homepage Services cards
// const CARD_BG = "linear-gradient(140deg, #d4a6f5 0%, #a716d6 42%, #5c0f80 100%)";

// function ServiceSection({
//   eyebrow,
//   title,
//   whatIsHeading,
//   whatIsBody,
//   offeringsHeading,
//   offerings,
//   closingHeading,
//   closingBody,
// }) {
//   const sectionRef = useRef(null);
//   const cardRefs = useRef([]);

//   useLayoutEffect(() => {
//     const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     const cards = cardRefs.current.filter(Boolean);

//     if (reduce) {
//       gsap.set(cards, { y: 0, opacity: 1, scale: 1 });
//       return;
//     }

//     const ctx = gsap.context(() => {
//       // Pinned for the whole sequence: title/description stay fixed at the
//       // top the entire time. Each card flies in from below and settles
//       // into its stacked position, one after another (never overlapping —
//       // card i's tween occupies timeline slot i, so it fully finishes
//       // before card i+1 begins). Once the last card settles and the pin's
//       // scroll distance is used up, it releases naturally and the next
//       // ServiceSection's own pin takes over — no gap, no dead space.
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: `+=${cards.length * 70}%`,
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//           invalidateOnRefresh: true,
//         },
//       });

//       cards.forEach((card, i) => {
//         tl.fromTo(
//           card,
//           { y: 480, opacity: 0, scale: 0.92 },
//           { y: -i * 16, opacity: 1, scale: 1 - i * 0.025, duration: 1, ease: "power2.out" },
//           i
//         );
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, [offerings.length]);

//   return (
//     <>
//       <div
//         ref={sectionRef}
//         className="relative flex h-screen flex-col overflow-hidden border-t border-ink/10 first:border-t-0"
//       >
//         <div className="mx-auto max-w-3xl px-6 pt-24 text-center">
//           <span className="mb-5 inline-block rounded-full border border-violet-dim px-4 py-1.5 font-mono text-[11px] tracking-[3px] text-violet">
//             {eyebrow}
//           </span>
//           <GradientText
//             colors={["#A716D6", "#D9A6F5", "#7C11A3"]}
//             animationSpeed={7}
//             showBorder={false}
//             className="font-display text-4xl font-bold tracking-tight md:text-5xl"
//           >
//             {title}
//           </GradientText>

//           <div className="mx-auto mt-6 max-w-2xl space-y-3">
//             <h3 className="font-display text-lg font-semibold text-ink">{whatIsHeading}</h3>
//             <p className="text-sm leading-relaxed text-ink/65">{whatIsBody}</p>
//           </div>

//           <h3 className="mt-8 font-display text-xl font-bold text-ink">{offeringsHeading}</h3>
//         </div>

//         {/* stacking zone: cards fly in and settle here, anchored to the bottom */}
//         <div className="relative mx-auto mt-auto h-[52%] w-full max-w-xl px-6 pb-10">
//           {offerings.map((o, i) => (
//             <div
//               key={o.title}
//               ref={(el) => (cardRefs.current[i] = el)}
//               className="absolute inset-x-6 bottom-0 rounded-[32px] p-8 shadow-2xl shadow-ink/25"
//               style={{ zIndex: i, background: CARD_BG }}
//             >
//               <span className="mb-2 inline-block font-mono text-xs tracking-[2px] text-white/70">
//                 {String(i + 1).padStart(2, "0")}
//               </span>
//               <h4 className="mb-2 font-display text-xl font-bold text-white">{o.title}</h4>
//               <p className="text-sm leading-relaxed text-white/85">{o.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* normal (non-pinned) flow content — a breather between this
//           service's pin releasing and the next one engaging */}
//       {closingHeading && (
//         <div className="mx-auto max-w-2xl px-6 py-16 text-center">
//           <h3 className="mb-3 font-display text-xl font-semibold text-ink">{closingHeading}</h3>
//           <p className="leading-relaxed text-ink/65">{closingBody}</p>
//         </div>
//       )}
//     </>
//   );
// }

// export default ServiceSection;
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientText from "./GradientText";

gsap.registerPlugin(ScrollTrigger);

// Metallic-violet card treatment, matching the homepage Services cards
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

    const ctx = gsap.context(() => {
      // Pinned for the whole sequence: title/description stay fixed at the
      // top the entire time. Each card flies in from below and settles
      // into its stacked position, one after another (never overlapping —
      // card i's tween occupies timeline slot i, so it fully finishes
      // before card i+1 begins). Once the last card settles and the pin's
      // scroll distance is used up, it releases naturally and the next
      // ServiceSection's own pin takes over — no gap, no dead space.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 70}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { y: 480, opacity: 0, scale: 0.92 },
          { y: -i * 16, opacity: 1, scale: 1 - i * 0.025, duration: 1, ease: "power2.out" },
          i
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [offerings.length]);

  return (
    <>
      <div
        ref={sectionRef}
        className="relative flex h-screen flex-col overflow-hidden border-t border-ink/10 first:border-t-0"
      >
        <div className="mx-auto max-w-3xl px-6 pt-24 text-center">
          <span className="mb-5 inline-block rounded-full border border-violet-dim px-4 py-1.5 font-mono text-[11px] tracking-[3px] text-violet">
            {eyebrow}
          </span>
          <GradientText
            colors={["#A716D6", "#D9A6F5", "#7C11A3"]}
            animationSpeed={7}
            showBorder={false}
            className="font-display text-4xl font-bold tracking-tight md:text-5xl"
          >
            {title}
          </GradientText>

          <div className="mx-auto mt-6 max-w-2xl space-y-3">
            <h3 className="font-display text-lg font-semibold text-ink">{whatIsHeading}</h3>
            <p className="text-sm leading-relaxed text-ink/65">{whatIsBody}</p>
          </div>

          <h3 className="mt-8 font-display text-xl font-bold text-ink">{offeringsHeading}</h3>
        </div>

        {/* stacking zone: cards fly in and settle here, anchored to the bottom */}
        <div className="relative mx-auto mt-auto h-[52%] w-full max-w-xl px-6 pb-10">
          {offerings.map((o, i) => (
            <div
              key={o.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className="absolute inset-x-6 bottom-0 h-60 overflow-hidden rounded-[32px] p-8 shadow-2xl shadow-ink/25"
              style={{ zIndex: i, background: CARD_BG }}
            >
              <span className="mb-2 inline-block font-mono text-xs tracking-[2px] text-white/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mb-2 font-display text-xl font-bold text-white">{o.title}</h4>
              <p className="line-clamp-4 text-sm leading-relaxed text-white/85">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* normal (non-pinned) flow content — a breather between this
          service's pin releasing and the next one engaging */}
      {closingHeading && (
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h3 className="mb-3 font-display text-xl font-semibold text-ink">{closingHeading}</h3>
          <p className="leading-relaxed text-ink/65">{closingBody}</p>
        </div>
      )}
    </>
  );
}

export default ServiceSection;