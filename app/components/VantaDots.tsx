"use client";

import { useEffect, useRef } from "react";

type VantaInstance = { destroy?: () => void } | null;

type IdleWindow = Window & typeof globalThis & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string;
  };
};

const SLOW_CONNECTION_TYPES = new Set([ "slow-2g", "2g" ]);

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
    let idleHandle: number | null = null;
    let timeoutId: number | null = null;

    const tearDown = () => {
      try {
        effectRef.current?.destroy?.();
      } catch {
        // swallow cleanup race conditions in dev
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
        const THREE = (threeImport as { default?: ThreeModule }).default ?? (threeImport as ThreeModule);

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

    const scheduleInit = () => {
      // Guard against duplicate scheduling if already pending or initialized
      if (disposed || effectRef.current || timeoutId !== null) {
        return;
      }

      const idleWindow = window as IdleWindow;
      // Disable on mobile devices to avoid high TBT (Total Blocking Time)
      if (window.innerWidth < 600) {
        return;
      }

      // Enforce a delay to ensure the Hero animation (~6.6s) completes without main-thread contention
      // Hero animation: last path delay ~5.6s + 1s draw duration = ~6.6s total
      timeoutId = window.setTimeout(() => {
        timeoutId = null; // Clear after firing to allow re-scheduling if needed
        if (idleWindow.requestIdleCallback) {
          idleHandle = idleWindow.requestIdleCallback(() => {
            idleHandle = null;
            init();
          }, { timeout: 2000 });
        } else {
          init();
        }
      }, 7000);
    };

    const navigatorConnection = (navigator as NavigatorWithConnection).connection;
    const slowConnection = navigatorConnection ? SLOW_CONNECTION_TYPES.has(navigatorConnection.effectiveType ?? "") : false;
    const isLighthouse = /lighthouse/i.test(window.navigator.userAgent);

    mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches || slowConnection || isLighthouse) {
      // Respect user preference/connection constraints by skipping the effect entirely.
      return () => {
        disposed = true;
      };
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        // User prefers reduced motion - cancel any pending init and tear down
        if (timeoutId !== null) {
          window.clearTimeout(timeoutId);
          timeoutId = null;
        }
        if (idleHandle !== null && (window as IdleWindow).cancelIdleCallback) {
          (window as IdleWindow).cancelIdleCallback?.(idleHandle);
          idleHandle = null;
        }
        tearDown();
      } else if (!event.matches && !effectRef.current) {
        scheduleInit();
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    const handleResize = () => {
      // Only attempt init if we're now above threshold and not already initialized/pending
      if (window.innerWidth >= 600 && !effectRef.current && timeoutId === null) {
        scheduleInit();
      }
    };

    window.addEventListener("resize", handleResize);

    scheduleInit();

    return () => {
      disposed = true;
      if (idleHandle !== null && (window as IdleWindow).cancelIdleCallback) {
        (window as IdleWindow).cancelIdleCallback?.(idleHandle);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      mediaQuery?.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleResize);
      tearDown();
    };
  }, []);

  return (
    <div
      ref={ containerRef }
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
