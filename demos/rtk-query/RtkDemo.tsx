"use client";

import { useMemo, useState } from "react";
import { RtkProvider, createRtkEnvironment } from "./rtk/store";
import RtkList from "./rtk/RtkList";
import NetworkMeter from "@/app/components/demos/NetworkMeter";
import { createNetworkTracker } from "@/lib/metrics/networkTracker";

export default function RtkDemo() {
  const [filter, setFilter] = useState("");
  const tracker = useMemo(() => createNetworkTracker(), []);
  const env = useMemo(() => createRtkEnvironment(tracker), [tracker]);
  return (
    <RtkProvider env={env}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Type to filter"
            className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 outline-none placeholder:text-zinc-400"
          />
          <button
            className="rounded-md bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
            onClick={() => tracker.reset()}
          >
            Reset metrics
          </button>
        </div>

        <NetworkMeter tracker={tracker} variant="rtk" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Two components using the same query should dedupe the fetch */}
          <RtkList filter={filter} api={env.api} tracker={tracker} />
          <RtkList filter={filter} api={env.api} tracker={tracker} />
        </div>
      </div>
    </RtkProvider>
  );
}


