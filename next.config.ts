import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const securityHeaders = [
  // .dev is on the HSTS preload list; browsers ignore this header over plain HTTP (local dev).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Only .next/standalone is shipped to the server, where it runs with bun (deploy/KURULUM.md).
  output: "standalone",
  // This app has its own lockfile; do not let Turbopack pick a parent folder as root.
  turbopack: { root: process.cwd() },
  reactStrictMode: true,
  poweredByHeader: false,
  // nginx compresses (brotli/gzip, deploy/nginx.conf). Gzipping in Node as well costs CPU per request and
  // hands nginx an already-encoded body, so its brotli never applies.
  compress: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Screenshots are 900px wide and never shown wider than 300 CSS px: larger widths would only re-encode the same 900px file.
    deviceSizes: [390, 640, 828, 1080],
    imageSizes: [64, 128, 256, 384, 480],
    qualities: [60, 70, 75],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);
