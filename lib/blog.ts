import configPromise from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";

import type { Post } from "@/payload-types";

const locale = "fr" as const;

export const getBlogPosts = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: "posts",
      depth: 1,
      draft: false,
      limit: 24,
      locale,
      overrideAccess: false,
      sort: "-publishedAt",
      where: {
        _status: {
          equals: "published",
        },
      },
    });

    return result.docs;
  } catch {
    return [];
  }
});

export async function getBlogPostBySlug(slug: string): Promise<Post | null> {
  try {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: "posts",
      depth: 1,
      draft: false,
      limit: 1,
      locale,
      overrideAccess: false,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            _status: {
              equals: "published",
            },
          },
        ],
      },
    });

    return result.docs[0] || null;
  } catch {
    return null;
  }
}
