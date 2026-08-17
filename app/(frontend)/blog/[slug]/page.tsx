import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBlogPostBySlug } from "@/lib/blog";
import { resolveMediaURL } from "@/lib/media-url";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import type { Media } from "@/payload-types";

export const dynamic = "force-dynamic";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const getMedia = (media: number | Media | null | undefined) => {
  if (media && typeof media === "object") {
    return media;
  }

  return null;
};

const formatDate = (date?: string | null) => {
  if (!date) {
    return "Publication à venir";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article introuvable",
    };
  }

  const heroImage = getMedia(post.heroImage);
  const heroImageURL = resolveMediaURL(heroImage);
  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      description,
      images: heroImageURL ? [heroImageURL] : undefined,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      type: "article",
      url: absoluteUrl(`/blog/${post.slug}`),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const heroImage = getMedia(post.heroImage);
  const imageURL = resolveMediaURL(heroImage);

  return (
    <main className="blog-page">
      <article className="blog-article">
        <header className="blog-article-header">
          <div className="blog-shell blog-article-header-grid">
            <div>
              <Link href="/blog" className="blog-back-link">
                Journal
              </Link>
              <p className="blog-eyebrow">{formatDate(post.publishedAt)}</p>
              <h1>{post.title}</h1>
              <p className="blog-intro">{post.excerpt}</p>
              {post.author && <p className="blog-author">Par {post.author}</p>}
            </div>
            {imageURL && (
              <div className="blog-article-image">
                <Image
                  src={imageURL}
                  alt={heroImage?.alt || post.title}
                  fill
                  preload
                  sizes="(max-width: 900px) 100vw, 42vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </header>

        <div className="blog-shell">
          <div className="blog-rich-text">
            <RichText data={post.content} />
          </div>
        </div>
      </article>
    </main>
  );
}
