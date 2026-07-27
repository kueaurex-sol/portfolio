// // // // const SERVICES = [
// // // //   {
// // // //     title: "Core Product Engineering",
// // // //     tag: "ENGINEERING",
// // // //     body: "Custom software and scalable platforms built for how your business actually operates.",
// // // //     meta: "Full-stack builds",
// // // //   },
// // // //   {
// // // //     title: "Digital Transformation",
// // // //     tag: "TRANSFORMATION",
// // // //     body: "Reframing legacy workflows and integrating advanced, evolutionary tech across your operations.",
// // // //     meta: "Systems, reimagined",
// // // //   },
// // // //   {
// // // //     title: "Integrated Suites",
// // // //     tag: "SUITES",
// // // //     body: "Unified commerce and automation ecosystems that pair engineering with growth marketing.",
// // // //     meta: "End-to-end ecosystems",
// // // //   },
// // // // ];

// // // // // alternating tilt + lift so the three cards read as a fanned deck rather
// // // // // than a flat grid — the middle card sits forward and upright, the outer
// // // // // two lean away from it
// // // // const CARD_TRANSFORM = [
// // // //   "rotate-[-6deg] translate-y-3",
// // // //   "rotate-0 -translate-y-2",
// // // //   "rotate-[6deg] translate-y-3",
// // // // ];

// // // // function Services() {
// // // //   return (
// // // //     <section id="services" className="relative px-[8vw] py-32">
// // // //       <h2 className="mb-20 text-center font-display text-3xl font-bold tracking-tight text-ivory md:text-4xl">
// // // //         Our Services
// // // //       </h2>

// // // //       <div className="mx-auto flex max-w-4xl items-center justify-center">
// // // //         {SERVICES.map((s, i) => (
// // // //           <div
// // // //             key={s.title}
// // // //             className={`group relative -mx-5 h-[420px] w-[270px] shrink-0 rounded-[28px] p-7 shadow-xl shadow-ink/10 transition-all duration-500 ease-out hover:z-20 hover:-translate-y-4 hover:rotate-0 ${CARD_TRANSFORM[i]}`}
// // // //             style={{
// // // //               zIndex: i === 1 ? 10 : 5 - i,
// // // //               background:
// // // //                 "linear-gradient(150deg, #6b6b76 0%, #3a3a44 32%, #17171c 68%, #34343d 100%)",
// // // //             }}
// // // //           >
// // // //             {/* metallic sheen */}
// // // //             <div
// // // //               className="pointer-events-none absolute inset-0 rounded-[28px] opacity-60 mix-blend-overlay"
// // // //               style={{
// // // //                 background:
// // // //                   "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.55) 42%, transparent 58%)",
// // // //               }}
// // // //             />

// // // //             <div className="relative flex h-full flex-col justify-between">
// // // //               <div>
// // // //                 <span className="mb-3 inline-block font-mono text-[10px] tracking-[2px] text-violet">
// // // //                   {s.tag}
// // // //                 </span>
// // // //                 <h3 className="font-display text-2xl font-bold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]">
// // // //                   {s.title}
// // // //                 </h3>
// // // //               </div>

// // // //               <div>
// // // //                 <div className="mb-3 h-px bg-gradient-to-r from-violet/70 to-transparent" />
// // // //                 <p className="mb-2 text-[13px] leading-relaxed text-white/70">{s.body}</p>
// // // //                 <p className="font-mono text-[10px] tracking-[1.5px] text-white/45">{s.meta}</p>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }

// // // // export default Services;
// // // const SERVICES = [
// // //   {
// // //     title: "Core Product Engineering",
// // //     tag: "ENGINEERING",
// // //     body: "Custom software and scalable platforms built for how your business actually operates.",
// // //     meta: "Full-stack builds",
// // //   },
// // //   {
// // //     title: "Digital Transformation",
// // //     tag: "TRANSFORMATION",
// // //     body: "Reframing legacy workflows and integrating advanced, evolutionary tech across your operations.",
// // //     meta: "Systems, reimagined",
// // //   },
// // //   {
// // //     title: "Integrated Suites",
// // //     tag: "SUITES",
// // //     body: "Unified commerce and automation ecosystems that pair engineering with growth marketing.",
// // //     meta: "End-to-end ecosystems",
// // //   },
// // // ];

// // // // alternating tilt + lift so the three cards read as a fanned deck rather
// // // // than a flat grid — kept deliberately subtle so the overlap only touches
// // // // each card's empty margin, never its title or meta text
// // // const CARD_TRANSFORM = [
// // //   "rotate-[-5deg] translate-y-2",
// // //   "rotate-0 -translate-y-3",
// // //   "rotate-[5deg] translate-y-2",
// // // ];

// // // function Services() {
// // //   return (
// // //     <section id="services" className="relative px-[8vw] py-32">
// // //       <h2 className="mb-20 text-center font-display text-3xl font-bold tracking-tight text-ivory md:text-4xl">
// // //         Our Services
// // //       </h2>

// // //       <div className="mx-auto flex max-w-4xl items-center justify-center">
// // //         {SERVICES.map((s, i) => (
// // //           <div
// // //             key={s.title}
// // //             className={`group relative -mx-3 h-[440px] w-[300px] shrink-0 rounded-[28px] p-8 shadow-xl shadow-ink/15 transition-all duration-500 ease-out hover:z-20 hover:-translate-y-4 hover:rotate-0 ${CARD_TRANSFORM[i]}`}
// // //             style={{
// // //               zIndex: i === 1 ? 10 : 5 - i,
// // //               background:
// // //                 "linear-gradient(140deg, #d4d4dc 0%, #a8a8b2 22%, #6c6c76 50%, #504f58 72%, #86868f 100%)",
// // //             }}
// // //           >
// // //             {/* metallic sheen streak */}
// // //             <div
// // //               className="pointer-events-none absolute inset-0 rounded-[28px] opacity-70 mix-blend-overlay"
// // //               style={{
// // //                 background:
// // //                   "linear-gradient(115deg, transparent 15%, rgba(255,255,255,0.85) 38%, transparent 55%)",
// // //               }}
// // //             />

// // //             <div className="relative flex h-full flex-col justify-between">
// // //               <div>
// // //                 <span className="mb-3 inline-block font-mono text-[10px] tracking-[2px] text-violet">
// // //                   {s.tag}
// // //                 </span>
// // //                 <h3 className="font-display text-2xl font-bold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
// // //                   {s.title}
// // //                 </h3>
// // //               </div>

// // //               <div>
// // //                 <div className="mb-3 h-px bg-gradient-to-r from-violet/80 to-transparent" />
// // //                 <p className="mb-2 text-[13px] leading-relaxed text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]">
// // //                   {s.body}
// // //                 </p>
// // //                 <p className="font-mono text-[10px] tracking-[1.5px] text-white/55">{s.meta}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // // export default Services;
// // const SERVICES = [
// //   {
// //     title: "Core Product Engineering",
// //     tag: "ENGINEERING",
// //     body: "Custom software and scalable platforms built for how your business actually operates.",
// //     meta: "Full-stack builds",
// //   },
// //   {
// //     title: "Digital Transformation",
// //     tag: "TRANSFORMATION",
// //     body: "Reframing legacy workflows and integrating advanced, evolutionary tech across your operations.",
// //     meta: "Systems, reimagined",
// //   },
// //   {
// //     title: "Integrated Suites",
// //     tag: "SUITES",
// //     body: "Unified commerce and automation ecosystems that pair engineering with growth marketing.",
// //     meta: "End-to-end ecosystems",
// //   },
// // ];

// // // alternating tilt + lift so the three cards read as a fanned deck rather
// // // than a flat grid — kept deliberately subtle so the overlap only touches
// // // each card's empty margin, never its title or meta text
// // const CARD_TRANSFORM = [
// //   "rotate-[-6deg] translate-y-3",
// //   "rotate-0 -translate-y-4",
// //   "rotate-[6deg] translate-y-3",
// // ];

// // function Services() {
// //   return (
// //     <section id="services" className="relative px-[5vw] py-36">
// //       <h2 className="mb-24 text-center font-display text-4xl font-bold tracking-tight text-ivory md:text-5xl">
// //         Our Services
// //       </h2>

// //       <div className="mx-auto flex w-[90vw] max-w-6xl items-center justify-center">
// //         {SERVICES.map((s, i) => (
// //           <div
// //             key={s.title}
// //             className={`group relative -mx-6 h-[520px] w-[26vw] max-w-[400px] min-w-[300px] shrink-0 rounded-[36px] p-10 shadow-2xl shadow-ink/20 transition-all duration-500 ease-out hover:z-20 hover:-translate-y-5 hover:rotate-0 ${CARD_TRANSFORM[i]}`}
// //             style={{
// //               zIndex: i === 1 ? 10 : 5 - i,
// //               background:
// //                 "linear-gradient(140deg, #d4d4dc 0%, #a8a8b2 22%, #6c6c76 50%, #504f58 72%, #86868f 100%)",
// //             }}
// //           >
// //             {/* metallic sheen streak */}
// //             <div
// //               className="pointer-events-none absolute inset-0 rounded-[36px] opacity-70 mix-blend-overlay"
// //               style={{
// //                 background:
// //                   "linear-gradient(115deg, transparent 15%, rgba(255,255,255,0.85) 38%, transparent 55%)",
// //               }}
// //             />

// //             <div className="relative flex h-full flex-col justify-between">
// //               <div>
// //                 <span className="mb-4 inline-block font-mono text-xs tracking-[3px] text-violet">
// //                   {s.tag}
// //                 </span>
// //                 <h3 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] lg:text-4xl">
// //                   {s.title}
// //                 </h3>
// //               </div>

// //               <div>
// //                 <div className="mb-4 h-px bg-gradient-to-r from-violet/80 to-transparent" />
// //                 <p className="mb-3 text-base leading-relaxed text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]">
// //                   {s.body}
// //                 </p>
// //                 <p className="font-mono text-[11px] tracking-[2px] text-white/55">{s.meta}</p>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }

// // export default Services;
// const SERVICES = [
//   {
//     title: "Core Product Engineering",
//     tag: "ENGINEERING",
//     body: "Custom software and scalable platforms built for how your business actually operates.",
//     meta: "Full-stack builds",
//     art: "/service-1.svg",
//   },
//   {
//     title: "Digital Transformation",
//     tag: "TRANSFORMATION",
//     body: "Reframing legacy workflows and integrating advanced, evolutionary tech across your operations.",
//     meta: "Systems, reimagined",
//     art: "/service-2.svg",
//   },
//   {
//     title: "Integrated Suites",
//     tag: "SUITES",
//     body: "Unified commerce and automation ecosystems that pair engineering with growth marketing.",
//     meta: "End-to-end ecosystems",
//     art: "/service-3.svg",
//   },
// ];

// // alternating tilt + lift so the three cards read as a fanned deck rather
// // than a flat grid — kept deliberately subtle so the overlap only touches
// // each card's empty margin, never its title or meta text
// const CARD_TRANSFORM = [
//   "rotate-[-6deg] translate-y-3",
//   "rotate-0 -translate-y-4",
//   "rotate-[6deg] translate-y-3",
// ];

// function Services() {
//   return (
//     <section id="services" className="relative px-[5vw] py-36">
//       <h2 className="mb-24 text-center font-display text-4xl font-bold tracking-tight text-ivory md:text-5xl">
//         Our Services
//       </h2>

//       <div className="mx-auto flex w-[90vw] max-w-6xl items-center justify-center">
//         {SERVICES.map((s, i) => (
//           <div
//             key={s.title}
//             className={`group relative -mx-6 h-[520px] w-[26vw] max-w-[400px] min-w-[300px] shrink-0 overflow-hidden rounded-[36px] p-10 shadow-2xl shadow-ink/20 transition-all duration-500 ease-out hover:z-20 hover:-translate-y-5 hover:rotate-0 ${CARD_TRANSFORM[i]}`}
//             style={{
//               zIndex: i === 1 ? 10 : 5 - i,
//               background:
//                 "linear-gradient(140deg, #d4d4dc 0%, #a8a8b2 22%, #6c6c76 50%, #504f58 72%, #86868f 100%)",
//             }}
//           >
//             {/* metallic sheen streak */}
//             <div
//               className="pointer-events-none absolute inset-0 z-10 opacity-70 mix-blend-overlay"
//               style={{
//                 background:
//                   "linear-gradient(115deg, transparent 15%, rgba(255,255,255,0.85) 38%, transparent 55%)",
//               }}
//             />

//             {/* hover-reveal artwork — slides up from the bottom, arched top edge */}
//             <div
//               className="absolute inset-x-0 bottom-0 z-0 h-[68%] translate-y-[105%] overflow-hidden transition-transform duration-500 ease-out group-hover:translate-y-0"
//               style={{ borderRadius: "50% 50% 0 0 / 70px 70px 0 0" }}
//             >
//               <img src={s.art} alt="" className="h-full w-full object-cover" />
//               <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
//             </div>

//             <div className="relative z-20 flex h-full flex-col justify-between">
//               <div>
//                 <span className="mb-4 inline-block font-mono text-xs tracking-[3px] text-violet">
//                   {s.tag}
//                 </span>
//                 <h3 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] lg:text-4xl">
//                   {s.title}
//                 </h3>
//               </div>

//               <div>
//                 <div className="mb-4 h-px bg-gradient-to-r from-violet/80 to-transparent" />
//                 <p className="mb-3 text-base leading-relaxed text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]">
//                   {s.body}
//                 </p>
//                 <p className="font-mono text-[11px] tracking-[2px] text-white/55">{s.meta}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Services;
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
// than a flat grid — modest rotation kept deliberately small so it only
// affects each card's corners, never reaches into the text zone
const CARD_TRANSFORM = [
  "rotate-[5deg] translate-y-3",
  "rotate-[-5deg] -translate-y-4",
  "rotate-[5deg] translate-y-3",
];

function Services() {
  return (
    <section id="services" className="relative px-[5vw] py-36">
      <h2 className="mb-24 text-center font-display text-4xl font-bold tracking-tight text-ivory md:text-5xl">
        Our Services
      </h2>

      {/* gap (not negative margin) keeps real space between cards so
          rotation-induced overlap never reaches into a neighbor's text */}
      <div className="mx-auto flex w-[90vw] max-w-6xl items-center justify-center gap-6">
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            className={`group relative h-[520px] w-[26vw] max-w-[400px] min-w-[300px] shrink-0 overflow-hidden rounded-[36px] p-10 shadow-2xl shadow-ink/20 transition-all duration-500 ease-out hover:z-20 hover:-translate-y-5 hover:rotate-0 ${CARD_TRANSFORM[i]}`}
            style={{
              zIndex: i === 1 ? 10 : 5 - i,
              // background: "linear-gradient(140deg, #d4d4dc 0%, #a8a8b2 22%, #6c6c76 50%, #504f58 72%, #86868f 100%)",
//  background:" linear-gradient(140deg, #eceaf2 0% ,#c9c2d6 18%,#a716d6 42%,#5b5066 68%,#2d2933 100%)", preff
background:" linear-gradient(140deg,  #f1f1f5 0%,  #d7d5df 22%,  #b04be0 48%,  #6f667d 72%,  #383640 100%)",
// background: "linear-gradient(140deg,  #dad9e1 0%,  #8d88a1 28%,  #a716d6 52%,  #4a4552 78%,  #232127 100%)",
// background: "linear-gradient(140deg,  #ffffff 0%,  #d7d1e3 20%,  #a716d6 45%,  #6b6177 70%,  #4a4650 100%)",
// background: "linear-gradient(140deg,  #ececf2 0%,  #b9adc9 20%,  #a716d6 40%,  #6d5d87 62%,  #322c3d 100%)",
// background: "linear-gradient(140deg,  #d4d4dc 0%,  #b8b2c5 22%,  #a716d6 48%,  #595663 72%,  #7c7a86 100%)",
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

              {/* lifts up on hover to clear the rising artwork underneath it */}
              <div className="transition-transform duration-500 ease-out group-hover:-translate-y-[130px]">
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