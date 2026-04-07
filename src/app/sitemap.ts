import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { guides } from "@/lib/guides";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date("2026-04-06"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: new Date(
        Math.max(...guides.map((guide) => new Date(guide.publishedAt).getTime()))
      ),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
    images: guide.coverImage ? [`${SITE_URL}${guide.coverImage}`] : undefined,
  }));

  return [...staticRoutes, ...guideRoutes];
}
