import type { NextConfig } from "next";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v5.airtableusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp"],
    // minimumCacheTTL: 2678400, // 31 days
  },
};

export default withBundleAnalyzer(nextConfig);
