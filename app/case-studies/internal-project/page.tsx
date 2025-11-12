import Link from "next/link";

export const metadata = { title: "Internal Project — Case Study" };

export default function InternalProjectCaseStudy() {
  return (
    <article className="py-12">
      <h1 className="text-3xl font-bold text-white">Internal Dev Platform Enablement</h1>
      <p className="mt-2 text-zinc-400">Client: Internal Initiative</p>
      <div className="mt-6 grid gap-4 text-sm text-zinc-300 sm:grid-cols-3">
        <div><span className="text-zinc-400">Role:</span> Mentor & Front-End Engineer</div>
        <div><span className="text-zinc-400">Tech:</span> React, TypeScript, Mirage JS</div>
        <div><span className="text-zinc-400">Outcome:</span> 50% reduction in dev blockers</div>
      </div>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-[#ff8820]">1. The Challenge</h2>
        <p className="text-zinc-300">Teams were blocked by unstable APIs and long feedback loops.</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-[#ff8820]">2. My Solution</h2>
        <p className="text-zinc-300">Introduced a Mirage JS mock server, codified common fixtures, and mentored students on effective API contracts and debugging workflows.</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-[#ff8820]">3. The Outcome</h2>
        <p className="text-zinc-300">50% reduction in developer blockers, faster iteration, and improved confidence.</p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/demos"
          className="rounded-md bg-[#ff8820] px-4 py-2 text-sm font-medium text-black hover:brightness-110"
        >
          Explore interactive demos
        </Link>
      </div>
    </article>
  );
}


