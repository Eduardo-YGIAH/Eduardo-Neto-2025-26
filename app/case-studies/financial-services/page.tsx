import Link from "next/link";

export const metadata = { title: "Financial Services Firm — Case Study" };

export default function FinancialServicesCaseStudy() {
  return (
    <article className="py-12">
      <h1 className="text-3xl font-bold text-white">Enterprise Financial Dashboard</h1>
      <p className="mt-2 text-zinc-400">Client: Major Financial Services Firm (Anonymized)</p>
      <div className="mt-6 grid gap-4 text-sm text-zinc-300 sm:grid-cols-3">
        <div><span className="text-zinc-400">Role:</span> Lead Front-End Engineer</div>
        <div><span className="text-zinc-400">Tech:</span> React, TypeScript, RTK Query</div>
        <div><span className="text-zinc-400">Outcome:</span> ~30% faster loads & fewer re-renders</div>
      </div>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-[#ff8820]">1. The Challenge</h2>
        <p className="text-zinc-300">Existing dashboard had slow loads and inconsistent data due to redundant API calls and unoptimized re-renders.</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-[#ff8820]">2. My Solution</h2>
        <p className="text-zinc-300">Refactored core state management; led migration from Redux Thunks to RTK Query; designed tag-invalidation caching to target stale data without over-fetching; profiled the app and applied targeted memoization to eliminate unnecessary updates in high-traffic views.</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-[#ff8820]">3. The Outcome</h2>
        <p className="text-zinc-300">~30% improvement in page load and re-render performance; measurably improved data consistency.</p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/demos/rtk-query-caching"
          className="rounded-md bg-[#ff8820] px-4 py-2 text-sm font-medium text-black hover:brightness-110"
        >
          See it in action — RTK Query Caching
        </Link>
        <Link
          href="/demos/rendering-performance"
          className="rounded-md border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
        >
          Rendering Performance Demo
        </Link>
        <Link
          href="/demos"
          className="rounded-md border border-white/10 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10"
        >
          All demos
        </Link>
      </div>
    </article>
  );
}


