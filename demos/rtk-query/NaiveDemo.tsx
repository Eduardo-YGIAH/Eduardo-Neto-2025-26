"use client";

import { useMemo, useState } from "react";
import NaiveList from "./naive/NaiveList";
import NetworkMeter from "@/app/components/demos/NetworkMeter";
import { createNetworkTracker, createTrackedFetch } from "@/lib/metrics/networkTracker";

export default function NaiveDemo() {
  const [filter, setFilter] = useState("");
  const tracker = useMemo(() => createNetworkTracker(), []);
  const fetcher = useMemo(() => createTrackedFetch(tracker, fetch), [tracker]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Type to filter (causes both lists to fetch)"
          className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 outline-none placeholder:text-zinc-400"
        />
        <button
          className="rounded-md bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
          onClick={() => tracker.reset()}
        >
          Reset metrics
        </button>
      </div>

      <NetworkMeter tracker={tracker} variant="naive" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Two independent components fetch the same data redundantly */}
        <NaiveList filter={filter} fetcher={fetcher} />
        <NaiveList filter={filter} fetcher={fetcher} />
      </div>
    </div>
  );
}


