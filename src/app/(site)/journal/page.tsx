import type { Metadata } from "next";
import JournalListing from "@/components/sections/journal/listing";
import { sanityFetch } from "@/sanity/lib/fetch";
import { JOURNAL_POSTS_QUERY } from "@/sanity/lib/queries";
import type { JournalPostSummary } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Journal — Field Notes from Victoria Falls",
  description: "Travel tips, border-crossing notes and guide field reports from Africa Dream Adventures' Victoria Falls team.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const posts = await sanityFetch<JournalPostSummary[]>({ query: JOURNAL_POSTS_QUERY });
  return <JournalListing posts={posts} />;
}
