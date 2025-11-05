import Link from "next/link";
import AnimatedHeroName from "./components/AnimatedHeroName";
import { HERO_ANIMATION_DURATION } from "@/lib/heroAnimation";

const HERO_SUBTEXT_FADE_DURATION = 0.6;
const HERO_HEADING_SLIDE_DURATION = 0.5;
const HERO_CARD_SLIDE_DURATION = 0.45;
const HERO_CARD_STAGGER = 0.18;

export default function Home() {
  const headingDelay = HERO_ANIMATION_DURATION + HERO_SUBTEXT_FADE_DURATION;
  const cardsDelayStart = headingDelay + HERO_HEADING_SLIDE_DURATION;

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
        <AnimatedHeroName />
        <p
          className="hero-subtext mt-4 max-w-2xl text-lg text-zinc-300"
          style={{
            animationDelay: `${HERO_ANIMATION_DURATION}s`,
            animationDuration: `${HERO_SUBTEXT_FADE_DURATION}s`,
          }}
        >
          Front-End Engineer, ready for Senior level roles. I ship accessible,
          high-performance React apps with modern TypeScript, smart state
          management, and a strong UX mindset.
        </p>
      </section>

      {/* Vanta.js dots container sits below hero for readability */}

      <section className="mt-16">
        <h2
          className="hero-heading mt-2 text-xl font-semibold text-[#ff8820]"
          style={{
            animationDelay: `${headingDelay}s`,
            animationDuration: `${HERO_HEADING_SLIDE_DURATION}s`,
          }}
        >
          Featured Case Studies
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, idx) => (
            <Link
              key={study.href}
              href={study.href}
              className="hero-card block rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm shadow-lg shadow-black/40 p-5 transition hover:border-[#ff8820] hover:bg-black/55"
              style={{
                animationDelay: `${cardsDelayStart + idx * HERO_CARD_STAGGER}s`,
                animationDuration: `${HERO_CARD_SLIDE_DURATION}s`,
              }}
            >
              <h3 className="text-lg font-medium text-white">{study.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{study.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
