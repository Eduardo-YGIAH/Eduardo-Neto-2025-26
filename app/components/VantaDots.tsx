"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function VantaDots() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  type VantaInstance = { destroy?: () => void } | null;
  const effectRef = useRef<VantaInstance>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (effectRef.current) return; // avoid double-init in Strict Mode

    // Ensure window.THREE exists BEFORE importing the Vanta effect
    (globalThis as unknown as { THREE?: typeof THREE }).THREE = THREE;

    let disposed = false;
    (async () => {
      try {
        const { default: DOTS } = await import("vanta/dist/vanta.dots.min");
        if (disposed || !containerRef.current || effectRef.current) return;
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
      } catch {
        // allow page to render without animation if Vanta fails
        effectRef.current = null;
      }
    })();

    return () => {
      disposed = true;
      try {
        if (effectRef.current) {
          effectRef.current.destroy?.();
        }
      } catch {
        // Swallow DOM cleanup race conditions in dev
      } finally {
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-0 h-[320px] w-full md:h-[420px]"
    />
  );
}


