import { useRef } from "react";

/**
 * useRenderCount returns an incrementing counter for how many times the component rendered.
 * Useful for visualizing rendering optimizations in demos.
 */
export function useRenderCount(initial: number = 0): number {
  const countRef = useRef<number>(initial);
  countRef.current += 1;
  return countRef.current;
}


