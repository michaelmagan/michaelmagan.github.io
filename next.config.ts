import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";
import path from "path";

const nextConfig: NextConfig = {
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
  webpack: (config) => {
    // Ensure Contentlayer's generated module resolves during build
    config.resolve.alias = {
      ...config.resolve.alias,
      "contentlayer/generated": path.join(
        process.cwd(),
        ".contentlayer/generated"
      ),
    } as typeof config.resolve.alias;
    return config;
  },
};

export default withContentlayer(nextConfig);
