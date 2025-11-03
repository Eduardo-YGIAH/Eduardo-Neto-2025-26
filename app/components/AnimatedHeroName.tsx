"use client";

import React from "react";

const NAME = "EDUARDO NETO";

export default function AnimatedHeroName() {
  const letters = NAME.split("");
  // Visual spacing per letter in SVG units
  const letterSpacing = 68;
  const startX = 0;
  const baselineY = 96;

  // Animation timings
  const drawDuration = 1.2; // seconds per letter draw
  const stagger = 0.18; // seconds between letters
  const lastIndex = letters.length - 1;
  const fillDelay = lastIndex * stagger + drawDuration + 0.3; // start fill after the last letter completes

  return (
    <div className="mx-auto mt-10 flex items-center justify-center">
      <svg
        role="img"
        aria-label="EDUARDO NETO"
        className="h-32 w-[1100px] max-w-full"
        viewBox="0 0 1200 160"
        fill="none"
      >
        <g textAnchor="start" fontSize="96" fontWeight={900} fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">
          {letters.map((ch, idx) => (
            <text
              key={idx}
              x={startX + idx * letterSpacing}
              y={baselineY}
              className="hero-letter"
              style={{
                // Stagger draw per letter; fill starts globally after all draw
                animationDelay: `${idx * stagger}s, ${fillDelay}s`,
              } as React.CSSProperties}
            >
              {ch}
            </text>
          ))}
        </g>

        <style jsx>{`
          @keyframes hero-draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes hero-fill {
            to { fill-opacity: 0.35; }
          }
          .hero-letter {
            stroke: #ff8820;
            stroke-width: 3.5;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 420;
            stroke-dashoffset: 420;
            fill: #ff8820;
            fill-opacity: 0;
            /* Two animations: draw then fill, with per-letter stagger via animation-delay list */
            animation-name: hero-draw, hero-fill;
            animation-duration: ${drawDuration}s, 0.4s;
            animation-timing-function: ease-out, ease;
            animation-fill-mode: forwards, forwards;
          }
        `}</style>
      </svg>
    </div>
  );
}


