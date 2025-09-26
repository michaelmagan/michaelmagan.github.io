import { allPosts } from "contentlayer/generated";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.michaelmagan.com";
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/thoughts`, changeFrequency: "weekly" },
    { url: `${base}/books`, changeFrequency: "monthly" },
  ];
  const postRoutes: MetadataRoute.Sitemap = allPosts.map((p) => ({
    url: `${base}${p.url}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...staticRoutes, ...postRoutes];
}
