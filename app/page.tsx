"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Phone,
  Globe,
  ChevronDown,
  Star,
  UtensilsCrossed,
  Heart,
  Home,
  TreePine,
  ArrowLeft,
  ArrowRight,
  Mail,
} from "lucide-react";

/* ─── Icons ─── */
const IconInstagram = ({
  size = 15,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.5" cy="6.5" r="0.5" fill={color} />
  </svg>
);

/* ─── Easing tokens ─── */
const ease = [0.25, 0.46, 0.45, 0.94] as const;
const easeOut = [0.16, 1, 0.3, 1] as const;

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: i * 0.1, ease },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.1 },
  }),
};

const lineGrow = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1, ease } },
};

/* ─── RevealOnScroll ─── */
function RevealOnScroll({
  children,
  variant = fadeUp,
  custom = 0,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  variant?: Variants;
  custom?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      custom={custom}
      variants={variant}
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : isInView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── HeadingReveal ─── */
function HeadingReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        initial={reduce ? false : { y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, delay, ease: easeOut }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── CharReveal ─── */
function CharReveal({
  text,
  delay = 0,
  style,
}: {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            lineHeight: 1.05,
          }}
        >
          <motion.span
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: delay + i * 0.026, ease }}
            style={{ display: "inline-block", ...style }}
          >
            {char === " " ? " " : char}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/* ─── MagneticButton ─── */
function MagneticButton({
  children,
  href,
  variant = "gold",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "gold" | "outline";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 160, damping: 22, mass: 0.5 });
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.38);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };
  const isGold = variant === "gold";

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{
        x: reduce ? 0 : springX,
        y: reduce ? 0 : springY,
        display: "inline-block",
        padding: "1rem 2.75rem",
        fontFamily: "var(--font-montserrat), sans-serif",
        fontSize: "0.62rem",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        fontWeight: 500,
        textDecoration: "none",
        backgroundColor: isGold ? "var(--gold)" : "transparent",
        color: isGold ? "var(--dark)" : "rgba(var(--cream-rgb),0.7)",
        border: isGold ? "none" : "1px solid rgba(var(--cream-rgb),0.22)",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={
        isGold
          ? { backgroundColor: "var(--gold-light)" }
          : { borderColor: "var(--gold)", color: "var(--gold)" }
      }
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  );
}

/* ─── CountUpStat ─── */
function CountUpStat({
  value,
  suffix,
  label,
  detail,
  delay = 0,
  border = true,
}: {
  value: number;
  suffix: string;
  label: string;
  detail: string;
  delay?: number;
  border?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const displayCount = reduce ? value : count;

  useEffect(() => {
    if (!isInView || reduce) return;
    const duration = 2400;
    const startTime = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease }}
      style={{
        padding: "4rem 3rem",
        textAlign: "center",
        borderRight: border ? "1px solid rgba(var(--gold-rgb),0.12)" : "none",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(4rem, 8vw, 7.5rem)",
          fontWeight: 300,
          lineHeight: 1,
          color: "var(--gold)",
          marginBottom: "0.8rem",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {displayCount}
        {suffix}
      </p>
      <p
        style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.9rem",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          fontWeight: 500,
          color: "var(--cream)",
          marginBottom: "0.4rem",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.7rem",
          fontWeight: 400,
          color: "rgba(var(--cream-rgb),0.7)",
          lineHeight: 1.6,
        }}
      >
        {detail}
      </p>
    </motion.div>
  );
}

/* ─── Eyebrow ─── */
const Eyebrow = ({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) => (
  <p
    style={{
      fontFamily: "var(--font-montserrat), sans-serif",
      fontSize: "0.58rem",
      letterSpacing: "0.42em",
      textTransform: "uppercase",
      fontWeight: 500,
      color: "var(--gold)",
      marginBottom: "0.9rem",
      opacity: light ? 0.9 : 1,
    }}
  >
    {children}
  </p>
);

/* ─── ContactField ─── */
function ContactField({
  label,
  name,
  type = "text",
  helper,
  error,
  textarea = false,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  helper?: string;
  error?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const inputId = `contact-${name}`;
  const sharedInputStyle: React.CSSProperties = {
    width: "100%",
    background: focused
      ? "rgba(var(--cream-rgb),0.96)"
      : "rgba(var(--cream-rgb),0.84)",
    border: `1px solid ${
      error
        ? "rgba(150,64,52,0.55)"
        : focused
          ? "rgba(var(--gold-rgb),0.82)"
          : "rgba(var(--cream-rgb),0.18)"
    }`,
    color: "var(--charcoal)",
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "0.86rem",
    fontWeight: 400,
    padding: "0.78rem 0.9rem",
    outline: "none",
    resize: "none",
    boxShadow: focused
      ? "inset 0 1px 0 rgba(255,255,255,0.55), 0 18px 42px -34px rgba(var(--dark-rgb),0.72)"
      : "inset 0 1px 0 rgba(255,255,255,0.32)",
    transition:
      "border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease",
  };

  return (
    <div className="contact-field" style={{ display: "grid", gap: "0.45rem" }}>
      <label
        htmlFor={inputId}
        style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.58rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: error ? "rgba(245,190,170,0.95)" : "rgba(var(--cream-rgb),0.74)",
          fontWeight: 500,
        }}
      >
        {label}
        {required && (
          <span aria-hidden style={{ color: "var(--gold)" }}>
            {" "}
            *
          </span>
        )}
      </label>

      {textarea ? (
        <textarea
          id={inputId}
          name={name}
          rows={5}
          aria-invalid={!!error}
          aria-describedby={`${inputId}-hint`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...sharedInputStyle, lineHeight: 1.65 }}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          aria-invalid={!!error}
          aria-describedby={`${inputId}-hint`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedInputStyle}
        />
      )}

      <p
        id={`${inputId}-hint`}
        style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.68rem",
          lineHeight: 1.45,
          color: error ? "rgba(245,190,170,0.95)" : "rgba(var(--cream-rgb),0.48)",
        }}
      >
        {error || helper || ""}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   HERO — Immersive full-screen with char-by-char reveal
════════════════════════════════════════════════════════════ */
function HeroSection() {
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
          src="/AdobeStock_420273742.jpeg"
          alt=""
          fill
          priority
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
              color: "rgba(var(--cream-rgb),0.28)",
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
          Nouvelle‑Aquitaine · Bordeaux
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
            color: "rgba(var(--cream-rgb),0.6)",
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
            color: "rgba(var(--cream-rgb),0.25)",
          }}
        >
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <ChevronDown size={13} color="rgba(var(--cream-rgb),0.25)" />
        </motion.div>
      </motion.div>

      <style>{`@media (max-width: 1279px) { .hero-img-right { display: none !important; } }`}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   MARQUEE STRIP — edge-faded
════════════════════════════════════════════════════════════ */
const MARQUEE_ITEMS = [
  "Mariages qui ont du goût",
  "·",
  "Cocktails nets",
  "·",
  "Dîners privés",
  "·",
  "Service précis",
  "·",
  "Tables gourmandes",
  "·",
  "Produits de saison",
  "·",
  "Pavillon des Millésimes",
  "·",
  "Nouvelle‑Aquitaine",
  "·",
  "Mariages qui ont du goût",
  "·",
  "Cocktails nets",
  "·",
  "Dîners privés",
  "·",
  "Service précis",
  "·",
  "Tables gourmandes",
  "·",
  "Produits de saison",
  "·",
  "Pavillon des Millésimes",
  "·",
  "Nouvelle‑Aquitaine",
  "·",
];

function MarqueeStrip() {
  return (
    <div
      style={{
        backgroundColor: "var(--dark)",
        borderTop: "1px solid rgba(var(--gold-rgb),0.12)",
        borderBottom: "1px solid rgba(var(--gold-rgb),0.12)",
        padding: "0.85rem 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Edge fades */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "8rem",
          background: "linear-gradient(to right, var(--dark), transparent)",
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
          width: "8rem",
          background: "linear-gradient(to left, var(--dark), transparent)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        className="marquee-track"
        style={{
          display: "flex",
          gap: "2rem",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {MARQUEE_ITEMS.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily:
                item === "·" ? "serif" : "var(--font-montserrat), sans-serif",
              fontSize: item === "·" ? "0.9rem" : "0.58rem",
              letterSpacing: item === "·" ? 0 : "0.28em",
              textTransform: "uppercase",
              fontWeight: 400,
              color: item === "·" ? "var(--gold)" : "rgba(var(--cream-rgb),0.65)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   VALUES — editorial horizontal bands with huge bg numbers
════════════════════════════════════════════════════════════ */
function ValueBand({
  num,
  title,
  desc,
  index,
}: {
  num: string;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        position: "relative",
        borderBottom: "1px solid rgba(var(--gold-rgb),0.12)",
        overflow: "hidden",
      }}
    >
      {/* Giant background number */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-0.05em",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(7rem, 18vw, 14rem)",
          fontWeight: 300,
          fontStyle: "italic",
          color: "rgba(var(--gold-rgb),0.055)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {num}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          padding: "4.5rem 3rem",
          gap: "4rem",
          position: "relative",
          zIndex: 1,
        }}
        className="value-band-inner"
      >
        {/* Left: title */}
        <div style={{ overflow: "hidden" }}>
          <motion.div
            initial={reduce ? false : { y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: index * 0.12 + 0.1,
              ease: easeOut,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "0.8rem",
                fontWeight: 500,
              }}
            >
              {num}
            </p>
            <h3
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--charcoal)",
                lineHeight: 1.1,
              }}
            >
              {title}
            </h3>
          </motion.div>
        </div>

        {/* Right: description */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: index * 0.12 + 0.25, ease }}
        >
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.88rem",
              lineHeight: 1.95,
              fontWeight: 400,
              color: "var(--charcoal)",
              maxWidth: 420,
            }}
          >
            {desc}
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .value-band-inner { grid-template-columns: 1fr !important; padding: 3rem 1.5rem !important; gap: 1rem !important; }
        }
      `}</style>
    </motion.div>
  );
}

function ValuesSection() {
  return (
    <section
      aria-label="Architecture d'un événement"
      style={{ backgroundColor: "var(--cream)", paddingBottom: 0, overflow: "hidden" }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(5rem, 8vw, 8rem) 2rem 0",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.58fr) minmax(320px, 0.42fr)",
            alignItems: "stretch",
            gap: "clamp(2rem, 5vw, 5rem)",
            marginBottom: "clamp(4rem, 7vw, 6rem)",
          }}
          className="values-heading"
        >
          <div>
            <RevealOnScroll variant={fadeUp}>
              <Eyebrow>Scénographie culinaire</Eyebrow>
            </RevealOnScroll>
            <HeadingReveal delay={0.06}>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(3rem, 6.6vw, 6.4rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 0.96,
                  color: "var(--charcoal)",
                }}
              >
                Un repas ne se pose pas
                <br />
                sur une table.
              </h2>
            </HeadingReveal>
            <RevealOnScroll variant={fadeUp} custom={2}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.94rem",
                  lineHeight: 1.9,
                  color: "rgba(var(--charcoal-rgb),0.64)",
                  maxWidth: 560,
                  marginTop: "1.6rem",
                }}
              >
                Il se construit comme une progression: l&apos;arrivée, la
                première bouchée, le plat que l&apos;on attend, le dessert qui
                signe la soirée. C&apos;est cette montée que David dessine.
              </p>
            </RevealOnScroll>
          </div>
          <RevealOnScroll variant={fadeIn} custom={2}>
            <div
              className="values-collage"
              style={{
                position: "relative",
                minHeight: 430,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "0 12% 16% 0",
                  overflow: "hidden",
                  backgroundColor: "var(--charcoal)",
                }}
              >
                <Image
                  src="/20260212_DSC2967.jpg"
                  alt="Bouchée gastronomique signée David Chambaud"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  style={{ objectFit: "cover", objectPosition: "center 28%" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  width: "46%",
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  border: "1px solid rgba(var(--charcoal-rgb),0.12)",
                  boxShadow: "0 26px 52px -42px rgba(var(--charcoal-rgb),0.62)",
                }}
              >
                <Image
                  src="/20260212_DSC3156.jpg"
                  alt="Dressage d'assiette pour réception"
                  fill
                  sizes="(max-width: 768px) 46vw, 260px"
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "8%",
                  bottom: "6%",
                  width: "12rem",
                  padding: "1rem",
                  backgroundColor: "rgba(var(--cream-rgb),0.78)",
                  border: "1px solid rgba(var(--charcoal-rgb),0.1)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.7), 0 24px 52px -42px rgba(var(--charcoal-rgb),0.68)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.5rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Signature
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.5rem",
                    fontStyle: "italic",
                    lineHeight: 1.05,
                    color: "var(--charcoal)",
                  }}
                >
                  Gourmand sans lourdeur, précis sans froideur.
                </p>
              </div>
            </div>
          </RevealOnScroll>

        </div>
        <div style={{ borderTop: "1px solid rgba(var(--bronze-rgb),0.18)" }}>
          <ValueBand
            num="01"
            title="L'arrivée donne le ton"
            desc="Un cocktail qui se lit vite, circule bien et installe l'énergie de la fête sans bloquer les invités autour d'un buffet."
            index={0}
          />
          <ValueBand
            num="02"
            title="Le dîner tient la salle"
            desc="Cuissons, envois, dressages et transitions sont pensés pour garder le repas vivant, même avec une grande tablée."
            index={1}
          />
          <ValueBand
            num="03"
            title="La fin reste en bouche"
            desc="Desserts, fromages, brunch ou retour de soirée: les derniers moments gardent la même attention que la première coupe."
            index={2}
          />
        </div>
      </div>

      {/* Full-width atmospheric image bridge → transitions to dark StatsSection */}
      <div
        style={{
          position: "relative",
          height: "clamp(260px, 38vw, 480px)",
          overflow: "hidden",
        }}
      >
        <Image
          src="/AdobeStock_241622609.jpeg"
          alt="Gastronomie — produits du terroir aquitain"
          fill
          style={{ objectFit: "cover", objectPosition: "center 55%" }}
          sizes="100vw"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, var(--cream) 0%, transparent 18%, transparent 78%, var(--dark) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(var(--dark-rgb),0.28)",
          }}
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .values-heading {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
            margin-bottom: 2.5rem !important;
          }
          .values-collage {
            min-height: 360px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   STATS — theatrical numbers, borderless
════════════════════════════════════════════════════════════ */
function StatsSection() {
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
              <Eyebrow light>Ce que vous achetez vraiment</Eyebrow>
            </RevealOnScroll>
            <HeadingReveal delay={0.06}>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2.8rem, 5.8vw, 5.6rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 0.98,
                  color: "var(--cream)",
                }}
              >
                Du calme
                <br />
                pendant l&apos;intense.
              </h2>
            </HeadingReveal>
          </div>
          <RevealOnScroll variant={fadeUp} custom={2}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.9,
                color: "rgba(var(--cream-rgb),0.62)",
                maxWidth: 430,
              }}
            >
              Le jour d&apos;un mariage, tout bouge. La valeur d&apos;un
              traiteur, c&apos;est de rendre la cuisine invisible dans
              l&apos;effort et évidente dans le plaisir.
            </p>
          </RevealOnScroll>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            borderTop: "1px solid rgba(var(--bronze-rgb),0.16)",
            borderBottom: "1px solid rgba(var(--bronze-rgb),0.16)",
          }}
          className="stats-grid"
        >
          <CountUpStat
            value={18}
            suffix=" ans"
            label="Maison fondée"
            detail="Depuis 2008"
            delay={0}
            border
          />
          <CountUpStat
            value={420}
            suffix="+"
            label="Réceptions servies"
            detail="Mariages, domaines, séminaires"
            delay={0.12}
            border
          />
          <CountUpStat
            value={48}
            suffix="h"
            label="Premier retour"
            detail="Pour cadrer votre demande"
            delay={0.24}
            border={false}
          />
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

/* ════════════════════════════════════════════════════════════
   ABOUT — magazine spread with pull quote
════════════════════════════════════════════════════════════ */
function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const reduce = useReducedMotion();

  return (
    <section
      ref={ref}
      id="a-propos"
      className="grain-overlay"
      aria-label="À propos de David Chambaud"
      style={{
        backgroundColor: "var(--dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "clamp(4rem, 7vw, 7rem) 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Portrait */}
        <RevealOnScroll variant={fadeIn}>
          <motion.div
            style={{ y: reduce ? 0 : imgY }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                aspectRatio: "3/4",
                maxHeight: 640,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src="/20260212_DSC2953.jpg"
                alt="David Chambaud, chef traiteur en Nouvelle-Aquitaine"
                fill
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
                sizes="(max-width: 768px) 100vw, 45vw"
                priority
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(var(--dark-rgb),0.5) 0%, transparent 55%)",
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: 24,
                  width: 40,
                  height: 1,
                  backgroundColor: "var(--gold)",
                  opacity: 0.45,
                  zIndex: 2,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: 24,
                  width: 1,
                  height: 40,
                  backgroundColor: "var(--gold)",
                  opacity: 0.45,
                  zIndex: 2,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  right: 24,
                  width: 40,
                  height: 1,
                  backgroundColor: "var(--gold)",
                  opacity: 0.45,
                  zIndex: 2,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  right: 24,
                  width: 1,
                  height: 40,
                  backgroundColor: "var(--gold)",
                  opacity: 0.45,
                  zIndex: 2,
                }}
              />
            </div>
          </motion.div>
        </RevealOnScroll>

        {/* Text */}
        <div>
          <RevealOnScroll variant={fadeUp}>
            <Eyebrow light>À Propos</Eyebrow>
          </RevealOnScroll>
          <HeadingReveal delay={0.05}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1.08,
                color: "var(--cream)",
                marginBottom: "2rem",
              }}
            >
              Le chef que l&apos;on choisit
              <br />
              quand le repas compte vraiment.
            </h2>
          </HeadingReveal>
          <RevealOnScroll variant={lineGrow}>
            <div
              style={{
                height: 1,
                width: 56,
                backgroundColor: "var(--gold)",
                opacity: 0.6,
                marginBottom: "2rem",
              }}
            />
          </RevealOnScroll>

          {[
            "David Chambaud accompagne les mariages, réceptions privées et événements professionnels avec une cuisine lisible, généreuse et tenue jusqu'au dernier service.",
            "Son approche réunit le goût du produit, l'exigence du dressage et une organisation discrète: les invités voient la fluidité, jamais la mécanique.",
          ].map((para, i) => (
            <RevealOnScroll key={i} variant={fadeUp} custom={2 + i}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  lineHeight: 1.95,
                  color: "rgba(var(--cream-rgb),0.6)",
                  marginBottom: "1.1rem",
                }}
              >
                {para}
              </p>
            </RevealOnScroll>
          ))}

          {/* Pull quote */}
          <RevealOnScroll variant={fadeUp} custom={4}>
            <div
              style={{
                margin: "2.5rem 0",
                paddingLeft: "1.5rem",
                borderLeft: "2px solid var(--gold)",
              }}
            >
              <blockquote
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 1.5,
                  color: "var(--cream)",
                  opacity: 0.9,
                }}
              >
                « Un événement réussi se reconnaît à ce que les invités
                ressentent: le plaisir, le rythme, l&apos;évidence. »
              </blockquote>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.52rem",
                  letterSpacing: "0.32em",
                  color: "var(--gold)",
                  marginTop: "0.75rem",
                  textTransform: "uppercase",
                }}
              >
                — David Chambaud
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant={fadeUp} custom={5}>
            <motion.a
              href="#contact"
              whileHover={{ gap: "1.2rem" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "2rem",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                textDecoration: "none",
              }}
            >
              <span>Prendre contact</span>
              <ArrowRight size={13} />
            </motion.a>
          </RevealOnScroll>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   SERVICES — editorial rows, icon slides in on hover
════════════════════════════════════════════════════════════ */
const services = [
  {
    num: "01",
    Icon: UtensilsCrossed,
    title: "Traiteur",
    sub: "Réceptions",
    desc: "Cocktails dinatoires, buffets dessinés pour circuler, repas assis et formats hybrides pour donner du relief à vos invités.",
    img: "/AdobeStock_418339639.jpeg",
  },
  {
    num: "02",
    Icon: Heart,
    title: "Mariages",
    sub: "Célébrations",
    desc: "Du vin d'honneur au dîner puis au brunch, une prestation pensée pour tenir la journée sans perdre la gourmandise.",
    img: "/AdobeStock_522340892.jpeg",
  },
  {
    num: "03",
    Icon: Home,
    title: "Chef à Domicile",
    sub: "Service Privé",
    desc: "Une expérience à la maison, en petit comité, avec le confort d'un service précis et l'intensité d'une vraie table.",
    img: "/AdobeStock_54050217.jpeg",
  },
  {
    num: "04",
    Icon: TreePine,
    title: "Réceptions",
    sub: "Tous Événements",
    desc: "Séminaires, baptêmes, anniversaires, lancements: une cuisine qui rassemble sans faire perdre le fil de l'événement.",
    img: "/AdobeStock_555480279.jpeg",
  },
];

/* ─── ServicePanel — accordion slot ─── */
function ServicePanel({
  service,
  index,
  isActive,
  onActivate,
}: {
  service: (typeof services)[0];
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className="service-panel"
      data-active={isActive}
      onMouseEnter={onActivate}
      onClick={onActivate}
      style={{
        flex: isActive ? "3.5 3.5 0%" : "1 1 0%",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: reduce
          ? "none"
          : "flex 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
        minWidth: 0,
      }}
    >
      {/* Background image */}
      <Image
        src={service.img}
        alt=""
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        sizes="(max-width: 768px) 100vw, 25vw"
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: isActive
            ? "rgba(var(--dark-rgb),0.50)"
            : "rgba(var(--dark-rgb),0.76)",
          transition: reduce ? "none" : "background-color 0.65s ease",
          zIndex: 1,
        }}
      />

      {/* Separator line between panels */}
      {index > 0 && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 1,
            backgroundColor: "rgba(var(--gold-rgb),0.18)",
            zIndex: 2,
          }}
        />
      )}

      {/* COLLAPSED: vertical rotated label */}
      <motion.div
        animate={{ opacity: isActive ? 0 : 1, x: isActive ? -8 : 0 }}
        transition={{ duration: 0.28, delay: isActive ? 0 : 0.18 }}
        className="service-panel-collapsed"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            transform: "rotate(-90deg)",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "0.82rem",
              fontStyle: "italic",
              fontWeight: 300,
              color: "rgba(var(--gold-rgb),0.65)",
              letterSpacing: "0.18em",
            }}
          >
            {service.num}
          </span>
          <div
            style={{
              width: 1,
              height: 24,
              backgroundColor: "rgba(var(--gold-rgb),0.3)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.1rem",
              fontWeight: 300,
              color: "var(--cream)",
              letterSpacing: "0.06em",
            }}
          >
            {service.title}
          </span>
        </div>
      </motion.div>

      {/* EXPANDED: bottom-anchored content */}
      <motion.div
        className="service-panel-expanded"
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
        transition={{ duration: 0.45, delay: isActive ? 0.22 : 0 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "2.5rem",
          zIndex: 3,
          pointerEvents: isActive ? "auto" : "none",
        }}
      >
        <div
          style={{
            width: 28,
            height: 1,
            backgroundColor: "var(--gold)",
            opacity: 0.55,
            marginBottom: "1.1rem",
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "var(--gold)",
            marginBottom: "0.5rem",
          }}
        >
          {service.num} · {service.sub}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.75rem, 2.4vw, 2.5rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--cream)",
            lineHeight: 1.1,
            marginBottom: "0.85rem",
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.78rem",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "rgba(var(--cream-rgb),0.62)",
            marginBottom: "1.4rem",
            maxWidth: "36ch",
          }}
        >
          {service.desc}
        </p>
        <motion.a
          href="#contact"
          whileHover={{ gap: "1.2rem" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.52rem",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "var(--gold)",
            textDecoration: "none",
          }}
        >
          <span>Demander un devis</span>
          <ArrowRight size={11} />
        </motion.a>
      </motion.div>

      {/* Corner accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 22,
          height: 1,
          backgroundColor: "var(--gold)",
          opacity: isActive ? 0.5 : 0.18,
          transition: "opacity 0.55s ease",
          zIndex: 4,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 1,
          height: 22,
          backgroundColor: "var(--gold)",
          opacity: isActive ? 0.5 : 0.18,
          transition: "opacity 0.55s ease",
          zIndex: 4,
        }}
      />
    </div>
  );
}

function ServicesSection() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduce = useReducedMotion();

  return (
    <section
      id="services"
      aria-label="Nos prestations"
      style={{ backgroundColor: "var(--cream)", padding: "7rem 0 0" }}
    >
      {/* Header */}
      <div
        style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 2rem 4rem" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <RevealOnScroll variant={fadeUp}>
              <Eyebrow>Nos Prestations</Eyebrow>
            </RevealOnScroll>
            <HeadingReveal delay={0.08}>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  color: "var(--charcoal)",
                }}
              >
                Le bon format
                <br />
                pour votre moment.
              </h2>
            </HeadingReveal>
          </div>
          <RevealOnScroll variant={fadeIn} custom={2}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.82rem",
                fontWeight: 300,
                color: "var(--warm-gray)",
                maxWidth: 340,
                lineHeight: 1.8,
              }}
            >
              Pas de formule plaquée: le service, les quantités et le rythme
              s&apos;adaptent au lieu, à la météo et au style de vos invités.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Accordion panels — full-width */}
      <motion.div
        ref={ref}
        initial={reduce ? false : { opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease }}
        className="services-accordion"
        style={{
          display: "flex",
          height: "clamp(460px, 60vh, 680px)",
          overflow: "hidden",
        }}
      >
        {services.map((s, i) => (
          <ServicePanel
            key={s.num}
            service={s}
            index={i}
            isActive={active === i}
            onActivate={() => setActive(i)}
          />
        ))}
      </motion.div>

      <div
        className="service-rhythm"
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: "clamp(4rem, 6vw, 6rem) 2rem clamp(4.5rem, 7vw, 7rem)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.42fr) minmax(0, 0.58fr)",
          gap: "4rem",
          alignItems: "start",
        }}
      >
        <RevealOnScroll variant={fadeUp}>
          <div>
            <Eyebrow>Le déroulé</Eyebrow>
            <h3
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.3rem, 4.6vw, 4.2rem)",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1,
                color: "var(--charcoal)",
                marginTop: "1rem",
              }}
            >
              Une équipe qui sait quand apparaître.
            </h3>
          </div>
        </RevealOnScroll>
        <div style={{ borderTop: "1px solid rgba(var(--charcoal-rgb),0.13)" }}>
          {[
            ["Repérage", "Lieu, accès, cuisine, météo, contraintes du domaine."],
            ["Calage", "Quantités, timing, allergies, mobilier et équipe de salle."],
            ["Service", "Cocktail, repas, transitions, dernières assiettes."],
            ["Après", "Brunch, retour de matériel, fin propre et sans tension."],
          ].map(([title, desc], i) => (
            <RevealOnScroll key={title} variant={fadeUp} custom={i}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "5rem minmax(0, 0.36fr) minmax(0, 1fr)",
                  gap: "1.4rem",
                  padding: "1.35rem 0",
                  borderBottom: "1px solid rgba(var(--charcoal-rgb),0.1)",
                  alignItems: "baseline",
                }}
                className="service-rhythm-row"
              >
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.45rem",
                    fontStyle: "italic",
                    color: "var(--gold)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--charcoal)",
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.86rem",
                    lineHeight: 1.75,
                    color: "rgba(var(--charcoal-rgb),0.58)",
                  }}
                >
                  {desc}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .service-rhythm {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .service-rhythm-row {
            grid-template-columns: 3rem 1fr !important;
            gap: 0.75rem 1rem !important;
          }
          .service-rhythm-row p:last-child {
            grid-column: 2 !important;
          }
          .services-accordion {
            flex-direction: column !important;
            height: auto !important;
          }
          .service-panel {
            flex: none !important;
            height: 72px !important;
            min-height: 72px !important;
            transition: height 0.55s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .service-panel[data-active="true"] {
            height: 340px !important;
          }
          .service-panel-collapsed {
            display: flex !important;
          }
          .service-panel[data-active="true"] .service-panel-collapsed {
            opacity: 0 !important;
            pointer-events: none !important;
          }
          .service-panel[data-active="true"] .service-panel-expanded {
            opacity: 1 !important;
            pointer-events: auto !important;
          }
          .service-panel .service-panel-collapsed > div {
            transform: none !important;
            flex-direction: row !important;
            gap: 0.75rem !important;
          }
          .service-panel .service-panel-collapsed > div > div {
            width: 24px !important;
            height: 1px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   FORMULAS — waterfall asymmetric layout
════════════════════════════════════════════════════════════ */
const formulasByTab = {
  mariage: [
    {
      name: "Mariage buffet campagne",
      price: "à partir de 75",
      unit: "€ / pers.",
      sub: "Ouverture des festivités",
      tone: "Pour une réception détendue, généreuse, facile à faire vivre.",
      detail: "Buffet froid et chaud pensé pour circuler, discuter, revenir.",
      features: [
        "Devis sur mesure",
        "Tarifs hors boissons, matériel, transport et mobilier",
      ],
      highlight: false,
      offset: true,
    },
    {
      name: "Mariage gourmand",
      price: "à partir de 99",
      unit: "€ / pers.",
      sub: "Terroir & convivialité",
      tone: "Le format le plus complet pour marquer le repas sans rigidité.",
      detail: "Pièces cocktails, service cadencé et table gourmande.",
      features: [
        "Devis sur mesure",
        "Tarifs hors boissons, matériel, transport et mobilier",
      ],
      highlight: true,
      offset: false,
    },
    {
      name: "Mariage buffet champêtre",
      price: "à partir de 85",
      unit: "€ / pers.",
      sub: "La gourmandise locale",
      tone: "Une formule vivante, chaleureuse, très adaptée aux grands groupes.",
      detail: "Produits de saison, présentation soignée, service fluide.",
      features: [
        "Devis sur mesure",
        "Tarifs hors boissons, matériel, transport et mobilier",
      ],
      highlight: false,
      offset: true,
    },
  ],
  chef: [
    {
      name: "Menu Découverte",
      price: "à partir de 55",
      unit: "€ / pers.",
      sub: "Dîner en 3 services",
      tone: "Une première expérience à domicile, claire et élégante.",
      detail: "Entrée, plat, dessert, produits locaux et inspiration du moment.",
      features: [
        "Entrée, plat, dessert",
        "Devis sur mesure",
        "Produits locaux et saisonniers",
        "Inspiration du chef",
      ],
      highlight: false,
      offset: true,
    },
    {
      name: "Menu Prestige",
      price: "125",
      unit: "€ / pers.",
      sub: "Expérience complète",
      tone: "Un dîner plus construit, pensé comme une vraie séquence.",
      detail: "Rythme, dressage, produits choisis et accord mets & vins possible.",
      features: [
        "Devis sur mesure",
        "Produits locaux et saisonniers",
        "Inspiration du chef",
        "Accord mets & vins en option",
      ],
      highlight: true,
      offset: false,
    },
    {
      name: "Menu Sur Mesure",
      price: "Sur devis",
      unit: "",
      sub: "Entièrement personnalisé",
      tone: "Pour les envies précises, les contraintes, les moments rares.",
      detail: "Nombre de services libre, menu créé après échange.",
      features: [
        "Consultation préalable",
        "Menu créé sur demande",
        "Nombre de services libre",
        "Intolérances & régimes pris en compte",
      ],
      highlight: false,
      offset: true,
    },
  ],
  pavillon: [
    {
      name: "Table d'Hôtes",
      price: "59",
      unit: "€ / pers.",
      sub: "Repas du soir",
      tone: "Une table conviviale dans le cadre du Pavillon des Millésimes.",
      detail: "Cuisine bistronomique en quatre temps, réservation obligatoire.",
      features: [
        "Cuisine bistronomique gourmande",
        "En 4 services (3 pièces apéritifs + 1 entrée + 1 plat + 1 dessert)",
        "Hors boissons",
        "Cadre d'exception",
        "Réservation obligatoire",
      ],
      highlight: false,
      offset: true,
    },
  ],
} as const;

type TabKey = keyof typeof formulasByTab;
const TABS: { key: TabKey; label: string }[] = [
  { key: "mariage", label: "Mariage" },
  { key: "chef", label: "Chef à Domicile" },
  { key: "pavillon", label: "Pavillon des Millésimes" },
];

function FormulaRow({
  f,
  index,
}: {
  f: (typeof formulasByTab)[TabKey][number];
  index: number;
}) {
  return (
    <motion.article
      className="formula-row"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      whileHover={{
        y: -2,
        backgroundColor: "rgba(var(--gold-rgb),0.055)",
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 22,
        delay: index * 0.04,
      }}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        gap: "2rem",
        padding: "1.8rem 0",
        borderTop: "1px solid rgba(var(--charcoal-rgb),0.12)",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.7rem",
          }}
        >
          <span
            style={{
              width: f.highlight ? 28 : 16,
              height: 1,
              backgroundColor: "var(--gold)",
              opacity: f.highlight ? 1 : 0.45,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: f.highlight
                ? "var(--gold)"
                : "rgba(var(--charcoal-rgb),0.44)",
            }}
          >
            {f.highlight ? "Recommandé" : f.sub}
          </p>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.9rem, 3vw, 2.75rem)",
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: 1,
            marginBottom: "0.75rem",
            color: "var(--charcoal)",
            letterSpacing: 0,
          }}
        >
          {f.name}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.86rem",
            fontWeight: 300,
            color: "rgba(var(--charcoal-rgb),0.62)",
            lineHeight: 1.75,
            maxWidth: 560,
          }}
        >
          {f.tone}
        </p>

        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.76rem",
            fontWeight: 400,
            color: "rgba(var(--charcoal-rgb),0.48)",
            lineHeight: 1.65,
            maxWidth: 560,
            marginTop: "0.55rem",
          }}
        >
          {f.detail}
        </p>

        <div
          className="formula-tags"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.45rem",
            marginTop: "1rem",
          }}
        >
          {f.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid rgba(var(--charcoal-rgb),0.1)",
                padding: "0.42rem 0.6rem",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.56rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(var(--charcoal-rgb),0.52)",
                backgroundColor: f.highlight
                  ? "rgba(var(--bronze-rgb),0.07)"
                  : "rgba(var(--cream-rgb),0.36)",
              }}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div
        className="formula-row-price"
        style={{
          display: "grid",
          justifyItems: "end",
          alignContent: "center",
          minWidth: 172,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: f.unit ? "clamp(2.1rem, 3.5vw, 3.2rem)" : "1.8rem",
              fontStyle: f.unit ? "normal" : "italic",
              fontWeight: 300,
              lineHeight: 0.9,
              color: f.highlight ? "var(--gold)" : "var(--charcoal)",
              whiteSpace: "nowrap",
            }}
          >
            {f.price}
          </span>
          {f.unit && (
            <span
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.64rem",
                fontWeight: 300,
                color: "rgba(var(--charcoal-rgb),0.46)",
                whiteSpace: "nowrap",
              }}
            >
              {f.unit}
            </span>
          )}
        </div>
        <p
          style={{
            marginTop: "0.55rem",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(var(--charcoal-rgb),0.38)",
          }}
        >
          {f.sub}
        </p>
      </div>
    </motion.article>
  );
}

function FormulasSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("mariage");
  const currentFormulas = formulasByTab[activeTab];
  const activeLabel = TABS.find((tab) => tab.key === activeTab)?.label ?? "";

  return (
    <section
      id="formules"
      className="section-pad formulas-section"
      aria-label="Nos formules et tarifs"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--cream)",
        padding: "7.5rem 0",
      }}
    >
      <div
        className="formulas-shell"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
        }}
      >
        <div
          className="formulas-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.82fr) minmax(300px, 0.42fr)",
            gap: "4rem",
            alignItems: "end",
            marginBottom: "4rem",
          }}
        >
          <div>
            <RevealOnScroll variant={fadeUp}>
              <Eyebrow>Tarifs 2026-27</Eyebrow>
            </RevealOnScroll>
            <HeadingReveal delay={0.08}>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(3rem, 6vw, 5.6rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 0.95,
                  color: "var(--charcoal)",
                  letterSpacing: 0,
                  marginTop: "1rem",
                }}
              >
                Des bases claires
                <br />
                pour décider sereinement.
              </h2>
            </HeadingReveal>

            <RevealOnScroll variant={fadeUp} custom={2}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 300,
                  color: "rgba(var(--charcoal-rgb),0.62)",
                  marginTop: "1.4rem",
                  lineHeight: 1.85,
                  maxWidth: 520,
                }}
              >
                Les prix donnent un point de départ. Le devis affine ensuite le
                menu, l&apos;équipe, le matériel et le rythme réel de votre journée.
              </p>
            </RevealOnScroll>
          </div>

          <div
            className="formula-tabs"
            role="tablist"
            aria-label="Catégories de formules"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.35rem",
              borderBottom: "1px solid rgba(var(--charcoal-rgb),0.12)",
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    position: "relative",
                    padding: "0 0.9rem 1rem",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: isActive ? "var(--charcoal)" : "rgba(var(--charcoal-rgb),0.42)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {tab.label}
                  {isActive && (
                    <motion.span
                      layoutId="formula-tab-line"
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: "0.9rem",
                        right: "0.9rem",
                        bottom: -1,
                        height: 1,
                        backgroundColor: "var(--gold)",
                      }}
                      transition={{ type: "spring", stiffness: 280, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="formulas-board">
          <div
            className="formula-list-header"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1rem",
              alignItems: "end",
              marginBottom: "0.5rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "2rem",
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--charcoal)",
                lineHeight: 1,
              }}
            >
              {activeLabel}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(var(--charcoal-rgb),0.42)",
              }}
            >
              Sur mesure
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} className="formula-grid" style={{ display: "grid" }}>
              {currentFormulas.map((formula, index) => (
                <FormulaRow key={formula.name} f={formula} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          <div
            className="formula-footer"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1.5rem",
              alignItems: "center",
              paddingTop: "1.6rem",
              borderTop: "1px solid rgba(var(--charcoal-rgb),0.12)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.78rem",
                lineHeight: 1.7,
                color: "rgba(var(--charcoal-rgb),0.54)",
                maxWidth: 600,
              }}
            >
              Les tarifs sont indicatifs et hors boissons, transport, matériel
              et mobilier sauf mention contraire.
            </p>
            <motion.a
              className="formula-cta"
              href="#contact"
              whileHover={{ gap: "1rem" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "var(--gold)",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <span>Demander un devis</span>
              <ArrowRight size={13} />
            </motion.a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .formulas-section {
            padding-top: 4.5rem !important;
            padding-bottom: 4.5rem !important;
          }
          .formulas-shell {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .formulas-layout,
          .formula-list-header,
          .formula-footer {
            grid-template-columns: 1fr !important;
          }
          .formulas-layout {
            gap: 2rem !important;
            margin-bottom: 2.5rem !important;
          }
          .formula-tabs {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            justify-content: stretch !important;
            border-top: 1px solid rgba(var(--charcoal-rgb),0.12);
          }
          .formula-tabs button {
            width: 100% !important;
            padding: 0.85rem 0 !important;
            text-align: left !important;
            border-bottom: 1px solid rgba(var(--charcoal-rgb),0.08) !important;
          }
          .formula-tabs button span {
            left: 0 !important;
            right: auto !important;
            width: 4rem !important;
          }
          .formula-row-price {
            justify-items: start !important;
            min-width: 0 !important;
          }
          .formula-grid article {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .formula-row {
            padding: 1.55rem 0 !important;
          }
          .formula-row-price {
            align-content: start !important;
          }
          .formula-row-price > div {
            gap: 0.28rem !important;
          }
          .formula-row-price > div > span:first-child {
            font-size: clamp(2rem, 10vw, 2.45rem) !important;
          }
          .formula-footer {
            gap: 1rem !important;
            align-items: flex-start !important;
          }
          .formula-cta {
            padding-top: 0.2rem !important;
          }
        }

        @media (max-width: 430px) {
          .formulas-section h2 {
            font-size: 2.75rem !important;
            letter-spacing: 0 !important;
          }
          .formula-list-header {
            gap: 0.45rem !important;
          }
          .formula-list-header h3 {
            font-size: 1.8rem !important;
          }
          .formula-tabs button {
            font-size: 0.56rem !important;
            letter-spacing: 0.18em !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1100px) {
          .formulas-layout {
            grid-template-columns: 1fr !important;
          }
          .formula-tabs {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   GALLERY — editorial masonry grid
════════════════════════════════════════════════════════════ */
const galleryItems = [
  {
    src: "/20260212_DSC2967.jpg",
    alt: "Réalisation culinaire",
    title: "Bouchées signature",
    note: "Précision froide, dressage minute",
    w: 3856,
    h: 5784,
    position: "center 30%",
  },
  {
    src: "/AdobeStock_122383063.jpeg",
    alt: "Art de la table",
    title: "Tables en scène",
    note: "Mise en place, lumière, rythme",
    w: 1920,
    h: 1280,
    position: "center center",
  },
  {
    src: "/20260212_DSC3156.jpg",
    alt: "Chef David Chambaud",
    title: "Assiette composée",
    note: "Équilibre, relief, saison",
    w: 3905,
    h: 5858,
    position: "center 20%",
  },
  {
    src: "/20260212_DSC3130.jpg",
    alt: "Réception événementielle",
    title: "Service en mouvement",
    note: "Le geste juste, au bon moment",
    w: 6048,
    h: 4032,
    position: "center center",
  },
  {
    src: "/20260212_DSC3037.jpg",
    alt: "Création culinaire sur mesure",
    title: "Pièce graphique",
    note: "Contraste, texture, longueur en bouche",
    w: 4032,
    h: 6048,
    position: "center 25%",
  },
  {
    src: "/AdobeStock_192102309.jpeg",
    alt: "Dressage gastronomique",
    title: "Dressage gastronomique",
    note: "Un point focal, aucune distraction",
    w: 1920,
    h: 1280,
    position: "center center",
  },
  {
    src: "/AdobeStock_91548526.jpeg",
    alt: "Buffet d'exception",
    title: "Buffet d'exception",
    note: "Abondance lisible, détails soignés",
    w: 1920,
    h: 1280,
    position: "center center",
  },
  {
    src: "/20260212_DSC3049.jpg",
    alt: "Buffet gastronomique",
    title: "Table d'accueil",
    note: "Une arrivée qui donne le ton",
    w: 5612,
    h: 3741,
    position: "center center",
  },
  {
    src: "/20260212_DSC3157.jpg",
    alt: "Dîner privé",
    title: "Dîner privé",
    note: "Intime, net, sans ostentation",
    w: 6048,
    h: 4032,
    position: "center center",
  },
];

function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const total = galleryItems.length;
  const active = galleryItems[current];
  const prevItem = galleryItems[(current - 1 + total) % total];
  const nextItem = galleryItems[(current + 1) % total];

  const goTo = (index: number) => {
    const next = ((index % total) + total) % total;
    if (next === current) return;
    const forward = next > current ? next - current : next + total - current;
    const backward = current > next ? current - next : current + total - next;
    setDirection(forward <= backward ? 1 : -1);
    setCurrent(next);
  };
  const goPrev = () => goTo(current - 1);
  const goNext = () => goTo(current + 1);

  const slideVariants = {
    enter: (dir: number) => ({
      x: reduce ? 0 : dir * 110,
      opacity: 0,
      scale: reduce ? 1 : 0.96,
      rotate: reduce ? 0 : dir * 1.5,
    }),
    center: { x: 0, opacity: 1, scale: 1, rotate: 0 },
    exit: (dir: number) => ({
      x: reduce ? 0 : dir * -90,
      opacity: 0,
      scale: reduce ? 1 : 0.97,
      rotate: reduce ? 0 : dir * -1.2,
    }),
  };

  return (
    <section
      id="galerie"
      className="grain-overlay section-pad gallery-section"
      aria-label="Nos réalisations"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 78% 28%, rgba(var(--gold-rgb),0.13), transparent 30%), linear-gradient(135deg, #2a2820 0%, #4d5944 54%, #2a2820 100%)",
        padding: "7rem 0 7.5rem",
      }}
    >
      <motion.div
        aria-hidden
        key={`glow-${current}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: reduce ? 0.08 : 0.16 }}
        transition={{ duration: 0.7, ease }}
        style={{
          position: "absolute",
          inset: "12% -8% auto auto",
          width: "42rem",
          height: "30rem",
          filter: "blur(58px)",
          transform: "translateZ(0)",
          pointerEvents: "none",
        }}
      >
        <Image
          src={active.src}
          alt=""
          fill
          sizes="42rem"
          style={{ objectFit: "cover", objectPosition: active.position }}
        />
      </motion.div>

      <div
        className="gallery-shell"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
        }}
      >
        <div
          className="gallery-header"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.92fr) minmax(260px, 0.42fr)",
            alignItems: "end",
            gap: "3rem",
            marginBottom: "3.75rem",
          }}
        >
          <div>
            <RevealOnScroll variant={fadeUp}>
              <Eyebrow light>Nos Réalisations</Eyebrow>
            </RevealOnScroll>
            <HeadingReveal delay={0.06}>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(3rem, 7vw, 6.8rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 0.92,
                  color: "var(--cream)",
                  letterSpacing: 0,
                }}
              >
                Des images qui
                <br />
                donnent faim.
              </h2>
            </HeadingReveal>
          </div>
          <RevealOnScroll variant={fadeIn} custom={2}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.95rem",
                fontWeight: 400,
                color: "rgba(var(--cream-rgb),0.68)",
                maxWidth: 360,
                lineHeight: 1.85,
              }}
            >
              Une galerie vivante, entre gestes de service, dressages nets et
              tables prêtes à recevoir.
            </p>
          </RevealOnScroll>
        </div>

        <div
          className="gallery-experience"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(210px, 0.28fr) minmax(0, 1fr)",
            gap: "3.5rem",
            alignItems: "stretch",
          }}
        >
          <div
            className="gallery-rail"
            style={{
              display: "grid",
              alignContent: "space-between",
              gap: "2.5rem",
              padding: "0.8rem 0 0.6rem",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.65rem",
                  marginBottom: "1.35rem",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current}
                    initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                    transition={{ duration: 0.45, ease }}
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "clamp(4.25rem, 8vw, 7rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      lineHeight: 0.82,
                      color: "var(--gold)",
                      letterSpacing: 0,
                    }}
                  >
                    {String(current + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(var(--cream-rgb),0.28)",
                  }}
                >
                  sur {String(total).padStart(2, "0")}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${current}`}
                  initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                  transition={{ duration: 0.42, ease }}
                  style={{ minHeight: 142 }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(var(--gold-rgb),0.72)",
                      marginBottom: "0.95rem",
                    }}
                  >
                    {active.note}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontStyle: "italic",
                      fontWeight: 300,
                      color: "var(--cream)",
                      lineHeight: 1.02,
                      letterSpacing: 0,
                    }}
                  >
                    {active.title}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>

            <div style={{ display: "grid", gap: "1.4rem" }}>
              <div
                aria-hidden
                style={{
                  position: "relative",
                  height: 2,
                  overflow: "hidden",
                  backgroundColor: "rgba(var(--cream-rgb),0.08)",
                }}
              >
                <motion.div
                  animate={{ scaleX: (current + 1) / total }}
                  transition={{ type: "spring", stiffness: 120, damping: 22 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "var(--gold)",
                    transformOrigin: "left",
                  }}
                />
              </div>

              <div
                className="gallery-controls"
                style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
              >
                <motion.button
                  type="button"
                  onClick={goPrev}
                  aria-label="Voir la photo precedente"
                  whileHover={{
                    borderColor: "var(--gold)",
                    color: "var(--gold)",
                    x: reduce ? 0 : -2,
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    border: "1px solid rgba(var(--gold-rgb),0.22)",
                    backgroundColor: "rgba(var(--cream-rgb),0.03)",
                    color: "var(--cream)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <ArrowLeft size={16} strokeWidth={1.5} />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={goNext}
                  aria-label="Voir la photo suivante"
                  whileHover={{
                    borderColor: "var(--gold)",
                    color: "var(--gold)",
                    x: reduce ? 0 : 2,
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    border: "1px solid rgba(var(--gold-rgb),0.22)",
                    backgroundColor: "rgba(var(--cream-rgb),0.03)",
                    color: "var(--cream)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <ArrowRight size={16} strokeWidth={1.5} />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="gallery-stage" style={{ position: "relative", minHeight: 650 }}>
            {[
              { item: prevItem, side: "left", index: current - 1 },
              { item: nextItem, side: "right", index: current + 1 },
            ].map(({ item, side, index }) => (
              <motion.button
                key={`${side}-${item.src}`}
                type="button"
                onClick={() => goTo(index)}
                aria-label={
                  side === "left"
                    ? "Voir la photo precedente"
                    : "Voir la photo suivante"
                }
                className="gallery-peek"
                initial={false}
                animate={{
                  opacity: reduce ? 0.42 : 0.58,
                  x: side === "left" ? "-7%" : "7%",
                  rotate: side === "left" ? -4 : 4,
                  scale: 0.88,
                }}
                whileHover={{
                  opacity: 0.82,
                  scale: 0.91,
                  x: side === "left" ? "-9%" : "9%",
                }}
                transition={{ type: "spring", stiffness: 110, damping: 22 }}
                style={{
                  position: "absolute",
                  top: "15%",
                  bottom: "15%",
                  [side]: "-5%",
                  width: "24%",
                  border: 0,
                  padding: 0,
                  background: "transparent",
                  overflow: "hidden",
                  cursor: "pointer",
                  filter: "saturate(0.72)",
                }}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="18vw"
                  style={{ objectFit: "cover", objectPosition: item.position }}
                />
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(var(--dark-rgb),0.18), rgba(var(--dark-rgb),0.62))",
                    border: "1px solid rgba(var(--cream-rgb),0.11)",
                  }}
                />
              </motion.button>
            ))}

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.52, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) goNext();
                  else if (info.offset.x > 60) goPrev();
                }}
                whileDrag={{ cursor: "grabbing" }}
                style={{
                  position: "absolute",
                  inset: "0 8%",
                  overflow: "hidden",
                  cursor: "grab",
                  boxShadow: "0 34px 90px -42px rgba(var(--dark-rgb),0.76)",
                }}
              >
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: active.position,
                    pointerEvents: "none",
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 76vw, 920px"
                  priority={current === 0}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(var(--dark-rgb),0.58) 0%, rgba(var(--dark-rgb),0.04) 46%), linear-gradient(110deg, rgba(var(--dark-rgb),0.24), transparent 34%, rgba(var(--gold-rgb),0.1))",
                    pointerEvents: "none",
                  }}
                />
                <div
                  className="gallery-caption-panel"
                  style={{
                    position: "absolute",
                    left: "clamp(1rem, 3vw, 2rem)",
                    right: "clamp(1rem, 3vw, 2rem)",
                    bottom: "clamp(1rem, 3vw, 2rem)",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "end",
                    gap: "1.5rem",
                    padding: "1.05rem 1.15rem",
                    backgroundColor: "rgba(var(--dark-rgb),0.45)",
                    border: "1px solid rgba(var(--cream-rgb),0.12)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.1), 0 22px 44px -30px rgba(var(--dark-rgb),0.7)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(var(--gold-rgb),0.82)",
                        marginBottom: "0.38rem",
                      }}
                    >
                      {active.alt}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "clamp(1.45rem, 2.6vw, 2.2rem)",
                        fontStyle: "italic",
                        fontWeight: 300,
                        lineHeight: 1,
                        color: "var(--cream)",
                      }}
                    >
                      {active.title}
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "rgba(var(--cream-rgb),0.48)",
                    }}
                  >
                    Glisser
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div
          className="gallery-footer"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "2rem",
            alignItems: "center",
            marginTop: "2.2rem",
          }}
        >
          <div
            className="gallery-thumbs"
            role="list"
            aria-label="Choisir une photo"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${total}, minmax(58px, 1fr))`,
              gap: "0.62rem",
            }}
          >
            {galleryItems.map((item, index) => (
              <motion.button
                key={item.src}
                type="button"
                role="listitem"
                aria-label={`Voir ${item.title}`}
                aria-current={index === current ? "true" : undefined}
                onClick={() => goTo(index)}
                whileHover={{ y: reduce ? 0 : -3 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  position: "relative",
                  aspectRatio: "5/3",
                  minWidth: 58,
                  overflow: "hidden",
                  border:
                    index === current
                      ? "1px solid rgba(var(--gold-rgb),0.85)"
                      : "1px solid rgba(var(--cream-rgb),0.1)",
                  background: "rgba(var(--cream-rgb),0.04)",
                  padding: 0,
                  cursor: "pointer",
                  opacity: index === current ? 1 : 0.54,
                }}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="120px"
                  style={{ objectFit: "cover", objectPosition: item.position }}
                />
                {index === current && (
                  <motion.span
                    layoutId="gallery-thumb-active"
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 3,
                      backgroundColor: "var(--gold)",
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <RevealOnScroll variant={fadeUp} custom={3}>
            <motion.a
              href="https://www.instagram.com/chambauddavid"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ gap: "1.2rem" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                textDecoration: "none",
              }}
            >
              <span>Voir plus sur Instagram</span>
              <ArrowRight size={13} />
            </motion.a>
          </RevealOnScroll>
        </div>
      </div>

      <style>{`
        .gallery-section::before {
          content: "";
          position: absolute;
          inset: auto 0 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(var(--gold-rgb),0.28), transparent);
        }

        @media (max-width: 768px) {
          .gallery-section {
            padding-top: 4rem !important;
            padding-bottom: 4.5rem !important;
          }
          .gallery-shell {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .gallery-header,
          .gallery-experience,
          .gallery-footer {
            grid-template-columns: 1fr !important;
          }
          .gallery-header {
            gap: 1.5rem !important;
            margin-bottom: 2.5rem !important;
          }
          .gallery-experience {
            gap: 2rem !important;
          }
          .gallery-rail {
            padding: 0 !important;
            gap: 1.5rem !important;
          }
          .gallery-stage {
            min-height: auto !important;
            aspect-ratio: 4 / 5;
          }
          .gallery-stage > div {
            inset: 0 !important;
          }
          .gallery-peek {
            display: none !important;
          }
          .gallery-caption-panel {
            grid-template-columns: 1fr !important;
          }
          .gallery-caption-panel > span {
            display: none !important;
          }
          .gallery-thumbs {
            display: flex !important;
            overflow-x: auto;
            padding-bottom: 0.45rem;
            scrollbar-width: none;
          }
          .gallery-thumbs::-webkit-scrollbar {
            display: none;
          }
          .gallery-thumbs button {
            width: 5.1rem;
            flex: 0 0 5.1rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1100px) {
          .gallery-header,
          .gallery-experience {
            grid-template-columns: 1fr !important;
          }
          .gallery-stage {
            min-height: 560px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   PAVILLON — atmospheric full-bleed with background text
════════════════════════════════════════════════════════════ */
function PavillonSection() {
  return (
    <section
      id="pavillon"
      className="grain-overlay section-pad pavillon-section"
      aria-label="Le Pavillon des Millésimes"
      style={{
        position: "relative",
        background:
          "linear-gradient(135deg, #2a2820 0%, #2a2820 48%, #4d5944 100%)",
        overflow: "hidden",
        padding: "clamp(5rem, 8vw, 8rem) 0",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "4%",
          left: "-0.04em",
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(7rem, 18vw, 16rem)",
          fontStyle: "italic",
          fontWeight: 300,
          lineHeight: 0.8,
          color: "rgba(var(--cream-rgb),0.035)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        Pavillon
      </div>
      <div
        className="pavillon-shell"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="pavillon-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.54fr) minmax(360px, 0.46fr)",
            gap: "clamp(3rem, 6vw, 6.5rem)",
            alignItems: "stretch",
          }}
        >
          <RevealOnScroll variant={fadeIn}>
            <div
              className="pavillon-gallery"
              style={{
                position: "relative",
                minHeight: "clamp(560px, 68vw, 760px)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "0 14% 12% 0",
                  overflow: "hidden",
                  backgroundColor: "var(--charcoal)",
                  boxShadow: "0 34px 86px -56px rgba(var(--dark-rgb),0.82)",
                }}
              >
                <Image
                  src="/Pavillon-49.jpg"
                  alt="Salon lumineux du Pavillon des Millésimes"
                  fill
                  sizes="(max-width: 768px) 100vw, 760px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(var(--dark-rgb),0.54), transparent 52%)",
                  }}
                />
              </div>

              <motion.div
                className="pavillon-portrait"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.85, ease }}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "16%",
                  width: "34%",
                  aspectRatio: "3 / 4",
                  overflow: "hidden",
                  border: "1px solid rgba(var(--cream-rgb),0.14)",
                  boxShadow: "0 30px 70px -48px rgba(var(--dark-rgb),0.9)",
                }}
              >
                <Image
                  src="/Pavillon-37.jpg"
                  alt="Chambre du Pavillon des Millésimes"
                  fill
                  sizes="(max-width: 768px) 36vw, 300px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </motion.div>

              <motion.div
                className="pavillon-table"
                initial={{ opacity: 0, x: -22, y: 18 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.12, ease }}
                style={{
                  position: "absolute",
                  left: "10%",
                  bottom: 0,
                  width: "42%",
                  aspectRatio: "4 / 3",
                  overflow: "hidden",
                  border: "1px solid rgba(var(--cream-rgb),0.14)",
                  boxShadow: "0 28px 64px -48px rgba(var(--dark-rgb),0.84)",
                }}
              >
                <Image
                  src="/Pavillon-70.jpg"
                  alt="Table dressée au Pavillon des Millésimes"
                  fill
                  sizes="(max-width: 768px) 48vw, 360px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </motion.div>

              <div
                className="pavillon-badge"
                style={{
                  position: "absolute",
                  right: "7%",
                  bottom: "7%",
                  width: "15rem",
                  padding: "1.05rem 1rem",
                  backgroundColor: "rgba(var(--dark-rgb),0.62)",
                  border: "1px solid rgba(var(--cream-rgb),0.13)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.1), 0 28px 58px -44px rgba(var(--dark-rgb),0.86)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.5rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Maison confidentielle
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.45rem",
                    fontStyle: "italic",
                    lineHeight: 1.12,
                    color: "var(--cream)",
                  }}
                >
                  Dormir sur place, dîner juste, repartir lentement.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <div
            className="pavillon-copy"
            style={{
              display: "grid",
              alignContent: "center",
              gap: "2rem",
              paddingTop: "1rem",
            }}
          >
            <RevealOnScroll variant={fadeUp}>
              <Eyebrow light>Le lieu de David &amp; Nathalie</Eyebrow>
            </RevealOnScroll>

            <HeadingReveal delay={0.08}>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(3.1rem, 6.4vw, 6rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 0.96,
                  color: "var(--cream)",
                  letterSpacing: 0,
                }}
              >
                Une parenthèse
                <br />
                où l&apos;on reste.
              </h2>
            </HeadingReveal>

            <RevealOnScroll variant={fadeUp} custom={2}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 400,
                  lineHeight: 1.9,
                  color: "rgba(var(--cream-rgb),0.66)",
                  maxWidth: 620,
                }}
              >
                Le Pavillon des Millésimes n&apos;est pas seulement une adresse
                à visiter. C&apos;est une maison où le repas, la chambre et le
                lendemain se répondent avec la même attention.
              </p>
            </RevealOnScroll>

            <RevealOnScroll variant={fadeUp} custom={3}>
              <div
                className="pavillon-points"
                style={{
                  display: "grid",
                  gap: 0,
                  borderTop: "1px solid rgba(var(--cream-rgb),0.14)",
                  borderBottom: "1px solid rgba(var(--cream-rgb),0.14)",
                }}
              >
                {[
                  [
                    "Table d'hôtes",
                    "Une cuisine bistronomique en quatre temps, pensée comme un dîner de maison très soigné.",
                  ],
                  [
                    "Chambres",
                    "Des espaces calmes pour prolonger un mariage, une escapade ou un week-end gourmand.",
                  ],
                  [
                    "Adresse",
                    "Une maison de caractère en Nouvelle-Aquitaine, entre intimité, vin et art de recevoir.",
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="pavillon-point"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(140px, 0.32fr) minmax(0, 1fr)",
                      gap: "1.4rem",
                      padding: "1.2rem 0",
                      borderBottom:
                        label === "Adresse"
                          ? "none"
                          : "1px solid rgba(var(--cream-rgb),0.1)",
                      alignItems: "baseline",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "0.58rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "0.86rem",
                        color: "rgba(var(--cream-rgb),0.62)",
                        lineHeight: 1.75,
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant={fadeUp} custom={4}>
              <div
                className="pavillon-actions"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1.2rem",
                }}
              >
                <motion.a
                  href="https://www.pavillon-des-millesimes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ gap: "1rem" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 160, damping: 18 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem 1.25rem",
                    border: "1px solid rgba(var(--bronze-rgb),0.72)",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    textDecoration: "none",
                    backgroundColor: "rgba(var(--bronze-rgb),0.08)",
                  }}
                >
                  <span>Découvrir le lieu</span>
                  <ArrowRight size={13} />
                </motion.a>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.74rem",
                    lineHeight: 1.65,
                    color: "rgba(var(--cream-rgb),0.42)",
                    maxWidth: 260,
                  }}
                >
                  Table d&apos;hôtes sur réservation, séjour et cuisine de
                  saison au même endroit.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        <RevealOnScroll variant={fadeUp} custom={5}>
          <div
            className="pavillon-strip"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.38fr) minmax(0, 0.62fr)",
              gap: "1rem",
              alignItems: "stretch",
              marginTop: "clamp(3rem, 6vw, 5rem)",
              borderTop: "1px solid rgba(var(--cream-rgb),0.12)",
              paddingTop: "1rem",
            }}
          >
            <div
              style={{
                display: "grid",
                alignContent: "space-between",
                gap: "1.5rem",
                padding: "1rem 0",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                Séjour gourmand
              </p>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(1.9rem, 3.2vw, 3rem)",
                  fontStyle: "italic",
                  lineHeight: 1.1,
                  color: "var(--cream)",
                  maxWidth: 420,
                }}
              >
                Quand le dîner devient le centre d&apos;un week-end.
              </p>
            </div>
            <div
              className="pavillon-strip-images"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "1rem",
              }}
            >
              {[
                ["/Pavillon-71.jpg", "Détail intérieur du Pavillon des Millésimes"],
                ["/Pavillon-73.jpg", "Salon et atmosphère du Pavillon des Millésimes"],
                ["/pavillon-facade.jpg", "Façade du Pavillon des Millésimes"],
              ].map(([src, alt]) => (
                <div
                  key={src}
                  style={{
                    position: "relative",
                    aspectRatio: "4 / 3",
                    overflow: "hidden",
                    backgroundColor: "rgba(var(--cream-rgb),0.06)",
                  }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 33vw, 260px"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pavillon-section {
            padding-top: 4.5rem !important;
            padding-bottom: 4.5rem !important;
          }
          .pavillon-shell {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .pavillon-layout,
          .pavillon-point,
          .pavillon-strip,
          .pavillon-strip-images {
            grid-template-columns: 1fr !important;
          }
          .pavillon-layout {
            gap: 2.5rem !important;
          }
          .pavillon-gallery {
            min-height: 480px !important;
          }
          .pavillon-portrait {
            width: 38% !important;
          }
          .pavillon-table {
            width: 50% !important;
            left: 0 !important;
          }
          .pavillon-badge {
            width: min(15rem, 72vw) !important;
            right: 0 !important;
          }
          .pavillon-actions {
            align-items: flex-start !important;
            flex-direction: column !important;
          }
          .pavillon-strip-images {
            gap: 0.75rem !important;
          }
        }

        @media (max-width: 430px) {
          .pavillon-section h2 {
            font-size: 2.72rem !important;
            letter-spacing: 0 !important;
          }
          .pavillon-section p {
            max-width: 100% !important;
          }
          .pavillon-point p:first-child {
            font-size: 0.52rem !important;
            letter-spacing: 0.18em !important;
          }
          .pavillon-gallery {
            min-height: 420px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   TESTIMONIALS — masonry grid with real reviews
════════════════════════════════════════════════════════════ */
const testimonials = [
  {
    quote:
      "Nous avons eu le plaisir de faire appel à David pour le cocktail, le dîner et le brunch de notre mariage et la surprise fut juste magnifique ! Le raffinement, le goût, le service, le professionnalisme… tout était au rendez-vous.",
    author: "Fatima-zahra H.",
    occasion: "Mariage · Cocktail, dîner & brunch",
    source: "site",
  },
  {
    quote:
      "David and his team did an incredible job for our wedding at Chateau Soulac. Every piece of food served was out of this world. I cannot recommend him highly enough.",
    author: "Erika D.",
    occasion: "Mariage · Château Soulac",
    source: "site",
  },
  {
    quote:
      "A unique experience and exceptional welcoming.",
    author: "Jeremy Enaud",
    occasion: "Pavillon des Millésimes · Août 2025",
    source: "tripadvisor",
  },
  {
    quote:
      "Tout simplement parfait. Équipe agréable à notre service qui a fait preuve de souplesse sur les menus particuliers (végétarien, intolérance, allergie). Nos invités étaient ravis.",
    author: "Anne-Laure B.",
    occasion: "Baptême · Chef à domicile",
    source: "site",
  },
  {
    quote:
      "We oscillate between luxury and voluptuousness with this feeling of being at home !",
    author: "Isa",
    occasion: "Pavillon des Millésimes · Mai 2025",
    source: "tripadvisor",
  },
  {
    quote:
      "Évènement organisé sur l'Aerocampus avec l'équipe de David. Une équipe hyper pro et dévouée ! Une prestation qui a ravi les papilles et qui nous a permis de vivre un moment convivial et gourmand.",
    author: "Yannick R.",
    occasion: "Séminaire · Aerocampus",
    source: "site",
  },
  {
    quote:
      "Beautiful home with a charming decor in a relaxing setting with very attentive hosts.",
    author: "Jean-luc S.",
    occasion: "Pavillon des Millésimes · Avril 2026",
    source: "tripadvisor",
  },
  {
    quote:
      "What a wonderful time we had. Thank you to Nathalie and David.",
    author: "Isabelle I.",
    occasion: "Pavillon des Millésimes · Août 2025",
    source: "tripadvisor",
  },
  {
    quote:
      "I couldn't recommend Pavillon more highly.",
    author: "James M.",
    occasion: "Pavillon des Millésimes · Mars 2025",
    source: "tripadvisor",
  },
];

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduce = useReducedMotion();
  const isTripadvisor = t.source === "tripadvisor";

  return (
    <motion.article
      className="testimonial-item"
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.04, ease }}
      style={{
        display: "grid",
        gap: "1.2rem",
        padding: "1.65rem 0 1.9rem",
        borderTop: "1px solid rgba(var(--gold-rgb),0.16)",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div aria-label="Note de cinq étoiles" style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} size={11} fill="var(--gold)" color="var(--gold)" />
          ))}
        </div>
        <span
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.46rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(var(--cream-rgb),0.38)",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {isTripadvisor ? "Tripadvisor" : "Avis vérifié"}
        </span>
      </div>

      <p
        className="testimonial-quote"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(1.35rem, 2.2vw, 2rem)",
          fontStyle: "italic",
          fontWeight: 300,
          lineHeight: 1.35,
          color: "rgba(var(--cream-rgb),0.86)",
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      <div
        className="testimonial-author"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <div
          style={{
            width: 18,
            height: 1,
            backgroundColor: "var(--gold)",
            opacity: 0.4,
            flexShrink: 0,
          }}
        />
        <div>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "rgba(var(--cream-rgb),0.86)",
            }}
          >
            {t.author}
          </p>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.52rem",
              letterSpacing: "0.1em",
              color: "rgba(var(--cream-rgb),0.34)",
              marginTop: "0.15rem",
            }}
          >
            {t.occasion}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function FeaturedTestimonial({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <RevealOnScroll variant={fadeUp}>
      <article
        className="testimonial-featured"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.62fr) minmax(240px, 0.38fr)",
          gap: "3rem",
          alignItems: "end",
          padding: "2.2rem 0 3rem",
          borderTop: "1px solid rgba(var(--bronze-rgb),0.22)",
          borderBottom: "1px solid rgba(var(--bronze-rgb),0.22)",
          marginBottom: "2.2rem",
        }}
      >
        <div>
          <div
            aria-label="Note de cinq étoiles"
            style={{ display: "flex", gap: 4, marginBottom: "1.4rem" }}
          >
            {Array.from({ length: 5 }).map((_, j) => (
              <Star key={j} size={13} fill="var(--gold)" color="var(--gold)" />
            ))}
          </div>
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(2rem, 4.2vw, 4rem)",
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1.12,
              color: "var(--cream)",
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            color: "rgba(var(--cream-rgb),0.58)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            Avis de réception
          </p>
          <div>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.76rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(var(--cream-rgb),0.86)",
                marginBottom: "0.3rem",
              }}
            >
              {t.author}
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.78rem",
                lineHeight: 1.7,
              }}
            >
              {t.occasion}
            </p>
          </div>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.82rem",
              lineHeight: 1.85,
              maxWidth: 320,
            }}
          >
            Le type de retour qui compte: pas seulement “bon”, mais fluide,
            généreux, rassurant et mémorable pour les invités.
          </p>
        </div>
      </article>
    </RevealOnScroll>
  );
}

function TestimonialsSection() {
  return (
    <section
      id="temoignages"
      className="section-pad testimonials-section"
      aria-label="Témoignages clients"
      style={{
        backgroundColor: "var(--dark)",
        padding: "7.5rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="testimonials-shell"
        style={{ maxWidth: 1240, margin: "0 auto", padding: "0 2rem" }}
      >
        <div
          className="testimonials-header"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.85fr) minmax(260px, 0.36fr)",
            gap: "4rem",
            alignItems: "end",
            marginBottom: "4rem",
          }}
        >
          <div>
            <RevealOnScroll variant={fadeUp}>
              <Eyebrow light>Ils nous font confiance</Eyebrow>
            </RevealOnScroll>
            <HeadingReveal delay={0.08}>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(3rem, 6vw, 5.6rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 0.95,
                  color: "var(--cream)",
                  letterSpacing: 0,
                }}
              >
                Quelques mots
                <br />
                après le service.
              </h2>
            </HeadingReveal>
          </div>
          <RevealOnScroll variant={fadeUp} custom={2}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.88rem",
                fontWeight: 300,
                lineHeight: 1.85,
                color: "rgba(var(--cream-rgb),0.58)",
                maxWidth: 360,
              }}
            >
              Mariages, séjours, baptêmes ou séminaires : des retours sobres,
              directs, et souvent très généreux.
            </p>
          </RevealOnScroll>
        </div>

        <FeaturedTestimonial t={testimonials[0]} />

        <div className="testimonials-grid">
          {testimonials.slice(1).map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>

        <RevealOnScroll variant={fadeUp} custom={2}>
          <div
            className="testimonials-footer"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1.5rem",
              alignItems: "center",
              paddingTop: "1.6rem",
              borderTop: "1px solid rgba(var(--gold-rgb),0.16)",
              marginTop: "1.6rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(var(--cream-rgb),0.34)",
              }}
            >
              Avis collectés sur Google, Tripadvisor &amp; site officiel
            </p>
            <motion.a
              href="#contact"
              whileHover={{ gap: "1rem" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <span>Échanger avec nous</span>
              <ArrowRight size={13} />
            </motion.a>
          </div>
        </RevealOnScroll>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: 4rem;
        }
        @media (max-width: 768px) {
          .testimonials-section {
            padding-top: 4.5rem !important;
            padding-bottom: 4.5rem !important;
          }
          .testimonials-shell {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .testimonials-header,
          .testimonials-grid,
          .testimonial-featured {
            grid-template-columns: 1fr !important;
          }
          .testimonials-header {
            gap: 1.5rem !important;
            margin-bottom: 2.5rem !important;
          }
          .testimonials-footer {
            align-items: flex-start !important;
            flex-direction: column !important;
          }
          .testimonial-item {
            gap: 1rem !important;
            padding: 1.45rem 0 1.65rem !important;
          }
          .testimonial-quote {
            font-size: clamp(1.18rem, 6.2vw, 1.45rem) !important;
            line-height: 1.42 !important;
          }
          .testimonial-author {
            align-items: flex-start !important;
          }
        }
        @media (max-width: 430px) {
          .testimonials-section h2 {
            font-size: 2.78rem !important;
            letter-spacing: 0 !important;
          }
          .testimonials-section {
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
          }
          .testimonials-header {
            margin-bottom: 2rem !important;
          }
          .testimonial-item > div:first-child span {
            font-size: 0.42rem !important;
            letter-spacing: 0.2em !important;
          }
          .testimonial-author p {
            word-break: normal !important;
            overflow-wrap: anywhere !important;
          }
          .testimonials-footer p {
            line-height: 1.7 !important;
            letter-spacing: 0.16em !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1050px) {
          .testimonials-header,
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CLIENTS — infinite logo carousel
════════════════════════════════════════════════════════════ */
const clientLogos = [
  { src: "/Chateau-le-Puy-Logo.webp", alt: "Château Le Puy" },
  {
    src: "/Logo_ChâteauLesCarmesHautBrion.jpg",
    alt: "Château Les Carmes Haut-Brion",
  },
  { src: "/chateau-faugeres-1998.jpg", alt: "Château Faugères" },
  {
    src: "/creation-de-logo-chateau-grand-arnaud-webmaster-graphiste-bordeaux_Plan-de-travail-3.jpg",
    alt: "Château Grand Arnaud",
  },
  { src: "/logo-chateau-de-seguin.jpg", alt: "Château de Seguin" },
  { src: "/francmayne_logo_cmjn.png", alt: "Franc Mayne" },
  { src: "/logo-montlabert-big.png", alt: "Château Montlabert" },
  { src: "/logo-laces-bordeaux.jpg", alt: "LACES Bordeaux" },
  {
    src: "/logo-societe-generale-seminaire-congres-incentive-inauguration-lancement-de-produit-agence-evenementielle-pays-basque-biarritz-saint-sebastien-bordeaux-pyrenees-erronda-800x800.png",
    alt: "Société Générale",
  },
  { src: "/Logo-Vinci-Energies-1.png", alt: "Vinci Energies" },
  { src: "/logo_societe_682268ef6b2a18e22.jpg", alt: "Partenaire" },
  { src: "/logo_societe_filiale_2506931484f8b947.png", alt: "Partenaire" },
  { src: "/Ville_de_Bordeaux_(logo).svg.png", alt: "Ville de Bordeaux" },
  { src: "/partenaires-entreprise-bordeaux25-png.webp", alt: "Bordeaux 2025" },
  { src: "/pape-clement.webp", alt: "Château Pape Clément" },
  { src: "/Logo-OK-1.png", alt: "Partenaire" },
];

function ClientsSection() {
  const doubled = [...clientLogos, ...clientLogos];

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
            <Eyebrow>Références</Eyebrow>
          </RevealOnScroll>
          <HeadingReveal delay={0.06}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.5rem, 5vw, 4.8rem)",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1,
                color: "var(--charcoal)",
              }}
            >
              Des lieux exigeants,
              <br />
              des repas remarqués.
            </h2>
          </HeadingReveal>
        </div>
        <RevealOnScroll variant={fadeUp} custom={2}>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.85,
              color: "rgba(var(--charcoal-rgb),0.62)",
              maxWidth: 460,
            }}
          >
            Châteaux, domaines viticoles, entreprises et institutions: le décor
            change, l&apos;exigence reste la même.
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
          {doubled.map((logo, i) => (
            <div
              key={i}
              style={{
                height: "96px",
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
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
          ))}
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
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CONTACT — split layout with animated form
════════════════════════════════════════════════════════════ */
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const nextErrors: Record<string, string> = {};
    const requiredFields = [
      ["name", "Indiquez votre nom."],
      ["email", "Indiquez une adresse email."],
      ["eventType", "Précisez le type d'événement."],
      ["message", "Ajoutez quelques mots sur votre demande."],
    ] as const;

    requiredFields.forEach(([field, message]) => {
      if (!String(formData.get(field) || "").trim()) {
        nextErrors[field] = message;
      }
    });

    const email = String(formData.get("email") || "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "L'adresse email semble incomplète.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitted(true);
    form.reset();
  };

  return (
    <section
      id="contact"
      className="section-pad contact-section"
      aria-label="Contact et demande de devis"
      style={{
        background:
          "linear-gradient(135deg, rgba(var(--cream-rgb),0.96) 0%, rgba(var(--cream-rgb),0.82) 28%, rgba(var(--sage-rgb),0.72) 68%, rgba(var(--olive-rgb),0.84) 100%)",
        padding: "7.5rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="contact-shell"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <div
          className="contact-grid"
          style={{
          display: "grid",
            gridTemplateColumns: "minmax(0, 0.78fr) minmax(360px, 0.72fr)",
            gap: "5rem",
          alignItems: "start",
          }}
        >
          <div className="contact-intro">
          <RevealOnScroll variant={fadeUp}>
              <Eyebrow>Contact</Eyebrow>
          </RevealOnScroll>
          <HeadingReveal delay={0.08}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(3rem, 6vw, 5.7rem)",
                fontStyle: "italic",
                fontWeight: 300,
                  lineHeight: 0.96,
                  color: "var(--charcoal)",
                  letterSpacing: 0,
                  marginTop: "1rem",
              }}
            >
                Une date,
              <br />
                un lieu, une envie.
            </h2>
          </HeadingReveal>

          <RevealOnScroll variant={fadeUp} custom={2}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.92rem",
                fontWeight: 300,
                  color: "rgba(var(--charcoal-rgb),0.64)",
                  lineHeight: 1.9,
                  maxWidth: 540,
                  marginTop: "1.5rem",
              }}
            >
                Racontez-nous l&apos;ambiance, le nombre d&apos;invités, vos goûts
                et ce qui compte le plus pour vous. David vous aide ensuite à
                transformer l&apos;idée en réception concrète.
            </p>
          </RevealOnScroll>

          <RevealOnScroll variant={fadeUp} custom={3}>
            <div
                className="contact-details"
              style={{
                  display: "grid",
                  gap: "1.15rem",
                  marginTop: "3rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(var(--charcoal-rgb),0.12)",
              }}
            >
              {[
                {
                  href: "tel:+33650754406",
                  icon: (
                      <Phone size={15} color="var(--gold)" strokeWidth={1.5} />
                  ),
                  label: "+33 6 50 75 44 06",
                    meta: "Téléphone",
                },
                {
                  href: "mailto:contact@david-chambaud.fr",
                  icon: (
                      <Mail size={15} color="var(--gold)" strokeWidth={1.5} />
                  ),
                  label: "contact@david-chambaud.fr",
                    meta: "Email",
                },
                {
                  href: "https://www.instagram.com/chambauddavid",
                  icon: <IconInstagram size={14} color="var(--gold)" />,
                  label: "@chambauddavid",
                    meta: "Instagram",
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
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 160, damping: 18 }}
                  style={{
                      display: "grid",
                      gridTemplateColumns: "1.8rem 1fr",
                      gap: "0.8rem",
                      alignItems: "center",
                      color: "var(--charcoal)",
                    textDecoration: "none",
                  }}
                >
                    <span aria-hidden>{item.icon}</span>
                    <span>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-montserrat), sans-serif",
                          fontSize: "0.54rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "rgba(var(--charcoal-rgb),0.44)",
                          marginBottom: "0.18rem",
                        }}
                      >
                        {item.meta}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-montserrat), sans-serif",
                          fontSize: "0.86rem",
                          color: "rgba(var(--charcoal-rgb),0.78)",
                        }}
                      >
                        {item.label}
                      </span>
                    </span>
                </motion.a>
              ))}
            </div>
          </RevealOnScroll>

            <RevealOnScroll variant={fadeUp} custom={4}>
            <div
                className="contact-note"
              style={{
                  marginTop: "3rem",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "1rem",
                  alignItems: "start",
                  color: "rgba(var(--charcoal-rgb),0.62)",
              }}
            >
              <div
                  aria-hidden
                style={{
                  width: 28,
                  height: 1,
                  backgroundColor: "var(--gold)",
                    marginTop: "0.65rem",
                }}
              />
                <p
                style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.78rem",
                    lineHeight: 1.75,
                    maxWidth: 430,
                }}
              >
                  Réponse généralement sous 24 à 48 h ouvrées. Pour un mariage
                  ou une demande proche, le téléphone reste le plus direct.
                </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant={fadeUp} custom={5}>
            <div
              className="contact-brief"
              style={{
                marginTop: "2.5rem",
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "0.75rem",
              }}
            >
              {[
                ["Le lieu", "Domaine, maison, salle ou lieu à confirmer."],
                ["Le rythme", "Cocktail, dîner, brunch, retour de soirée."],
                ["Les invités", "Nombre approximatif, enfants, régimes."],
                ["L'envie", "Champêtre, gastronomique, familial, très festif."],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  style={{
                    padding: "1rem",
                    border: "1px solid rgba(var(--charcoal-rgb),0.1)",
                    backgroundColor: "rgba(var(--cream-rgb),0.34)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.56rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      marginBottom: "0.45rem",
                    }}
                  >
                    {title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.76rem",
                      lineHeight: 1.55,
                      color: "rgba(var(--charcoal-rgb),0.58)",
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll variant={fadeUp} custom={1}>
            <div
              className="contact-form-panel"
              style={{
                background:
                  "linear-gradient(145deg, rgba(var(--charcoal-rgb),0.98) 0%, rgba(var(--olive-rgb),0.96) 100%)",
                border: "1px solid rgba(var(--gold-rgb),0.26)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 34px 90px -56px rgba(var(--charcoal-rgb),0.72)",
                padding: "2.15rem",
              }}
            >
              {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                    minHeight: 420,
                    display: "grid",
                    alignContent: "center",
                    justifyItems: "start",
                    gap: "1rem",
              }}
            >
              <div
                style={{
                      width: 42,
                      height: 1,
                      backgroundColor: "var(--gold)",
                }}
                  />
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                      fontSize: "2.15rem",
                  fontStyle: "italic",
                      color: "var(--cream)",
                      lineHeight: 1,
                }}
              >
                Message envoyé
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.82rem",
                  fontWeight: 300,
                      color: "rgba(var(--cream-rgb),0.62)",
                      lineHeight: 1.8,
                      maxWidth: 390,
                }}
              >
                David vous contactera dans les plus brefs délais pour discuter
                de votre événement.
              </p>
            </motion.div>
          ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                    className="contact-form-two"
                  >
                    <ContactField
                      label="Votre nom"
                      name="name"
                      error={errors.name}
                      required
                    />
                    <ContactField
                      label="Votre email"
                      name="email"
                      type="email"
                      error={errors.email}
                      required
                    />
                  </div>
                  <ContactField
                    label="Type d'événement"
                    name="eventType"
                    helper="Mariage, réception privée, dîner, séminaire..."
                    error={errors.eventType}
                    required
                  />
                  <ContactField
                    label="Lieu de réception"
                    name="location"
                    helper="Ville, domaine ou lieu encore à confirmer."
                  />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                    className="contact-form-two contact-form-compact"
                  >
                    <ContactField
                      label="Invités"
                      name="guests"
                      type="number"
                      helper="Une estimation suffit."
                    />
                    <ContactField
                      label="Date"
                      name="date"
                      type="text"
                      helper="Même approximative."
                    />
                  </div>
                  <ContactField
                    label="Votre message"
                    name="message"
                    textarea
                    helper="Le style du repas, vos contraintes, vos premières envies."
                    error={errors.message}
                    required
                  />

              <motion.button
                type="submit"
                    whileHover={{ backgroundColor: "var(--cream)", color: "var(--charcoal)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 160, damping: 18 }}
                style={{
                  width: "100%",
                  padding: "1.1rem",
                  backgroundColor: "var(--gold)",
                      color: "var(--charcoal)",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  border: "1px solid rgba(var(--gold-rgb),0.72)",
                      cursor: "pointer",
                      marginTop: "0.25rem",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.2), 0 16px 34px -28px rgba(var(--dark-rgb),0.76)",
                }}
              >
                Envoyer la demande
              </motion.button>
            </form>
          )}
            </div>
        </RevealOnScroll>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-section {
            padding-top: 4.5rem !important;
            padding-bottom: 4.5rem !important;
          }
          .contact-shell {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .contact-grid,
          .contact-form-two {
            grid-template-columns: 1fr !important;
          }
          .contact-form-compact {
            grid-template-columns: 1fr 1fr !important;
          }
          .contact-grid {
            gap: 2.5rem !important;
          }
          .contact-details {
            margin-top: 2.25rem !important;
          }
          .contact-note {
            margin-top: 2.25rem !important;
          }
          .contact-brief {
            grid-template-columns: 1fr !important;
            margin-top: 2rem !important;
          }
          .contact-form-panel {
            padding: 1.15rem !important;
          }
        }

        @media (max-width: 430px) {
          .contact-section h2 {
            font-size: 2.75rem !important;
            letter-spacing: 0 !important;
          }
          .contact-field input,
          .contact-field textarea {
            font-size: 0.84rem !important;
          }
          .contact-form {
            display: grid !important;
            gap: 0.15rem !important;
          }
        }

        @media (max-width: 360px) {
          .contact-form-compact {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--dark)",
        padding: "2.5rem 2rem",
        borderTop: "1px solid rgba(var(--gold-rgb),0.1)",
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
              fontWeight: 400,
              letterSpacing: "0.15em",
              color: "rgba(var(--cream-rgb),0.65)",
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
              color: "var(--warm-gray)",
              marginTop: "0.25rem",
            }}
          >
            Traiteur &amp; Chef à Domicile · Nouvelle-Aquitaine
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
              style={{ color: "var(--warm-gray)", display: "block" }}
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
            color: "var(--warm-gray)",
          }}
        >
          © 2026 DC Restauration &nbsp;·&nbsp;{" "}
          <a
            href="/mentions-legales"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Mentions légales
          </a>
        </p>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════ */
export default function Page() {
  return (
    <main>
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <ValuesSection />
      <StatsSection />
      <ClientsSection />
      <ServicesSection />
      <GallerySection />
      <FormulasSection />
      <PavillonSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
