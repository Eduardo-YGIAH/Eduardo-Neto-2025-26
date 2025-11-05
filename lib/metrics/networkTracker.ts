import { useSyncExternalStore } from "react";

export type NetworkMetrics = {
  totalRequests: number;
  completed: number;
  inFlight: number;
  cacheHits: number;
  uniqueUrls: number;
};

type Listener = () => void;

function createTracker() {
  let metrics: NetworkMetrics = {
    totalRequests: 0,
    completed: 0,
    inFlight: 0,
    cacheHits: 0,
    uniqueUrls: 0,
  };
  const urlSet = new Set<string>();
  const listeners = new Set<Listener>();

  const notify = () => listeners.forEach((l) => l());

  return {
    get snapshot() {
      return metrics;
    },
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    reset() {
      metrics = {
        totalRequests: 0,
        completed: 0,
        inFlight: 0,
        cacheHits: 0,
        uniqueUrls: 0,
      };
      urlSet.clear();
      notify();
    },
    trackStart(url: string) {
      metrics.totalRequests += 1;
      metrics.inFlight += 1;
      if (!urlSet.has(url)) {
        urlSet.add(url);
        metrics.uniqueUrls = urlSet.size;
      }
      notify();
    },
    trackEnd(url: string, opts?: { fromCache?: boolean }) {
      metrics.completed += 1;
      metrics.inFlight = Math.max(0, metrics.inFlight - 1);
      if (opts?.fromCache) metrics.cacheHits += 1;
      notify();
    },
    recordCacheHit() {
      metrics.cacheHits += 1;
      notify();
    },
  };
}

export type NetworkTracker = ReturnType<typeof createTracker>;

let singleton: NetworkTracker | null = null;

export function createNetworkTracker(): NetworkTracker {
  return createTracker();
}

export function getNetworkTracker(): NetworkTracker {
  if (!singleton) singleton = createTracker();
  return singleton;
}

export function useNetworkMetrics(tracker: NetworkTracker = getNetworkTracker()): NetworkMetrics {
  return useSyncExternalStore(
    (cb) => tracker.subscribe(cb),
    () => tracker.snapshot,
    () => tracker.snapshot
  );
}

/**
 * Wrap a fetch-like function to automatically record metrics with the provided tracker.
 */
type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export function createTrackedFetch<T extends FetchLike>(
  tracker: NetworkTracker,
  fetchLike: T
) {
  return (async (...args: Parameters<T>): Promise<Response> => {
    const [request, init] = args;
    const url = String(request);
    tracker.trackStart(url);
    try {
      const res = await fetchLike(request, init);
      return res;
    } finally {
      tracker.trackEnd(url);
    }
  }) as T;
}

export function withTracking<T extends FetchLike>(fetchLike: T) {
  return createTrackedFetch(getNetworkTracker(), fetchLike);
}


