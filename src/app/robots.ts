import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://africadreamadventures.co.zw";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api/draft-mode/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
