import { MetadataRoute } from "next";

import { getBlogPosts } from "@/lib/blog";
import { absoluteUrl, localSeoPages } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getBlogPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
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

  // /blog is noindexed while it has no published posts (see generateMetadata
  // in app/(frontend)/blog/page.tsx), so it's left out of the sitemap until
  // there's real content to submit.
  if (posts.length > 0) {
    staticRoutes.push({
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

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
