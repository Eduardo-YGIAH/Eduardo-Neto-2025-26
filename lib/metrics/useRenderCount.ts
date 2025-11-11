import { useLayoutEffect, useRef, useState } from "react";

/**
 * useRenderCount returns an incrementing counter for how many times the component rendered.
 * Useful for visualizing rendering optimizations in demos.
 */
export function useRenderCount(initial: number = 0): number {
  const [count, setCount] = useState(initial);
  const isInternalUpdate = useRef(false);

  useLayoutEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }

    isInternalUpdate.current = true;
    const frame = requestAnimationFrame(() => {
      setCount((prev) => prev + 1);
    });

    return () => cancelAnimationFrame(frame);
  });

  return count;
}


