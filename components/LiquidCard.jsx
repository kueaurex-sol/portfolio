// "use client";
// import { useState } from "react";
// import Waves from "./Waves";
// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
// import { useRef } from "react";

// export default function LiquidCard({
//   children,
//   color = "#D026FF",
//   className = "",
// }) {
//   const [hovered, setHovered] = useState(false);
//   const ref = useRef(null);

//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
//     stiffness: 120,
//     damping: 20,
//   });

//   const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
//     stiffness: 120,
//     damping: 20,
//   });

//   const waveOffset = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), {
//     stiffness: 80,
//     damping: 18,
//   });

//   const shineX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-120, 120]));

//   const shineY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-80, 80]));
//   const handleMove = (e) => {
//     const rect = ref.current.getBoundingClientRect();

//     const x = (e.clientX - rect.left) / rect.width;
//     const y = (e.clientY - rect.top) / rect.height;

//     mouseX.set(x - 0.5);
//     mouseY.set(y - 0.5);
//   };
//   return (
//     <motion.div
//       onHoverStart={() => setHovered(true)}
//       onHoverEnd={() => setHovered(false)}
//       className={`
//                 relative
//                 overflow-hidden
//                 rounded-[32px]
//                 border
//                 border-white/10
//                 backdrop-blur-xl
//                 ${className}
//             `}
//     >
//       {/* CONTENT */}
//       <motion.div
//         className="relative z-30 h-full"
//         animate={{
//           color: hovered ? "#fff" : "#ffffffcc",
//         }}
//         transition={{
//           duration: 0.35,
//         }}
//       >
//         {children}
//       </motion.div>

//       {/* LIQUID */}
//       <motion.div
//         className="absolute inset-0 z-20 overflow-hidden"
//         initial={{
//           y: "100%",
//         }}
//         animate={{
//           y: hovered ? "0%" : "100%",
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 85,
//           damping: 18,
//         }}
//       >
//         {/* BODY */}
//         <div
//           className="absolute inset-0"
//           style={{
//             background: color,
//           }}
//         />

//         {/* Waves go here */}
//         <motion.div
//           style={{
//             x: waveOffset,
//           }}
//         >
//           <Waves color={color} />
//         </motion.div>

//         {/* Shine goes here */}
// <motion.div

// style={{
//     x:shineX,
//     y:shineY
// }}

// className="
// absolute
// left-1/2
// top-1/2
// h-52
// w-52
// rounded-full
// bg-white/20
// blur-3xl
// mix-blend-screen
// "
// />
// <motion.div
// style={{
//     rotate:waveOffset
// }}
// ></motion.div>
//         {/* Bubbles go here */}
//       </motion.div>

//       {/* BORDER GLOW */}

//       <motion.div
//         className="absolute inset-0 rounded-[32px] pointer-events-none"
//         animate={{
//           boxShadow: hovered ? `0 0 80px ${color}55` : "0 0 0px transparent",
//         }}
//         transition={{
//           duration: 0.4,
//         }}
//       />
//     </motion.div>
//   );
// }

"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

// import Waves from "./Waves";

export default function LiquidCard({
  children,
  color = "#D026FF",
  className = "",
}) {
  const [hovered, setHovered] = useState(false);

  const ref = useRef(null);

  /* ---------------- Mouse ---------------- */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    {
      stiffness: 180,
      damping: 22,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    {
      stiffness: 180,
      damping: 22,
    }
  );

  const waveOffset = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-35, 35]),
    {
      stiffness: 60,
      damping: 16,
      mass: 0.8,
    }
  );

  const shineX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-120, 120]),
    {
      stiffness: 60,
      damping: 18,
    }
  );

  const shineY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-90, 90]),
    {
      stiffness: 60,
      damping: 18,
    }
  );

  function handleMove(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
  }

  function handleLeave() {
    setHovered(false);

    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        backdrop-blur-xl
        ${className}
      `}
    >
      {/* ---------------- Content ---------------- */}

      <motion.div
        className="relative z-30 h-full"
        animate={{
          color: hovered ? "#ffffff" : "#1F1631",
        }}
        transition={{
          duration: 0.35,
        }}
      >
        {children}
      </motion.div>

      {/* ---------------- Liquid ---------------- */}

      <motion.div
        className="absolute inset-0 z-20 overflow-hidden"
        initial={{
          y: "105%",
        }}
        animate={{
          y: hovered ? "-2%" : "105%",
        }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 16,
        }}
      >
        {/* Entire Liquid */}

        <motion.div
          className="absolute left-0 w-full"
          style={{
            x: waveOffset,
            top: "-110px",
            height: "calc(100% + 110px)",
          }}
        >
          {/* Wave Surface */}

          <div className="absolute left-0 top-0 h-[120px] w-full overflow-hidden">
            {/* <Waves color={color} /> */}
          </div>

          {/* Water */}

          <div
            className="absolute left-0 right-0 top-[90px] bottom-0"
            style={{
              background: color,
            }}
          />

          {/* Soft Highlight */}

          <motion.div
            style={{
              x: shineX,
              y: shineY,
            }}
            className="
              absolute
              left-1/2
              top-1/2
              h-72
              w-72
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white/20
              blur-3xl
              mix-blend-screen
            "
          />

          {/* Gloss */}

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30"
            animate={{
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Bubbles */}

          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/50"
              style={{
                width: 6 + i,
                height: 6 + i,
                left: `${12 + i * 10}%`,
                bottom: 20,
              }}
              animate={{
                y: [0, -260],
                x: [0, 8, -5, 4, 0],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 2.5 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* ---------------- Glow ---------------- */}

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[32px]"
        animate={{
          boxShadow: hovered
            ? `0 0 80px ${color}66`
            : `0 0 0px transparent`,
        }}
        transition={{
          duration: 0.4,
        }}
      />
    </motion.div>
  );
}