import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  absoluteUrl,
  getLocalSeoPage,
  getRelatedLocalSeoPages,
  jsonLdScript,
  localSeoPages,
  localServiceJsonLd,
  siteConfig,
} from "@/lib/seo";

type LocalSeoPageProps = {
  params: Promise<{
    localSeoSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return localSeoPages.map((page) => ({ localSeoSlug: page.slug }));
}

export async function generateMetadata({
  params,
}: LocalSeoPageProps): Promise<Metadata> {
  const { localSeoSlug } = await params;
  const page = getLocalSeoPage(localSeoSlug);

  if (!page) {
    return {};
  }

  const url = absoluteUrl(`/${page.slug}`);

  return {
    title: { absolute: page.metaTitle },
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url,
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      images: [
        {
          url: page.image,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.description,
    },
  };
}

export default async function LocalSeoPage({ params }: LocalSeoPageProps) {
  const { localSeoSlug } = await params;
  const page = getLocalSeoPage(localSeoSlug);

  if (!page) {
    notFound();
  }

  const relatedPages = getRelatedLocalSeoPages(page);

  return (
    <main className="local-seo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(localServiceJsonLd(page)),
        }}
      />

      <section className="local-hero">
        <Image
          src={page.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="local-hero-image"
        />
        <div className="local-hero-overlay" />
        <div className="local-shell local-hero-content">
          <p className="local-eyebrow">{page.eyebrow}</p>
          <h1>{page.h1}</h1>
          <p className="local-intro">{page.intro}</p>
          <div className="local-actions">
            <Link href="/contact">Demander un devis</Link>
            <Link href="/#services">Voir les prestations</Link>
          </div>
        </div>
      </section>

      <section className="local-proof">
        <div className="local-shell local-proof-grid">
          {page.highlights.map((highlight) => (
            <p key={highlight}>{highlight}</p>
          ))}
        </div>
      </section>

      <section className="local-content">
        <div className="local-shell local-content-grid">
          <div>
            <p className="local-eyebrow">Prestation locale</p>
            <h2>{page.title}: une réponse claire pour votre événement.</h2>
          </div>
          <div className="local-copy">
            {page.sections.map((section) => (
              <section key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </section>
            ))}
            <p>
              Pour une demande de {page.intent}, le plus simple est d'indiquer
              la date, le lieu, le nombre d'invités, le format attendu et les
              premières envies culinaires.
            </p>
          </div>
        </div>
      </section>

      <section className="local-related">
        <div className="local-shell">
          <p className="local-eyebrow">Autres recherches utiles</p>
          <div className="local-related-links">
            {relatedPages.map((related) => (
              <Link href={`/${related.slug}`} key={related.slug}>
                {related.title}
              </Link>
            ))}
            <Link href="/contact">Contact & devis traiteur</Link>
          </div>
        </div>
      </section>

      <style>{`
        .local-seo-page {
          background: var(--cream);
          color: var(--charcoal);
        }

        .local-shell {
          width: min(1180px, calc(100% - 4rem));
          margin: 0 auto;
        }

        .local-hero {
          position: relative;
          min-height: 86dvh;
          display: grid;
          align-items: end;
          overflow: hidden;
          background: var(--dark);
          padding: clamp(8rem, 14vw, 12rem) 0 clamp(4rem, 7vw, 6rem);
        }

        .local-hero-image {
          object-fit: cover;
          object-position: center;
          opacity: 0.5;
        }

        .local-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(var(--dark-rgb),0.94), rgba(var(--dark-rgb),0.64) 58%, rgba(var(--dark-rgb),0.28)),
            linear-gradient(to top, var(--dark), transparent 34%);
        }

        .local-hero-content {
          position: relative;
          z-index: 1;
          max-width: 920px;
        }

        .local-eyebrow {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--gold);
          margin-bottom: 1rem;
        }

        .local-hero h1 {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(3.2rem, 8vw, 7.5rem);
          font-style: italic;
          font-weight: 300;
          line-height: 0.94;
          color: var(--cream);
          letter-spacing: 0;
          max-width: 980px;
        }

        .local-intro {
          margin-top: 1.5rem;
          max-width: 680px;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 1rem;
          line-height: 1.9;
          color: rgba(var(--cream-rgb),0.82);
        }

        .local-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 2.5rem;
        }

        .local-actions a,
        .local-related-links a {
          display: inline-flex;
          align-items: center;
          min-height: 3rem;
          border: 1px solid rgba(var(--gold-rgb),0.42);
          padding: 0.9rem 1.15rem;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          text-decoration: none;
        }

        .local-actions a:first-child {
          background: var(--gold);
          color: var(--dark);
        }

        .local-proof {
          background: var(--dark);
          border-top: 1px solid rgba(var(--gold-rgb),0.18);
          border-bottom: 1px solid rgba(var(--gold-rgb),0.18);
        }

        .local-proof-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .local-proof-grid p {
          min-height: 7rem;
          display: grid;
          align-items: center;
          border-right: 1px solid rgba(var(--gold-rgb),0.14);
          padding: 1.4rem 1.2rem;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.76rem;
          line-height: 1.6;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(var(--cream-rgb),0.76);
        }

        .local-proof-grid p:last-child {
          border-right: 0;
        }

        .local-content {
          padding: clamp(4.5rem, 8vw, 7rem) 0;
        }

        .local-content-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.42fr) minmax(320px, 0.58fr);
          gap: clamp(3rem, 6vw, 6rem);
          align-items: start;
        }

        .local-content h2 {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(2.3rem, 4.8vw, 4.3rem);
          font-style: italic;
          font-weight: 300;
          line-height: 1;
          letter-spacing: 0;
        }

        .local-copy {
          display: grid;
          gap: 2rem;
          font-family: var(--font-montserrat), sans-serif;
        }

        .local-copy h3 {
          font-size: 0.78rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--bronze);
          margin-bottom: 0.8rem;
        }

        .local-copy p {
          font-size: 0.94rem;
          line-height: 1.95;
          color: rgba(var(--charcoal-rgb),0.76);
        }

        .local-related {
          padding: 0 0 clamp(4.5rem, 8vw, 7rem);
        }

        .local-related-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
        }

        .local-related-links a {
          color: var(--bronze);
          border-color: rgba(var(--bronze-rgb),0.28);
        }

        @media (max-width: 768px) {
          .local-shell {
            width: min(100% - 2rem, 1180px);
          }

          .local-hero {
            min-height: 78dvh;
          }

          .local-proof-grid,
          .local-content-grid {
            grid-template-columns: 1fr;
          }

          .local-proof-grid p {
            min-height: auto;
            border-right: 0;
            border-bottom: 1px solid rgba(var(--gold-rgb),0.14);
          }
        }
      `}</style>
    </main>
  );
}
