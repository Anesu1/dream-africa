/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // This environment's outbound connectivity to Unsplash is too slow/unreliable for
    // Next's server-side fetch-and-resize step (regularly times out at 10s+). Unoptimized
    // makes next/image render a direct <img src>, so the browser fetches it itself —
    // matches how the plain <img> tags elsewhere on this site always worked.
    unoptimized: true,
  },
};
export default nextConfig;
