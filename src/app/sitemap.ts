import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { ITINERARY_SLUGS_QUERY, JOURNAL_POST_SLUGS_QUERY, TOUR_SLUGS_QUERY, VEHICLE_SLUGS_QUERY } from "@/sanity/lib/queries";

// No production domain has been confirmed yet — set NEXT_PUBLIC_SITE_URL once the
// real domain is live. Falls back to a placeholder so this doesn't silently point
// at the wrong host.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://africadreamadventures.co.zw";

// Without this, Next treats sitemap.xml as fully static — generated once and
// cached indefinitely (confirmed: Netlify held a stale copy for ~1 year TTL
// after a deploy). Scheduled journal posts need this to actually appear here
// as their publish dates arrive, not just at the next code deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [journalSlugs, vehicleSlugs, tourSlugs, itinerarySlugs] = await Promise.all([
    client.fetch<{ slug: string }[]>(JOURNAL_POST_SLUGS_QUERY),
    client.fetch<{ slug: string }[]>(VEHICLE_SLUGS_QUERY),
    client.fetch<{ slug: string }[]>(TOUR_SLUGS_QUERY),
    client.fetch<{ slug: string }[]>(ITINERARY_SLUGS_QUERY),
  ]);

  const coreRoutes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/safaris", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/car-rental-victoria-falls", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/activities", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/activities/victoria-falls-jet-boat", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/activities/packages", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/itineraries", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/journal", priority: 0.8, changeFrequency: "weekly" as const },
  ];

  const now = new Date().toISOString();

  const staticEntries: MetadataRoute.Sitemap = coreRoutes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const vehicleEntries: MetadataRoute.Sitemap = vehicleSlugs.map(({ slug }) => ({
    url: `${BASE_URL}/car-rental-victoria-falls/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const tourEntries: MetadataRoute.Sitemap = tourSlugs.map(({ slug }) => ({
    url: `${BASE_URL}/safaris/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const itineraryEntries: MetadataRoute.Sitemap = itinerarySlugs.map(({ slug }) => ({
    url: `${BASE_URL}/itineraries/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const journalEntries: MetadataRoute.Sitemap = journalSlugs.map(({ slug }) => ({
    url: `${BASE_URL}/journal/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...tourEntries, ...vehicleEntries, ...itineraryEntries, ...journalEntries];
}
