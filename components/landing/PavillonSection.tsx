"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import type { HomeImages } from "./types";
import { Eyebrow, HeadingReveal, RevealOnScroll, ease, fadeIn, fadeUp } from "./shared";

/* ════════════════════════════════════════════════════════════
   PAVILLON — atmospheric full-bleed with background text
════════════════════════════════════════════════════════════ */
export function PavillonSection({ images }: { images: HomeImages }) {
  return (
    <section
      id="pavillon"
      className="grain-overlay section-pad pavillon-section"
      aria-label="Le Pavillon des Millésimes"
      style={{
        position: "relative",
        background:
          "linear-gradient(135deg, #2a2820 0%, #2a2820 48%, #4d5944 100%)",
        overflow: "hidden",
        padding: "clamp(5rem, 8vw, 8rem) 0",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "4%",
          left: "-0.04em",
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(7rem, 18vw, 16rem)",
          fontStyle: "italic",
          fontWeight: 300,
          lineHeight: 0.8,
          color: "rgba(var(--cream-rgb),0.035)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        Pavillon
      </div>
      <div
        className="pavillon-shell"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="pavillon-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.54fr) minmax(360px, 0.46fr)",
            gap: "clamp(3rem, 6vw, 6.5rem)",
            alignItems: "stretch",
          }}
        >
          <RevealOnScroll variant={fadeIn}>
            <div
              className="pavillon-gallery"
              style={{
                position: "relative",
                minHeight: "clamp(560px, 68vw, 760px)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "0 14% 12% 0",
                  overflow: "hidden",
                  backgroundColor: "var(--charcoal)",
                  boxShadow: "0 34px 86px -56px rgba(var(--dark-rgb),0.82)",
                }}
              >
                <Image
                  src={images.pavillon.main}
                  alt="Salon lumineux du Pavillon des Millésimes"
                  fill
                  sizes="(max-width: 768px) 100vw, 760px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(var(--dark-rgb),0.54), transparent 52%)",
                  }}
                />
              </div>

              <motion.div
                className="pavillon-portrait"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.85, ease }}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "16%",
                  width: "34%",
                  aspectRatio: "3 / 4",
                  overflow: "hidden",
                  border: "1px solid rgba(var(--cream-rgb),0.14)",
                  boxShadow: "0 30px 70px -48px rgba(var(--dark-rgb),0.9)",
                }}
              >
                <Image
                  src={images.pavillon.portrait}
                  alt="Chambre du Pavillon des Millésimes"
                  fill
                  sizes="(max-width: 768px) 36vw, 300px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </motion.div>

              <motion.div
                className="pavillon-table"
                initial={{ opacity: 0, x: -22, y: 18 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.12, ease }}
                style={{
                  position: "absolute",
                  left: "10%",
                  bottom: 0,
                  width: "42%",
                  aspectRatio: "4 / 3",
                  overflow: "hidden",
                  border: "1px solid rgba(var(--cream-rgb),0.14)",
                  boxShadow: "0 28px 64px -48px rgba(var(--dark-rgb),0.84)",
                }}
              >
                <Image
                  src={images.pavillon.table}
                  alt="Table dressée au Pavillon des Millésimes"
                  fill
                  sizes="(max-width: 768px) 48vw, 360px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </motion.div>

              <div
                className="pavillon-badge"
                style={{
                  position: "absolute",
                  right: "7%",
                  bottom: "7%",
                  width: "15rem",
                  padding: "1.05rem 1rem",
                  backgroundColor: "rgba(var(--dark-rgb),0.62)",
                  border: "1px solid rgba(var(--cream-rgb),0.13)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.1), 0 28px 58px -44px rgba(var(--dark-rgb),0.86)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.5rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Maison confidentielle
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.45rem",
                    fontStyle: "italic",
                    lineHeight: 1.12,
                    color: "var(--cream)",
                  }}
                >
                  Dormir sur place, dîner juste, repartir lentement.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <div
            className="pavillon-copy"
            style={{
              display: "grid",
              alignContent: "center",
              gap: "2rem",
              paddingTop: "1rem",
            }}
          >
            <RevealOnScroll variant={fadeUp}>
              <Eyebrow light>Le lieu de David &amp; Nathalie</Eyebrow>
            </RevealOnScroll>

            <HeadingReveal delay={0.08}>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2.55rem, 4.9vw, 4.7rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 0.96,
                  color: "var(--cream)",
                  letterSpacing: 0,
                }}
              >
                Une parenthèse
                <br />
                où l&apos;on reste.
              </h3>
            </HeadingReveal>

            <RevealOnScroll variant={fadeUp} custom={2}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 400,
                  lineHeight: 1.9,
                  color: "rgba(var(--cream-rgb),0.78)",
                  maxWidth: 620,
                }}
              >
                Le Pavillon des Millésimes n&apos;est pas seulement une adresse
                à visiter. C&apos;est une maison où le repas, la chambre et le
                lendemain se répondent avec la même attention.
              </p>
            </RevealOnScroll>

            <RevealOnScroll variant={fadeUp} custom={3}>
              <div
                className="pavillon-points"
                style={{
                  display: "grid",
                  gap: 0,
                  borderTop: "1px solid rgba(var(--cream-rgb),0.14)",
                  borderBottom: "1px solid rgba(var(--cream-rgb),0.14)",
                }}
              >
                {[
                  [
                    "Table d'hôtes",
                    "Une cuisine bistronomique en quatre temps, pensée comme un dîner de maison très soigné.",
                  ],
                  [
                    "Chambres",
                    "Des espaces calmes pour prolonger un mariage, une escapade ou un week-end gourmand.",
                  ],
                  [
                    "Adresse",
                    "Une maison de caractère en Nouvelle-Aquitaine, entre intimité, vin et art de recevoir.",
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="pavillon-point"
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "minmax(140px, 0.32fr) minmax(0, 1fr)",
                      gap: "1.4rem",
                      padding: "1.2rem 0",
                      borderBottom:
                        label === "Adresse"
                          ? "none"
                          : "1px solid rgba(var(--cream-rgb),0.1)",
                      alignItems: "baseline",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "0.58rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "0.86rem",
                        color: "rgba(var(--cream-rgb),0.76)",
                        lineHeight: 1.75,
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant={fadeUp} custom={4}>
              <div
                className="pavillon-actions"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1.2rem",
                }}
              >
                <motion.a
                  href="https://www.pavillon-des-millesimes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ gap: "1rem" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 160, damping: 18 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem 1.25rem",
                    border: "1px solid rgba(var(--bronze-rgb),0.72)",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    textDecoration: "none",
                    backgroundColor: "rgba(var(--bronze-rgb),0.08)",
                  }}
                >
                  <span>Découvrir le lieu</span>
                  <ArrowRight size={13} />
                </motion.a>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.74rem",
                    lineHeight: 1.65,
                    color: "rgba(var(--cream-rgb),0.68)",
                    maxWidth: 260,
                  }}
                >
                  Table d&apos;hôtes sur réservation, séjour et cuisine de
                  saison au même endroit.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        <RevealOnScroll variant={fadeUp} custom={5}>
          <div
            className="pavillon-strip"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.38fr) minmax(0, 0.62fr)",
              gap: "1rem",
              alignItems: "stretch",
              marginTop: "clamp(3rem, 6vw, 5rem)",
              borderTop: "1px solid rgba(var(--cream-rgb),0.12)",
              paddingTop: "1rem",
            }}
          >
            <div
              style={{
                display: "grid",
                alignContent: "space-between",
                gap: "1.5rem",
                padding: "1rem 0",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                Séjour gourmand
              </p>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(1.9rem, 3.2vw, 3rem)",
                  fontStyle: "italic",
                  lineHeight: 1.1,
                  color: "var(--cream)",
                  maxWidth: 420,
                }}
              >
                Quand le dîner devient le centre d&apos;un week-end.
              </p>
            </div>
            <div
              className="pavillon-strip-images"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "1rem",
              }}
            >
              {[
                [
                  images.pavillon.stripOne,
                  "Détail intérieur du Pavillon des Millésimes",
                ],
                [
                  images.pavillon.stripTwo,
                  "Salon et atmosphère du Pavillon des Millésimes",
                ],
                [
                  images.pavillon.stripThree,
                  "Façade du Pavillon des Millésimes",
                ],
              ].map(([src, alt]) => (
                <div
                  key={src}
                  style={{
                    position: "relative",
                    aspectRatio: "4 / 3",
                    overflow: "hidden",
                    backgroundColor: "rgba(var(--cream-rgb),0.06)",
                  }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 33vw, 260px"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pavillon-section {
            padding-top: 4.5rem !important;
            padding-bottom: 4.5rem !important;
          }
          .pavillon-shell {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .pavillon-layout,
          .pavillon-point,
          .pavillon-strip,
          .pavillon-strip-images {
            grid-template-columns: 1fr !important;
          }
          .pavillon-layout {
            gap: 2.5rem !important;
          }
          .pavillon-gallery {
            min-height: 480px !important;
          }
          .pavillon-portrait {
            width: 38% !important;
          }
          .pavillon-table {
            width: 50% !important;
            left: 0 !important;
          }
          .pavillon-badge {
            width: min(15rem, 72vw) !important;
            right: 0 !important;
          }
          .pavillon-actions {
            align-items: flex-start !important;
            flex-direction: column !important;
          }
          .pavillon-strip-images {
            gap: 0.75rem !important;
          }
        }

        @media (max-width: 430px) {
          .pavillon-section h3 {
            font-size: 2.35rem !important;
            letter-spacing: 0 !important;
          }
          .pavillon-section p {
            max-width: 100% !important;
          }
          .pavillon-point p:first-child {
            font-size: 0.52rem !important;
            letter-spacing: 0.18em !important;
          }
          .pavillon-gallery {
            min-height: 420px !important;
          }
          .pavillon-strip-images > div {
            aspect-ratio: 4 / 3 !important;
          }
        }
      `}</style>
    </section>
  );

}
