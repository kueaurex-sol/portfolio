// // "use client";
// // import { FastAverageColor } from "fast-average-color";
// // import { useEffect, useRef, useState } from "react";
// // import { createPortal } from "react-dom";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import { Flip } from "gsap/Flip";
// // import { useGSAP } from "@gsap/react";
// // import StoryCard from "@/components/StoryCard";
// // import MeshBg from "@/components/MeshBg";
// // import Link from "next/link";

// // gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

// // const STORIES = [
// //   {
// //     logo: "url",
// //     title: "Pacific International",
// //     region: "DUBAI",
// //     image: "/pacific.png",
// //     des: "The Members Experience lets you personalize your favorite pacific",
// //     vid: "url",
// //     projectScope:"Business portfolio, services showcasing, and an online client enquiry system through the website.",
// //     problem:"Pacific International lacked a centralized, modern digital presence to effectively showcase their global service capabilities. Their existing communication channels resulted in fragmented, manual customer inquiries, making it difficult to capture, track, and qualify high-value business leads efficiently.",
// //     solution:"We engineered a sleek, high-performance business portfolio website designed to clearly categorize and showcase their full suite of services. The platform was integrated with a custom, secure online client enquiry system featuring automated routing. This streamlined lead capture, reduced response times, and provided a seamless user experience for prospective B2B clients.",
// //     testimonial:'"The new platform completely transformed how we present our business to the world. The automated enquiry system has significantly cut down our administrative overhead and allowed our team to respond to high-priority leads faster than ever before." — Management Team, Pacific International',
// //     websiteLink: "https://pacificinternationalservices.com/"
// //   },
// //   {
// //     logo: "url",
// //     title: "Fiable Constructions",
// //     region: "INDIA",
// //     image: "/fiable.png",
// //     des: "The Members Experience lets you personalize your favorite Fiable",
// //     vid: "url",
// //      projectScope:"Business portfolio, services showcasing, online client enquiry system through the website, dynamic projects adding system, SEO optimization, and growth marketing.",
// //     problem:"Fiable Constructions needed a way to highlight their growing portfolio of completed and ongoing projects without constantly relying on developers for manual site updates. Furthermore, low search engine visibility and a lack of structured digital marketing meant they were missing out on valuable local commercial and residential construction leads.",
// //     solution:"We developed a robust, scalable digital ecosystem featuring a dynamic dynamic projects adding system (CMS), allowing their team to upload new case studies, images, and milestones on the fly. To drive traffic, we implemented an aggressive on-page and technical SEO optimization strategy combined with data-backed growth marketing campaigns, funneling high-intent traffic directly into a custom online client enquiry system.",
// //     testimonial:'"Having the ability to showcase our new construction projects instantly has given us a massive competitive edge. Combined with the SEO boost and growth marketing strategies, our inbound project inquiries have increased dramatically." — Director, Fiable Constructions',
// //     websiteLink: "https://www.fiableconstructions.com/"
// //   },
// //   {
// //     logo: "url",
// //     title: "RP Infra",
// //     region: "INDIA",
// //     image: "/RP.png",
// //     des: "The Members Experience lets you personalize your favorite RP Infra",
// //     vid: "url",
// //      projectScope:"",
// //     problem:"",
// //     solution:"",
// //     testimonial:"",
// //     websiteLink: ""
// //   },
// // ];

// // const CLOSE_DURATION = 0.9;
// // const OPEN_DURATION = 0.7;

// // function DetailOverlay({
// //   activeStory,
// //   detailRef,
// //   bgRef,
// //   detailImgRef,
// //   detailImgTagRef,
// //   detailScrollRef,
// //   textRef,
// //   onScroll,
// //   onClose,
// // }) {
// //   return (
// //     <div
// //       ref={detailRef}
// //       className="fixed inset-0 z-40"
// //       style={{ visibility: "hidden" }}
// //     >
// //       <div ref={bgRef} className="absolute inset-0 bg-[#8A7198]" />

// //       {/* <div
// //            ref={detailImgRef}
// //            className="relative w-full overflow-hidden rounded-lg md:fixed md:top-24 md:right-[8vw] md:z-10 md:mb-0 md:h-[46vh] md:w-[38vw] lg:pt-0 md:pt-0 pt-24 lg:px-0 md:px-0 px-2"
// //          >
// //            <img ref={detailImgTagRef} src={activeStory.image} className=" object-cover" />
// //          </div> */}

// //       <div
// //         ref={detailImgRef}
// //         className="relative mt-24  w-full overflow-hidden rounded-lg px-2 md:fixed md:top-24 md:right-[8vw] md:z-10 md:mt-0 md:h-[46vh] md:w-[38vw] md:px-0"
// //       >
// //         <img
// //           ref={detailImgTagRef}
// //           src={activeStory.image}
// //           className=" object-cover"
// //         />
// //       </div>

// //       <div
// //         ref={detailScrollRef}
// //         onScroll={onScroll}
// //         className="relative z-20 h-full w-full overflow-y-auto px-[8vw] pb-16 lg:pt-32 md:pt-32"
// //       >
// //         <div ref={textRef} className="max-w-xl">
// //           <h2 className="mt-4 font-display text-xl font-semibold text-ivory md:text-3xl lg:text-5xl">
// //             {activeStory.title}
// //           </h2>
// //           {/* <p className="mt-2 font-display text-lg italic text-ivory/70 md:text-2xl lg:text-2xl">
// //             members experience
// //           </p> */}
// //           <p className="mt-2 text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
// //             <span className="font-bold">Scope: </span>{activeStory.projectScope}
// //           </p>
// //           <p className="mt-2 text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
// //             <span className="font-bold">Problem: </span>{activeStory.problem}
// //           </p>
// //           <p className="mt-2 text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
// //             <span className="font-bold">Solution: </span>{activeStory.solution}
// //           </p>
// //           <p className="mt-2 text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
// //             <span className="font-bold">Testimonial: </span>{activeStory.testimonial}
// //           </p>
// //           <p className="mt-2 text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
// //             <span className="font-bold">Website Link: </span><Link target="_blanck" href={`${activeStory.websiteLink}`}> {activeStory.websiteLink}</Link> 
// //           </p>
// //           <p className="mt-6 text-xs tracking-[0.35em] text-ivory/30">REGION</p>
// //           <p className="mt-2 text-sm text-ivory/40">{activeStory.region}</p>
// //           <button
// //             onClick={onClose}
// //             className="mt-6 text-sm text-ivory/60 underline md:mt-10 lg:mt-16"
// //           >
// //             ← Back to case studies
// //           </button>
// //         </div>
// //         <div className="h-[70vh]" />
// //       </div>
// //     </div>
// //   );
// // }

// // function CaseStudies() {
// //   const imgRef = useRef(null);
// //   const [rgb, setRgb] = useState("100,100,255");

// //   const sectionRef = useRef(null);
// //   const trackRef = useRef(null);
// //   const cardRefs = useRef([]);

// //   const stRef = useRef(null);
// //   const detailRef = useRef(null);
// //   const bgRef = useRef(null);
// //   const detailImgRef = useRef(null);
// //   const detailImgTagRef = useRef(null);
// //   const detailScrollRef = useRef(null);
// //   const textRef = useRef(null);

// //   const [selected, setSelected] = useState(null);
// //   const [activeStory, setActiveStory] = useState(STORIES[0]);
// //   const [mounted, setMounted] = useState(false);
// //   // Bumped after every close — see the comment inside closeCard's
// //   // onComplete for why this is needed.
// //   const [resetTick, setResetTick] = useState(0);

// //   const animatingRef = useRef(false);
// //   const scrollLockY = useRef(0);

// //   useEffect(() => setMounted(true), []);

// //   useEffect(() => {
// //     if (!imgRef.current) return;
// //     const fac = new FastAverageColor();
// //     fac.getColorAsync(imgRef.current).then((color) => {
// //       setRgb(color.value.slice(0, 3).join(","));
// //     });
// //   }, []);

// //   useGSAP(
// //     () => {
// //       const reduce = window.matchMedia(
// //         "(prefers-reduced-motion: reduce)",
// //       ).matches;
// //       const cards = cardRefs.current.filter(Boolean);
// //       const track = trackRef.current;
// //       const section = sectionRef.current;

// //       if (!track || !section) return;

// //       ScrollTrigger.getAll()
// //         .filter((st) => st.trigger === section)
// //         .forEach((st) => st.kill());

// //       if (reduce) {
// //         gsap.set(cards, { opacity: 1 });
// //         return;
// //       }

// //       gsap.set(cards, { opacity: 0, x: 80 });

// //       const getScrollDistance = () => track.scrollWidth - section.clientWidth;

// //       const horizontalTween = gsap.to(track, {
// //         x: () => -getScrollDistance(),
// //         ease: "none",
// //       });

// //       stRef.current = ScrollTrigger.create({
// //         trigger: section,
// //         start: "top top",
// //         end: () => `+=${getScrollDistance()}`,
// //         pin: true,
// //         scrub: 1,
// //         animation: horizontalTween,
// //         invalidateOnRefresh: true,
// //         onEnter: () => {
// //           gsap.to(cards, {
// //             opacity: 1,
// //             x: 0,
// //             duration: 0.8,
// //             ease: "power3.out",
// //             stagger: 0.15,
// //           });
// //         },
// //         onEnterBack: () => {
// //           gsap.to(cards, { opacity: 1, x: 0, duration: 0.4 });
// //         },
// //       });

// //       const refresh = () => ScrollTrigger.refresh();
// //       if (document.readyState === "complete") {
// //         refresh();
// //       } else {
// //         window.addEventListener("load", refresh);
// //       }
// //       document.fonts?.ready?.then(refresh);

// //       return () => {
// //         window.removeEventListener("load", refresh);
// //       };
// //     },
// //     { scope: sectionRef },
// //   );

// //   const lockScroll = () => {
// //     scrollLockY.current = window.scrollY;
// //     document.body.style.position = "fixed";
// //     document.body.style.top = `-${scrollLockY.current}px`;
// //     document.body.style.left = "0";
// //     document.body.style.right = "0";
// //   };

// //   const unlockScroll = () => {
// //     document.body.style.position = "";
// //     document.body.style.top = "";
// //     document.body.style.left = "";
// //     document.body.style.right = "";
// //     window.scrollTo(0, scrollLockY.current);
// //   };

// //   const openCard = (i) => {
// //     if (animatingRef.current) return;
// //     const cardEl = cardRefs.current[i];
// //     const imgEl = cardEl?.querySelector("[data-flip-img]");
// //     if (!imgEl) return;

// //     animatingRef.current = true;

// //     gsap.killTweensOf([detailImgRef.current, bgRef.current, textRef.current]);
// //     Flip.killFlipsOf(detailImgRef.current);

// //     gsap.set(detailImgRef.current, { clearProps: "all" });

// //     const state = Flip.getState(imgEl);

// //     setActiveStory(STORIES[i]);
// //     setSelected(i);
// //     if (detailImgTagRef.current) detailImgTagRef.current.src = STORIES[i].image;

// //     lockScroll();

// //     requestAnimationFrame(() => {
// //       if (!detailImgRef.current) return;

// //       gsap.set(detailRef.current, { autoAlpha: 1, pointerEvents: "auto" });
// //       gsap.set(bgRef.current, { opacity: 1 });
// //       gsap.set(textRef.current, { opacity: 0, y: 24 });
// //       if (detailScrollRef.current) detailScrollRef.current.scrollTop = 0;

// //       Flip.from(state, {
// //         targets: detailImgRef.current,
// //         duration: OPEN_DURATION,
// //         ease: "power3.inOut",
// //         absolute: true,
// //         scale: true,
// //         onComplete: () => {
// //           animatingRef.current = false;
// //         },
// //       });

// //       gsap.to(textRef.current, {
// //         opacity: 1,
// //         y: 0,
// //         duration: 0.5,
// //         delay: 0.3,
// //         ease: "power2.out",
// //       });
// //     });
// //   };

// //   const closeCard = () => {
// //     if (selected === null || animatingRef.current) return;
// //     animatingRef.current = true;

// //     const i = selected;
// //     const cardEl = cardRefs.current[i];
// //     const cardImgEl = cardEl?.querySelector("[data-flip-img]");
// //     const detailImgEl = detailImgRef.current;

// //     if (!cardImgEl || !detailImgEl) {
// //       setSelected(null);
// //       animatingRef.current = false;
// //       unlockScroll();
// //       return;
// //     }

// //     gsap.set(detailRef.current, { pointerEvents: "none" });
// //     gsap.killTweensOf([detailImgEl, bgRef.current, textRef.current]);
// //     Flip.killFlipsOf(detailImgEl);

// //     if (detailScrollRef.current) detailScrollRef.current.scrollTop = 0;
// //     gsap.set(detailImgEl, { clearProps: "transform" });

// //     gsap.to(textRef.current, {
// //       opacity: 0,
// //       y: 24,
// //       duration: 0.3,
// //       ease: "power2.in",
// //     });
// //     gsap.to(bgRef.current, {
// //       opacity: 0,
// //       duration: CLOSE_DURATION,
// //       ease: "power2.inOut",
// //     });

// //     requestAnimationFrame(() => {
// //       Flip.fit(detailImgEl, cardImgEl, {
// //         duration: CLOSE_DURATION,
// //         ease: "power3.inOut",
// //         scale: true,
// //         absolute: true,
// //         onComplete: () => {
// //           gsap.set(detailRef.current, { autoAlpha: 0 });
// //           gsap.set(cardImgEl, { clearProps: "transform" });
// //           setSelected(null);
// //           animatingRef.current = false;
// //           unlockScroll();
// //           // Force every StoryCard to fully remount. GSAP's clearProps
// //           // above wipes the inline transform IT animated on the closed
// //           // card's [data-flip-img] — but on mobile, StoryCard's own
// //           // "active" pop transform (translateY(-18px) scale(1.12)) is
// //           // written by React as an inline style prop, and React only
// //           // rewrites inline style on re-render. Since StoryCard's
// //           // `active` value doesn't actually change after close, it never
// //           // re-renders on its own, so nothing restores the transform
// //           // GSAP just cleared — leaving that one card visibly smaller
// //           // than its siblings. Bumping resetTick changes every
// //           // StoryCard's key at once, so React unmounts/remounts them all,
// //           // and each one's own logic re-establishes its correct inline
// //           // style from scratch.
// //           setResetTick((t) => t + 1);
// //         },
// //       });
// //     });
// //   };

// //   const handleDetailScroll = (e) => {
// //     const el = e.currentTarget;
// //     if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) closeCard();
// //   };

// //   return (
// //     <section
// //       ref={sectionRef}
// //       id="top-stories"
// //       className="relative px-[8vw] py-28 h-screen overflow-hidden bg-white/28"
// //     >
// //       <MeshBg />
// //       <div ref={trackRef} className="flex max-w-none gap-14 w-max pr-72 pt-14">
// //         {STORIES.map((s, i) => (
// //           <StoryCard
// //             key={`${i}-${resetTick}`}
// //             story={s}
// //             ref={(el) => (cardRefs.current[i] = el)}
// //             onOpen={() => openCard(i)}
// //           />
// //         ))}
// //       </div>

// //       {mounted &&
// //         createPortal(
// //           <DetailOverlay
// //             activeStory={activeStory}
// //             detailRef={detailRef}
// //             bgRef={bgRef}
// //             detailImgRef={detailImgRef}
// //             detailImgTagRef={detailImgTagRef}
// //             detailScrollRef={detailScrollRef}
// //             textRef={textRef}
// //             onScroll={handleDetailScroll}
// //             onClose={closeCard}
// //           />,
// //           document.body,
// //         )}
// //     </section>
// //   );
// // }

// // export default CaseStudies;


// "use client";
// import { FastAverageColor } from "fast-average-color";
// import { useEffect, useRef, useState } from "react";
// import { createPortal } from "react-dom";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Flip } from "gsap/Flip";
// import { useGSAP } from "@gsap/react";
// import StoryCard from "@/components/StoryCard";
// import MeshBg from "@/components/MeshBg";
// import Link from "next/link";

// gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);
// // Prevents mobile browsers from silently recalculating trigger positions
// // when the address bar shows/hides mid-scroll (a common secondary cause
// // of pinned sections jumping to the wrong card on mobile).
// ScrollTrigger.config({ ignoreMobileResize: true });

// const STORIES = [
//   {
//     logo: "url",
//     title: "Pacific International",
//     region: "DUBAI",
//     image: "/pacific.png",
//     des: "The Members Experience lets you personalize your favorite pacific",
//     vid: "url",
//     projectScope:"Business portfolio, services showcasing, and an online client enquiry system through the website.",
//     problem:"Pacific International lacked a centralized, modern digital presence to effectively showcase their global service capabilities. Their existing communication channels resulted in fragmented, manual customer inquiries, making it difficult to capture, track, and qualify high-value business leads efficiently.",
//     solution:"We engineered a sleek, high-performance business portfolio website designed to clearly categorize and showcase their full suite of services. The platform was integrated with a custom, secure online client enquiry system featuring automated routing. This streamlined lead capture, reduced response times, and provided a seamless user experience for prospective B2B clients.",
//     testimonial:'"The new platform completely transformed how we present our business to the world. The automated enquiry system has significantly cut down our administrative overhead and allowed our team to respond to high-priority leads faster than ever before."',
//     websiteLink: "https://pacificinternationalservices.com/",
//     testimonialName: "— Management Team, Pacific International"
//   },
//   {
//     logo: "url",
//     title: "Fiable Constructions",
//     region: "INDIA",
//     image: "/fiable.png",
//     des: "The Members Experience lets you personalize your favorite Fiable",
//     vid: "url",
//      projectScope:"Business portfolio, services showcasing, online client enquiry system through the website, dynamic projects adding system, SEO optimization, and growth marketing.",
//     problem:"Fiable Constructions needed a way to highlight their growing portfolio of completed and ongoing projects without constantly relying on developers for manual site updates. Furthermore, low search engine visibility and a lack of structured digital marketing meant they were missing out on valuable local commercial and residential construction leads.",
//     solution:"We developed a robust, scalable digital ecosystem featuring a dynamic dynamic projects adding system (CMS), allowing their team to upload new case studies, images, and milestones on the fly. To drive traffic, we implemented an aggressive on-page and technical SEO optimization strategy combined with data-backed growth marketing campaigns, funneling high-intent traffic directly into a custom online client enquiry system.",
//     testimonial:'"Having the ability to showcase our new construction projects instantly has given us a massive competitive edge. Combined with the SEO boost and growth marketing strategies, our inbound project inquiries have increased dramatically."',
//     websiteLink: "https://www.fiableconstructions.com/",
//     testimonialName:" — Director, Fiable Constructions"
//   },
//   {
//     logo: "url",
//     title: "RP Infra",
//     region: "INDIA",
//     image: "/RP.png",
//     des: "The Members Experience lets you personalize your favorite RP Infra",
//     vid: "url",
//      projectScope:"",
//     problem:"",
//     solution:"",
//     testimonial:"",
//     websiteLink: "",
//     testimonialName:""
//   },
// ];

// const CLOSE_DURATION = 0.9;
// const OPEN_DURATION = 0.7;

// function DetailOverlay({
//   activeStory,
//   detailRef,
//   bgRef,
//   detailImgRef,
//   detailImgTagRef,
//   detailScrollRef,
//   textRef,
//   onScroll,
//   onClose,
// }) {
//   return (
//     <div
//       ref={detailRef}
//       className="fixed inset-0 z-40"
//       style={{ visibility: "hidden" }}
//     >
//       <div ref={bgRef} className="absolute inset-0 bg-[#8A7198]" />

//       <div
//         ref={detailImgRef}
//         className="relative mt-24  w-full overflow-hidden rounded-lg px-2 md:fixed md:top-24 md:right-[8vw] md:z-10 md:mt-0 md:h-[46vh] md:w-[38vw] md:px-0"
//       >
//         <img
//           ref={detailImgTagRef}
//           src={activeStory.image}
//           className=" object-cover"
//         />
//  <p className=" text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
//             <span className="font-bold">Website Link: </span><Link target="_blanck" href={`${activeStory.websiteLink}`}> {activeStory.websiteLink}</Link> 
//           </p>
//       </div>

//       <div
//         ref={detailScrollRef}
//         onScroll={onScroll}
//         className="relative z-20 h-full w-full overflow-y-auto px-[8vw] pb-16 lg:pt-32 md:pt-32"
//       >
//         <div ref={textRef} className="max-w-xl">
//           <h2 className="mt-4 font-display text-xl font-semibold text-ivory md:text-3xl lg:text-5xl">
//             {activeStory.title}
//           </h2>
//           <p className="mt-2 text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
//             <span className="font-bold">Scope: </span>{activeStory.projectScope}
//           </p>
//           <p className="mt-2 text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
//             <span className="font-bold">Problem: </span>{activeStory.problem}
//           </p>
//           <p className="mt-2 text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
//             <span className="font-bold">Solution: </span>{activeStory.solution}
//           </p>
//           <p className="mt-2 text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
//             <span className="font-bold">Testimonial: <br/> </span>{activeStory.testimonial}
//           </p>
//         <p className="text-base leading-8 text-ivory/88 font-semibold">{activeStory.testimonialName}</p>
//           <p className="mt-6 text-xs tracking-[0.35em] text-ivory/30">REGION</p>
//           <p className="mt-2 text-sm text-ivory/40">{activeStory.region}</p>
//           <button
//             onClick={onClose}
//             className="mt-6 text-sm text-ivory/60 underline md:mt-10 lg:mt-16"
//           >
//             ← Back to case studies
//           </button>
//         </div>
//         <div className="h-[70vh]" />
//       </div>
//     </div>
//   );
// }

// function CaseStudies() {
//   const imgRef = useRef(null);
//   const [rgb, setRgb] = useState("100,100,255");

//   const sectionRef = useRef(null);
//   const trackRef = useRef(null);
//   const cardRefs = useRef([]);

//   const stRef = useRef(null);
//   const detailRef = useRef(null);
//   const bgRef = useRef(null);
//   const detailImgRef = useRef(null);
//   const detailImgTagRef = useRef(null);
//   const detailScrollRef = useRef(null);
//   const textRef = useRef(null);

//   const [selected, setSelected] = useState(null);
//   const [activeStory, setActiveStory] = useState(STORIES[0]);
//   const [mounted, setMounted] = useState(false);
//   const [resetTick, setResetTick] = useState(0);

//   const animatingRef = useRef(false);
//   const scrollLockY = useRef(0);

//   useEffect(() => setMounted(true), []);

//   useEffect(() => {
//     if (!imgRef.current) return;
//     const fac = new FastAverageColor();
//     fac.getColorAsync(imgRef.current).then((color) => {
//       setRgb(color.value.slice(0, 3).join(","));
//     });
//   }, []);

//   useGSAP(
//     () => {
//       const reduce = window.matchMedia(
//         "(prefers-reduced-motion: reduce)",
//       ).matches;
//       const cards = cardRefs.current.filter(Boolean);
//       const track = trackRef.current;
//       const section = sectionRef.current;

//       if (!track || !section) return;

//       ScrollTrigger.getAll()
//         .filter((st) => st.trigger === section)
//         .forEach((st) => st.kill());

//       if (reduce) {
//         gsap.set(cards, { opacity: 1 });
//         return;
//       }

//       gsap.set(cards, { opacity: 0, x: 80 });

//       const getScrollDistance = () => track.scrollWidth - section.clientWidth;

//       const horizontalTween = gsap.to(track, {
//         x: () => -getScrollDistance(),
//         ease: "none",
//       });

//       stRef.current = ScrollTrigger.create({
//         trigger: section,
//         start: "top top",
//         end: () => `+=${getScrollDistance()}`,
//         pin: true,
//         scrub: 1,
//         anticipatePin: 1,
//         animation: horizontalTween,
//         invalidateOnRefresh: true,
//         onEnter: (self) => {
//           // On a fast mobile flick, native scroll can jump well past the
//           // pin's start point before this callback fires, so `track` has
//           // already been translated left by the time we get here — that's
//           // what was hiding cards 1 & 2 and showing card 3 first. Snap
//           // scroll back to the pin's exact start so `track` is always at
//           // x: 0 when the reveal plays, regardless of scroll speed/device.
//           if (self.progress > 0.001) {
//             window.scrollTo({ top: self.start, behavior: "auto" });
//           }

//           gsap.to(cards, {
//             opacity: 1,
//             x: 0,
//             duration: 0.8,
//             ease: "power3.out",
//             stagger: 0.15,
//           });
//         },
//         onEnterBack: () => {
//           gsap.to(cards, { opacity: 1, x: 0, duration: 0.4 });
//         },
//       });

//       const refresh = () => ScrollTrigger.refresh();
//       if (document.readyState === "complete") {
//         refresh();
//       } else {
//         window.addEventListener("load", refresh);
//       }
//       document.fonts?.ready?.then(refresh);

//       return () => {
//         window.removeEventListener("load", refresh);
//       };
//     },
//     { scope: sectionRef },
//   );

//   const lockScroll = () => {
//     scrollLockY.current = window.scrollY;
//     document.body.style.position = "fixed";
//     document.body.style.top = `-${scrollLockY.current}px`;
//     document.body.style.left = "0";
//     document.body.style.right = "0";
//   };

//   const unlockScroll = () => {
//     document.body.style.position = "";
//     document.body.style.top = "";
//     document.body.style.left = "";
//     document.body.style.right = "";
//     window.scrollTo(0, scrollLockY.current);
//   };

//   const openCard = (i) => {
//     if (animatingRef.current) return;
//     const cardEl = cardRefs.current[i];
//     const imgEl = cardEl?.querySelector("[data-flip-img]");
//     if (!imgEl) return;

//     animatingRef.current = true;

//     gsap.killTweensOf([detailImgRef.current, bgRef.current, textRef.current]);
//     Flip.killFlipsOf(detailImgRef.current);

//     gsap.set(detailImgRef.current, { clearProps: "all" });

//     const state = Flip.getState(imgEl);

//     setActiveStory(STORIES[i]);
//     setSelected(i);
//     if (detailImgTagRef.current) detailImgTagRef.current.src = STORIES[i].image;

//     lockScroll();

//     requestAnimationFrame(() => {
//       if (!detailImgRef.current) return;

//       gsap.set(detailRef.current, { autoAlpha: 1, pointerEvents: "auto" });
//       gsap.set(bgRef.current, { opacity: 1 });
//       gsap.set(textRef.current, { opacity: 0, y: 24 });
//       if (detailScrollRef.current) detailScrollRef.current.scrollTop = 0;

//       Flip.from(state, {
//         targets: detailImgRef.current,
//         duration: OPEN_DURATION,
//         ease: "power3.inOut",
//         absolute: true,
//         scale: true,
//         onComplete: () => {
//           animatingRef.current = false;
//         },
//       });

//       gsap.to(textRef.current, {
//         opacity: 1,
//         y: 0,
//         duration: 0.5,
//         delay: 0.3,
//         ease: "power2.out",
//       });
//     });
//   };

//   const closeCard = () => {
//     if (selected === null || animatingRef.current) return;
//     animatingRef.current = true;

//     const i = selected;
//     const cardEl = cardRefs.current[i];
//     const cardImgEl = cardEl?.querySelector("[data-flip-img]");
//     const detailImgEl = detailImgRef.current;

//     if (!cardImgEl || !detailImgEl) {
//       setSelected(null);
//       animatingRef.current = false;
//       unlockScroll();
//       return;
//     }

//     gsap.set(detailRef.current, { pointerEvents: "none" });
//     gsap.killTweensOf([detailImgEl, bgRef.current, textRef.current]);
//     Flip.killFlipsOf(detailImgEl);

//     if (detailScrollRef.current) detailScrollRef.current.scrollTop = 0;
//     gsap.set(detailImgEl, { clearProps: "transform" });

//     gsap.to(textRef.current, {
//       opacity: 0,
//       y: 24,
//       duration: 0.3,
//       ease: "power2.in",
//     });
//     gsap.to(bgRef.current, {
//       opacity: 0,
//       duration: CLOSE_DURATION,
//       ease: "power2.inOut",
//     });

//     requestAnimationFrame(() => {
//       Flip.fit(detailImgEl, cardImgEl, {
//         duration: CLOSE_DURATION,
//         ease: "power3.inOut",
//         scale: true,
//         absolute: true,
//         onComplete: () => {
//           gsap.set(detailRef.current, { autoAlpha: 0 });
//           gsap.set(cardImgEl, { clearProps: "transform" });
//           setSelected(null);
//           animatingRef.current = false;
//           unlockScroll();
//           setResetTick((t) => t + 1);
//         },
//       });
//     });
//   };

//   const handleDetailScroll = (e) => {
//     const el = e.currentTarget;
//     if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) closeCard();
//   };

//   return (
//     <section
//       ref={sectionRef}
//       id="top-stories"
//       className="relative px-[8vw] py-28 h-screen overflow-hidden bg-white/28"
//     >
//       <MeshBg />
//       <div ref={trackRef} className="flex max-w-none gap-14 w-max pr-72 pt-14">
//         {STORIES.map((s, i) => (
//           <StoryCard
//             key={`${i}-${resetTick}`}
//             story={s}
//             ref={(el) => (cardRefs.current[i] = el)}
//             onOpen={() => openCard(i)}
//           />
//         ))}
//       </div>

//       {mounted &&
//         createPortal(
//           <DetailOverlay
//             activeStory={activeStory}
//             detailRef={detailRef}
//             bgRef={bgRef}
//             detailImgRef={detailImgRef}
//             detailImgTagRef={detailImgTagRef}
//             detailScrollRef={detailScrollRef}
//             textRef={textRef}
//             onScroll={handleDetailScroll}
//             onClose={closeCard}
//           />,
//           document.body,
//         )}
//     </section>
//   );
// }

// export default CaseStudies;
"use client";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import StoryCard from "@/components/StoryCard";
import MeshBg from "@/components/MeshBg";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);
// Prevents mobile browsers from silently recalculating trigger positions
// when the address bar shows/hides mid-scroll (a common secondary cause
// of pinned sections jumping to the wrong card on mobile).
ScrollTrigger.config({ ignoreMobileResize: true });

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
    testimonial:'"The new platform completely transformed how we present our business to the world. The automated enquiry system has significantly cut down our administrative overhead and allowed our team to respond to high-priority leads faster than ever before."',
    websiteLink: "https://pacificinternationalservices.com/",
    testimonialName: "— Management Team, Pacific International"
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
    testimonial:'"Having the ability to showcase our new construction projects instantly has given us a massive competitive edge. Combined with the SEO boost and growth marketing strategies, our inbound project inquiries have increased dramatically."',
    websiteLink: "https://www.fiableconstructions.com/",
    testimonialName:" — Director, Fiable Constructions"
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
    websiteLink: "",
    testimonialName:""
  },
];

const CLOSE_DURATION = 0.9;
const OPEN_DURATION = 0.7;

function DetailOverlay({
  activeStory,
  detailRef,
  bgRef,
  detailImgRef,
  detailImgTagRef,
  detailScrollRef,
  textRef,
  onScroll,
  onClose,
}) {
  return (
    <div
      ref={detailRef}
      className="fixed inset-0 z-40"
      style={{ visibility: "hidden" }}
    >
      <div ref={bgRef} className="absolute inset-0 bg-[#8A7198]" />

      {/* Desktop only: pinned image, fixed to the viewport, outside the
          scroll container. Hidden on mobile — see the in-flow version
          inside detailScrollRef below. This is also the element the
          Flip open/close animation targets, so it stays in the DOM
          structure as before; it's just visually hidden < md. */}
      <div
        ref={detailImgRef}
        className="relative mt-24 hidden w-full overflow-hidden rounded-lg px-2 md:fixed md:top-24 md:right-[8vw] md:z-10 md:mt-0 md:block md:h-[46vh] md:w-[38vw] md:px-0"
      >
        <img
          ref={detailImgTagRef}
          src={activeStory.image}
          className=" object-cover"
        />
        <p className=" text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
          <span className="font-bold">Website Link: </span>
          <Link className="" target="_blanck" href={`${activeStory.websiteLink}`}> {activeStory.websiteLink}</Link>
        </p>
      </div>

      <div
        ref={detailScrollRef}
        onScroll={onScroll}
        className="relative z-20 h-full w-full overflow-y-auto px-[8vw] pb-16 lg:pt-32 md:pt-32"
      >
        {/* Mobile only: image lives INSIDE the scroll container now, so
            it scrolls away naturally with the rest of the content
            instead of staying pinned at the top. Hidden on desktop —
            the fixed version above handles that layout. */}
        <div className="relative mt-24 w-full overflow-hidden rounded-lg md:hidden">
          <img src={activeStory.image} className="w-full object-cover" />
        </div>

        <div ref={textRef} className="max-w-xl">
          <h2 className="mt-4 font-display text-xl font-semibold text-ivory md:text-3xl lg:text-5xl">
            {activeStory.title}
          </h2>
          <p className="mt-2 text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
            <span className="font-bold">Scope: </span>{activeStory.projectScope}
          </p>
          <p className="mt-2 text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
            <span className="font-bold">Problem: </span>{activeStory.problem}
          </p>
          <p className="mt-2 text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
            <span className="font-bold">Solution: </span>{activeStory.solution}
          </p>
          <p className="mt-2 text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8">
            <span className="font-bold">Testimonial: <br/> </span>{activeStory.testimonial}
          </p>
          <p className="text-base leading-8 text-ivory/88 font-semibold">{activeStory.testimonialName}</p>
          <p className="mt-2 text-base leading-8 text-ivory/88 md:mt-6 lg:mt-8 md:hidden">
            <span className="font-bold">Website Link: </span>
            <Link className="text-sm" target="_blanck" href={`${activeStory.websiteLink}`}> {activeStory.websiteLink}</Link>
          </p>
          <p className="mt-6 text-xs tracking-[0.35em] text-ivory/30">REGION</p>
          <p className="mt-2 text-sm text-ivory/40">{activeStory.region}</p>
          <button
            onClick={onClose}
            className="mt-6 text-sm text-ivory/60 underline md:mt-10 lg:mt-16"
          >
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
  const [resetTick, setResetTick] = useState(0);

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

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
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
        anticipatePin: 1,
        animation: horizontalTween,
        invalidateOnRefresh: true,
        onEnter: (self) => {
          // On a fast mobile flick, native scroll can jump well past the
          // pin's start point before this callback fires, so `track` has
          // already been translated left by the time we get here — that's
          // what was hiding cards 1 & 2 and showing card 3 first. Snap
          // scroll back to the pin's exact start so `track` is always at
          // x: 0 when the reveal plays, regardless of scroll speed/device.
          if (self.progress > 0.001) {
            window.scrollTo({ top: self.start, behavior: "auto" });
          }

          gsap.to(cards, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
          });
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
    },
    { scope: sectionRef },
  );

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
        onComplete: () => {
          animatingRef.current = false;
        },
      });

      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out",
      });
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

    if (detailScrollRef.current) detailScrollRef.current.scrollTop = 0;
    gsap.set(detailImgEl, { clearProps: "transform" });

    gsap.to(textRef.current, {
      opacity: 0,
      y: 24,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(bgRef.current, {
      opacity: 0,
      duration: CLOSE_DURATION,
      ease: "power2.inOut",
    });

    requestAnimationFrame(() => {
      Flip.fit(detailImgEl, cardImgEl, {
        duration: CLOSE_DURATION,
        ease: "power3.inOut",
        scale: true,
        absolute: true,
        onComplete: () => {
          gsap.set(detailRef.current, { autoAlpha: 0 });
          gsap.set(cardImgEl, { clearProps: "transform" });
          setSelected(null);
          animatingRef.current = false;
          unlockScroll();
          setResetTick((t) => t + 1);
        },
      });
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
      className="relative px-[8vw] py-28 h-screen overflow-hidden bg-white/28"
    >
      <MeshBg />
      <div ref={trackRef} className="flex max-w-none gap-14 w-max pr-72 pt-14">
        {STORIES.map((s, i) => (
          <StoryCard
            key={`${i}-${resetTick}`}
            story={s}
            ref={(el) => (cardRefs.current[i] = el)}
            onOpen={() => openCard(i)}
          />
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
          document.body,
        )}
    </section>
  );
}

export default CaseStudies;