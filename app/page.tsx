import Link from "next/link";
import AnimatedHeroName from "./components/AnimatedHeroName";

export default function Home() {
  return (
    <div className="py-16">
      <section className="mt-10 flex flex-col items-center text-center">
        <AnimatedHeroName />
        <p className="mt-4 max-w-2xl text-lg text-zinc-300">
          Front-End Engineer, ready for Senior level roles. I ship accessible,
          high-performance React apps with modern TypeScript, smart state
          management, and a strong UX mindset.
        </p>
      </section>

      {/* Vanta.js dots container sits below hero for readability */}

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-[#ff8820]">Featured Case Studies</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/case-studies/financial-services" className="block rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm shadow-lg shadow-black/40 p-5 transition hover:border-[#ff8820] hover:bg-black/55">
            <h3 className="text-lg font-medium text-white">Financial Services Firm</h3>
            <p className="mt-2 text-sm text-zinc-400">~30% performance boost with RTK Query caching strategy.</p>
          </Link>
          <Link href="/case-studies/commercial-banking" className="block rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm shadow-lg shadow-black/40 p-5 transition hover:border-[#ff8820] hover:bg-black/55">
            <h3 className="text-lg font-medium text-white">Commercial Banking Client</h3>
            <p className="mt-2 text-sm text-zinc-400">Stakeholder approval via demo; ~25% dev-time reduction.</p>
          </Link>
          <Link href="/case-studies/internal-project" className="block rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm shadow-lg shadow-black/40 p-5 transition hover:border-[#ff8820] hover:bg-black/55">
            <h3 className="text-lg font-medium text-white">Internal Project</h3>
            <p className="mt-2 text-sm text-zinc-400">Mentoring with Mirage JS mock server; 50% fewer blockers.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
