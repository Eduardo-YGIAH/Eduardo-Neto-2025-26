import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DemoItem } from "@/app/api/demos/items/data";

type QueryArgs = { filter: string; delay?: number; error?: number };
type UpdateArgs = Partial<DemoItem> & { id: string; delay?: number };

type CreateItemsApiOptions = {
  keepUnusedDataFor?: number;
  baseUrl?: string;
};

export function createItemsApi(fetchImpl: typeof fetch, options: CreateItemsApiOptions = {}) {
  const { keepUnusedDataFor = 60, baseUrl = "/" } = options;
  return createApi({
    reducerPath: "itemsApi",
    baseQuery: fetchBaseQuery({ baseUrl, fetchFn: fetchImpl }),
    tagTypes: ["Items"],
    endpoints: (build) => ({
      getItems: build.query<DemoItem[], QueryArgs>({
        query: ({ filter, delay = 200, error = 0 }: QueryArgs) =>
          `api/demos/items?filter=${encodeURIComponent(filter)}&delay=${delay}&error=${error}`,
        transformResponse: (response: { items: DemoItem[] }) => response.items,
        keepUnusedDataFor,
        providesTags: () => [{ type: "Items", id: "LIST" }],
      }),
      updateItem: build.mutation<DemoItem, UpdateArgs>({
        query: ({ id, delay = 200, ...body }: UpdateArgs) => ({
          url: `api/demos/items/${id}?delay=${delay}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: [{ type: "Items", id: "LIST" }],
      }),
    }),
  });
}

export type ItemsApi = ReturnType<typeof createItemsApi>;


