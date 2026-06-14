"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

import type { HomeImages } from "./types";
import { CharReveal, MagneticButton, ease } from "./shared";

/* ════════════════════════════════════════════════════════════
   HERO — Immersive full-screen with char-by-char reveal
════════════════════════════════════════════════════════════ */
export function HeroSection({ images }: { images: HomeImages }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const reduce = useReducedMotion();

  return (
    <section
      ref={ref}
      id="accueil"
      className="grain-overlay"
      aria-label="Accueil"
      style={{
        position: "relative",
        minHeight: "100dvh",
        backgroundColor: "var(--dark)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(6rem, 20vw, 18rem)",
            fontWeight: 300,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(var(--gold-rgb),0.025)",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          Chambaud
        </p>
      </div>

      {/* Ambient orbs */}
      <div
        className="ambient-orb"
        aria-hidden
        style={{
          position: "absolute",
          top: "18%",
          left: "12%",
          width: "42vw",
          height: "42vw",
          maxWidth: 680,
          maxHeight: 680,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(var(--gold-rgb),0.11) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="ambient-orb-2"
        aria-hidden
        style={{
          position: "absolute",
          bottom: "12%",
          right: "10%",
          width: "32vw",
          height: "32vw",
          maxWidth: 500,
          maxHeight: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(var(--gold-rgb),0.07) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Right-side atmospheric image — large screens only */}
      <div
        aria-hidden
        className="hero-img-right"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "36%",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <Image
          src={images.hero}
          alt=""
          fill
          priority
          sizes="36vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, var(--dark) 0%, rgba(var(--dark-rgb),0.18) 42%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(var(--dark-rgb),0.44)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            right: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.45rem",
          }}
        >
          <div
            style={{
              width: 32,
              height: 1,
              backgroundColor: "var(--gold)",
              opacity: 0.4,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.44rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(var(--cream-rgb),0.56)",
            }}
          >
            Nouvelle-Aquitaine
          </p>
        </div>
      </div>

      <motion.div
        style={{
          y: reduce ? 0 : y,
          opacity: reduce ? 1 : opacity,
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "1100px",
          width: "100%",
        }}
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "var(--gold)",
            marginBottom: "2.5rem",
          }}
        >
          Nouvelle‑Aquitaine · Bordeaux · Saint‑Émilion
        </motion.p>

        <h1 className="sr-only">
          L&apos;Art de la Gastronomie — David Chambaud, Traiteur &amp; Chef à
          Domicile en Nouvelle-Aquitaine
        </h1>
        <div
          aria-hidden
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(3.8rem, 13vw, 10rem)",
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: 1.0,
            marginBottom: "0.06em",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.28em",
            color: "var(--cream)",
          }}
        >
          {["L'Art", "de", "la"].map((word, wi) => (
            <span key={word} style={{ display: "inline-flex" }}>
              <CharReveal text={word} delay={0.55 + wi * 0.18} />
            </span>
          ))}
        </div>
        <div
          aria-hidden
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(3.8rem, 13vw, 10rem)",
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: 1.0,
            marginBottom: "2.5rem",
            display: "flex",
            justifyContent: "center",
            color: "var(--gold)",
          }}
        >
          <CharReveal text="Gastronomie" delay={1.1} />
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.1, delay: 1.65, ease }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "2rem",
            transformOrigin: "center",
          }}
        >
          <div
            style={{
              height: 1,
              width: 60,
              backgroundColor: "var(--gold)",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: "var(--gold)",
            }}
          />
          <div
            style={{
              height: 1,
              width: 60,
              backgroundColor: "var(--gold)",
              opacity: 0.5,
            }}
          />
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "2rem",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(var(--cream-rgb),0.75)",
            marginBottom: "1.25rem",
            letterSpacing: "0.02em",
          }}
        >
          L&apos;histoire d&apos;une cuisine gourmande
        </motion.p>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.95 }}
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "1rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 400,
            color: "rgba(var(--cream-rgb),0.78)",
            marginBottom: "3.5rem",
          }}
        >
          Traiteur · Chef à Domicile · Réceptions · Mariages
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <MagneticButton href="#contact" variant="gold">
            Demander un Devis
          </MagneticButton>
          <MagneticButton href="#services" variant="outline">
            Découvrir
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.48rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(var(--cream-rgb),0.56)",
          }}
        >
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <ChevronDown size={13} color="rgba(var(--cream-rgb),0.56)" />
        </motion.div>
      </motion.div>

      <style>{`@media (max-width: 1279px) { .hero-img-right { display: none !important; } }`}</style>
    </section>
  );

}
