"use client";

import { useEffect, useState } from "react";
import RenderCountBadge from "@/app/components/demos/RenderCountBadge";

type Item = {
  id: string;
  name: string;
  category: string;
  updatedAt: number;
};

type Props = {
  filter: string;
  fetcher: typeof fetch;
};

export default function NaiveList({ filter, fetcher }: Props) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetcher(`/api/demos/items?filter=${encodeURIComponent(filter)}&delay=400&error=0`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { items: Item[] };
        if (!cancelled) setItems(data.items);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [filter, fetcher]);

  const loadedCount = items?.length ?? 0;

  return (
    <div className="rounded-lg border border-white/10 bg-black p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium">Naive list</h3>
        <RenderCountBadge />
      </div>
      <div className="mb-3 text-sm text-zinc-300">
        {loading ? "Fetching…" : `Loaded ${loadedCount} items`}
      </div>
      {error && <div className="text-sm text-red-400">{error}</div>}
      {items && (
        <ul className="mt-2 grid grid-cols-1 gap-1 text-sm text-zinc-300">
          {items.map((it) => (
            <li key={`${filter}-${it.id}`} className="rounded-md bg-white/5 px-2 py-1">
              <span className="text-white">{it.name}</span>
              <span className="ml-2 text-zinc-400">({it.category})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


