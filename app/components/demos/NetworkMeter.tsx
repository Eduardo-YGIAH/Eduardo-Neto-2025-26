"use client";

import MetricBadge from "./MetricBadge";
import { useNetworkMetrics } from "@/lib/metrics/networkTracker";
import type { NetworkTracker } from "@/lib/metrics/networkTracker";

type Props = {
  tracker: NetworkTracker;
  variant: "naive" | "rtk";
};

const TOOLTIP_COPY: Record<"naive" | "rtk", Record<"total" | "completed" | "inFlight" | "hits" | "urls", string>> = {
  naive: {
    total:
      "How many fetches this naive implementation has triggered so far. Expect this number to climb quickly because each component issues its own request.",
    completed:
      "Requests that have finished. In the naive flow this will generally stay close to Total once the responses settle.",
    inFlight:
      "Requests currently waiting on the network for the naive implementation.",
    hits:
      "Cache hits aren’t expected here because the naive approach always refetches from the server.",
    urls:
      "Distinct request URLs issued by the naive panels. Switching filters creates new URLs and increases this count.",
  },
  rtk: {
    total:
      "How many fetches RTK Query has actually made. Thanks to request de-duplication this should remain about half of the naive total.",
    completed:
      "Completed RTK Query network calls. You’ll usually see a 1:1 relationship with Total after requests finish.",
    inFlight:
      "Active RTK Query requests. These briefly jump when a new filter is entered or a mutation invalidates the cache.",
    hits:
      "Times RTK Query served warm data instantly from cache. This should increase when you revisit a filter without needing another fetch.",
    urls:
      "Distinct request URLs RTK Query has touched. Because it reuses results by cache key, this number stays low even across components.",
  },
};

export default function NetworkMeter({ tracker, variant }: Props) {
  const m = useNetworkMetrics(tracker);
  const copy = TOOLTIP_COPY[variant];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      <MetricBadge label="Total" value={m.totalRequests} tooltip={copy.total} />
      <MetricBadge label="Completed" value={m.completed} tooltip={copy.completed} />
      <MetricBadge label="In flight" value={m.inFlight} tooltip={copy.inFlight} />
      <MetricBadge label="Cache hits" value={m.cacheHits} tooltip={copy.hits} />
      <MetricBadge label="Unique URLs" value={m.uniqueUrls} tooltip={copy.urls} />
    </div>
  );
}


