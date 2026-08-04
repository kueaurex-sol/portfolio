// "use client";

// import { useEffect, useRef, useState } from "react";
// import { FastAverageColor } from "fast-average-color";

// function lighten(rgb, amount) {
//   const [r, g, b] = rgb;
//   return `rgb(
//     ${Math.min(255, r + amount)},
//     ${Math.min(255, g + amount)},
//     ${Math.min(255, b + amount)}
//   )`;
// }

// const WAVE = [
//   { x: 24, y: 10, r: -0.6, scale: 1.02, shadow: 0.1 },
//   { x: 20, y: 10, r: 0.5, scale: 1.04, shadow: 0.16 },
//   { x: 16, y: 10, r: -0.4, scale: 1.06, shadow: 0.22 },
//   { x: 12, y: 10, r: 0.3, scale: 1.08, shadow: 0.3 },
// ];

// export default function StoryCard({ story }) {
//   const imgRef = useRef(null);
//   const [hovered, setHovered] = useState(false);

//   const [layers, setLayers] = useState(["#bbb", "#aaa", "#999", "#888"]);

//   useEffect(() => {
//     if (!imgRef.current) return;
//     const fac = new FastAverageColor();
//     fac.getColorAsync(imgRef.current).then((color) => {
//       const rgb = color.value.slice(0, 3);
//       setLayers([
//         lighten(rgb, 90),
//         lighten(rgb, 65),
//         lighten(rgb, 40),
//         lighten(rgb, 20),
//       ]);
//     });
//   }, []);

//   return (
//     <div
//       className="group cursor-pointer  overflow-visible"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* IMAGE STACK */}
//       <div className="relative h-44 w-96 overflow-visible pt-4 pb-2">
//         {WAVE.map((w, i) => (
//           <div
//             key={i}
//             style={{
//               background: layers[i],
//               zIndex: i,
//               boxShadow: hovered
//                 ? `0 ${10 + i * 3}px ${18 + i * 4}px -10px rgba(0,0,0,${w.shadow})`
//                 : "0 0px 0px 0px rgba(0,0,0,0)",
//               transitionProperty: "transform, box-shadow",
//               transitionDuration: "550ms",
//               transitionDelay: `${i * 60}ms`,
//               transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
//               transform: hovered
//                 ? `translate(${w.x}px, ${-w.y}px) rotate(${w.r}deg) scale(${w.scale})`
//                 : "translate(0px, 0px) rotate(0deg) scale(1)",
//             }}
//             className="absolute left-0 top-4 h-44 w-full"
//           />
//         ))}

//         {/* IMAGE — no overflow-hidden here, so scaling reveals more of the image, never crops it */}
//         <div
//           className="absolute left-0 top-4 h-44 w-96"
//           style={{
//             zIndex: 30,
//             transformOrigin: "center",
//             boxShadow: hovered
//               ? "0 28px 44px -12px rgba(0,0,0,0.5)"
//               : "0 0px 0px 0px rgba(0,0,0,0)",
//             transitionProperty: "transform, box-shadow",
//             transitionDuration: "550ms",
//             transitionDelay: "90ms",
//             transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
//             transform: hovered
//               ? "translateY(-18px) scale(1.12)"
//               : "translateY(0px) scale(1)",
//           }}
//         >
//           <img
//             ref={imgRef}
//             src={story.image}
//             className="h-full w-full object-cover"
//           />
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="pt-8">
//         <h3 className="font-display text-2xl font-semibold text-ivory">
//           {story.title}
//         </h3>
//         <p className="font-display text-xl italic text-ivory/70">
//           members experience
//         </p>
//         <div className="mt-3 h-px w-12 bg-ivory transition-all duration-500 group-hover:w-24" />
//         <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
//           <div className="overflow-hidden">
//             <div className="translate-y-6 opacity-0 transition-all duration-500 delay-200 group-hover:translate-y-0 group-hover:opacity-100">
//               <p className="mt-3 text-sm leading-7 text-ivory/70">
//                 {story.des}
//               </p>
//               <p className="mt-2 text-xs tracking-[0.35em] text-ivory/30">
//                 REGION
//               </p>
//               <p className="mt-2 text-sm text-ivory/40">{story.region}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";

function lighten(rgb, amount) {
  const [r, g, b] = rgb;
  return `rgb(
    ${Math.min(255, r + amount)},
    ${Math.min(255, g + amount)},
    ${Math.min(255, b + amount)}
  )`;
}

 const WAVE = [
   { x: 24, y: 10, r: -0.6, scale: 1.02, shadow: 0.1 },
   { x: 20, y: 10, r: 0.5, scale: 1.04, shadow: 0.16 },
   { x: 16, y: 10, r: -0.4, scale: 1.06, shadow: 0.22 },
   { x: 12, y: 10, r: 0.3, scale: 1.08, shadow: 0.3 },
 ];

const StoryCard = forwardRef(function StoryCard({ story, onOpen }, ref) {
  const imgRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [layers, setLayers] = useState(["#bbb", "#aaa", "#999", "#888"]);

  useEffect(() => {
    if (!imgRef.current) return;
    const fac = new FastAverageColor();
    fac.getColorAsync(imgRef.current).then((color) => {
      const rgb = color.value.slice(0, 3);
      setLayers([
        lighten(rgb, 90),
        lighten(rgb, 65),
        lighten(rgb, 40),
        lighten(rgb, 20),
      ]);
    });
  }, []);

  return (
    <div
      ref={ref}
      className="group cursor-pointer  overflow-visible"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      {/* IMAGE STACK */}
      <div className="relative h-44 w-96 overflow-visible pt-4 pb-2">
        {WAVE.map((w, i) => (
          <div
            key={i}
            style={{
              background: layers[i],
              zIndex: i,
              boxShadow: hovered
                ? `0 ${10 + i * 3}px ${18 + i * 4}px -10px rgba(0,0,0,${w.shadow})`
                : "0 0px 0px 0px rgba(0,0,0,0)",
              transitionProperty: "transform, box-shadow",
              transitionDuration: "550ms",
              transitionDelay: `${i * 60}ms`,
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: hovered
                ? `translate(${w.x}px, ${-w.y}px) rotate(${w.r}deg) scale(${w.scale})`
                : "translate(0px, 0px) rotate(0deg) scale(1)",
            }}
            className="absolute left-0 top-4 h-44 w-full"
          />
        ))}

        {/* IMAGE — data-flip-img marks this as the morph target */}
        <div
          data-flip-img
          className="absolute left-0 top-4 h-44 w-96"
          style={{
            zIndex: 30,
            transformOrigin: "center",
            boxShadow: hovered
              ? "0 28px 44px -12px rgba(0,0,0,0.5)"
              : "0 0px 0px 0px rgba(0,0,0,0)",
            transitionProperty: "transform, box-shadow",
            transitionDuration: "550ms",
            transitionDelay: "90ms",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: hovered
              ? "translateY(-18px) scale(1.12)"
              : "translateY(0px) scale(1)",
          }}
        >
          <img
            ref={imgRef}
            src={story.image}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="pt-8">
        <h3 className="font-display text-2xl font-semibold text-ivory">
          {story.title}
        </h3>
        <p className="font-display text-xl italic text-ivory/70">
          members experience
        </p>
        <div className="mt-3 h-px w-12 bg-ivory transition-all duration-500 group-hover:w-24" />
        <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="translate-y-6 opacity-0 transition-all duration-500 delay-200 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="mt-3 text-sm leading-7 text-ivory/70">
                {story.des}
              </p>
              <p className="mt-2 text-xs tracking-[0.35em] text-ivory/30">
                REGION
              </p>
              <p className="mt-2 text-sm text-ivory/40">{story.region}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default StoryCard;