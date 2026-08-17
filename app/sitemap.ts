import { MetadataRoute } from "next";

import { getBlogPosts } from "@/lib/blog";
import { absoluteUrl, localSeoPages } from "@/lib/seo";

/**
 * Editorial dates for the hand-written pages, as `YYYY-MM-DD`. Bump one when
 * you change that page's copy.
 *
 * These are deliberately not `new Date()`: the sitemap is regenerated on every
 * deploy, so `new Date()` claimed every URL had just changed, every time. A
 * `lastmod` that always says "today" is noise, and crawlers learn to discount
 * it — which costs us the signal on the pages that genuinely did change.
 */
const staticPageUpdatedAt = {
  home: "2026-08-16",
  contact: "2026-06-14",
  legal: "2026-06-14",
} as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(),
      lastModified: staticPageUpdatedAt.home,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: staticPageUpdatedAt.contact,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/mentions-legales"),
      lastModified: staticPageUpdatedAt.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // /blog is noindexed while it has no published posts (see generateMetadata
  // in app/(frontend)/blog/page.tsx), so it's left out of the sitemap until
  // there's real content to submit.
  if (posts.length > 0) {
    const mostRecentPostUpdate = posts
      .map((post) => post.updatedAt)
      .sort()
      .at(-1);

    staticRoutes.push({
      url: absoluteUrl("/blog"),
      lastModified: mostRecentPostUpdate,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...localSeoPages.map((page) => ({
      url: absoluteUrl(`/${page.slug}`),
      lastModified: page.contentUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: page.slug === "traiteur-bordeaux" ? 0.9 : 0.82,
    })),
    ...postRoutes,
  ];
}
