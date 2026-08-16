"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import type { FinalCtaContent } from "./types";
import { RevealOnScroll, fadeUp } from "./shared";

export function FinalContactCTA({ content }: { content: FinalCtaContent }) {
  return (
    <section
      className="grain-overlay final-contact-cta"
      aria-label="Demander un devis"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--dark)",
        padding: "clamp(5rem, 9vw, 8rem) 0",
      }}
    >
      <Image
        src="/20260212_DSC3049.jpg"
        alt=""
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center 48%",
          opacity: 0.34,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(var(--dark-rgb),0.96) 0%, rgba(var(--dark-rgb),0.84) 46%, rgba(var(--dark-rgb),0.52) 100%), linear-gradient(to top, var(--dark) 0%, transparent 34%)",
        }}
      />

      <div
        className="final-contact-cta-inner"
        style={{
          position: "relative",
          zIndex: 2,
          width: "min(1180px, calc(100% - 4rem))",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.78fr) auto",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "end",
        }}
      >
        <RevealOnScroll variant={fadeUp}>
          <div>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "clamp(0.92rem, 1.25vw, 1.12rem)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "rgba(var(--gold-light-rgb),0.92)",
                marginBottom: "1.25rem",
              }}
            >
              {content.eyebrow}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(3.2rem, 7vw, 6.4rem)",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 0.96,
                color: "var(--cream)",
                letterSpacing: 0,
                maxWidth: 820,
              }}
            >
              {content.titleLineOne}
              <br />
              {content.titleLineTwo}
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant={fadeUp} custom={2}>
          <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.8rem",
                minWidth: "min(100%, 18rem)",
                padding: "1.05rem 1.35rem",
                border: "1px solid var(--gold)",
                backgroundColor: "var(--gold)",
                color: "var(--dark)",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <span>{content.ctaLabel}</span>
              <ArrowRight size={14} strokeWidth={1.7} />
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .final-contact-cta {
            padding-top: 4.5rem !important;
            padding-bottom: 4.5rem !important;
          }
          .final-contact-cta-inner {
            width: min(100% - 2rem, 1180px) !important;
            grid-template-columns: 1fr !important;
          }
          .final-contact-cta h2 {
            font-size: clamp(2.8rem, 13vw, 4rem) !important;
          }
          .final-contact-cta a {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
