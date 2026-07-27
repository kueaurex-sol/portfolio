// // // import React from 'react'

// // // function Page() {
// // //   return (
// // //    <>
// // //    <div className='h-screen w-screen bg-[url("/hero.png")] bg-cover'>

// // //    </div>
// // //    </>
// // //   )
// // // }

// // // export default Page
// // "use client";

// // import { useRef, useLayoutEffect } from "react";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // gsap.registerPlugin(ScrollTrigger);

// // function HeroAbout() {
// //   const pinWrapRef = useRef(null);
// //   const heroImgRef = useRef(null);
// //   const heroCopyRef = useRef(null);
// //   const scrollCueRef = useRef(null);
// //   const tagsRef = useRef(null);
// //   const aboutInnerRef = useRef(null);
// //   const bodyBgProxy = useRef({ t: 0 });

// //   useLayoutEffect(() => {
// //     const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// //     const ctx = gsap.context(() => {
// //       if (reduce) {
// //         gsap.set([heroImgRef.current, heroCopyRef.current, scrollCueRef.current], {
// //           opacity: 1,
// //         });
// //         gsap.set(aboutInnerRef.current, { opacity: 1, y: 0 });
// //         return;
// //       }

// //       // ---- load sequence (plays once on mount) ----
// //       const load = gsap.timeline({ defaults: { ease: "power3.out" } });
// //       load
// //         .fromTo(heroImgRef.current, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.2 })
// //         .to(tagsRef.current?.children ?? [], { opacity: 1, stagger: 0.15, duration: 0.4 }, "-=0.6")
// //         .fromTo(heroCopyRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
// //         .to(scrollCueRef.current, { opacity: 0.7, duration: 0.6 }, "-=0.3");

// //       // ---- scroll-scrubbed story ----
// //       const story = gsap.timeline({
// //         scrollTrigger: {
// //           trigger: pinWrapRef.current,
// //           start: "top top",
// //           end: "bottom top",
// //           scrub: 1,
// //         },
// //       });

// //       story
// //         .to(heroImgRef.current, { scale: 1.55, xPercent: -4, yPercent: -2, duration: 1, ease: "none" }, 0)
// //         .to(
// //           [heroCopyRef.current, scrollCueRef.current, tagsRef.current],
// //           { opacity: 0, y: -20, duration: 0.25 },
// //           0.05
// //         )
// //         .to(heroImgRef.current, { opacity: 0.16, duration: 0.5 }, 0.45)
// //         .to(aboutInnerRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.55);

// //       // background color morph: void -> plum, tied to the same scroll range
// //       gsap.timeline({
// //         scrollTrigger: {
// //           trigger: pinWrapRef.current,
// //           start: "top top",
// //           end: "bottom top",
// //           scrub: 1,
// //         },
// //       }).to(bodyBgProxy.current, {
// //         t: 1,
// //         ease: "none",
// //         onUpdate: () => {
// //           const from = [0, 0, 0]; // --void
// //           const to = [23, 2, 33]; // --plum
// //           const t = bodyBgProxy.current.t;
// //           const [r, g, b] = from.map((f, i) => Math.round(f + (to[i] - f) * t));
// //           document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
// //         },
// //       });
// //     });

// //     return () => ctx.revert();
// //   }, []);

// //   return (
// //     <>
// //       {/* Pinned hero */}
// //       <div ref={pinWrapRef} className="relative h-[340vh]">
// //         <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
// //           <div
// //             ref={heroImgRef}
// //             className='absolute inset-0 origin-[66%_42%] bg-[url("/hero.png")] bg-cover bg-[62%_45%] opacity-0'
// //           />

// //           {/* schematic tags — reuses the annotation motif from the artwork itself */}
// //           <div ref={tagsRef}>
// //             <Tag className="left-[8%] top-[22%]">SENSORY ARRAY // SA-4</Tag>
// //             <Tag className="right-[10%] top-[16%]">NEURAL CORE // NC-21</Tag>
// //             <Tag className="bottom-[20%] left-[12%]">CIRCUIT PATHWAY // CP-5</Tag>
// //           </div>

// //           <div ref={heroCopyRef} className="relative z-10 max-w-2xl px-6 text-center opacity-0">
// //             <span className="mb-4 inline-block rounded-sm border border-violet-dim px-3.5 py-1.5 font-mono text-xs tracking-[3px] text-violet">
// //               DIGITAL TRANSFORMATION AGENCY
// //             </span>
// //             <h1 className="font-display text-4xl font-semibold leading-tight tracking-wide text-ivory md:text-5xl lg:text-6xl">
// //               We engineer the <em className="text-violet not-italic">infrastructure</em>.
// //               <br />
// //               We drive the <em className="text-violet not-italic">growth</em>.
// //             </h1>
// //           </div>

// //           <div
// //             ref={scrollCueRef}
// //             className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs tracking-[2px] opacity-0"
// //           >
// //             <span>SCROLL</span>
// //             <span className="h-8 w-px bg-gradient-to-b from-ivory to-transparent" />
// //           </div>
// //         </div>
// //       </div>

// //       {/* About Us */}
// //       <section className="relative flex min-h-screen items-center px-[8vw] py-28">
// //         <div ref={aboutInnerRef} className="max-w-3xl translate-y-8 opacity-0">
// //           <span className="mb-4 inline-block rounded-sm border border-violet-dim px-3.5 py-1.5 font-mono text-xs tracking-[3px] text-violet">
// //             ABOUT US
// //           </span>
// //           <h2 className="mb-7 font-display text-4xl font-bold tracking-wide text-ivory md:text-5xl">
// //             Built for brands that refuse
// //             <br />
// //             off-the-shelf limitations.
// //           </h2>
// //           <p className="mb-5 text-lg leading-relaxed text-ivory/80">
// //             We don&apos;t just write code, and we don&apos;t just run ads — we bridge the gap
// //             between engineering and growth.
// //           </p>
// //           <p className="text-lg leading-relaxed text-ivory/80">
// //             From custom enterprise software and scalable web platforms to proprietary AI model
// //             integration, we build the digital infrastructure your business needs to streamline
// //             operations. Then we layer it with data-driven growth marketing to maximize your ROI.
// //           </p>
// //         </div>
// //       </section>
// //     </>
// //   );
// // }

// // function Tag({ className, children }) {
// //   return (
// //     <div
// //       className={`absolute whitespace-nowrap font-mono text-[11px] tracking-[1.5px] text-violet opacity-0 ${className}`}
// //     >
// //       <span className="mr-1.5 text-violet/60">—</span>
// //       {children}
// //     </div>
// //   );
// // }

// // export default HeroAbout;
// "use client";

// import { useRef, useLayoutEffect } from "react";
// import { animate, stagger } from "animejs";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import ThreeScene from "@/components/ThreeScene";

// gsap.registerPlugin(ScrollTrigger);

// function HeroAbout() {
//   const pinWrapRef = useRef(null);
//   const sceneWrapRef = useRef(null);
//   const threeRef = useRef(null);
//   const eyebrowRef = useRef(null);
//   const lineOneRef = useRef(null);
//   const lineTwoRef = useRef(null);
//   const subRef = useRef(null);
//   const scrollCueRef = useRef(null);
//   const aboutInnerRef = useRef(null);
//   const bgProxy = useRef({ t: 0 });

//   useLayoutEffect(() => {
//     const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//     if (reduce) {
//       gsap.set([eyebrowRef.current, lineOneRef.current, lineTwoRef.current, subRef.current, scrollCueRef.current], {
//         opacity: 1,
//       });
//       gsap.set(aboutInnerRef.current, { opacity: 1, y: 0 });
//       return;
//     }

//     // ---- load choreography (anime.js) ----
//     animate(eyebrowRef.current, {
//       opacity: [0, 1],
//       translateY: [10, 0],
//       duration: 500,
//       easing: "easeOutQuad",
//       delay: 150,
//     });
//     animate([lineOneRef.current, lineTwoRef.current], {
//       opacity: [0, 1],
//       translateY: [28, 0],
//       duration: 700,
//       delay: stagger(140, { start: 350 }),
//       easing: "easeOutExpo",
//     });
//     animate(subRef.current, {
//       opacity: [0, 1],
//       translateY: [14, 0],
//       duration: 600,
//       delay: 850,
//       easing: "easeOutQuad",
//     });
//     animate(scrollCueRef.current, {
//       opacity: [0, 0.7],
//       duration: 500,
//       delay: 1100,
//       easing: "easeOutQuad",
//     });

//     // ---- scroll-scrubbed story (GSAP) ----
//     const ctx = gsap.context(() => {
//       const story = gsap.timeline({
//         scrollTrigger: {
//           trigger: pinWrapRef.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: 1,
//         },
//       });

//       story
//         .to(
//           bgProxy.current,
//           {
//             t: 1,
//             ease: "none",
//             onUpdate: () => {
//               const t = bgProxy.current.t;
//               threeRef.current?.setProgress(t);
//               const from = [0, 0, 0]; // --void
//               const to = [23, 2, 33]; // --plum
//               const [r, g, b] = from.map((f, i) => Math.round(f + (to[i] - f) * t));
//               document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
//             },
//           },
//           0
//         )
//         .to(
//           [eyebrowRef.current, lineOneRef.current, lineTwoRef.current, subRef.current, scrollCueRef.current],
//           { opacity: 0, y: -16, duration: 0.25 },
//           0.05
//         )
//         .to(sceneWrapRef.current, { opacity: 0.25, duration: 0.5 }, 0.45)
//         .to(aboutInnerRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.55);
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <>
//       {/* Pinned hero */}
//       <div ref={pinWrapRef} className="relative h-[300vh]">
//         <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-void">
//           <div ref={sceneWrapRef} className="absolute inset-0">
//             <ThreeScene ref={threeRef} />
//           </div>

//           <div className="relative z-10 max-w-3xl px-6 text-center">
//             <span
//               ref={eyebrowRef}
//               className="mb-6 inline-block rounded-full border border-violet-dim px-4 py-1.5 font-mono text-[11px] tracking-[3px] text-violet opacity-0"
//             >
//               DIGITAL TRANSFORMATION AGENCY
//             </span>

//             <h1 className="font-display text-4xl font-semibold leading-[1.15] tracking-tight text-ivory md:text-5xl lg:text-6xl">
//               <span ref={lineOneRef} className="block opacity-0">
//                 We engineer the <span className="text-violet">infrastructure</span>.
//               </span>
//               <span ref={lineTwoRef} className="block opacity-0">
//                 We drive the <span className="text-violet">growth</span>.
//               </span>
//             </h1>

//             <p ref={subRef} className="mx-auto mt-6 max-w-xl text-base text-ivory/60 opacity-0 md:text-lg">
//               Custom software, AI integration, and data-driven growth marketing — under one roof.
//             </p>
//           </div>

//           <div
//             ref={scrollCueRef}
//             className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] tracking-[2px] text-ivory/60 opacity-0"
//           >
//             <span>SCROLL</span>
//             <span className="h-8 w-px bg-gradient-to-b from-ivory/60 to-transparent" />
//           </div>
//         </div>
//       </div>

//       {/* About Us */}
//       <section className="relative flex min-h-screen items-center px-[8vw] py-28">
//         <div ref={aboutInnerRef} className="max-w-3xl translate-y-8 opacity-0">
//           <span className="mb-4 inline-block rounded-full border border-violet-dim px-4 py-1.5 font-mono text-[11px] tracking-[3px] text-violet">
//             ABOUT US
//           </span>
//           <h2 className="mb-7 font-display text-4xl font-bold tracking-tight text-ivory md:text-5xl">
//             Built for brands that refuse
//             <br />
//             off-the-shelf limitations.
//           </h2>
//           <p className="mb-5 text-lg leading-relaxed text-ivory/70">
//             We don&apos;t just write code, and we don&apos;t just run ads — we bridge the gap
//             between engineering and growth.
//           </p>
//           <p className="text-lg leading-relaxed text-ivory/70">
//             From custom enterprise software and scalable web platforms to proprietary AI model
//             integration, we build the digital infrastructure your business needs to streamline
//             operations. Then we layer it with data-driven growth marketing to maximize your ROI.
//           </p>
//         </div>
//       </section>
//     </>
//   );
// }

// export default HeroAbout;
import WavePath from "@/components/WavePath";
import ScrollStory from "@/components/ScrollStory";
import About from "./About";
import WhyChooseUs from "./WhyChooseUs";
import Services from "./Services";
import Framework from "./Framework";
import TopStories from "./TopStories";
import Faq from "./Faq";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      {/* <Navbar /> */}
      <ScrollStory>
        <About />
        <WhyChooseUs />
        <Services />
        <Framework />
        <TopStories />
        <Faq />
        {/* <div className="relative h-[220px] w-full overflow-hidden rounded-3xl bg-neutral-900">
    <WavePath
        color="#D026FF"
    />
</div> */}
        {/* <Footer /> */}
      </ScrollStory>
    </>
  );
}