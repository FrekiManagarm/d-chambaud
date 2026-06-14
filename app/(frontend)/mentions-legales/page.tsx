import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "David Chambaud | Mentions légales" },
  description:
    "Mentions légales du site David Chambaud Traiteur, chef traiteur à Bordeaux et en Nouvelle-Aquitaine.",
  alternates: {
    canonical: absoluteUrl("/mentions-legales"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LegalPage() {
  return (
    <main
      style={{
        background: "var(--cream)",
        color: "var(--charcoal)",
        minHeight: "100dvh",
        padding: "clamp(8rem, 12vw, 12rem) 0 clamp(4rem, 8vw, 7rem)",
      }}
    >
      <section
        style={{
          width: "min(900px, calc(100% - 2rem))",
          margin: "0 auto",
          display: "grid",
          gap: "2rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "var(--gold)",
              marginBottom: "1rem",
            }}
          >
            Informations légales
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: 0,
            }}
          >
            Mentions légales.
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gap: "1.8rem",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.92rem",
            lineHeight: 1.9,
            color: "rgba(var(--charcoal-rgb),0.76)",
          }}
        >
          <section>
            <h2>Éditeur du site</h2>
            <p>
              {siteConfig.legalName} · {siteConfig.name}
              <br />
              Bordeaux · Nouvelle-Aquitaine · France
              <br />
              Email:{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <br />
              Téléphone:{" "}
              <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
            </p>
          </section>

          <section>
            <h2>Responsable de publication</h2>
            <p>David Chambaud.</p>
          </section>

          <section>
            <h2>Hébergement</h2>
            <p>
              Site hébergé par PlanetHoster Inc., 4416 rue Louis B Mayer, Laval,
              QC H7P 0G1, Canada.
            </p>
          </section>

          <section>
            <h2>Propriété intellectuelle</h2>
            <p>
              Les textes, photographies, logos et éléments graphiques présents
              sur ce site sont protégés. Toute reproduction sans autorisation
              préalable est interdite.
            </p>
          </section>

          <Link
            href="/"
            style={{
              justifySelf: "start",
              color: "var(--bronze)",
              textDecoration: "none",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontSize: "0.62rem",
              fontWeight: 700,
            }}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </section>

      <style>{`
        main h2 {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--bronze);
          margin-bottom: 0.4rem;
        }

        main a {
          color: var(--bronze);
        }
      `}</style>
    </main>
  );
}
