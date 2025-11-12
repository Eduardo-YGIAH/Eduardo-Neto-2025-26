import { useLayoutEffect, useMemo } from "react";

const renderCounters = new WeakMap<object, number>();

/**
 * useRenderCount returns an incrementing counter for how many times the component rendered.
 * Useful for visualizing rendering optimizations in demos.
 */
export function useRenderCount(initial: number = 0): number {
  const key = useMemo<object>(() => ({}), []);
  const previous = renderCounters.get(key);
  const next = (previous ?? initial) + 1;

  useLayoutEffect(() => {
    renderCounters.set(key, next);
    return () => {
      renderCounters.delete(key);
    };
  }, [key, next]);

  return next;
}
