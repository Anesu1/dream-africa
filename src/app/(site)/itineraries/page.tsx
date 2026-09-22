import type { Metadata } from "next";
import ItinerariesListing from "@/components/sections/itineraries/listing";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ITINERARIES_QUERY } from "@/sanity/lib/queries";
import type { ItinerarySummary } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Zimbabwe Safari Itineraries",
  description:
    "3 to 7-day itinerary frameworks for combining Victoria Falls, Hwange National Park, Chobe and the Zambezi — built around real safari and self-drive options, not fixed packages.",
  keywords: [
    "Victoria Falls itinerary",
    "Zimbabwe safari itinerary",
    "5 day Zimbabwe safari",
    "7 day Zimbabwe safari",
    "Victoria Falls Hwange itinerary",
  ],
  alternates: { canonical: "/itineraries" },
};

export default async function ItinerariesPage() {
  const itineraries = await sanityFetch<ItinerarySummary[]>({ query: ITINERARIES_QUERY });
  return <ItinerariesListing itineraries={itineraries} />;
}
