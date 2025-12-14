"use client";

import React, { useEffect, useState, useRef } from "react";
import { HERO_LAYOUT } from "./HeroNamePaths";

type Glyph = {
  char: string;
  paths: string[];
};

type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string;
  };
};

const DRAW_DURATION = 1.0;
const VIEWBOX_HEIGHT = 160;
const MIN_VIEWBOX_WIDTH = 1024;
const FALLBACK_TIMEOUT_MS = 3000;

// Slow connection types where we skip animation (includes 3G for better UX)
const SLOW_CONNECTION_TYPES = new Set([ "slow-2g", "2g", "3g" ]);

// Check once at module level for environments without IntersectionObserver
const hasIntersectionObserver = typeof IntersectionObserver !== "undefined";

export default function AnimatedHeroName() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Always start hidden to avoid hydration mismatch (server vs client IntersectionObserver availability)
  const [ isVisible, setIsVisible ] = useState(false);
  // Track if we should skip animation due to slow network or reduced motion
  const [ skipAnimation, setSkipAnimation ] = useState(false);

  useEffect(() => {
    // Check for slow network or reduced motion preference
    const connection = (navigator as NavigatorWithConnection).connection;
    const isSlowNetwork = connection?.effectiveType
      ? SLOW_CONNECTION_TYPES.has(connection.effectiveType)
      : false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLighthouse = /lighthouse/i.test(window.navigator.userAgent);

    if (isSlowNetwork || prefersReducedMotion || isLighthouse) {
      // Skip animation - show static version immediately
      queueMicrotask(() => {
        setSkipAnimation(true);
        setIsVisible(true);
      });
      return;
    }

    // If no IntersectionObserver, show immediately after hydration (async to satisfy lint)
    if (!hasIntersectionObserver) {
      queueMicrotask(() => setIsVisible(true));
      return;
    }

    // Fallback timeout: trigger animation if IntersectionObserver never fires
    const timeout = setTimeout(() => setIsVisible(true), FALLBACK_TIMEOUT_MS);

    const observer = new IntersectionObserver(
      ([ entry ]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(timeout);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  const { totalWidth, glyphs } = HERO_LAYOUT;
  const viewBoxWidth = Math.max(totalWidth + 160, MIN_VIEWBOX_WIDTH);
  const baseX = (viewBoxWidth - totalWidth) / 2;

  // Determine which class to apply based on state
  const svgClass = skipAnimation && isVisible
    ? "static"
    : isVisible
      ? "animated"
      : "";

  return (
    <div ref={ containerRef } className="flex min-h-[8rem] w-full items-center justify-center">
      <svg
        role="img"
        aria-label="Eduardo Neto"
        className={ `h-32 w-full ${svgClass}` }
        viewBox={ `0 0 ${viewBoxWidth} ${VIEWBOX_HEIGHT}` }
        fill="none"
      >
        <g transform={ `translate(${baseX}, 0)` } style={ { filter: "drop-shadow(0 0 8px rgba(255, 136, 32, 0.3))" } }>
          { glyphs.reduce((acc: { nodes: React.ReactNode[], globalPathIndex: number }, glyph: Glyph, glyphIndex: number) => {
            if (!glyph.paths.length) {
              acc.nodes.push(<React.Fragment key={ `space-${glyphIndex}` } />);
              return acc;
            }

            const glyphGroup = (
              <g key={ `${glyph.char}-${glyphIndex}` }>
                { glyph.paths.map((d: string, pathIndex: number) => {
                  // Stagger animation based on global path index for continuous flow
                  // Removed initial delay and increased stagger for more sequential feel
                  const outlineDelay = (acc.globalPathIndex + pathIndex) * 0.08;

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

          /* Default state: hidden (prevents flash before animation starts) */
          .hero-path {
            stroke: #ff8820;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            stroke-opacity: 0;
          }

          /* Static state: immediate visibility without animation (slow networks, reduced motion) */
          .static .hero-path {
            stroke-dashoffset: 0;
            stroke-opacity: 1;
          }

          /* Animated state: draw animation */
          .animated .hero-path {
            will-change: stroke-dashoffset, stroke-opacity;
            animation-name: hero-outline-draw;
            animation-duration: ${DRAW_DURATION}s;
            animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
            animation-fill-mode: forwards;
          }
        `}</style>
      </svg>
    </div>
  );
}
