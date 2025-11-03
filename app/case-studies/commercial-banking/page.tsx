export const metadata = { title: "Commercial Banking Client — Case Study" };

export default function CommercialBankingCaseStudy() {
  return (
    <article className="py-12">
      <h1 className="text-3xl font-bold text-white">Commercial Banking Tool</h1>
      <p className="mt-2 text-zinc-400">Client: Major Commercial Bank (Anonymized)</p>
      <div className="mt-6 grid gap-4 text-sm text-zinc-300 sm:grid-cols-3">
        <div><span className="text-zinc-400">Role:</span> Lead Front-End Engineer</div>
        <div><span className="text-zinc-400">Tech:</span> React, TypeScript, Component Library</div>
        <div><span className="text-zinc-400">Outcome:</span> ~25% dev-time reduction</div>
      </div>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-[#ff8820]">1. The Challenge</h2>
        <p className="text-zinc-300">Fragmented UI and repeated patterns slowed development and hurt consistency.</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-[#ff8820]">2. My Solution</h2>
        <p className="text-zinc-300">Established a reusable component system and design tokens; paired with teams to adopt patterns; added story-driven documentation and examples.</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-[#ff8820]">3. The Outcome</h2>
        <p className="text-zinc-300">Stakeholder approval via demo; measurable ~25% reduction in development time across squads.</p>
      </section>
    </article>
  );
}


