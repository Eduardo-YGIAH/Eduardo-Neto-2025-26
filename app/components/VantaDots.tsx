"use client";

import { useEffect, useRef } from "react";

type VantaInstance = { destroy?: () => void } | null;

export default function VantaDots() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<VantaInstance>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || effectRef.current) {
      return;
    }

    let disposed = false;
    let mediaQuery: MediaQueryList | null = null;

    const tearDown = () => {
      try {
        effectRef.current?.destroy?.();
      } catch {
        // swallow cleanup errors caused by rapid navigation in dev
      } finally {
        effectRef.current = null;
      }
    };

    const init = async () => {
      if (disposed || effectRef.current || !containerRef.current) {
        return;
      }

      try {
        type ThreeModule = typeof import("three");
        const threeImport = await import("three");
        const THREE =
          (threeImport as { default?: ThreeModule }).default ??
          (threeImport as ThreeModule);

        if (!(globalThis as { THREE?: ThreeModule }).THREE) {
          (globalThis as { THREE?: ThreeModule }).THREE = THREE;
        }

        const { default: DOTS } = await import("vanta/dist/vanta.dots.min");

        if (disposed || effectRef.current || !containerRef.current) {
          return;
        }

        effectRef.current = DOTS({
          el: containerRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x222222,
          color: 0xff8820,
          color2: 0xff8820,
          size: 3.0,
          spacing: 35.0,
          showLines: false,
        });
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Failed to initialise Vanta background", error);
        }
        effectRef.current = null;
      }
    };

    if (typeof window !== "undefined" && "matchMedia" in window) {
      mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (mediaQuery.matches) {
        return () => {
          disposed = true;
        };
      }

      const handleMotionChange = (event: MediaQueryListEvent) => {
        if (event.matches) {
          tearDown();
        } else if (!event.matches && !effectRef.current) {
          init();
        }
      };

      mediaQuery.addEventListener("change", handleMotionChange);

      init();

      return () => {
        disposed = true;
        mediaQuery?.removeEventListener("change", handleMotionChange);
        tearDown();
      };
    }

    init();

    return () => {
      disposed = true;
      tearDown();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}


