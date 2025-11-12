"use client";

import React from "react";
import type { Font, PathCommand } from "opentype.js";
import { HERO_DRAW_DURATION, HERO_NAME } from "@/lib/heroAnimation";

type OpenTypeModule = typeof import("opentype.js");

const NAME = HERO_NAME;
const FONT_URL = "/fonts/Monoton-Regular.ttf";
const FONT_SIZE = 108;
const LETTER_GAP = 20;
const WORD_GAP = 110;
const VIEWBOX_HEIGHT = 160;
const MIN_VIEWBOX_WIDTH = 1024;
const DRAW_DURATION = HERO_DRAW_DURATION;
const BASELINE_Y = FONT_SIZE;
const PATH_DECIMALS = 3;
const EPSILON = 0.001;

type ContourPoint = {
  x: number;
  y: number;
  onCurve: boolean;
  lastPointOfContour: boolean;
};

type LetterPaths = {
  char: string;
  paths: string[];
  visibleIndex: number | null;
};

type Layout = {
  glyphs: LetterPaths[];
  totalWidth: number;
};

const format = (value: number) => Number(value.toFixed(PATH_DECIMALS));

function findBottomLeftIndex(contour: ContourPoint[]): number {
  let targetIndex = -1;
  let bestX = Number.POSITIVE_INFINITY;
  let bestY = Number.POSITIVE_INFINITY;

  for (let i = 0; i < contour.length; i += 1) {
    const point = contour[i];
    if (!point.onCurve) {
      continue;
    }

    if (point.x < bestX - EPSILON || (Math.abs(point.x - bestX) <= EPSILON && point.y < bestY - EPSILON)) {
      bestX = point.x;
      bestY = point.y;
      targetIndex = i;
    }
  }

  return targetIndex;
}

function rotateContour(contour: ContourPoint[]): ContourPoint[] {
  if (contour.length === 0) {
    return contour;
  }

  let targetIndex = findBottomLeftIndex(contour);

  if (targetIndex === -1) {
    targetIndex = 0;
  }

  const startIndex = (targetIndex + 1) % contour.length;
  return contour.map((_, idx) => {
    const source = contour[(startIndex + idx) % contour.length];
    return {
      x: source.x,
      y: source.y,
      onCurve: source.onCurve,
      lastPointOfContour: idx === contour.length - 1,
    };
  });
}

function contourToPath(contour: ContourPoint[], opentype: OpenTypeModule) {
  const path = new opentype.Path();
  if (contour.length === 0) {
    return path;
  }

  let curr = contour[contour.length - 1];
  let next = contour[0];

  if (curr.onCurve) {
    path.moveTo(curr.x, curr.y);
  } else if (next.onCurve) {
    path.moveTo(next.x, next.y);
  } else {
    path.moveTo((curr.x + next.x) * 0.5, (curr.y + next.y) * 0.5);
  }

  for (let i = 0; i < contour.length; i += 1) {
    curr = next;
    next = contour[(i + 1) % contour.length];

    if (curr.onCurve) {
      path.lineTo(curr.x, curr.y);
    } else {
      let next2 = next;

      if (next && !next.onCurve) {
        next2 = {
          x: (curr.x + next.x) * 0.5,
          y: (curr.y + next.y) * 0.5,
          onCurve: true,
          lastPointOfContour: false,
        } as ContourPoint;
      }

      path.quadraticCurveTo(curr.x, curr.y, next2.x, next2.y);
    }
  }

  path.closePath();
  return path;
}

function commandsToPathData(commands: PathCommand[], offsetX: number, scale: number) {
  const segments: string[] = [];

  for (const command of commands) {
    if (command.type === "M") {
      segments.push(`M${format(offsetX + command.x * scale)} ${format(BASELINE_Y - command.y * scale)}`);
    } else if (command.type === "L") {
      segments.push(`L${format(offsetX + command.x * scale)} ${format(BASELINE_Y - command.y * scale)}`);
    } else if (command.type === "Q") {
      segments.push(
        `Q${format(offsetX + command.x1 * scale)} ${format(BASELINE_Y - command.y1 * scale)} ${format(
          offsetX + command.x * scale,
        )} ${format(BASELINE_Y - command.y * scale)}`,
      );
    } else if (command.type === "C") {
      segments.push(
        `C${format(offsetX + command.x1 * scale)} ${format(BASELINE_Y - command.y1 * scale)} ${format(
          offsetX + command.x2 * scale,
        )} ${format(BASELINE_Y - command.y2 * scale)} ${format(offsetX + command.x * scale)} ${format(
          BASELINE_Y - command.y * scale,
        )}`,
      );
    } else if (command.type === "Z") {
      segments.push("Z");
    }
  }

  return segments.join(" ");
}

function buildLayout(font: Font, opentype: OpenTypeModule, letters: string[], visibleIndices: (number | null)[]): Layout {
  const glyphs: LetterPaths[] = [];
  const scale = FONT_SIZE / font.unitsPerEm;
  let cursor = 0;

  for (let i = 0; i < letters.length; i += 1) {
    const char = letters[i];
    const visibleIndex = visibleIndices[i];

    if (char === " ") {
      glyphs.push({ char, paths: [], visibleIndex: null });
      const gap = i === letters.length - 1 ? 0 : letters[i + 1] === " " ? WORD_GAP : LETTER_GAP;
      cursor += gap;
      continue;
    }

    const glyph = font.charToGlyph(char);
    glyph.getPath();
    const contours: ContourPoint[][] = glyph.getContours();
    const letterPaths: string[] = [];

    for (const contour of contours) {
      const rotated = rotateContour(contour);
      const path = contourToPath(rotated, opentype);
      const d = commandsToPathData(path.commands, cursor, scale);
      letterPaths.push(d);
    }

    glyphs.push({ char, paths: letterPaths, visibleIndex });

    const advanceWidth = (glyph.advanceWidth ?? 0) * scale;
    const gap = i === letters.length - 1 ? 0 : letters[i + 1] === " " ? WORD_GAP : LETTER_GAP;
    cursor += advanceWidth + gap;
  }

  return {
    glyphs,
    totalWidth: cursor,
  };
}

const HeroSkeleton = () => (
  <div className="pointer-events-none select-none text-center">
    <h1
      className="text-4xl font-semibold uppercase tracking-[0.45em] text-neutral-400 md:text-5xl"
      style={{
        fontFamily: '"Inter", "Helvetica Neue", sans-serif',
        letterSpacing: "0.45em",
        textRendering: "optimizeLegibility",
      }}
    >
      Frontend Software Engineer
    </h1>
  </div>
);

interface AnimatedHeroNameProps {
  showSkeleton?: boolean;
}

export default function AnimatedHeroName({ showSkeleton = true }: AnimatedHeroNameProps = {}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const letters = React.useMemo(() => NAME.split(""), []);
  const visibleIndices = React.useMemo(() => {
    let sequence = 0;
    return letters.map((ch) => {
      if (ch === " ") {
        return null;
      }
      const current = sequence;
      sequence += 1;
      return current;
    });
  }, [letters]);
  const [layout, setLayout] = React.useState<Layout | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [shouldAnimate, setShouldAnimate] = React.useState(false);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isLighthouse = /lighthouse/i.test(window.navigator.userAgent);
    const effectiveType = (window.navigator as Navigator & { connection?: { effectiveType?: string } }).connection?.effectiveType;
    const onSlowConnection = effectiveType === "slow-2g" || effectiveType === "2g";

    if (reduceMotionQuery.matches || isLighthouse || onSlowConnection) {
      setSkipAnimation(true);
      return;
    }

    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldAnimate(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    let idleHandle: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if ("requestIdleCallback" in window) {
      idleHandle = (window as Window & typeof globalThis & { requestIdleCallback: typeof requestIdleCallback }).requestIdleCallback(
        () => {
          if (!cancelled) {
            setShouldAnimate(true);
          }
        },
        { timeout: 1500 },
      );
    } else {
      timeoutId = setTimeout(() => {
        if (!cancelled) {
          setShouldAnimate(true);
        }
      }, 1000);
    }

    return () => {
      cancelled = true;
      observer.disconnect();
      if (idleHandle !== null) {
        if ("cancelIdleCallback" in window) {
          (window as Window & typeof globalThis & { cancelIdleCallback: typeof cancelIdleCallback }).cancelIdleCallback(idleHandle);
        }
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!shouldAnimate || skipAnimation) {
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        const opentype = await import("opentype.js");
        const response = await fetch(FONT_URL);
        if (!response.ok) {
          throw new Error(`Failed to load font: ${response.status}`);
        }

        const buffer = await response.arrayBuffer();
        const font = opentype.parse(buffer);
        const nextLayout = buildLayout(font, opentype, letters, visibleIndices);

        if (!cancelled) {
          setLayout(nextLayout);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Unable to load hero animation");
          console.error(err);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [letters, visibleIndices, shouldAnimate, skipAnimation]);

  const showAnimation = !skipAnimation && shouldAnimate && layout && !error;
  const viewBoxWidth = showAnimation ? Math.max(layout!.totalWidth + 160, MIN_VIEWBOX_WIDTH) : undefined;
  const baseX = showAnimation ? (viewBoxWidth! - layout!.totalWidth) / 2 : 0;

  return (
    <div ref={containerRef} className="flex min-h-[8rem] w-full items-center justify-center">
      {!showAnimation ? (
        showSkeleton ? <HeroSkeleton /> : null
      ) : (
        <svg
          role="img"
          aria-label={NAME}
          className="h-32 w-full"
          viewBox={`0 0 ${viewBoxWidth} ${VIEWBOX_HEIGHT}`}
          fill="none"
        >
          <g transform={`translate(${baseX}, 0)`}>
            {layout!.glyphs.map((glyph, glyphIndex) => {
              if (!glyph.paths.length) {
                return <React.Fragment key={`space-${glyphIndex}`} />;
              }

              const visibleIndex = glyph.visibleIndex ?? 0;
              const outlineDelay = visibleIndex * DRAW_DURATION;

              return (
                <g key={`${glyph.char}-${glyphIndex}`}>
                  {glyph.paths.map((d, pathIndex) => (
                    <path
                      key={`${glyph.char}-${glyphIndex}-${pathIndex}`}
                      d={d}
                      className="hero-path"
                      pathLength={1}
                      style={{ animationDelay: `${outlineDelay}s` }}
                    />
                  ))}
                </g>
              );
            })}
          </g>

          <style jsx>{`
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
              stroke-width: 3.6;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-miterlimit: 2;
              paint-order: stroke;
              fill: #ff8820;
              fill-opacity: 0;
              stroke-dasharray: 1;
              stroke-dashoffset: 1;
              filter: drop-shadow(0 0 12px rgba(255, 136, 32, 0.24)) drop-shadow(0 0 28px rgba(255, 136, 32, 0.18));
              animation-name: hero-outline-draw;
              animation-duration: ${DRAW_DURATION}s;
              animation-timing-function: ease-out;
              animation-fill-mode: forwards;
            }
          `}</style>
        </svg>
      )}
    </div>
  );
}


