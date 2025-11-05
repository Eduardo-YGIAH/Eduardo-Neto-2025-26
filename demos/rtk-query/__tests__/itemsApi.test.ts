import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { createNetworkTracker } from "@/lib/metrics/networkTracker";
import { createRtkEnvironment } from "../rtk/store";
import type { DemoItem } from "@/app/api/demos/items/data";
import type { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const alphaItems: DemoItem[] = [
  { id: "1", name: "Alpha One", category: "alpha", updatedAt: Date.now() },
  { id: "2", name: "Alpha Two", category: "alpha", updatedAt: Date.now() },
];

const betaItems: DemoItem[] = [
  { id: "1", name: "Alpha One (Updated)", category: "alpha", updatedAt: Date.now() },
  { id: "2", name: "Alpha Two", category: "alpha", updatedAt: Date.now() },
];

const jsonResponse = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });

const flushMicrotasks = () => new Promise((resolve) => setTimeout(resolve, 0));

type AppStore = ReturnType<typeof createRtkEnvironment>["store"];
type RootState = ReturnType<AppStore["getState"]>;
type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

const useDispatch = (store: AppStore): AppDispatch => store.dispatch as AppDispatch;

describe("itemsApi caching behavior", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("dedupes identical subscribers to the same query", async () => {
    const tracker = createNetworkTracker();
    const fetchMock = vi.fn(async () => jsonResponse({ items: alphaItems }));
    const { store, api } = createRtkEnvironment(tracker, { fetchImpl: fetchMock, baseUrl: "http://tests/" });
    const dispatch = useDispatch(store);

    const first = dispatch(api.endpoints.getItems.initiate({ filter: "alpha" }));
    const second = dispatch(api.endpoints.getItems.initiate({ filter: "alpha" }));

    await first.unwrap();
    await second.unwrap();

    expect(fetchMock).toHaveBeenCalledTimes(1);

    first.unsubscribe();
    second.unsubscribe();
  });

  it("invalidates and refetches exactly once after a mutation", async () => {
    let listCall = 0;
    const tracker = createNetworkTracker();
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const request = input instanceof Request ? input : undefined;
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : request?.url ?? String(input);
      const method = init?.method ?? request?.method ?? "GET";

      if (url.includes("/api/demos/items?")) {
        listCall += 1;
        const payload = listCall === 1 ? alphaItems : betaItems;
        return jsonResponse({ items: payload });
      }

      if (url.includes("/api/demos/items/") && method.toUpperCase() === "PUT") {
        return jsonResponse(betaItems[0]);
      }

      throw new Error(`Unexpected request: ${url}`);
    });

    const { store, api } = createRtkEnvironment(tracker, { fetchImpl: fetchMock, baseUrl: "http://tests/" });
    const dispatch = useDispatch(store);

    const subscription = dispatch(api.endpoints.getItems.initiate({ filter: "alpha" }));
    await subscription.unwrap();

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const mutation = dispatch(
      api.endpoints.updateItem.initiate({ id: "1", name: "Alpha One (Updated)", category: "alpha", delay: 0 })
    );
    await mutation.unwrap();

    await flushMicrotasks();
    await flushMicrotasks();

    expect(fetchMock).toHaveBeenCalledTimes(3);

    const state = store.getState() as RootState;
    const result = api.endpoints.getItems.select({ filter: "alpha" })(state);
    expect(result?.data?.[0].name).toBe("Alpha One (Updated)");

    subscription.unsubscribe();
  });

  it("respects the keepUnusedDataFor TTL before dropping cached data", async () => {
    vi.useFakeTimers();
    const tracker = createNetworkTracker();
    const fetchMock = vi.fn(async () => jsonResponse({ items: alphaItems }));
    const { store, api } = createRtkEnvironment(tracker, {
      fetchImpl: fetchMock,
      keepUnusedDataFor: 1,
      baseUrl: "http://tests/",
    });
    const dispatch = useDispatch(store);

    const sub = dispatch(api.endpoints.getItems.initiate({ filter: "alpha" }));
    await sub.unwrap();
    sub.unsubscribe();

    const select = () => api.endpoints.getItems.select({ filter: "alpha" })(store.getState() as RootState);

    expect(select().data).toBeDefined();

    await vi.advanceTimersByTimeAsync(900);

    expect(select().data).toBeDefined();

    await vi.advanceTimersByTimeAsync(2000);

    expect(select().data).toBeUndefined();
  });
});

