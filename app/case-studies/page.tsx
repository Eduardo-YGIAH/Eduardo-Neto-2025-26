import Link from "next/link";

export const metadata = {
  title: "Case Studies — Eduardo Neto",
};

export default function CaseStudies() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-white">Case Studies</h1>
      <p className="mt-2 max-w-2xl text-zinc-300">
        A gallery of anonymized projects focused on problem, solution, and outcome.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/case-studies/financial-services" className="block rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm shadow-lg shadow-black/40 p-5 transition hover:border-[#ff8820] hover:bg-black/55">
          <h3 className="text-lg font-medium text-white">Financial Services Firm</h3>
          <p className="mt-2 text-sm text-zinc-400">~30% performance boost with RTK Query caching strategy.</p>
        </Link>
        <Link href="/case-studies/commercial-banking" className="block rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm shadow-lg shadow-black/40 p-5 transition hover:border-[#ff8820] hover:bg-black/55">
          <h3 className="text-lg font-medium text-white">Commercial Banking Client</h3>
          <p className="mt-2 text-sm text-zinc-400">Reusable components reduced dev-time by ~25%.</p>
        </Link>
        <Link href="/case-studies/internal-project" className="block rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm shadow-lg shadow-black/40 p-5 transition hover:border-[#ff8820] hover:bg-black/55">
          <h3 className="text-lg font-medium text-white">Internal Project</h3>
          <p className="mt-2 text-sm text-zinc-400">Mentoring + Mirage JS mock server cut blockers by 50%.</p>
        </Link>
        <Link href="/case-studies/retail-travel" className="block rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm shadow-lg shadow-black/40 p-5 transition hover:border-[#ff8820] hover:bg-black/55">
          <h3 className="text-lg font-medium text-white">Retail / Travel Brands</h3>
          <p className="mt-2 text-sm text-zinc-400">Legacy jQuery migration and A/B testing infrastructure.</p>
        </Link>
      </div>
    </div>
  );
}


