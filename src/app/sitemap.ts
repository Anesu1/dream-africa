import type { MetadataRoute } from "next";
import { JOURNAL_POSTS } from "@/lib/content";

// No production domain has been confirmed yet — set NEXT_PUBLIC_SITE_URL once the
// real domain is live. Falls back to a placeholder so this doesn't silently point
// at the wrong host.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/safaris", "/rentals", "/journal"];
  const journalRoutes = JOURNAL_POSTS.map((post) => `/journal/${post.slug}`);

  return [...routes, ...journalRoutes].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route.startsWith("/journal/") ? 0.6 : 0.8,
  }));
}
