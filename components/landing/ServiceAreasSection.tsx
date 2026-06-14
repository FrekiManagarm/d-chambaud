"use client";

import Link from "next/link";

import { localSeoPages } from "@/lib/seo";

export function ServiceAreasSection() {
  return (
    <section
      id="zones"
      style={{
        background: "var(--cream)",
        borderTop: "1px solid rgba(var(--bronze-rgb),0.12)",
        borderBottom: "1px solid rgba(var(--bronze-rgb),0.12)",
        padding: "clamp(4.5rem, 7vw, 7rem) 0",
      }}
    >
      <div
        className="service-areas-shell"
        style={{
          width: "min(1240px, calc(100% - 4rem))",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.42fr) minmax(340px, 0.58fr)",
          gap: "clamp(3rem, 6vw, 6rem)",
          alignItems: "start",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "var(--gold)",
              marginBottom: "1rem",
            }}
          >
            Zones d'intervention
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(2.35rem, 4.5vw, 4rem)",
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1,
              color: "var(--charcoal)",
              letterSpacing: 0,
            }}
          >
            Une table ancrée à Bordeaux, mobile en Gironde.
          </h2>
        </div>

        <div
          className="service-areas-list"
          style={{
            display: "grid",
            borderTop: "1px solid rgba(var(--bronze-rgb),0.16)",
          }}
        >
          {localSeoPages.map((page) => (
            <Link
              href={`/${page.slug}`}
              key={page.slug}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 0.45fr) minmax(0, 0.55fr)",
                gap: "1.4rem",
                padding: "1.15rem 0",
                borderBottom: "1px solid rgba(var(--bronze-rgb),0.16)",
                color: "var(--charcoal)",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(1.35rem, 2.4vw, 2rem)",
                  fontStyle: "italic",
                  lineHeight: 1.1,
                }}
              >
                {page.title}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.78rem",
                  lineHeight: 1.7,
                  color: "rgba(var(--charcoal-rgb),0.68)",
                }}
              >
                {page.description}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .service-areas-shell {
            width: min(100% - 2rem, 1240px) !important;
            grid-template-columns: 1fr !important;
          }

          .service-areas-list a {
            grid-template-columns: 1fr !important;
            gap: 0.65rem !important;
          }
        }
      `}</style>
    </section>
  );
}
