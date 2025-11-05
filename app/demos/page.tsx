import Link from "next/link";

const demos: Array<{ slug: string; title: string; description: string }> = [
  {
    slug: "rtk-query-caching",
    title: "RTK Query Caching",
    description:
      "Tag invalidation, request de-duplication, and TTL vs a naive fetch approach.",
  },
  {
    slug: "rendering-performance",
    title: "Rendering Performance",
    description:
      "Naive vs optimized rendering with memoization, stable props, and selectors.",
  },
  {
    slug: "component-library",
    title: "Demo Component Library",
    description:
      "A small accessible UI set with docs, used across the interactive demos.",
  },
];

export default function DemosIndexPage() {
  return (
    <section className="py-12">
      <h1 className="mb-8 text-3xl font-semibold">Interactive Demos</h1>
      <p className="mb-10 max-w-3xl text-zinc-300">
        These demos reproduce techniques from my case studies using public, non-confidential
        examples. Each page includes a live demo, a code view, and test cases.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo) => (
          <Link
            key={demo.slug}
            href={`/demos/${demo.slug}`}
            className="group rounded-lg border border-white/10 bg-black/40 p-5 transition-colors hover:bg-black/55 shadow-lg shadow-black/40"
          >
            <h2 className="mb-2 text-xl font-medium text-white group-hover:text-[#ff8820]">
              {demo.title}
            </h2>
            <p className="text-sm text-zinc-300">{demo.description}</p>
            <div className="mt-4 text-sm text-[#ff8820]">Open →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}


