import Link from "next/link";
import HeroName from "./components/HeroName";
import { Reveal } from "./components/Reveal";

export default function Home() {
  const caseStudies = [
    {
      href: "/case-studies/financial-services",
      title: "Financial Services Firm",
      description: "~30% performance boost with RTK Query caching strategy.",
    },
    {
      href: "/case-studies/commercial-banking",
      title: "Commercial Banking Client",
      description: "Stakeholder approval via demo; ~25% dev-time reduction.",
    },
    {
      href: "/case-studies/internal-project",
      title: "Internal Project",
      description: "Mentoring with Mirage JS mock server; 50% fewer blockers.",
    },
  ];

  return (
    <div className="py-16">
      <section className="mt-10 flex flex-col items-center text-center">
        <HeroName />
        <Reveal delay={ 0.5 }>
          <p className="hero-subtext mt-4 max-w-2xl text-lg text-zinc-300">
            I ship accessible,
            high-performance React apps with modern TypeScript, smart state
            management, and a strong UX mindset.
          </p>
        </Reveal>
      </section>

      {/* Vanta.js dots container sits below hero for readability */ }

      <section className="mt-16">
        <Reveal delay={ 0.8 }>
          <h2 className="hero-heading mt-2 text-xl font-semibold text-[#ff8820]">
            Featured Case Studies
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          { caseStudies.map((study, idx) => (
            <Reveal key={ study.href } delay={ 1.0 + idx * 0.1 } width="100%">
              <Link
                href={ study.href }
                className="hero-card block h-full rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm shadow-lg shadow-black/40 p-5 transition hover:border-[#ff8820] hover:bg-black/55"
              >
                <h3 className="text-lg font-medium text-white">{ study.title }</h3>
                <p className="mt-2 text-sm text-zinc-400">{ study.description }</p>
              </Link>
            </Reveal>
          )) }
        </div>
      </section>
    </div>
  );
}
