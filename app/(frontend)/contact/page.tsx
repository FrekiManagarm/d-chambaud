import type { Metadata } from "next";
import Image from "next/image";

import { ContactSection, Footer } from "@/components/landing";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact & devis traiteur à Bordeaux",
  description:
    "Contactez David Chambaud pour un devis traiteur à Bordeaux, un mariage en Nouvelle-Aquitaine, une réception privée ou un chef à domicile.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: "Contact & devis traiteur à Bordeaux | David Chambaud",
    description:
      "Demandez un devis pour un mariage, une réception privée, un séminaire ou une prestation de chef à domicile en Nouvelle-Aquitaine.",
    url: absoluteUrl("/contact"),
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
};

export default function ContactPage() {
  return (
    <main>
      <section
        className="contact-page-hero grain-overlay"
        aria-label="Demande de devis traiteur"
        style={{
          position: "relative",
          minHeight: "82dvh",
          display: "grid",
          alignItems: "end",
          overflow: "hidden",
          backgroundColor: "var(--dark)",
          padding: "clamp(8rem, 12vw, 12rem) 0 clamp(4rem, 7vw, 6rem)",
        }}
      >
        <Image
          src="/20260212_DSC2967.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 32%",
            opacity: 0.42,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(var(--dark-rgb),0.94) 0%, rgba(var(--dark-rgb),0.76) 48%, rgba(var(--dark-rgb),0.35) 100%), linear-gradient(to top, var(--dark) 0%, transparent 28%)",
          }}
        />
        <div
          className="contact-page-hero-inner"
          style={{
            width: "min(1180px, calc(100% - 4rem))",
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.74fr) minmax(260px, 0.26fr)",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "end",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "clamp(0.68rem, 1vw, 0.82rem)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "rgba(var(--gold-light-rgb),0.92)",
                marginBottom: "1rem",
              }}
            >
              Contact & devis
            </p>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(4rem, 9vw, 8rem)",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 0.92,
                color: "var(--cream)",
                letterSpacing: 0,
                maxWidth: 900,
              }}
            >
              Parlons de votre réception.
            </h1>
          </div>
          <div
            className="contact-page-hero-aside"
            style={{
              display: "grid",
              gap: "1rem",
              paddingTop: "1.4rem",
              borderTop: "1px solid rgba(var(--gold-rgb),0.42)",
            }}
          >
            {[
              ["Réponse", "24 à 48 h ouvrées"],
              ["Zone", "Bordeaux · Nouvelle-Aquitaine"],
              ["Formats", "Mariages · Réceptions · Chef privé"],
            ].map(([label, value]) => (
              <p
                key={label}
                style={{
                  display: "grid",
                  gap: "0.25rem",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "rgba(var(--cream-rgb),0.82)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: 600,
                  }}
                >
                  {label}
                </span>
                <span style={{ fontSize: "0.86rem", lineHeight: 1.55 }}>
                  {value}
                </span>
              </p>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .contact-page-hero {
            min-height: 78dvh !important;
            padding-top: 7rem !important;
            padding-bottom: 3.5rem !important;
          }
          .contact-page-hero-inner {
            width: min(100% - 2rem, 1180px) !important;
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .contact-page-hero h1 {
            font-size: clamp(3.25rem, 16vw, 4.8rem) !important;
          }
        }
      `}</style>
    </main>
  );
}
