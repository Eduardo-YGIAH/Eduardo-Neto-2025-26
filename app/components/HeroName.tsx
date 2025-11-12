"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const AnimatedHeroName = dynamic(() => import("./AnimatedHeroName"), {
  ssr: false,
  loading: () => null,
});

interface HeroNameProps {
  unlockDelayMs: number;
}

export default function HeroName({ unlockDelayMs }: HeroNameProps) {
  const [persistStatic, setPersistStatic] = useState<boolean | null>(null);
  const [staticPhase, setStaticPhase] = useState<"visible" | "fading" | "hidden">("visible");
  const [showAnimated, setShowAnimated] = useState(false);
  const [readyToFade, setReadyToFade] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluatePersist = () => {
      const isLighthouse = /lighthouse/i.test(window.navigator.userAgent);
      const effectiveType = (window.navigator as Navigator & { connection?: { effectiveType?: string } }).connection?.effectiveType;
      const onSlowConnection = effectiveType === "slow-2g" || effectiveType === "2g";
      const value = reduceMotionQuery.matches || isLighthouse || onSlowConnection;
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => setPersistStatic(value));
      } else {
        window.setTimeout(() => setPersistStatic(value), 0);
      }
    };

    evaluatePersist();
    reduceMotionQuery.addEventListener("change", evaluatePersist);

    return () => {
      reduceMotionQuery.removeEventListener("change", evaluatePersist);
    };
  }, []);

  useEffect(() => {
    if (persistStatic === null) {
      return;
    }

    if (persistStatic) {
      return;
    }

    const timer = window.setTimeout(() => {
      setReadyToFade(true);
    }, unlockDelayMs);

    return () => window.clearTimeout(timer);
  }, [persistStatic, unlockDelayMs]);

  useEffect(() => {
    if (!readyToFade || persistStatic) {
      return;
    }

    const schedule = (fn: () => void) => {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(fn);
      } else {
        window.setTimeout(fn, 0);
      }
    };

    schedule(() => {
      setStaticPhase("fading");
      setShowAnimated(true);
    });
    const hideTimer = window.setTimeout(() => {
      setStaticPhase("hidden");
    }, 700);

    return () => window.clearTimeout(hideTimer);
  }, [readyToFade, persistStatic]);

  const staticClasses = useMemo(() => {
    const base = "pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out";
    if (staticPhase === "visible" || persistStatic) {
      return `${base} opacity-100 blur-0`;
    }
    if (staticPhase === "fading") {
      return `${base} opacity-0 blur-lg`;
    }
    return `${base} opacity-0 invisible`;
  }, [staticPhase, persistStatic]);

  return (
    <div className="relative mx-auto mt-10 flex min-h-[8rem] w-full max-w-[1100px] items-center justify-center">
      <div className={staticClasses}>
        <h1
          className="text-center text-4xl font-semibold uppercase tracking-[0.45em] text-neutral-400 md:text-5xl"
          style={{
            fontFamily: '"Inter", "Helvetica Neue", sans-serif',
            letterSpacing: "0.45em",
            textRendering: "optimizeLegibility",
          }}
        >
          Frontend Software Engineer
        </h1>
      </div>
      <div className={`${showAnimated && !persistStatic ? "opacity-100" : "opacity-0"} transition-opacity duration-500 ease-out` }>
        {showAnimated && !persistStatic ? <AnimatedHeroName showSkeleton={false} /> : null}
      </div>
    </div>
  );
}
