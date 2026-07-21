import { plainTextToLexical } from "@/lib/backoffice/rich-text";
import type { Post } from "@/payload-types";

export type PostFields = {
  title: string;
  publishedAt: string;
  status: string;
  excerpt: string;
  content: string;
};

type PostWriteData = Pick<
  Post,
  "author" | "categories" | "content" | "excerpt" | "publishedAt" | "seo" | "slug" | "title"
> & {
  _status: "draft" | "published";
};

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const toIsoDate = (value: string) =>
  value ? new Date(value).toISOString() : new Date().toISOString();

export const nextAvailableSlug = (base: string, takenSlugs: Iterable<string>) => {
  const taken = new Set(takenSlugs);

  if (!taken.has(base)) {
    return base;
  }

  let suffix = 2;
  while (taken.has(`${base}-${suffix}`)) {
    suffix += 1;
  }

  return `${base}-${suffix}`;
};

export const buildPostData = (
  fields: PostFields,
  existing?: Pick<Post, "slug">,
): PostWriteData => ({
  title: fields.title,
  slug: existing?.slug ?? slugify(fields.title),
  publishedAt: toIsoDate(fields.publishedAt),
  author: "David Chambaud",
  categories: [],
  excerpt: fields.excerpt,
  content: plainTextToLexical(fields.content),
  seo: {
    title: fields.title,
    description: fields.excerpt,
  },
  _status: fields.status === "published" ? "published" : "draft",
});
