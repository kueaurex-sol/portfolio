"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useState } from "react";
import { generateWavePath } from "@/components/Waves";

export default function WavePath({
  color = "#D026FF",

  width = 1200,
  height = 180,

  amplitude = 18,
  frequency = 2,

  speed = 1,

  opacity = 1,

  baseHeight = 70,
}) {
  const [path, setPath] = useState(
    generateWavePath({
      width,
      height,
      amplitude,
      frequency,
      baseHeight,
      phase: 0,
    })
  );

  useAnimationFrame((time) => {
    const phase = time * 0.0012 * speed;

    setPath(
      generateWavePath({
        width,
        height,
        amplitude,
        frequency,
        baseHeight,
        phase,
      })
    );
  });

  return (
    <motion.svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="absolute left-0 top-0 h-full w-full"
      style={{
        opacity,
      }}
    >
      <path
        d={path}
        fill={color}
      />
    </motion.svg>
  );
}