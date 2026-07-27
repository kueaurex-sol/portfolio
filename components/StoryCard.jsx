"use client";

import { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";

function lighten(rgb, amount) {
  const [r, g, b] = rgb;

  return `rgb(
    ${Math.min(255, r + amount)},
    ${Math.min(255, g + amount)},
    ${Math.min(255, b + amount)}
  )`;
}

export default function StoryCard({ story }) {
  const imgRef = useRef(null);

  const [layers, setLayers] = useState([
    "#bbb",
    "#aaa",
    "#999",
    "#888",
    "#777",
  ]);

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
        lighten(rgb, 0),
      ]);
    });
  }, []);

  return (
    <div className="group cursor-pointer w-72 overflow-visible">
      {/* IMAGE STACK */}
      <div className="relative h-44 overflow-visible">

        {/* Layer 5 */}
        <div
          style={{ background: layers[0] }}
          className="absolute left-0 top-0 h-44 w-full 
          transition-all duration-500
          group-hover:translate-x-6"
        />

        {/* Layer 4 */}
        <div
          style={{ background: layers[1] }}
          className="absolute left-0 top-0 h-44 w-full 
          transition-all duration-500 delay-75
          group-hover:translate-x-5"
        />

        {/* Layer 3 */}
        <div
          style={{ background: layers[2] }}
          className="absolute left-0 top-0 h-44 w-full 
          transition-all duration-500 delay-100
          group-hover:translate-x-3"
        />

        {/* Layer 2 */}
        <div
          style={{ background: layers[3] }}
          className="absolute left-0 top-0 h-44 w-full 
          transition-all duration-500 delay-150
          group-hover:translate-x-1"
        />

        {/* IMAGE */}
        <div
          className="
            absolute left-0 top-0
            z-20
            overflow-hidden
            transition-all duration-500
            w-full
            h-44
            group-hover:w-[102%]
            group-hover:h-[102%]
          "
        >
          <img
            ref={imgRef}
            src={story.image}
            className="h-44  w-96"
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

        <div className="mt-5 h-px w-12 bg-ivory transition-all duration-500 group-hover:w-24" />

        <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="translate-y-6 opacity-0 transition-all duration-500 delay-200 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="mt-6 text-sm leading-7 text-ivory/70">
                {story.des}
              </p>

              <p className="mt-8 text-xs tracking-[0.35em] text-ivory/30">
                REGION
              </p>

              <p className="mt-2 text-sm text-ivory/40">
                {story.region}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}