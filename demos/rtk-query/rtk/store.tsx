"use client";

import { configureStore } from "@reduxjs/toolkit";
import { Provider as ReduxProvider } from "react-redux";
import React from "react";
import { createItemsApi } from "./api";
import { createTrackedFetch, type NetworkTracker } from "@/lib/metrics/networkTracker";

type EnvironmentOptions = {
  fetchImpl?: typeof fetch;
  keepUnusedDataFor?: number;
  baseUrl?: string;
};

export function createRtkEnvironment(tracker: NetworkTracker, options: EnvironmentOptions = {}) {
  const baseFetch = options.fetchImpl ?? fetch;
  const trackedFetch = createTrackedFetch(tracker, baseFetch);
  const api = createItemsApi(trackedFetch as typeof fetch, {
    keepUnusedDataFor: options.keepUnusedDataFor,
    baseUrl: options.baseUrl,
  });
  const reducer = {
    [api.reducerPath]: api.reducer,
  } as { [K in typeof api.reducerPath]: typeof api.reducer };
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    devTools: true,
  });

  return { store, api };
}

export type RtkEnvironment = ReturnType<typeof createRtkEnvironment>;

export function RtkProvider({ env, children }: { env: RtkEnvironment; children: React.ReactNode }) {
  return <ReduxProvider store={env.store}>{children}</ReduxProvider>;
}


