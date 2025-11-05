import Link from "next/link";
import CodePane from "@/app/components/demos/CodePane";

const naiveListCode = [
  "export default function NaiveList({ filter, fetcher }: Props) {",
  "  const [items, setItems] = useState<Item[] | null>(null);",
  "  const [loading, setLoading] = useState(false);",
  "  const [error, setError] = useState<string | null>(null);",
  "",
  "  useEffect(() => {",
  "    let cancelled = false;",
  "    async function run() {",
  "      setLoading(true);",
  "      setError(null);",
  "      try {",
  "        const res = await fetcher(\"/api/demos/items?filter=\" + encodeURIComponent(filter) + \"&delay=400&error=0\");",
  "        if (!res.ok) throw new Error(`HTTP ${res.status}`);",
  "        const data = (await res.json()) as { items: Item[] };",
  "        if (!cancelled) setItems(data.items);",
  "      } catch (e) {",
  "        if (!cancelled) setError((e as Error).message);",
  "      } finally {",
  "        if (!cancelled) setLoading(false);",
  "      }",
  "    }",
  "    run();",
  "    return () => {",
  "      cancelled = true;",
  "    };",
  "  }, [filter, fetcher]);",
  "",
  "  return (",
  "    <div>",
  "      {loading ? \"Fetching…\" : `Loaded ${items?.length ?? 0} items`}",
  "      {error && <div>{error}</div>}",
  "      {/* render list */}",
  "    </div>",
  "  );",
  "}",
].join("\n");

const apiSliceCode = [
  "export const itemsApi = createApi({",
  "  reducerPath: \"itemsApi\",",
  "  baseQuery: fetchBaseQuery({ baseUrl: \"/\", fetchFn: trackedFetch }),",
  "  tagTypes: [\"Items\"],",
  "  endpoints: (build) => ({",
  "    getItems: build.query<DemoItem[], QueryArgs>({",
  "      query: ({ filter, delay = 200, error = 0 }) =>",
  "        `api/demos/items?filter=${encodeURIComponent(filter)}&delay=${delay}&error=${error}`,",
  "      transformResponse: (response: { items: DemoItem[] }) => response.items,",
  "      keepUnusedDataFor: 60,",
  "      providesTags: () => [{ type: \"Items\", id: \"LIST\" }],",
  "    }),",
  "    updateItem: build.mutation<DemoItem, UpdateArgs>({",
  "      query: ({ id, delay = 200, ...body }) => ({",
  "        url: `api/demos/items/${id}?delay=${delay}`,",
  "        method: \"PUT\",",
  "        body,",
  "      }),",
  "      invalidatesTags: [{ type: \"Items\", id: \"LIST\" }],",
  "    }),",
  "  }),",
  "});",
].join("\n");

const storeSetupCode = String.raw`export function createRtkEnvironment(tracker: NetworkTracker) {
  const trackedFetch = createTrackedFetch(tracker, fetch);
  const api = createItemsApi(trackedFetch as typeof fetch);
  const store = configureStore({
    reducer: { [api.reducerPath]: api.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    devTools: true,
  });

  return { store, api };
}`;

const items = [
  {
    title: "Naive list (hand-rolled fetch)",
    description:
      "Each component runs its own network call inside useEffect. Every filter change refetches both lists and you manually juggle loading/error state.",
    language: "tsx" as const,
    code: naiveListCode,
  },
  {
    title: "RTK Query API slice",
    description:
      "The slice defines queries and mutations with tag-based invalidation. fetchBaseQuery is wrapped so the meter records network activity.",
    language: "ts" as const,
    code: apiSliceCode,
  },
  {
    title: "Store wiring",
    description:
      "Each demo mounts its own RTK environment so we can compare metrics side-by-side. The tracked fetch is passed into the slice.",
    language: "ts" as const,
    code: storeSetupCode,
  },
];

export default function RtkCodeOverview() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-zinc-300">
        Here’s the code that powers the demo. Highlights show how the naïve implementation compares to the RTK Query version.
      </p>

      <CodePane items={items} />

      <p className="text-xs text-zinc-400">
        Want more? The full source lives in GitHub — links are available in the repository overview.
      </p>
      <Link
        className="inline-flex text-xs font-medium text-[#ff8820] hover:underline"
        href="https://github.com/eduardo-neto/portfolio/tree/main/demos/rtk-query"
        target="_blank"
        rel="noreferrer"
      >
        View the RTK Query demo on GitHub ↗
      </Link>
    </div>
  );
}


