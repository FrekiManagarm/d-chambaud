import Image from "next/image";
import Link from "next/link";

import { getBlogPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import type { Media } from "@/payload-types";

export const dynamic = "force-dynamic";

const getMediaURL = (media: number | Media | null | undefined) => {
  if (media && typeof media === "object" && media.url) {
    return media.sizes?.card?.url || media.url;
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

export const metadata = {
  title: "Journal",
  description:
    "Articles, inspirations culinaires et notes de saison de David Chambaud.",
  alternates: {
    canonical: absoluteUrl("/blog"),
  },
  openGraph: {
    title: "Journal | David Chambaud",
    description:
      "Articles, inspirations culinaires et notes de saison de David Chambaud.",
    url: absoluteUrl("/blog"),
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="blog-shell">
          <p className="blog-eyebrow">Journal</p>
          <h1>Articles & inspirations culinaires.</h1>
          <p className="blog-intro">
            Notes de saison, coulisses de réception, gestes de cuisine et
            réflexions autour de la table.
          </p>
        </div>
      </section>

      <section className="blog-list-section">
        <div className="blog-shell">
          {posts.length > 0 ? (
            <div className="blog-card-grid">
              {posts.map((post) => {
                const imageURL = getMediaURL(post.heroImage);
                const imageAlt =
                  post.heroImage && typeof post.heroImage === "object"
                    ? post.heroImage.alt
                    : post.title;
                const category = post.categories?.[0]?.label;

                return (
                  <article className="blog-card" key={post.id}>
                    <Link href={`/blog/${post.slug}`} className="blog-card-link">
                      <div className="blog-card-image">
                        {imageURL ? (
                          <Image
                            src={imageURL}
                            alt={imageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div className="blog-card-image-fallback" />
                        )}
                      </div>
                      <div className="blog-card-body">
                        <p className="blog-card-meta">
                          {category ? `${category} · ` : ""}
                          {formatDate(post.publishedAt)}
                        </p>
                        <h2>{post.title}</h2>
                        <p>{post.excerpt}</p>
                        <span>Lire l&apos;article</span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="blog-empty">
              <p className="blog-eyebrow">Aucun article publié</p>
              <h2>Le journal arrive bientôt.</h2>
              <p>
                Les brouillons peuvent déjà être préparés dans le CMS. Ils
                apparaîtront ici une fois publiés.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
