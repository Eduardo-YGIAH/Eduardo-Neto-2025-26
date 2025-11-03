"use client";

import { useEffect, useRef } from "react";

export default function VantaDots() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    let canceled = false;
    (async () => {
      try {
        const [{ default: DOTS }, THREE] = await Promise.all([
          import("vanta/dist/vanta.dots.min"),
          import("three"),
        ]);
        if (canceled || !containerRef.current) return;
        effectRef.current = DOTS({
          el: containerRef.current,
          THREE,
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
          showLines: true,
        });
      } catch {
        // fails gracefully if deps not installed yet
      }
    })();
    return () => {
      canceled = true;
      if (effectRef.current) {
        effectRef.current.destroy?.();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="h-48 w-full rounded-lg border border-white/10" />
  );
}


