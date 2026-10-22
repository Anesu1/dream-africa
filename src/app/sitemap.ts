import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";

const BASE_URL = SITE_URL;

// Without this, Next treats sitemap.xml as fully static — generated once and
// cached indefinitely (confirmed: Netlify held a stale copy for ~1 year TTL
// after a deploy). Scheduled journal posts need this to actually appear here
// as their publish dates arrive, not just at the next code deploy.
export const revalidate = 3600;

type Entry = { slug: string; _updatedAt: string };
type SitemapData = {
  tours: Entry[];
  vehicles: Entry[];
  itineraries: Entry[];
  journal: Entry[];
  home: string | null;
  safaris: string | null;
  rentals: string | null;
  activities: string | null;
};

const latest = (dates: (string | null | undefined)[]) =>
  dates.filter((d): d is string => Boolean(d)).sort().at(-1);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await client.fetch<SitemapData>(SITEMAP_QUERY);

  // lastModified is only set where we know when the content actually changed. Stamping every URL
  // with "now" on each regeneration teaches Google to ignore the field. Pages whose copy lives in
  // code (services, packages, jet boat) omit it rather than guess.
  const coreRoutes: { path: string; lastModified?: string }[] = [
    { path: "", lastModified: data.home ?? undefined },
    { path: "/safaris", lastModified: data.safaris ?? undefined },
    { path: "/car-rental-victoria-falls", lastModified: data.rentals ?? undefined },
    { path: "/activities", lastModified: data.activities ?? undefined },
    { path: "/activities/victoria-falls-jet-boat" },
    { path: "/activities/packages" },
    { path: "/itineraries", lastModified: latest(data.itineraries.map((i) => i._updatedAt)) },
    { path: "/services" },
    { path: "/journal", lastModified: latest(data.journal.map((j) => j._updatedAt)) },
  ];

  const detail = (prefix: string, entries: Entry[]): MetadataRoute.Sitemap =>
    entries.map(({ slug, _updatedAt }) => ({ url: `${BASE_URL}${prefix}/${slug}`, lastModified: _updatedAt }));

  return [
    ...coreRoutes.map((r) => ({ url: `${BASE_URL}${r.path}`, ...(r.lastModified ? { lastModified: r.lastModified } : {}) })),
    ...detail("/safaris", data.tours),
    ...detail("/car-rental-victoria-falls", data.vehicles),
    ...detail("/itineraries", data.itineraries),
    ...detail("/journal", data.journal),
  ];
}
