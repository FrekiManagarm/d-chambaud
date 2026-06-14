"use client";

import { motion } from "framer-motion";
import { Globe, Phone } from "lucide-react";
import Link from "next/link";

import { localSeoPages } from "@/lib/seo";

import { IconInstagram } from "./shared";

/* ════════════════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════════════════ */
export function Footer() {
  const footerMuted = "rgba(var(--cream-rgb),0.76)";
  const footerText = "rgba(var(--cream-rgb),0.9)";

  return (
    <footer
      style={{
        background:
          "linear-gradient(180deg, rgba(var(--charcoal-rgb),0.98), var(--dark))",
        padding: "2.5rem 2rem",
        borderTop: "1px solid rgba(var(--gold-rgb),0.2)",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(220px, 0.9fr) minmax(280px, 1.1fr) auto",
          gap: "1.5rem",
          alignItems: "start",
        }}
        className="footer-grid"
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.05rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              color: footerText,
            }}
          >
            DC Restauration
          </p>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.52rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: footerMuted,
              marginTop: "0.25rem",
            }}
          >
            Traiteur &amp; Chef à Domicile · Nouvelle-Aquitaine · Bordeaux ·
            Saint-Émilion
          </p>
        </div>

        <nav
          aria-label="Zones d'intervention"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem 1rem",
            justifyContent: "center",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {localSeoPages.slice(0, 5).map((page) => (
            <Link
              href={`/${page.slug}`}
              key={page.slug}
              style={{ color: footerMuted, textDecoration: "none" }}
            >
              {page.title}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          {[
            {
              href: "https://www.instagram.com/chambauddavid",
              icon: <IconInstagram size={15} color="currentColor" />,
              label: "Instagram",
            },
            {
              href: "https://www.facebook.com",
              icon: <Globe size={15} strokeWidth={1.5} />,
              label: "Facebook",
            },
            {
              href: "tel:+33650754406",
              icon: <Phone size={15} strokeWidth={1.5} />,
              label: "Téléphone",
            },
          ].map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              aria-label={item.label}
              whileHover={{ color: "var(--gold)", y: -2 }}
              transition={{ duration: 0.2 }}
              style={{ color: footerMuted, display: "block" }}
            >
              {item.icon}
            </motion.a>
          ))}
        </div>

        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "0.75rem 1rem",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.52rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: footerMuted,
          }}
        >
          <p>© 2026 DC Restauration</p>
          <Link
            href="/mentions-legales"
            style={{
              color: footerMuted,
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = "var(--gold)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = footerMuted;
            }}
          >
            Mentions légales
          </Link>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-grid nav {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );

}
