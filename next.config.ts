import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {},
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        // Update feed for OpenHuman Mail. Installed copies keep this address,
        // so the feed itself can move without breaking them.
        source: "/OpenHuman/appcast.xml",
        destination:
          "https://raw.githubusercontent.com/michaelmagan/OpenHuman/gh-pages/appcast.xml",
        permanent: false,
      },
    ];
  },
  webpack: (config) => {
    // Ensure Contentlayer's generated module resolves during build
    config.resolve.alias = {
      ...config.resolve.alias,
      "contentlayer/generated": path.join(
        process.cwd(),
        ".contentlayer/generated",
      ),
    } as typeof config.resolve.alias;
    return config;
  },
};

export default withContentlayer(nextConfig);
