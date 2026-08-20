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
      { source: "/rentals", destination: "/car-rental-victoria-falls", permanent: true },
      { source: "/rentals/:vehicle", destination: "/car-rental-victoria-falls/:vehicle", permanent: true },
    ];
  },
};
export default nextConfig;
