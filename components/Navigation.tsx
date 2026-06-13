"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#a-propos", label: "Maison" },
  { href: "/#services", label: "Services" },
  { href: "/#galerie", label: "Galerie" },
  { href: "/#formules", label: "Formules" },
  { href: "/blog", label: "Journal" },
  { href: "/#temoignages", label: "Témoignages" },
];

const MotionLink = motion.create(Link);

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const solidHeader = scrolled || pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
        backgroundColor: solidHeader ? "rgba(var(--cream-rgb),0.94)" : "rgba(var(--dark-rgb),0.18)",
        backdropFilter: solidHeader ? "blur(18px)" : "blur(8px)",
        borderBottom: solidHeader ? "1px solid rgba(var(--bronze-rgb),0.18)" : "1px solid rgba(var(--cream-rgb),0.08)",
        boxShadow: solidHeader ? "0 18px 40px -34px rgba(var(--charcoal-rgb),0.42)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1rem, 3vw, 2.5rem)",
          height: scrolled ? "66px" : "78px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "height 0.5s ease",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="David Chambaud - retour en haut de page"
          className="brand-logo"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.78rem",
            color: solidHeader ? "var(--charcoal)" : "var(--cream)",
            transition: "color 0.5s ease, transform 0.3s ease",
          }}
        >
          <span
            className="brand-logo-emblem"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.18rem",
            }}
          >
            <span
              aria-hidden="true"
              className="brand-logo-mark"
              style={{
                width: scrolled ? "42px" : "46px",
                height: scrolled ? "42px" : "46px",
                border: solidHeader
                  ? "1px solid rgba(var(--bronze-rgb),0.5)"
                  : "1px solid rgba(var(--cream-rgb),0.58)",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                backgroundColor: solidHeader
                  ? "rgba(var(--bronze-rgb),0.08)"
                  : "rgba(var(--dark-rgb),0.18)",
                boxShadow: solidHeader
                  ? "inset 0 0 0 1px rgba(var(--cream-rgb),0.55)"
                  : "inset 0 0 0 1px rgba(var(--gold-rgb),0.18)",
                transition:
                  "width 0.5s ease, height 0.5s ease, border-color 0.5s ease, background-color 0.5s ease, box-shadow 0.5s ease",
              }}
            >
              <svg
                viewBox="0 0 120 72"
                focusable="false"
                style={{
                  width: scrolled ? "30px" : "32px",
                  height: "22px",
                  display: "block",
                  color: solidHeader ? "var(--bronze)" : "var(--gold-light)",
                  overflow: "visible",
                  transition: "width 0.5s ease, color 0.5s ease",
                }}
              >
                <path
                  d="M15 49C29 34 48 29 54 35C62 44 39 59 20 58C9 57 8 52 15 49Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="8"
                />
                <path
                  d="M48 56C41 39 50 18 66 8"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="10"
                />
                <path
                  d="M101 24C86 18 68 31 67 44C66 58 84 58 109 48"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="10"
                />
              </svg>
            </span>
            <span
              className="brand-logo-mention"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: scrolled ? "0.36rem" : "0.38rem",
                letterSpacing: "0.12em",
                lineHeight: 1,
                textTransform: "uppercase",
                fontWeight: 500,
                whiteSpace: "nowrap",
                color: solidHeader
                  ? "rgba(var(--charcoal-rgb),0.58)"
                  : "rgba(var(--cream-rgb),0.62)",
                transition: "font-size 0.5s ease, color 0.5s ease",
              }}
            >
              DC restauration
            </span>
          </span>
          <span
            className="brand-logo-text"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.18rem",
              lineHeight: 1,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: scrolled ? "0.72rem" : "0.76rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: solidHeader ? "var(--charcoal)" : "var(--cream)",
                transition: "font-size 0.5s ease, color 0.5s ease",
              }}
            >
              David Chambaud
            </span>
            <span
              className="brand-logo-subtitle"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: scrolled ? "0.72rem" : "0.76rem",
                fontStyle: "italic",
                fontWeight: 300,
                color: solidHeader
                  ? "rgba(var(--bronze-rgb),0.95)"
                  : "rgba(var(--gold-light-rgb),0.82)",
                transition: "font-size 0.5s ease, color 0.5s ease",
              }}
            >
              Traiteur & chef à domicile
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex" style={{ alignItems: "center", gap: "2.25rem" }}>
          {navLinks.map((link, i) => (
            <MotionLink
              key={link.href}
              href={link.href}
              className="nav-link"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: solidHeader ? "var(--charcoal)" : "rgba(var(--cream-rgb),0.82)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
            >
              {link.label}
            </MotionLink>
          ))}

          <MotionLink
            href="/#contact"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 500,
              padding: "0.72rem 1.25rem",
              border: "1px solid var(--gold)",
              color: solidHeader ? "var(--charcoal)" : "var(--gold-light)",
              textDecoration: "none",
              transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
              display: "inline-block",
              backgroundColor: solidHeader ? "rgba(var(--bronze-rgb),0.12)" : "rgba(var(--dark-rgb),0.32)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--gold)";
              e.currentTarget.style.color = "var(--dark)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = solidHeader
                ? "rgba(var(--bronze-rgb),0.12)"
                : "rgba(var(--dark-rgb),0.32)";
              e.currentTarget.style.color = solidHeader
                ? "var(--charcoal)"
                : "var(--gold-light)";
            }}
          >
            Devis
          </MotionLink>
        </nav>

        {/* Mobile toggle */}
        <motion.button
          className="lg:hidden"
          whileTap={{ scale: 0.92 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: solidHeader ? "var(--charcoal)" : "#f5edd8",
            padding: "0.5rem",
          }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden", backgroundColor: "var(--cream)" }}
          >
            <div
              className="mobile-menu-panel"
              style={{
                padding: "1.5rem 2.5rem 2rem",
                borderTop: "1px solid rgba(var(--gold-rgb),0.2)",
              }}
            >
              {navLinks.map((link, i) => (
                <MotionLink
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    padding: "0.7rem 0",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "var(--charcoal)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(var(--gold-rgb),0.12)",
                  }}
                >
                  {link.label}
                </MotionLink>
              ))}
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "1.25rem",
                  padding: "0.85rem",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  border: "1px solid var(--gold)",
                  color: "var(--gold)",
                  textDecoration: "none",
                }}
              >
                Demander un devis
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @media (max-width: 640px) {
          .brand-logo {
            gap: 0.62rem !important;
          }

          .brand-logo-mark {
            width: 38px !important;
            height: 38px !important;
          }

          .brand-logo-mention {
            font-size: 0.34rem !important;
            letter-spacing: 0.08em !important;
          }

          .brand-logo-text > span:first-child {
            font-size: 0.64rem !important;
            letter-spacing: 0.2em !important;
          }

          .brand-logo-subtitle {
            display: none !important;
          }

          .mobile-menu-panel {
            padding: 1.25rem 1rem 1.5rem !important;
          }
        }
      `}</style>
    </motion.header>
  );
}
