"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Tab = {
  key: "demo" | "code" | "tests";
  label: string;
};

const tabs: Tab[] = [
  { key: "demo", label: "Demo" },
  { key: "code", label: "Code" },
  { key: "tests", label: "Tests" },
];

export default function TabNav() {
  const pathname = usePathname();
  const search = useSearchParams();
  const raw = (search.get("tab") as string) || "demo";
  const isValidTab = (v: string): v is Tab["key"] => v === "demo" || v === "code" || v === "tests";
  const active: Tab["key"] = isValidTab(raw) ? raw : "demo";

  return (
    <div className="mb-6 flex gap-2 rounded-lg border border-white/10 bg-black/40 p-1 text-sm">
      {tabs.map((t) => {
        const href = `${pathname}?tab=${t.key}`;
        const isActive = active === t.key;
        return (
          <Link
            key={t.key}
            href={href}
            scroll={false}
            className={
              "rounded-md px-3 py-2 transition-colors " +
              (isActive
                ? "bg-[#ff8820] text-black"
                : "text-zinc-300 hover:text-white hover:bg-white/10")
            }
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}


