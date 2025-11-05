export const metadata = { title: "Retail / Travel Brands — Case Study" };

export default function RetailTravelCaseStudy() {
  return (
    <article className="py-12">
      <h1 className="text-3xl font-bold text-white">Retail / Travel Brands Modernization</h1>
      <p className="mt-2 text-zinc-400">Client: Multiple Brands (Anonymized)</p>
      <div className="mt-6 grid gap-4 text-sm text-zinc-300 sm:grid-cols-3">
        <div><span className="text-zinc-400">Role:</span> Front-End Engineer</div>
        <div><span className="text-zinc-400">Tech:</span> React, TypeScript, Experimentation</div>
        <div><span className="text-zinc-400">Outcome:</span> Safer iterations via A/B testing</div>
      </div>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-[#ff8820]">1. The Challenge</h2>
        <p className="text-zinc-300">Legacy jQuery stack slowed delivery and risked regressions without guardrails.</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-[#ff8820]">2. My Solution</h2>
        <p className="text-zinc-300">Incrementally migrated flows to React and introduced A/B testing infrastructure to validate UX changes safely.</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-[#ff8820]">3. The Outcome</h2>
        <p className="text-zinc-300">Predictable rollouts and data-backed UX decisions; improved maintainability.</p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href="/demos"
          className="rounded-md bg-[#ff8820] px-4 py-2 text-sm font-medium text-black hover:brightness-110"
        >
          Explore interactive demos
        </a>
      </div>
    </article>
  );
}


