"use client";

import React, { useEffect, useState, useRef } from "react";
import { HERO_LAYOUT } from "./HeroNamePaths";

const DRAW_DURATION = 2.0;
const VIEWBOX_HEIGHT = 160;
const MIN_VIEWBOX_WIDTH = 1024;

export default function AnimatedHeroName() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ isVisible, setIsVisible ] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([ entry ]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const { totalWidth, glyphs } = HERO_LAYOUT;
  const viewBoxWidth = Math.max(totalWidth + 160, MIN_VIEWBOX_WIDTH);
  const baseX = (viewBoxWidth - totalWidth) / 2;

  return (
    <div ref={ containerRef } className="flex min-h-[8rem] w-full items-center justify-center">
      { isVisible && (
        <svg
          role="img"
          aria-label="Eduardo Neto"
          className="h-32 w-full"
          viewBox={ `0 0 ${viewBoxWidth} ${VIEWBOX_HEIGHT}` }
          fill="none"
        >
          <g transform={ `translate(${baseX}, 0)` } style={ { filter: "drop-shadow(0 0 8px rgba(255, 136, 32, 0.3))" } }>
            { glyphs.reduce((acc: { nodes: React.ReactNode[], globalPathIndex: number }, glyph: any, glyphIndex: number) => {
              if (!glyph.paths.length) {
                acc.nodes.push(<React.Fragment key={ `space-${glyphIndex}` } />);
                return acc;
              }

              const glyphGroup = (
                <g key={ `${glyph.char}-${glyphIndex}` }>
                  { glyph.paths.map((d: string, pathIndex: number) => {
                    // Stagger animation based on global path index for continuous flow
                    // Added small initial delay (0.2s) to allow main thread to settle
                    const outlineDelay = 0.2 + (acc.globalPathIndex + pathIndex) * 0.04;

                    return (
                      <path
                        key={ `${glyph.char}-${glyphIndex}-${pathIndex}` }
                        d={ d }
                        className="hero-path"
                        pathLength={ 1 }
                        style={ { animationDelay: `${outlineDelay}s` } }
                      />
                    );
                  }) }
                </g>
              );

              acc.nodes.push(glyphGroup);
              acc.globalPathIndex += glyph.paths.length;
              return acc;
            }, { nodes: [], globalPathIndex: 0 }).nodes }
          </g>

          <style jsx>{ `
            @keyframes hero-outline-draw {
              0% {
                stroke-dashoffset: 1;
                stroke-opacity: 0;
              }
              10% {
                stroke-opacity: 1;
              }
              100% {
                stroke-dashoffset: 0;
                stroke-opacity: 1;
              }
            }

            .hero-path {
              stroke: #ff8820;
              stroke-width: 2;
              stroke-linecap: round;
              stroke-linejoin: round;
              fill: none; 
              stroke-dasharray: 1;
              stroke-dashoffset: 1;
              will-change: stroke-dashoffset, stroke-opacity;
              animation-name: hero-outline-draw;
              animation-duration: ${DRAW_DURATION}s;
              animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
              animation-fill-mode: forwards;
            }
          `}</style>
        </svg>
      ) }
    </div>
  );
}
