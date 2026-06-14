"use client";

import { Eyebrow, HeadingReveal, RevealOnScroll, fadeUp } from "./shared";

/* ════════════════════════════════════════════════════════════
   CLIENTS — infinite logo carousel
════════════════════════════════════════════════════════════ */
const clientLogos = [
  { src: "/Chateau-le-Puy-Logo.webp", alt: "Château Le Puy" },
  {
    src: "/logo-carmes-haut-brion.jpg",
    alt: "Château Les Carmes Haut-Brion",
  },
  { src: "/chateau-faugeres-1998.jpg", alt: "Château Faugères" },
  {
    src: "/creation-de-logo-chateau-grand-arnaud-webmaster-graphiste-bordeaux_Plan-de-travail-3.jpg",
    alt: "Château Grand Arnaud",
  },
  { src: "/logo-chateau-de-seguin.jpg", alt: "Château de Seguin" },
  { src: "/francmayne_logo_cmjn.png", alt: "Franc Mayne" },
  { src: "/logo-montlabert-big.png", alt: "Château Montlabert" },
  { src: "/logo-laces-bordeaux.jpg", alt: "LACES Bordeaux" },
  {
    src: "/logo-societe-generale-seminaire-congres-incentive-inauguration-lancement-de-produit-agence-evenementielle-pays-basque-biarritz-saint-sebastien-bordeaux-pyrenees-erronda-800x800.png",
    alt: "Société Générale",
  },
  { src: "/Logo-Vinci-Energies-1.png", alt: "Vinci Energies" },
  { src: "/logo_societe_682268ef6b2a18e22.jpg", alt: "Partenaire" },
  { src: "/logo_societe_filiale_2506931484f8b947.png", alt: "Partenaire" },
  { src: "/Ville_de_Bordeaux_(logo).svg.png", alt: "Ville de Bordeaux" },
  { src: "/partenaires-entreprise-bordeaux25-png.webp", alt: "Bordeaux 2025" },
  { src: "/pape-clement.webp", alt: "Château Pape Clément" },
  { src: "/Logo-OK-1.png", alt: "Partenaire" },
];

export function ClientsSection() {
  const doubled = [...clientLogos, ...clientLogos];

  return (
    <section
      style={{
        backgroundColor: "var(--cream)",
        padding: "clamp(4.5rem, 7vw, 7rem) 0",
        overflow: "hidden",
        position: "relative",
        borderTop: "1px solid rgba(var(--bronze-rgb),0.12)",
        borderBottom: "1px solid rgba(var(--bronze-rgb),0.12)",
      }}
    >
      <div
        className="clients-heading"
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "0 2rem",
          marginBottom: "3.25rem",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.52fr) minmax(260px, 0.48fr)",
          gap: "3rem",
          alignItems: "end",
        }}
      >
        <div>
          <RevealOnScroll variant={fadeUp}>
            <Eyebrow>Références</Eyebrow>
          </RevealOnScroll>
          <HeadingReveal delay={0.06}>
            <h3
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.2rem, 4vw, 3.7rem)",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1,
                color: "var(--charcoal)",
              }}
            >
              Des lieux exigeants,
              <br />
              des repas remarqués.
            </h3>
          </HeadingReveal>
        </div>
        <RevealOnScroll variant={fadeUp} custom={2}>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.85,
              color: "rgba(var(--charcoal-rgb),0.78)",
              maxWidth: 460,
            }}
          >
            Châteaux, domaines viticoles, entreprises et institutions: le décor
            change, l&apos;exigence reste la même.
          </p>
        </RevealOnScroll>
      </div>

      <div style={{ position: "relative" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "10rem",
            background: "linear-gradient(to right, var(--cream), transparent)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "10rem",
            background: "linear-gradient(to left, var(--cream), transparent)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div
          className="marquee-logos-track"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5rem",
            width: "max-content",
            padding: "1rem 0",
          }}
        >
          {doubled.map((logo, i) => (
            <div
              key={i}
              style={{
                height: "96px",
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  height: "100%",
                  width: "auto",
                  maxWidth: "220px",
                  objectFit: "contain",
                  filter: "grayscale(100%) opacity(0.45)",
                  transition: "filter 0.4s ease",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "grayscale(0%) opacity(1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter =
                    "grayscale(100%) opacity(0.45)";
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .clients-heading {
            grid-template-columns: 1fr !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            gap: 1.25rem !important;
          }
          .clients-heading h3 {
            font-size: clamp(2.1rem, 8.5vw, 2.85rem) !important;
          }
        }
      `}</style>
    </section>
  );

}
