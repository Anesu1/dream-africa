import type { Metadata } from "next";
import JournalListing from "@/components/sections/journal/listing";

export const metadata: Metadata = {
  title: "Journal — Field Notes from Victoria Falls",
  description: "Travel tips, border-crossing notes and guide field reports from Dream Africa's Victoria Falls team.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return <JournalListing />;
}
