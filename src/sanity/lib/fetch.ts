import { cache } from "react";
import { draftMode } from "next/headers";
import { client } from "./client";

export const sanityFetch = cache(async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, unknown>;
}): Promise<QueryResponse> {
  const isDraftMode = (await draftMode()).isEnabled;

  if (isDraftMode) {
    return client
      .withConfig({
        token: process.env.SANITY_TOKEN,
        perspective: "drafts",
        useCdn: false,
        stega: { enabled: true, studioUrl: "/studio" },
      })
      .fetch<QueryResponse>(query, params, { cache: "no-store" });
  }

  return client.fetch<QueryResponse>(query, params, { next: { revalidate: 60 } });
});
