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

export const isDuplicateSlugError = (error: unknown) => {
  const values: unknown[] = [error];
  const seen = new Set<object>();
  const messages: string[] = [];

  while (values.length > 0) {
    const value = values.pop();

    if (typeof value === "string") {
      messages.push(value.toLowerCase());
      continue;
    }

    if (!value || typeof value !== "object" || seen.has(value)) {
      continue;
    }

    seen.add(value);
    const metadata = value as {
      cause?: unknown;
      code?: unknown;
      data?: unknown;
      errors?: unknown;
      message?: unknown;
    };

    if (metadata.code === "23505" || metadata.code === 23505) {
      return true;
    }

    values.push(
      metadata.cause,
      metadata.data,
      metadata.errors,
      metadata.message,
    );
  }

  const message = messages.join(" ");

  return (
    message.includes("slug") &&
    (message.includes("duplicate") || message.includes("unique"))
  );
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
