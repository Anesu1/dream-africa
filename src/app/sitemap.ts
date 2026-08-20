import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { JOURNAL_POST_SLUGS_QUERY, TOUR_SLUGS_QUERY, VEHICLE_SLUGS_QUERY } from "@/sanity/lib/queries";

// No production domain has been confirmed yet — set NEXT_PUBLIC_SITE_URL once the
// real domain is live. Falls back to a placeholder so this doesn't silently point
// at the wrong host.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

// Without this, Next treats sitemap.xml as fully static — generated once and
// cached indefinitely (confirmed: Netlify held a stale copy for ~1 year TTL
// after a deploy). Scheduled journal posts need this to actually appear here
// as their publish dates arrive, not just at the next code deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [journalSlugs, vehicleSlugs, tourSlugs] = await Promise.all([
    client.fetch<{ slug: string }[]>(JOURNAL_POST_SLUGS_QUERY),
    client.fetch<{ slug: string }[]>(VEHICLE_SLUGS_QUERY),
    client.fetch<{ slug: string }[]>(TOUR_SLUGS_QUERY),
  ]);

  const routes = ["", "/safaris", "/rentals", "/activities", "/journal"];
  const journalRoutes = journalSlugs.map(({ slug }) => `/journal/${slug}`);
  const vehicleRoutes = vehicleSlugs.map(({ slug }) => `/rentals/${slug}`);
  const tourRoutes = tourSlugs.map(({ slug }) => `/safaris/${slug}`);

  return [...routes, ...vehicleRoutes, ...tourRoutes, ...journalRoutes].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route.startsWith("/journal/") ? 0.6 : 0.8,
  }));
}
