import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Vercel Image Optimization quota burn (0 / 1000 limit)
  images: {
    unoptimized: true,
  },
  // Enable compression to minimize bandwidth usage
  compress: true,
  // Disable X-Powered-By header for security
  poweredByHeader: false,
  // React Strict Mode for robust code quality
  reactStrictMode: true,
  // Aggressive caching and security headers
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|ico|woff|woff2|ttf|mp3|mp4)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
