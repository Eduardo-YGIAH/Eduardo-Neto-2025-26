"use client";

import NaiveDemo from "./NaiveDemo";
import RtkDemo from "./RtkDemo";

export default function RtkComparison() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-lg border border-white/10 bg-black p-6 md:grid-cols-2">
        <div className="space-y-3">
          <span className="text-sm uppercase tracking-widest text-zinc-400">Baseline</span>
          <h2 className="text-xl font-semibold text-white">Naive Fetch &amp; Local State</h2>
          <p className="text-sm text-zinc-300">
            Two components each call `fetch` inside `useEffect`, so every change
            triggers redundant network requests. Caching is manual, error paths
            are fragile, and both lists manage their state independently.
          </p>
        </div>
        <div className="space-y-3">
          <span className="text-sm uppercase tracking-widest text-[#ff8820]">Improved</span>
          <h2 className="text-xl font-semibold text-white">RTK Query Caching &amp; Mutations</h2>
          <p className="text-sm text-zinc-300">
            A single RTK Query slice dedupes requests, keeps data warm, and
            invalidates on mutation. Metrics show fewer HTTP calls while the UI
            stays consistent across components that share the cache.
          </p>
        </div>
      </div>

      <p className="text-sm text-zinc-300">
        Each panel owns its own network meter with a cache-hit counter. Try this sequence:
      </p>
      <ol className="list-decimal space-y-1 pl-6 text-xs text-zinc-400">
        <li>Press “Reset metrics” on both sides.</li>
        <li>
          Type <code>alpha</code>, then <code>beta</code>, then <code>alpha</code> again in each filter.
        </li>
        <li>
          Watch how the naive totals climb twice as fast (two fetches per component) while the RTK version
          only issues a single request per filter and serves the second list from cache.
        </li>
      </ol>
      <p className="text-xs text-zinc-400">
        The mutation button shows how invalidation refreshes data exactly once, and subsequent views increment
        cache hits when the warm data is reused instantly.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-white/10 bg-black p-4 shadow-lg shadow-black/40">
          <h3 className="text-lg font-semibold text-white">Naive implementation</h3>
          <NaiveDemo />
        </div>
        <div className="space-y-4 rounded-lg border border-[#ff8820]/40 bg-black p-4 shadow-lg shadow-black/40">
          <h3 className="text-lg font-semibold text-[#ff8820]">RTK Query implementation</h3>
          <RtkDemo />
        </div>
      </div>
    </div>
  );
}


