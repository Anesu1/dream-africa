/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // This environment's outbound connectivity to Unsplash is unreliable under concurrent
    // load for Next's server-side fetch-and-resize step (500s/504s when multiple images
    // optimize at once, confirmed by direct testing against /_next/image). Unoptimized
    // makes next/image render a direct <img src>, so the browser fetches it itself.
    // Revisit once deployed to real production infra — this is a sandbox-specific limit,
    // not necessarily true of the eventual hosting environment.
    unoptimized: true,
  },
  async redirects() {
    // /rentals moved to /car-rental-victoria-falls — permanent redirect so
    // existing indexing/backlinks transfer instead of hitting a dead page.
    return [
      // Plain HTTP was serving content directly instead of redirecting to
      // HTTPS (confirmed via curl — GSC flagged the bare-HTTP homepage as
      // "Crawled - currently not indexed", which is Google correctly
      // refusing to index the insecure duplicate). Cloudflare normally
      // forwards the original scheme via x-forwarded-proto, so this `has`
      // condition catches it at the routing layer regardless of whether
      // "Always Use HTTPS" is also enabled on the Cloudflare side.
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://africadreamadventures.co.zw/:path*",
        permanent: true,
      },
      { source: "/rentals", destination: "/car-rental-victoria-falls", permanent: true },
      { source: "/rentals/:vehicle", destination: "/car-rental-victoria-falls/:vehicle", permanent: true },
      // Land Cruiser 79 was removed from the fleet (replaced by the Quantum
      // Minibus), but the old vehicle page kept serving a stale cached
      // artifact instead of a 404 even after rebuilds that correctly
      // excluded it from generateStaticParams — an explicit redirect
      // intercepts the request at the routing layer, before Next.js would
      // otherwise reach for that stale cache entry.
      { source: "/car-rental-victoria-falls/land-cruiser-79", destination: "/car-rental-victoria-falls", permanent: true },
      { source: "/review", destination: "https://g.page/r/Cc4so9OdwapFEAI/review", permanent: false },
      { source: "/reviews", destination: "https://g.page/r/Cc4so9OdwapFEAI/review", permanent: false },
      { source: "/google-review", destination: "https://g.page/r/Cc4so9OdwapFEAI/review", permanent: false },
    ];
  },
};
export default nextConfig;
