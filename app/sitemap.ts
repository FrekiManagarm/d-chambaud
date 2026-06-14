import { MetadataRoute } from "next";

import { absoluteUrl, localSeoPages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/mentions-legales"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  return [
    ...staticRoutes,
    ...localSeoPages.map((page) => ({
      url: absoluteUrl(`/${page.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page.slug === "traiteur-bordeaux" ? 0.9 : 0.82,
    })),
  ];
}
