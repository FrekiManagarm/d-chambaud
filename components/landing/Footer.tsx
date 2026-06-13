"use client";

import { motion } from "framer-motion";
import { Globe, Phone } from "lucide-react";

import { IconInstagram } from "./shared";

/* ════════════════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════════════════ */
export function Footer() {
  const footerMuted = "rgba(var(--cream-rgb),0.76)";
  const footerText = "rgba(var(--cream-rgb),0.9)";
  const footerAccent = "rgba(var(--gold-rgb),0.92)";

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
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}
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

        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.52rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: footerMuted,
          }}
        >
          © 2026 DC Restauration &nbsp;·&nbsp;{" "}
          <a
            href="/mentions-legales"
            style={{ color: footerAccent, textDecoration: "none" }}
          >
            Mentions légales
          </a>
        </p>
      </div>
    </footer>
  );

}
