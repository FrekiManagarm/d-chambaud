"use client";

import type { StatsContent } from "./types";
import {
  CountUpStat,
  Eyebrow,
  HeadingReveal,
  RevealOnScroll,
  fadeUp,
} from "./shared";

/* ════════════════════════════════════════════════════════════
   STATS — theatrical numbers, borderless
════════════════════════════════════════════════════════════ */
export function StatsSection({ content }: { content: StatsContent }) {
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
              <Eyebrow light>{content.eyebrow}</Eyebrow>
            </RevealOnScroll>
            <HeadingReveal delay={0.06}>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2.35rem, 4.5vw, 4.25rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 0.98,
                  color: "var(--cream)",
                }}
              >
                {content.titleLineOne}
                <br />
                {content.titleLineTwo}
              </h3>
            </HeadingReveal>
          </div>
          <RevealOnScroll variant={fadeUp} custom={2}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.9,
                color: "rgba(var(--cream-rgb),0.78)",
                maxWidth: 430,
              }}
            >
              {content.intro}
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
          {content.items.map((item, index) => (
            <CountUpStat
              key={item.label}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
              detail={item.detail}
              delay={index * 0.12}
              border={index < content.items.length - 1}
            />
          ))}
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
