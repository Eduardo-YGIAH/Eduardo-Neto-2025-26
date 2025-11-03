"use client";

import React from "react";

const NAME = "EDUARDO NETO";

export default function AnimatedHeroName() {
  const letters = NAME.split("");
  // Spacing in SVG units (space gets an extra gap)
  const letterSpacing = 70;
  const spaceExtra = 30;
  const viewBoxWidth = 1200;
  const baselineY = 96;

  // Compute total group width for perfect centering
  const totalWidth = letters.reduce((acc, ch) => acc + letterSpacing + (ch === " " ? spaceExtra : 0), 0);
  const startX = (viewBoxWidth - totalWidth) / 2;

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
        viewBox={`0 0 ${viewBoxWidth} 160`}
        fill="none"
      >
        <g textAnchor="start" fontSize="96" fontWeight={900} fontFamily="Montserrat, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">
          {letters.map((ch, idx) => {
            const offset = letters.slice(0, idx).reduce((acc, c) => acc + letterSpacing + (c === " " ? spaceExtra : 0), 0);
            return (
              <text
                key={idx}
                x={startX + offset}
                y={baselineY}
                className="hero-letter"
                style={{
                  // Stagger draw per letter; fill starts globally after all draw
                  animationDelay: `${idx * stagger}s, ${fillDelay}s`,
                } as React.CSSProperties}
              >
                {ch}
              </text>
            );
          })}
        </g>

        <style jsx>{`
          @keyframes hero-draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes hero-fill {
            to { fill-opacity: 0.28; }
          }
          .hero-letter {
            stroke: #ff8a3d; /* slightly softened orange for better legibility */
            stroke-width: 3.5;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 420;
            stroke-dashoffset: 420;
            fill: #ff8a3d;
            fill-opacity: 0;
            filter: drop-shadow(0 0 10px rgba(255, 138, 61, 0.25));
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


