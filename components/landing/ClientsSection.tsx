"use client";

import Image from "next/image";

import type { ClientsContent } from "./types";
import { Eyebrow, HeadingReveal, RevealOnScroll, fadeUp } from "./shared";

/* Logos render inside a 96px-tall track and never exceed 220px wide. Declaring
   that box lets next/image ship a ~220w asset instead of the full-resolution
   source (some are 100 KB+ PNGs), and the marquee doubles every logo, so each
   byte saved is paid twice. */
const LOGO_BOX = { height: 96, width: 220 } as const;

/* ════════════════════════════════════════════════════════════
   CLIENTS — infinite logo carousel
════════════════════════════════════════════════════════════ */
export function ClientsSection({ content }: { content: ClientsContent }) {
  const doubled = [...content.logos, ...content.logos];

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
            <Eyebrow>{content.eyebrow}</Eyebrow>
          </RevealOnScroll>
          <HeadingReveal delay={0.06}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.2rem, 4vw, 3.7rem)",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1,
                color: "var(--charcoal)",
              }}
            >
              {content.titleLineOne}
              <br />
              {content.titleLineTwo}
            </h2>
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
            {content.intro}
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
          {doubled.map((logo, i) => {
            /* The second half of `doubled` is the same list repeated to make the
               marquee loop seamlessly. It carries no information, so it stays
               out of the accessibility tree and out of the alt text. */
            const isLoopCopy = i >= content.logos.length;

            return (
            <div
              key={i}
              style={{
                height: "96px",
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Image
                src={logo.src}
                alt={isLoopCopy ? "" : logo.alt}
                width={LOGO_BOX.width}
                height={LOGO_BOX.height}
                aria-hidden={isLoopCopy || undefined}
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
            );
          })}
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
