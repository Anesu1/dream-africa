import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { JOURNAL_POST_SLUGS_QUERY, TOURS_QUERY, VEHICLES_QUERY } from "@/sanity/lib/queries";
import { SAFARI_TOURS } from "@/lib/data/safaris";
import { ACTIVITIES } from "@/lib/data/activities";
import { RIVER_CRUISES } from "@/lib/data/cruises";
import { VEHICLES } from "@/lib/data/vehicles";
import type { Tour, Vehicle } from "@/sanity/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://africadreamadventures.co.zw";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // Fetch dynamic slugs from Sanity with safe fallbacks
  let journalSlugs: string[] = [];
  let sanityTourSlugs: string[] = [];
  let sanityVehicleSlugs: string[] = [];

  try {
    const [journalRes, tourRes, vehicleRes] = await Promise.all([
      client.fetch<{ slug: string }[]>(JOURNAL_POST_SLUGS_QUERY),
      client.fetch<Tour[]>(TOURS_QUERY),
      client.fetch<Vehicle[]>(VEHICLES_QUERY),
    ]);

    journalSlugs = journalRes?.map((j) => j.slug).filter(Boolean) ?? [];
    sanityTourSlugs = tourRes?.map((t) => t.slug).filter(Boolean) ?? [];
    sanityVehicleSlugs = vehicleRes?.map((v) => v.slug).filter(Boolean) ?? [];
  } catch {
    // Fallback if CMS is initializing
  }

  // Curated static tours + Sanity tours (deduplicated)
  const allSafariSlugs = Array.from(
    new Set([...SAFARI_TOURS.map((s) => s.slug), ...sanityTourSlugs])
  );

  // Curated static activities
  const allActivitySlugs = ACTIVITIES.map((a) => a.slug);

  // Curated river cruises
  const allCruiseSlugs = RIVER_CRUISES.map((c) => c.slug);

  // Curated vehicles + Sanity vehicles (deduplicated)
  const allVehicleSlugs = Array.from(
    new Set([...VEHICLES.map((v) => v.slug), ...sanityVehicleSlugs])
  );

  // 1. Core Primary Hubs
  const primaryRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/safaris`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/activities`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cruises`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/car-rental`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // 2. High-Intent Specialized Landing Pages
  const specializedLandingRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/car-rental/4x4-safari`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/car-rental/cross-border`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/car-rental/victoria-falls-airport`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // 3. Dynamic Tour Itineraries
  const safariRoutes: MetadataRoute.Sitemap = allSafariSlugs.map((slug) => ({
    url: `${BASE_URL}/safaris/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4. Dynamic Activity Pages
  const activityRoutes: MetadataRoute.Sitemap = allActivitySlugs.map((slug) => ({
    url: `${BASE_URL}/activities/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 5. Dynamic Cruise Pages
  const cruiseRoutes: MetadataRoute.Sitemap = allCruiseSlugs.map((slug) => ({
    url: `${BASE_URL}/cruises/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 6. Dynamic Vehicle Rental Pages
  const vehicleRoutes: MetadataRoute.Sitemap = allVehicleSlugs.map((slug) => ({
    url: `${BASE_URL}/car-rental/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 7. Journal Hub & Articles
  const journalHubRoute: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/journal`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const journalPostRoutes: MetadataRoute.Sitemap = journalSlugs.map((slug) => ({
    url: `${BASE_URL}/journal/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // 8. Legal & Supporting Pages
  const legalRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/legal`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  return [
    ...primaryRoutes,
    ...specializedLandingRoutes,
    ...safariRoutes,
    ...activityRoutes,
    ...cruiseRoutes,
    ...vehicleRoutes,
    ...journalHubRoute,
    ...journalPostRoutes,
    ...legalRoutes,
  ];
}
