"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

import type { HomeImages } from "./types";
import { Eyebrow, HeadingReveal, RevealOnScroll, fadeIn, fadeUp, lineGrow } from "./shared";

/* ════════════════════════════════════════════════════════════
   ABOUT — magazine spread with pull quote
════════════════════════════════════════════════════════════ */
export function AboutSection({ images }: { images: HomeImages }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const reduce = useReducedMotion();

  return (
    <section
      ref={ref}
      id="a-propos"
      className="grain-overlay"
      aria-label="À propos de David Chambaud"
      style={{
        background:
          "linear-gradient(180deg, rgba(var(--cream-rgb),0.98) 0%, rgba(var(--cream-rgb),0.92) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "clamp(4rem, 7vw, 7rem) 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Portrait */}
        <RevealOnScroll variant={fadeIn}>
          <motion.div
            style={{ y: reduce ? 0 : imgY }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                aspectRatio: "3/4",
                maxHeight: 640,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src={images.about}
                alt="David Chambaud, chef traiteur en Nouvelle-Aquitaine"
                fill
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
                sizes="(max-width: 768px) 100vw, 45vw"
                priority
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(var(--dark-rgb),0.5) 0%, transparent 55%)",
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: 24,
                  width: 40,
                  height: 1,
                  backgroundColor: "var(--gold)",
                  opacity: 0.45,
                  zIndex: 2,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: 24,
                  width: 1,
                  height: 40,
                  backgroundColor: "var(--gold)",
                  opacity: 0.45,
                  zIndex: 2,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  right: 24,
                  width: 40,
                  height: 1,
                  backgroundColor: "var(--gold)",
                  opacity: 0.45,
                  zIndex: 2,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  right: 24,
                  width: 1,
                  height: 40,
                  backgroundColor: "var(--gold)",
                  opacity: 0.45,
                  zIndex: 2,
                }}
              />
            </div>
          </motion.div>
        </RevealOnScroll>

        {/* Text */}
        <div>
          <RevealOnScroll variant={fadeUp}>
            <Eyebrow light>À Propos</Eyebrow>
          </RevealOnScroll>
          <HeadingReveal delay={0.05}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1.08,
                color: "var(--charcoal)",
                marginBottom: "2rem",
              }}
            >
              Le chef que l&apos;on choisit
              <br />
              quand le repas compte vraiment.
            </h2>
          </HeadingReveal>
          <RevealOnScroll variant={lineGrow}>
            <div
              style={{
                height: 1,
                width: 56,
                backgroundColor: "var(--gold)",
                opacity: 0.6,
                marginBottom: "2rem",
              }}
            />
          </RevealOnScroll>

          {[
            "David Chambaud accompagne les mariages, réceptions privées et événements professionnels avec une cuisine lisible, généreuse et tenue jusqu'au dernier service.",
            "Son approche réunit le goût du produit, l'exigence du dressage et une organisation discrète: les invités voient la fluidité, jamais la mécanique.",
          ].map((para, i) => (
            <RevealOnScroll key={i} variant={fadeUp} custom={2 + i}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  lineHeight: 1.95,
                  color: "rgba(var(--charcoal-rgb),0.66)",
                  marginBottom: "1.1rem",
                }}
              >
                {para}
              </p>
            </RevealOnScroll>
          ))}

          {/* Pull quote */}
          <RevealOnScroll variant={fadeUp} custom={4}>
            <div
              style={{
                margin: "2.5rem 0",
                paddingLeft: "1.5rem",
                borderLeft: "2px solid var(--gold)",
              }}
            >
              <blockquote
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 1.5,
                  color: "var(--charcoal)",
                  opacity: 0.9,
                }}
              >
                « Un événement réussi se reconnaît à ce que les invités
                ressentent: le plaisir, le rythme, l&apos;évidence. »
              </blockquote>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.52rem",
                  letterSpacing: "0.32em",
                  color: "var(--gold)",
                  marginTop: "0.75rem",
                  textTransform: "uppercase",
                }}
              >
                — David Chambaud
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant={fadeUp} custom={5}>
            <motion.a
              href="#contact"
              whileHover={{ gap: "1.2rem" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "2rem",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                textDecoration: "none",
              }}
            >
              <span>Prendre contact</span>
              <ArrowRight size={13} />
            </motion.a>
          </RevealOnScroll>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );

}
