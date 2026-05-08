"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#a-propos", label: "À Propos" },
  { href: "#services", label: "Services" },
  { href: "#formules", label: "Formules" },
  { href: "#pavillon", label: "Pavillon" },
  { href: "#temoignages", label: "Témoignages" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
        backgroundColor: scrolled ? "rgba(250,250,247,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(196,166,97,0.18)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 2.5rem",
          height: scrolled ? "64px" : "84px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "height 0.5s ease",
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ICO - DC - N.png"
            alt="David Chambaud"
            style={{
              height: scrolled ? "52px" : "42px",
              width: "auto",
              objectFit: "contain",
              display: "block",
              filter: scrolled ? "invert(1)" : "brightness(4)",
              mixBlendMode: scrolled ? "multiply" : "screen",
              transition: "height 0.5s ease, filter 0.5s ease",
            }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex" style={{ alignItems: "center", gap: "2.25rem" }}>
          {navLinks.map((link, i) => (
            <motion.a
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
                color: scrolled ? "var(--charcoal)" : "rgba(250,250,247,0.82)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
            >
              {link.label}
            </motion.a>
          ))}

          <motion.a
            href="#contact"
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
              padding: "0.6rem 1.4rem",
              border: "1px solid var(--gold)",
              color: "var(--gold)",
              textDecoration: "none",
              transition: "background-color 0.3s ease, color 0.3s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--gold)";
              e.currentTarget.style.color = "var(--dark)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--gold)";
            }}
          >
            Devis
          </motion.a>
        </nav>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden"
          whileTap={{ scale: 0.92 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: scrolled ? "var(--charcoal)" : "#FAFAF7",
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
            <div style={{ padding: "1.5rem 2.5rem 2rem", borderTop: "1px solid rgba(196,166,97,0.2)" }}>
              {navLinks.map((link, i) => (
                <motion.a
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
                    borderBottom: "1px solid rgba(196,166,97,0.12)",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
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
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
