import TabNav from "@/app/components/demos/TabNav";
import RtkComparison from "@/demos/rtk-query/RtkComparison";
import RtkCodeOverview from "@/demos/rtk-query/RtkCodeOverview";
import RtkTestsOverview from "@/demos/rtk-query/RtkTestsOverview";
import type { ReactNode } from "react";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[]>>;
};

type TabKey = "demo" | "code" | "tests";

type DemoConfig = {
  title: string;
  summary: string;
  supporting?: string;
  tabs: Record<TabKey, ReactNode>;
};

const PLACEHOLDER_TABS: Record<TabKey, ReactNode> = {
  demo: (
    <div className="rounded-lg border border-white/10 bg-black/40 p-6 text-zinc-300">
      <p>Interactive demo goes here. Next steps will replace this placeholder with the real implementation.</p>
    </div>
  ),
  code: (
    <div className="rounded-lg border border-white/10 bg-black/40 p-6 text-zinc-300">
      <p>Code view will display key files with syntax highlighting.</p>
    </div>
  ),
  tests: (
    <div className="rounded-lg border border-white/10 bg-black/40 p-6 text-zinc-300">
      <p>Tests tab will show Jest + RTL excerpts and results.</p>
    </div>
  ),
};

const DEMO_CONTENT: Record<string, DemoConfig> = {
  "rtk-query-caching": {
    title: "RTK Query Caching",
    summary:
      "Compare a naive fetch-heavy implementation with an RTK Query version that dedupes network traffic and invalidates on mutation.",
    supporting:
      "The demo instruments request counts, cache hits, and render counts so you can see the impact of the caching strategy in real time.",
    tabs: {
      demo: <RtkComparison />,
      code: <RtkCodeOverview />,
      tests: <RtkTestsOverview />,
    },
  },
  "rendering-performance": {
    title: "Rendering Performance",
    summary: "Interactive example coming soon.",
    tabs: PLACEHOLDER_TABS,
  },
  "component-library": {
    title: "Demo Component Library",
    summary: "Interactive example coming soon.",
    tabs: PLACEHOLDER_TABS,
  },
};

export default async function DemoSlugPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearch = (await searchParams) ?? {};
  const config = DEMO_CONTENT[resolvedParams.slug] ?? {
    title: "Demo",
    summary: "Explore a reproducible, public version of the technique with live metrics, a code walk-through, and test cases.",
    tabs: PLACEHOLDER_TABS,
  };

  const rawTabValue = resolvedSearch.tab;
  const rawTab = Array.isArray(rawTabValue) ? rawTabValue[0] : rawTabValue;
  const isValidTab = (v: string): v is TabKey => v === "demo" || v === "code" || v === "tests";
  const tabParam: TabKey = rawTab && isValidTab(rawTab) ? rawTab : "demo";

  return (
    <section className="py-12">
      <h1 className="mb-2 text-3xl font-semibold">{config.title}</h1>
      <p className="max-w-3xl text-zinc-300">{config.summary}</p>
      {config.supporting && <p className="mt-3 max-w-3xl text-sm text-zinc-400">{config.supporting}</p>}

      <div className="mt-8">
        <TabNav />
        <div className="tab-panel-wrapper">
          <div key={tabParam} className="tab-panel">
            {config.tabs[tabParam] ?? PLACEHOLDER_TABS[tabParam]}
          </div>
        </div>
      </div>
    </section>
  );
}

