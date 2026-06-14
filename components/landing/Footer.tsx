"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { localSeoPages, siteConfig } from "@/lib/seo";

import { IconInstagram } from "./shared";

const mainLinks = [
  { href: "/#services", label: "Prestations" },
  { href: "/#formules", label: "Formules" },
  { href: "/#contact", label: "Contact" },
  { href: "/blog", label: "Journal" },
];

export function Footer() {
  const footerMuted = "rgba(var(--cream-rgb),0.76)";
  const footerText = "rgba(var(--cream-rgb),0.9)";
  const footerSoft = "rgba(var(--cream-rgb),0.56)";

  return (
    <footer
      className="site-footer"
      style={{
        background:
          "radial-gradient(circle at 12% 0%, rgba(var(--gold-rgb),0.16), transparent 34rem), linear-gradient(180deg, rgba(var(--charcoal-rgb),0.98), var(--dark))",
        borderTop: "1px solid rgba(var(--gold-rgb),0.24)",
        color: footerText,
        overflow: "hidden",
        padding: "clamp(3.5rem, 7vw, 6rem) 0 2rem",
        position: "relative",
      }}
    >
      <div className="footer-shell">
        <div className="footer-topline" aria-hidden="true" />

        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              DC Restauration
            </Link>
            <p>
              Cuisine de réception, chef à domicile et accompagnement
              événementiel pour les tables privées et professionnelles en
              Nouvelle-Aquitaine.
            </p>

            <div className="footer-contact-stack">
              <a href={`tel:${siteConfig.phone}`}>
                <Phone size={15} strokeWidth={1.5} />
                <span>06 50 75 44 06</span>
              </a>
              <a href={`mailto:${siteConfig.email}`}>
                <Mail size={15} strokeWidth={1.5} />
                <span>{siteConfig.email}</span>
              </a>
              <span>
                <MapPin size={15} strokeWidth={1.5} />
                <span>Bordeaux · Nouvelle-Aquitaine</span>
              </span>
            </div>
          </div>

          <nav aria-label="Navigation principale" className="footer-nav">
            <p className="footer-label">Maison</p>
            {mainLinks.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Pages locales" className="footer-local-links">
            <p className="footer-label">Liens</p>
            <div>
              {localSeoPages.map((page) => (
                <Link href={`/${page.slug}`} key={page.slug}>
                  <span>{page.title}</span>
                  <ArrowUpRight size={13} strokeWidth={1.6} />
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© 2026 {siteConfig.legalName}</p>

          <div className="footer-socials">
            <Link href="/mentions-legales">Mentions légales</Link>
            {[
              {
                href: siteConfig.instagram,
                icon: <IconInstagram size={15} color="currentColor" />,
                label: "Instagram",
              },
              {
                href: `tel:${siteConfig.phone}`,
                icon: <Phone size={15} strokeWidth={1.5} />,
                label: "Téléphone",
              },
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={item.label}
                whileHover={{ color: "var(--gold)", y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .site-footer::after {
          content: "";
          position: absolute;
          right: -12vw;
          bottom: -18rem;
          width: min(48rem, 70vw);
          height: min(48rem, 70vw);
          border: 1px solid rgba(var(--gold-rgb),0.12);
          border-radius: 999px;
          pointer-events: none;
        }

        .footer-shell {
          width: min(1240px, calc(100% - 4rem));
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .footer-topline {
          width: 100%;
          height: 1px;
          margin-bottom: clamp(2rem, 4vw, 3rem);
          background: linear-gradient(90deg, var(--gold), rgba(var(--cream-rgb),0.12), transparent);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: minmax(280px, 0.95fr) minmax(140px, 0.32fr) minmax(360px, 0.73fr);
          gap: clamp(2rem, 5vw, 5rem);
          align-items: start;
        }

        .footer-logo {
          color: ${footerText};
          display: inline-block;
          font-family: var(--font-cormorant), serif;
          font-size: clamp(2.15rem, 4vw, 3.55rem);
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0;
          line-height: 0.95;
          text-decoration: none;
        }

        .footer-brand p {
          color: ${footerMuted};
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(0.88rem, 1vw, 0.98rem);
          line-height: 1.85;
          margin-top: 1.35rem;
          max-width: 34rem;
        }

        .footer-contact-stack {
          display: grid;
          gap: 0.85rem;
          margin-top: 2rem;
        }

        .footer-contact-stack a,
        .footer-contact-stack span {
          align-items: center;
          color: ${footerMuted};
          display: flex;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.78rem;
          gap: 0.75rem;
          line-height: 1.35;
          text-decoration: none;
        }

        .footer-contact-stack svg {
          color: var(--gold);
          flex: 0 0 auto;
        }

        .footer-label {
          color: var(--gold);
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          margin-bottom: 1.25rem;
          text-transform: uppercase;
        }

        .footer-nav {
          display: grid;
          gap: 0.85rem;
        }

        .footer-nav a,
        .footer-socials a {
          color: ${footerMuted};
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.78rem;
          line-height: 1.35;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-nav a:hover,
        .footer-socials a:hover,
        .footer-contact-stack a:hover {
          color: var(--gold);
        }

        .footer-local-links > div {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          border-top: 1px solid rgba(var(--cream-rgb),0.14);
        }

        .footer-local-links a {
          align-items: center;
          border-bottom: 1px solid rgba(var(--cream-rgb),0.14);
          color: ${footerMuted};
          display: flex;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.72rem;
          gap: 0.7rem;
          justify-content: space-between;
          letter-spacing: 0.08em;
          line-height: 1.4;
          min-height: 3.2rem;
          padding: 0.75rem 0;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s ease, padding 0.2s ease;
        }

        .footer-local-links a:nth-child(odd) {
          padding-right: 1rem;
        }

        .footer-local-links a:nth-child(even) {
          border-left: 1px solid rgba(var(--cream-rgb),0.14);
          padding-left: 1rem;
        }

        .footer-local-links a:hover {
          color: var(--gold);
          padding-inline-start: 0.35rem;
        }

        .footer-local-links svg {
          color: ${footerSoft};
          flex: 0 0 auto;
        }

        .footer-bottom {
          align-items: center;
          border-top: 1px solid rgba(var(--cream-rgb),0.12);
          color: ${footerSoft};
          display: flex;
          flex-wrap: wrap;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.62rem;
          gap: 1rem;
          justify-content: space-between;
          letter-spacing: 0.18em;
          margin-top: clamp(2.5rem, 5vw, 4.5rem);
          padding-top: 1.25rem;
          text-transform: uppercase;
        }

        .footer-socials {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          gap: 1.1rem;
        }

        .footer-socials a {
          color: ${footerSoft};
          display: inline-flex;
        }

        @media (max-width: 900px) {
          .footer-shell {
            width: min(100% - 2rem, 1240px);
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }

          .footer-local-links > div {
            grid-template-columns: 1fr;
          }

          .footer-local-links a:nth-child(even) {
            border-left: 0;
            padding-left: 0;
          }

          .footer-local-links a:nth-child(odd) {
            padding-right: 0;
          }

          .footer-bottom {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </footer>
  );
}
