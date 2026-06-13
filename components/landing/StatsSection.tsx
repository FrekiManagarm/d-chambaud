"use client";

import { CountUpStat, Eyebrow, HeadingReveal, RevealOnScroll, fadeUp } from "./shared";

/* ════════════════════════════════════════════════════════════
   STATS — theatrical numbers, borderless
════════════════════════════════════════════════════════════ */
export function StatsSection() {
  return (
    <section
      className="grain-overlay"
      aria-label="Preuves et méthode"
      style={{
        backgroundColor: "var(--dark)",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(5rem, 8vw, 8rem) 0",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "300%",
          background:
            "radial-gradient(ellipse at center, rgba(var(--gold-rgb),0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="stats-intro"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.55fr) minmax(280px, 0.45fr)",
            gap: "4rem",
            alignItems: "end",
            marginBottom: "3rem",
          }}
        >
          <div>
            <RevealOnScroll variant={fadeUp}>
              <Eyebrow light>Ce que vous achetez vraiment</Eyebrow>
            </RevealOnScroll>
            <HeadingReveal delay={0.06}>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2.8rem, 5.8vw, 5.6rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 0.98,
                  color: "var(--cream)",
                }}
              >
                Du calme
                <br />
                pendant l&apos;intense.
              </h2>
            </HeadingReveal>
          </div>
          <RevealOnScroll variant={fadeUp} custom={2}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.9,
                color: "rgba(var(--cream-rgb),0.62)",
                maxWidth: 430,
              }}
            >
              Le jour d&apos;un mariage, tout bouge. La valeur d&apos;un
              traiteur, c&apos;est de rendre la cuisine invisible dans
              l&apos;effort et évidente dans le plaisir.
            </p>
          </RevealOnScroll>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            borderTop: "1px solid rgba(var(--bronze-rgb),0.16)",
            borderBottom: "1px solid rgba(var(--bronze-rgb),0.16)",
          }}
          className="stats-grid"
        >
          <CountUpStat
            value={25}
            suffix=" ans"
            label="d'expérience"
            detail="Maison fondée en 2016"
            delay={0}
            border
          />
          <CountUpStat
            value={500}
            suffix="+"
            label="Prestations servies"
            detail="Mariages, domaines, séminaires"
            delay={0.12}
            border
          />
          <CountUpStat
            value={48}
            suffix="h"
            label="Premier retour"
            detail="Pour cadrer votre demande"
            delay={0.24}
            border
          />
          <CountUpStat
            value={99}
            suffix="%"
            label="Clients satisfaits"
            detail="Recommandation & fidélité"
            delay={0.48}
            border={false}
          />
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .stats-intro,
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-intro {
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 640px) {
          .stats-grid > * { border-right: none !important; border-bottom: 1px solid rgba(var(--gold-rgb),0.1); }
          .stats-grid > *:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );

}
