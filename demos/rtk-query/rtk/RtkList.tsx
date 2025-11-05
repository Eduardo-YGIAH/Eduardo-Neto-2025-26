"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ItemsApi } from "./api";
import RenderCountBadge from "@/app/components/demos/RenderCountBadge";
import type { DemoItem } from "@/app/api/demos/items/data";
import type { NetworkTracker } from "@/lib/metrics/networkTracker";

type QueryError = { status: unknown; data?: unknown } | { message?: string } | undefined;

function getErrorMessage(error: QueryError): string {
  if (!error) return "Error";
  if (typeof error === "object" && error !== null && "status" in error) {
    const fbqe = error as { status: unknown; data?: unknown };
    const data: unknown = fbqe.data;
    if (typeof data === "string") return data;
    if (data && typeof data === "object" && "message" in data) {
      const msg = (data as { message?: unknown }).message;
      if (typeof msg === "string") return msg;
    }
    return `HTTP ${String(fbqe.status)}`;
  }
  const se = error as { message?: unknown };
  return typeof se.message === "string" ? se.message : "Error";
}

type Props = {
  filter: string;
  api: ItemsApi;
  tracker: NetworkTracker;
};

export default function RtkList({ filter, api, tracker }: Props) {
  const { useGetItemsQuery, useUpdateItemMutation } = api;
  const queryArgs = useMemo(() => ({ filter, delay: 200 }), [filter]);
  const {
    data,
    isFetching,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetItemsQuery(queryArgs);
  const [updateItem, { isLoading: isSaving }] = useUpdateItemMutation();

  const items: DemoItem[] = data ?? [];
  const first = items[0];

  const hasSeenLoadingRef = useRef(false);
  const recordedKeyRef = useRef<string | null>(null);
  const argsKey = filter;

  useEffect(() => {
    hasSeenLoadingRef.current = false;
    recordedKeyRef.current = null;
  }, [argsKey]);

  useEffect(() => {
    if (isLoading) {
      hasSeenLoadingRef.current = true;
    }
  }, [isLoading]);

  useEffect(() => {
    if (!hasSeenLoadingRef.current && isSuccess) {
      if (recordedKeyRef.current !== argsKey) {
        tracker.recordCacheHit();
        recordedKeyRef.current = argsKey;
      }
    }
  }, [isSuccess, argsKey, tracker]);

  return (
    <div className="rounded-lg border border-white/10 bg-black p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium">RTK Query list</h3>
        <RenderCountBadge
          tooltip="RTK Query notifies subscribers through each lifecycle step (serve cache, start background refetch, settle). That extra bookkeeping means you may see more renders here even though the network usage drops."
        />
      </div>
      <div className="mb-3 text-sm text-zinc-300">
        {isFetching ? "Fetching…" : `Loaded ${data?.length ?? 0} items`}
      </div>
      {isError && (
        <div className="text-sm text-red-400">{getErrorMessage(error as QueryError)}</div>
      )}

      {items.length > 0 && (
        <ul className="mt-2 grid grid-cols-1 gap-1 text-sm text-zinc-300">
          {items.map((item) => (
            <li key={`${filter}-${item.id}`} className="rounded-md bg-white/5 px-2 py-1">
              <span className="text-white">{item.name}</span>
              <span className="ml-2 text-zinc-400">({item.category})</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <button
          disabled={!first || isSaving}
          onClick={() =>
            first &&
            updateItem({ id: first.id, name: first.name + " ✨" })
          }
          className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/20 disabled:opacity-50"
        >
          {isSaving ? "Saving…" : "Mutate first item (invalidates cache)"}
        </button>
      </div>
    </div>
  );
}

