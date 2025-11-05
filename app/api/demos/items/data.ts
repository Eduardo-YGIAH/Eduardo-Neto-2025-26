export type DemoItem = {
  id: string;
  name: string;
  category: string;
  updatedAt: number;
};

const categories = ["alpha", "beta", "gamma", "delta"] as const;

const items: DemoItem[] = Array.from({ length: 40 }).map((_, i) => ({
  id: String(i + 1),
  name: `Item ${i + 1}`,
  category: categories[i % categories.length],
  updatedAt: Date.now() - Math.floor(Math.random() * 1000 * 60 * 60),
}));

export function listItems(filter: string | null): DemoItem[] {
  if (!filter) return items;
  const f = filter.toLowerCase();
  return items.filter(
    (it) => it.name.toLowerCase().includes(f) || it.category.toLowerCase().includes(f)
  );
}

export function updateItem(updated: DemoItem): DemoItem {
  const idx = items.findIndex((i) => i.id === updated.id);
  if (idx >= 0) {
    items[idx] = { ...updated, updatedAt: Date.now() };
  } else {
    items.push({ ...updated, updatedAt: Date.now() });
  }
  return items.find((i) => i.id === updated.id)!;
}


