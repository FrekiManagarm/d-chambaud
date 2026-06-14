"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import type { HomeImages } from "./types";
import { Eyebrow, HeadingReveal, RevealOnScroll, ease, easeOut, fadeIn, fadeUp } from "./shared";

/* ════════════════════════════════════════════════════════════
   VALUES — editorial horizontal bands with huge bg numbers
════════════════════════════════════════════════════════════ */
function ValueBand({
  num,
  title,
  desc,
  index,
}: {
  num: string;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        position: "relative",
        borderBottom: "1px solid rgba(var(--gold-rgb),0.12)",
        overflow: "hidden",
      }}
    >
      {/* Giant background number */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-0.05em",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(7rem, 18vw, 14rem)",
          fontWeight: 300,
          fontStyle: "italic",
          color: "rgba(var(--gold-rgb),0.035)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {num}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          padding: "4.5rem 3rem",
          gap: "4rem",
          position: "relative",
          zIndex: 1,
        }}
        className="value-band-inner"
      >
        {/* Left: title */}
        <div style={{ overflow: "hidden" }}>
          <motion.div
            initial={reduce ? false : { y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: index * 0.12 + 0.1,
              ease: easeOut,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "0.8rem",
                fontWeight: 500,
              }}
            >
              {num}
            </p>
            <h3
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--charcoal)",
                lineHeight: 1.1,
              }}
            >
              {title}
            </h3>
          </motion.div>
        </div>

        {/* Right: description */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: index * 0.12 + 0.25, ease }}
        >
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.88rem",
              lineHeight: 1.95,
              fontWeight: 500,
              color: "var(--charcoal)",
              maxWidth: 420,
            }}
          >
            {desc}
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .value-band-inner { grid-template-columns: 1fr !important; padding: 3rem 1.5rem !important; gap: 1rem !important; }
        }
      `}</style>
    </motion.div>
  );
}

export function ValuesSection({ images }: { images: HomeImages }) {
  return (
    <section
      aria-label="Architecture d'un événement"
      style={{
        backgroundColor: "var(--cream)",
        paddingBottom: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(5rem, 8vw, 8rem) 2rem 0",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.58fr) minmax(320px, 0.42fr)",
            alignItems: "stretch",
            gap: "clamp(2rem, 5vw, 5rem)",
            marginBottom: "clamp(4rem, 7vw, 6rem)",
          }}
          className="values-heading"
        >
          <div>
            <RevealOnScroll variant={fadeUp}>
              <Eyebrow>Scénographie culinaire</Eyebrow>
            </RevealOnScroll>
            <HeadingReveal delay={0.06}>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2.45rem, 5vw, 4.8rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 0.96,
                  color: "var(--charcoal)",
                }}
              >
                Un repas ne se pose pas
                <br />
                sur une table.
              </h3>
            </HeadingReveal>
            <RevealOnScroll variant={fadeUp} custom={2}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.94rem",
                  lineHeight: 1.9,
                  color: "rgba(var(--charcoal-rgb),0.78)",
                  maxWidth: 560,
                  marginTop: "1.6rem",
                }}
              >
                Il se construit comme une progression: l&apos;arrivée, la
                première bouchée, le plat que l&apos;on attend, le dessert qui
                signe la soirée. C&apos;est cette montée que David dessine.
              </p>
            </RevealOnScroll>
          </div>
          <RevealOnScroll variant={fadeIn} custom={2}>
            <div
              className="values-collage"
              style={{
                position: "relative",
                minHeight: 430,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "0 12% 16% 0",
                  overflow: "hidden",
                  backgroundColor: "var(--charcoal)",
                }}
              >
                <Image
                  src={images.valuesPrimary}
                  alt="Bouchée gastronomique signée David Chambaud"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  style={{ objectFit: "cover", objectPosition: "center 28%" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  width: "46%",
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  border: "1px solid rgba(var(--charcoal-rgb),0.12)",
                  boxShadow: "0 26px 52px -42px rgba(var(--charcoal-rgb),0.62)",
                }}
              >
                <Image
                  src={images.valuesSecondary}
                  alt="Dressage d'assiette pour réception"
                  fill
                  sizes="(max-width: 768px) 46vw, 260px"
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "8%",
                  bottom: "6%",
                  width: "12rem",
                  padding: "1rem",
                  backgroundColor: "rgba(var(--cream-rgb),0.78)",
                  border: "1px solid rgba(var(--charcoal-rgb),0.1)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.7), 0 24px 52px -42px rgba(var(--charcoal-rgb),0.68)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.5rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Signature
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.5rem",
                    fontStyle: "italic",
                    lineHeight: 1.05,
                    color: "var(--charcoal)",
                  }}
                >
                  Gourmandise, élégance, précision ...
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
        <div style={{ borderTop: "1px solid rgba(var(--bronze-rgb),0.18)" }}>
          <ValueBand
            num="01"
            title="L'arrivée donne le ton"
            desc="Un cocktail qui se lit vite, circule bien et installe l'énergie de la fête sans bloquer les invités autour d'un buffet."
            index={0}
          />
          <ValueBand
            num="02"
            title="Le dîner tient la salle"
            desc="Cuissons, envois, dressages et transitions sont pensés pour garder le repas vivant, même avec une grande tablée."
            index={1}
          />
          <ValueBand
            num="03"
            title="La fin reste en bouche"
            desc="Desserts, fromages, brunch ou retour de soirée: les derniers moments gardent la même attention que la première coupe."
            index={2}
          />
        </div>
      </div>

      {/* Full-width atmospheric image bridge → transitions to dark StatsSection */}
      <div
        style={{
          position: "relative",
          height: "clamp(260px, 38vw, 480px)",
          overflow: "hidden",
        }}
      >
        <Image
          src={images.valuesBridge}
          alt="Gastronomie — produits du terroir aquitain"
          fill
          style={{ objectFit: "cover", objectPosition: "center 55%" }}
          sizes="100vw"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, var(--cream) 0%, transparent 18%, transparent 78%, var(--dark) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(var(--dark-rgb),0.28)",
          }}
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .values-heading {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
            margin-bottom: 2.5rem !important;
          }
          .values-heading h3 {
            font-size: clamp(2.35rem, 9.5vw, 3rem) !important;
            line-height: 1 !important;
          }
          .values-collage {
            min-height: auto !important;
            aspect-ratio: 4 / 5 !important;
          }
        }
      `}</style>
    </section>
  );

}
