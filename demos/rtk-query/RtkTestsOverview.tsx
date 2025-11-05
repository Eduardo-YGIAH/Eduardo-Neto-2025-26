import type { JSX } from "react";

const coverageLines = `√ itemsApi caching behavior (3)
  √ dedupes identical subscribers to the same query
  √ invalidates and refetches exactly once after a mutation
  √ respects the keepUnusedDataFor TTL before dropping cached data

Test Files  1 passed (1)
     Tests  3 passed (3)
   Duration  ~0.3s`;

export default function RtkTestsOverview(): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-white/10 bg-black p-6 text-sm text-zinc-300">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">What&apos;s covered</h3>
            <ul className="list-disc space-y-2 pl-5 text-zinc-200">
              <li>Request de-duplication across multiple subscribers to the same query.</li>
              <li>Cache invalidation after a mutation triggers one — and only one — refresh.</li>
              <li>TTL behaviour: cached data persists while warm and expires once the timer elapses.</li>
            </ul>
            <p className="text-xs text-zinc-400">
              Tests live in <code className="rounded bg-white/10 px-1">demos/rtk-query/__tests__/itemsApi.test.ts</code>,
              using Vitest with Node’s built-in fetch to exercise the RTK Query slice without the UI.
            </p>
          </div>
        </section>
        <section className="rounded-lg border border-white/10 bg-black p-6 text-sm text-zinc-300">
          <p className="mb-3 font-medium text-white">Run locally</p>
          <pre className="overflow-x-auto rounded-md border border-white/10 bg-black/60 p-3 text-xs text-[#ff8820]">
            <code>npm run test</code>
          </pre>
          <p className="mt-4 text-xs text-zinc-400">Sample output:</p>
          <pre className="overflow-x-auto rounded-md border border-white/10 bg-black/60 p-3 text-[11px] leading-relaxed text-zinc-300">
            <code>{coverageLines}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}


