"use client";

import React from "react";

const NAME = "Eduardo Neto";

export default function AnimatedHeroName() {
  const letters = NAME.split("");
  // Visual spacing per letter in SVG units
  const letterSpacing = 56; // tune to taste for the chosen font size
  const startX = 0;
  const baselineY = 60;

  return (
    <div className="mx-auto mt-10 flex items-center justify-center">
      <svg
        role="img"
        aria-label="Eduardo Neto"
        className="h-24 w-[800px] max-w-full"
        viewBox="0 0 900 120"
        fill="none"
      >
        <g textAnchor="start" fontSize="64" fontWeight={800} fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">
          {letters.map((ch, idx) => (
            <text
              key={idx}
              x={startX + idx * letterSpacing}
              y={baselineY}
              className="hero-letter"
              style={{
                // 120ms stagger between letters
                // draw: 0.6s, then fill: 0.2s after
                // Using two animations with calculated delays per letter
                animationDelay: `${idx * 0.12}s, ${idx * 0.12 + 0.65}s`,
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
            to { fill-opacity: 1; }
          }
          .hero-letter {
            stroke: #ff8820;
            stroke-width: 2.5;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
            fill: #ffffff;
            fill-opacity: 0;
            /* Two animations: draw then fill, with per-letter stagger via animation-delay list */
            animation-name: hero-draw, hero-fill;
            animation-duration: 0.6s, 0.2s;
            animation-timing-function: ease, ease;
            animation-fill-mode: forwards, forwards;
          }
        `}</style>
      </svg>
    </div>
  );
}


