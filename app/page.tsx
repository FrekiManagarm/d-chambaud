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
import {
  Phone,
  Globe,
  ChevronDown,
  Star,
  UtensilsCrossed,
  Heart,
  Home,
  TreePine,
  ArrowRight,
  MapPin,
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

const slideRight = {
  hidden: { opacity: 0, x: -60 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, delay: i * 0.12, ease },
  }),
};

const wipeLeft = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: (i = 0) => ({
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 1.0, delay: i * 0.12, ease },
  }),
};

/* ─── RevealOnScroll ─── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RevealOnScroll({
  children,
  variant = fadeUp,
  custom = 0,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  variant?: Record<string, any>;
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
        color: isGold ? "var(--dark)" : "rgba(250,250,247,0.7)",
        border: isGold ? "none" : "1px solid rgba(250,250,247,0.22)",
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

  useEffect(() => {
    if (!isInView) return;
    if (reduce) {
      setCount(value);
      return;
    }
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
        borderRight: border ? "1px solid rgba(196,166,97,0.12)" : "none",
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
        {count}
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
          color: "rgba(250,250,247,0.7)",
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

/* ─── FloatingInput ─── */
function FloatingInput({
  label,
  type = "text",
  multiline = false,
}: {
  label: string;
  type?: string;
  multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const lifted = focused || hasValue;
  const inputId = label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const sharedInputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused ? "rgba(196,166,97,0.6)" : "rgba(250,250,247,0.15)"}`,
    color: "var(--cream)",
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "0.88rem",
    fontWeight: 300,
    padding: "1.2rem 0 0.5rem",
    outline: "none",
    resize: "none",
    transition: "border-color 0.35s ease",
  };

  return (
    <div style={{ position: "relative", marginBottom: "2rem" }}>
      <label
        htmlFor={inputId}
        style={{
          position: "absolute",
          left: 0,
          top: lifted ? "0.1rem" : "1.2rem",
          fontSize: lifted ? "0.5rem" : "0.78rem",
          letterSpacing: lifted ? "0.32em" : "0.05em",
          textTransform: lifted ? "uppercase" : "none",
          color: focused ? "var(--gold)" : "rgba(250,250,247,0.35)",
          fontFamily: "var(--font-montserrat), sans-serif",
          fontWeight: lifted ? 500 : 300,
          transition: "all 0.3s ease",
          pointerEvents: "none",
        }}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={inputId}
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(!!e.target.value);
          }}
          onChange={(e) => setHasValue(!!e.target.value)}
          style={{ ...sharedInputStyle, paddingTop: "1.4rem" }}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(!!e.target.value);
          }}
          onChange={(e) => setHasValue(!!e.target.value)}
          style={sharedInputStyle}
        />
      )}

      <motion.div
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.35, ease }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: "var(--gold)",
          transformOrigin: "left",
        }}
      />
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
            color: "rgba(196,166,97,0.025)",
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
            "radial-gradient(circle, rgba(196,166,97,0.11) 0%, transparent 70%)",
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
            "radial-gradient(circle, rgba(196,166,97,0.07) 0%, transparent 70%)",
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
              "linear-gradient(to right, var(--dark) 0%, rgba(11,11,9,0.18) 42%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(11,11,9,0.44)",
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
              color: "rgba(250,250,247,0.28)",
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
            color: "rgba(250,250,247,0.75)",
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
            color: "rgba(250,250,247,0.6)",
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
            color: "rgba(250,250,247,0.25)",
          }}
        >
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <ChevronDown size={13} color="rgba(250,250,247,0.25)" />
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
  "Traiteur",
  "·",
  "Chef à Domicile",
  "·",
  "Mariages",
  "·",
  "Réceptions & Événements",
  "·",
  "Pavillon des Millésimes",
  "·",
  "Buffets Raffinés",
  "·",
  "Dîners Privés",
  "·",
  "Nouvelle‑Aquitaine",
  "·",
  "Traiteur",
  "·",
  "Chef à Domicile",
  "·",
  "Mariages",
  "·",
  "Réceptions & Événements",
  "·",
  "Pavillon des Millésimes",
  "·",
  "Buffets Raffinés",
  "·",
  "Dîners Privés",
  "·",
  "Nouvelle‑Aquitaine",
  "·",
];

function MarqueeStrip() {
  return (
    <div
      style={{
        backgroundColor: "var(--dark)",
        borderTop: "1px solid rgba(196,166,97,0.12)",
        borderBottom: "1px solid rgba(196,166,97,0.12)",
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
              color: item === "·" ? "var(--gold)" : "rgba(250,250,247,0.65)",
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
        borderBottom: "1px solid rgba(196,166,97,0.12)",
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
          color: "rgba(196,166,97,0.055)",
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
      aria-label="Notre philosophie"
      style={{ backgroundColor: "var(--cream)", paddingBottom: 0 }}
    >
      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "5rem 2rem 0" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "2rem",
            marginBottom: "3.5rem",
            flexWrap: "wrap",
          }}
        >
          <RevealOnScroll variant={fadeUp}>
            <Eyebrow>Notre Philosophie</Eyebrow>
          </RevealOnScroll>
        </div>
        <div style={{ borderTop: "1px solid rgba(196,166,97,0.18)" }}>
          <ValueBand
            num="01"
            title="Authenticité"
            desc="Des recettes ancrées dans les terroirs de Nouvelle-Aquitaine, sublimées par un savoir-faire contemporain qui respecte la mémoire des lieux et des saisons."
            index={0}
          />
          <ValueBand
            num="02"
            title="Convivialité"
            desc="Chaque repas est une invitation à partager un moment unique, chaleureux et inoubliable autour de la table — une parenthèse hors du temps."
            index={1}
          />
          <ValueBand
            num="03"
            title="Saisons & Terroir"
            desc="Un respect profond des produits frais de saison, pour des assiettes qui révèlent le goût dans toute sa vérité et sa générosité."
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
            backgroundColor: "rgba(11,11,9,0.28)",
          }}
        />
      </div>
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
      aria-label="Chiffres clés"
      style={{
        backgroundColor: "var(--dark)",
        position: "relative",
        overflow: "hidden",
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
            "radial-gradient(ellipse at center, rgba(196,166,97,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            borderTop: "1px solid rgba(196,166,97,0.1)",
            borderBottom: "1px solid rgba(196,166,97,0.1)",
          }}
          className="stats-grid"
        >
          <CountUpStat
            value={25}
            suffix="+"
            label="Années d'expérience"
            detail="Depuis 1990"
            delay={0}
            border
          />
          <CountUpStat
            value={500}
            suffix="+"
            label="Événements orchestrés"
            detail="Mariages, réceptions, séminaires"
            delay={0.12}
            border
          />
          <CountUpStat
            value={99}
            suffix="%"
            label="Clients satisfaits"
            detail="Recommandation & fidélité"
            delay={0.24}
            border={false}
          />
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .stats-grid > * { border-right: none !important; border-bottom: 1px solid rgba(196,166,97,0.1); }
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
                    "linear-gradient(to top, rgba(11,11,9,0.5) 0%, transparent 55%)",
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
              Chef traiteur à Bordeaux,
              <br />
              une passion à votre service
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
            "David Chambaud est un chef traiteur établi en Nouvelle-Aquitaine, spécialisé dans la création d'expériences culinaires sur mesure pour des événements privés et professionnels.",
            "Animé par une philosophie fondée sur l'authenticité, l'écoute et le respect des produits de saison, il compose des menus raffinés qui célèbrent la richesse du terroir aquitain.",
          ].map((para, i) => (
            <RevealOnScroll key={i} variant={fadeUp} custom={2 + i}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  lineHeight: 1.95,
                  color: "rgba(250,250,247,0.6)",
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
                « Chaque repas est une déclaration d'amour à la gastronomie
                française »
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
    sub: "Événements",
    desc: "Cocktails dinatoires, buffets raffinés et repas gastronomiques pour vos événements professionnels et privés de toutes tailles.",
    img: "/AdobeStock_418339639.jpeg",
  },
  {
    num: "02",
    Icon: Heart,
    title: "Mariages",
    sub: "Célébrations",
    desc: "Des mariages hors du commun — du cocktail de bienvenue au dîner de gala — orchestrés pour que ce jour reste gravé dans les mémoires.",
    img: "/AdobeStock_522340892.jpeg",
  },
  {
    num: "03",
    Icon: Home,
    title: "Chef à Domicile",
    sub: "Service Privé",
    desc: "Offrez-vous une expérience gastronomique dans l\'intimité de votre maison — un luxe discret pour des dîners confidentiels.",
    img: "/AdobeStock_54050217.jpeg",
  },
  {
    num: "04",
    Icon: TreePine,
    title: "Réceptions",
    sub: "Tous Événements",
    desc: "Séminaires, anniversaires, baptêmes, communions : David crée l\'ambiance parfaite et le menu idéal pour chaque occasion.",
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
            ? "rgba(11,11,9,0.50)"
            : "rgba(11,11,9,0.76)",
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
            backgroundColor: "rgba(196,166,97,0.18)",
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
              color: "rgba(196,166,97,0.65)",
              letterSpacing: "0.18em",
            }}
          >
            {service.num}
          </span>
          <div
            style={{
              width: 1,
              height: 24,
              backgroundColor: "rgba(196,166,97,0.3)",
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
            color: "rgba(250,250,247,0.62)",
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
                L&apos;Élégance
                <br />
                dans Chaque Détail
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
              Chaque prestation est conçue sur mesure, dans le respect de vos
              envies et de la saison.
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

      <style>{`
        @media (max-width: 768px) {
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

function FormulaCard({ f }: { f: (typeof formulasByTab)[TabKey][number] }) {
  return (
    <motion.div
      whileHover={{
        y: f.highlight ? -8 : -5,
        boxShadow: f.highlight
          ? "0 32px 80px rgba(0,0,0,0.5)"
          : "0 20px 50px rgba(0,0,0,0.3)",
      }}
      transition={{ duration: 0.4, ease }}
      style={{
        position: "relative",
        padding: "2.75rem",
        marginTop: f.offset ? "3rem" : 0,
        backgroundColor: f.highlight
          ? "var(--cream)"
          : "rgba(255,255,255,0.03)",
        border: f.highlight ? "none" : "1px solid rgba(196,166,97,0.12)",
        backdropFilter: f.highlight ? "none" : "blur(4px)",
      }}
    >
      {f.highlight && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "2.75rem",
            right: "2.75rem",
            height: 2,
            backgroundColor: "var(--gold)",
          }}
        />
      )}
      {f.highlight && (
        <div
          style={{
            position: "absolute",
            top: "-0.85rem",
            right: "2rem",
            backgroundColor: "var(--gold)",
            color: "var(--dark)",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.48rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 600,
            padding: "0.3rem 0.8rem",
          }}
        >
          Le Plus Populaire
        </div>
      )}

      <p
        style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.58rem",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: f.highlight ? "var(--warm-gray)" : "rgba(250,250,247,0.45)",
          marginBottom: "0.5rem",
        }}
      >
        {f.sub}
      </p>
      <h3
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "1.95rem",
          fontWeight: 400,
          marginBottom: "1.5rem",
          color: f.highlight ? "var(--charcoal)" : "var(--cream)",
        }}
      >
        {f.name}
      </h3>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "0.3rem",
          marginBottom: "2rem",
        }}
      >
        {f.unit ? (
          <>
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "3rem",
                fontWeight: 300,
                lineHeight: 1,
                color: f.highlight ? "var(--charcoal)" : "var(--cream)",
              }}
            >
              {f.price}
            </span>
            <span
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.68rem",
                fontWeight: 300,
                color: f.highlight
                  ? "var(--warm-gray)"
                  : "rgba(250,250,247,0.4)",
              }}
            >
              {f.unit}
            </span>
          </>
        ) : (
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.65rem",
              fontStyle: "italic",
              color: "var(--gold)",
            }}
          >
            {f.price}
          </span>
        )}
      </div>

      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          marginBottom: "2rem",
        }}
      >
        {f.features.map((feat) => (
          <li
            key={feat}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.78rem",
              fontWeight: 400,
              color: f.highlight ? "var(--charcoal)" : "rgba(250,250,247,0.75)",
            }}
          >
            <span
              style={{
                width: 18,
                height: 1,
                backgroundColor: "var(--gold)",
                flexShrink: 0,
              }}
            />
            {feat}
          </li>
        ))}
      </ul>

      <motion.a
        href="#contact"
        whileHover={
          f.highlight
            ? { backgroundColor: "var(--charcoal)", color: "var(--cream)" }
            : { borderColor: "var(--gold)", color: "var(--gold)" }
        }
        transition={{ duration: 0.25 }}
        style={{
          display: "block",
          textAlign: "center",
          padding: "0.85rem",
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 500,
          textDecoration: "none",
          backgroundColor: f.highlight ? "var(--charcoal)" : "transparent",
          color: f.highlight ? "var(--cream)" : "rgba(250,250,247,0.6)",
          border: f.highlight ? "none" : "1px solid rgba(250,250,247,0.18)",
        }}
      >
        Demander un devis
      </motion.a>
    </motion.div>
  );
}

function FormulasSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("mariage");
  const currentFormulas = formulasByTab[activeTab];

  return (
    <section
      id="formules"
      className="grain-overlay section-pad"
      aria-label="Nos formules et tarifs"
      style={{ backgroundColor: "var(--dark)", padding: "7rem 0" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <RevealOnScroll variant={fadeUp}>
            <Eyebrow light>Tarifs 2026–27</Eyebrow>
          </RevealOnScroll>
          <HeadingReveal delay={0.08}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1.1,
                color: "var(--cream)",
              }}
            >
              Nos Formules
            </h2>
          </HeadingReveal>
          <RevealOnScroll variant={fadeUp} custom={2}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.8rem",
                fontWeight: 300,
                color: "rgba(250,250,247,0.45)",
                marginTop: "1rem",
                lineHeight: 1.85,
                maxWidth: 480,
                margin: "1rem auto 0",
              }}
            >
              Toutes les formules sont entièrement personnalisables selon vos
              envies et le nombre de convives.
            </p>
          </RevealOnScroll>
        </div>

        {/* Tabs */}
        <div
          className="formula-tabs"
          style={{
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid rgba(196,166,97,0.15)",
            marginBottom: "4rem",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                position: "relative",
                padding: "1rem 2rem",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.82rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 500,
                color:
                  activeTab === tab.key
                    ? "var(--gold)"
                    : "rgba(250,250,247,0.45)",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="tab-indicator"
                  style={{
                    position: "absolute",
                    bottom: -1,
                    left: 0,
                    right: 0,
                    height: 1,
                    backgroundColor: "var(--gold)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              alignItems: "end",
            }}
            className="formula-grid"
          >
            {currentFormulas.map((f) => (
              <FormulaCard key={f.name} f={f} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .formula-grid { grid-template-columns: 1fr !important; }
          .formula-grid > * { margin-top: 0 !important; }
          .formula-tabs { flex-direction: column !important; }
          .formula-tabs button { border-bottom: 1px solid rgba(196,166,97,0.08) !important; }
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
    w: 3856,
    h: 5784,
    position: "center 30%",
  },
  {
    src: "/AdobeStock_122383063.jpeg",
    alt: "Art de la table",
    w: 1920,
    h: 1280,
    position: "center center",
  },
  {
    src: "/20260212_DSC3156.jpg",
    alt: "Chef David Chambaud",
    w: 3905,
    h: 5858,
    position: "center 20%",
  },
  {
    src: "/20260212_DSC3130.jpg",
    alt: "Réception événementielle",
    w: 6048,
    h: 4032,
    position: "center center",
  },
  {
    src: "/20260212_DSC3037.jpg",
    alt: "Création culinaire sur mesure",
    w: 4032,
    h: 6048,
    position: "center 25%",
  },
  {
    src: "/AdobeStock_192102309.jpeg",
    alt: "Dressage gastronomique",
    w: 1920,
    h: 1280,
    position: "center center",
  },
  {
    src: "/AdobeStock_91548526.jpeg",
    alt: "Buffet d'exception",
    w: 1920,
    h: 1280,
    position: "center center",
  },
  {
    src: "/20260212_DSC3049.jpg",
    alt: "Buffet gastronomique",
    w: 5612,
    h: 3741,
    position: "center center",
  },
  {
    src: "/20260212_DSC3157.jpg",
    alt: "Dîner privé",
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

  const goTo = (index: number) => {
    const next = ((index % total) + total) % total;
    setDirection(index > current ? 1 : -1);
    setCurrent(next);
  };
  const goPrev = () => goTo(current - 1);
  const goNext = () => goTo(current + 1);

  const slideVariants = {
    enter: (dir: number) => ({ x: reduce ? 0 : dir * 72, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: reduce ? 0 : dir * -52, opacity: 0 }),
  };

  return (
    <section
      id="galerie"
      className="grain-overlay section-pad"
      aria-label="Nos réalisations"
      style={{ backgroundColor: "var(--dark)", padding: "7rem 0" }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3.5rem",
            flexWrap: "wrap",
            gap: "1.5rem",
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
                  fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  color: "var(--cream)",
                }}
              >
                Chaque Moment,
                <br />
                une Oeuvre
              </h2>
            </HeadingReveal>
          </div>
          <RevealOnScroll variant={fadeIn} custom={2}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "1rem",
                fontWeight: 400,
                color: "rgba(250,250,247,0.75)",
                maxWidth: 320,
                lineHeight: 1.85,
              }}
            >
              Quelques instants captures lors de nos creations culinaires et
              evenements.
            </p>
          </RevealOnScroll>
        </div>

        {/* Carousel */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="gallery-carousel-grid"
        >
          {/* Left: counter + caption + progress + arrows */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
          >
            {/* Counter */}
            <div
              style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}
            >
              <motion.span
                key={current}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(3.5rem, 5vw, 5rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: 1,
                  color: "var(--gold)",
                }}
              >
                {String(current + 1).padStart(2, "0")}
              </motion.span>
              <span
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  color: "rgba(250,250,247,0.2)",
                }}
              >
                / {String(total).padStart(2, "0")}
              </span>
            </div>

            {/* Caption */}
            <div style={{ minHeight: "2.5rem" }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={current}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.38, ease }}
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.5rem",
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "var(--cream)",
                    lineHeight: 1.4,
                  }}
                >
                  {galleryItems[current].alt}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 1,
                backgroundColor: "rgba(196,166,97,0.15)",
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

            {/* Navigation arrows */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {(
                [
                  {
                    action: goPrev,
                    label: "Precedent",
                    d: "M19 12H5M12 5l-7 7 7 7",
                  },
                  {
                    action: goNext,
                    label: "Suivant",
                    d: "M5 12h14M12 5l7 7-7 7",
                  },
                ] as const
              ).map(({ action, label, d }) => (
                <motion.button
                  key={label}
                  onClick={action}
                  aria-label={label}
                  whileHover={{
                    borderColor: "var(--gold)",
                    color: "var(--gold)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: "1px solid rgba(196,166,97,0.22)",
                    backgroundColor: "transparent",
                    color: "var(--cream)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={d} />
                  </svg>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: draggable image */}
          <div
            style={{
              position: "relative",
              aspectRatio: "16/10",
              overflow: "hidden",
              cursor: "grab",
            }}
          >
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
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src={galleryItems[current].src}
                  alt={galleryItems[current].alt}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: galleryItems[current].position,
                    pointerEvents: "none",
                  }}
                  sizes="(max-width: 768px) 100vw, 70vw"
                  priority={current === 0}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(11,11,9,0.4) 0%, transparent 40%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    width: 32,
                    height: 1,
                    backgroundColor: "var(--gold)",
                    opacity: 0.4,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    width: 1,
                    height: 32,
                    backgroundColor: "var(--gold)",
                    opacity: 0.4,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    width: 32,
                    height: 1,
                    backgroundColor: "var(--gold)",
                    opacity: 0.4,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    width: 1,
                    height: 32,
                    backgroundColor: "var(--gold)",
                    opacity: 0.4,
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Instagram link */}
        <RevealOnScroll variant={fadeUp} custom={3}>
          <div style={{ textAlign: "right", marginTop: "2.5rem" }}>
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
          </div>
        </RevealOnScroll>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .gallery-carousel-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   PAVILLON — atmospheric full-bleed with background text
════════════════════════════════════════════════════════════ */
function PavillonSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const textY = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const reduce = useReducedMotion();

  return (
    <section
      ref={ref}
      id="pavillon"
      className="grain-overlay section-pad"
      aria-label="Le Pavillon des Millésimes"
      style={{
        position: "relative",
        backgroundColor: "var(--charcoal)",
        overflow: "hidden",
        padding: "8rem 0",
      }}
    >
      {/* Background photo */}
      <motion.div
        aria-hidden
        style={{ y: reduce ? 0 : bgY, position: "absolute", inset: 0 }}
      >
        <Image
          src="/pavillon-facade.jpg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center center" }}
          sizes="100vw"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(11,11,9,0.58)",
          }}
        />
      </motion.div>

      {/* Atmospheric background word */}
      <motion.div
        aria-hidden
        style={{
          y: reduce ? 0 : bgY,
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
            fontSize: "clamp(8rem, 22vw, 20rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(196,166,97,0.06)",
            whiteSpace: "nowrap",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          Millésimes
        </p>
      </motion.div>

      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "60vw",
          maxWidth: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,166,97,0.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <motion.div style={{ y: reduce ? 0 : textY }}>
        <div
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            padding: "0 2rem",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <RevealOnScroll variant={fadeUp}>
            <Eyebrow light>
              Table d&apos;Hôtes · Chambres d&apos;exception
            </Eyebrow>
          </RevealOnScroll>

          <HeadingReveal delay={0.08}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1.08,
                color: "var(--cream)",
                marginBottom: "0.06em",
              }}
            >
              Le Pavillon
            </h2>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1.1,
                color: "var(--gold)",
                marginBottom: "2.5rem",
              }}
            >
              des Millésimes
            </h2>
          </HeadingReveal>

          <RevealOnScroll variant={lineGrow}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "2.5rem",
              }}
            >
              <div
                style={{
                  height: 1,
                  width: 48,
                  backgroundColor: "var(--gold)",
                  opacity: 0.4,
                }}
              />
              <MapPin
                size={12}
                color="var(--gold)"
                strokeWidth={1.5}
                style={{ opacity: 0.7 }}
              />
              <div
                style={{
                  height: 1,
                  width: 48,
                  backgroundColor: "var(--gold)",
                  opacity: 0.4,
                }}
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant={fadeUp} custom={2}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.85rem",
                fontWeight: 300,
                lineHeight: 2,
                color: "rgba(250,250,247,0.55)",
                maxWidth: 600,
                margin: "0 auto 3rem",
              }}
            >
              Niché au cœur de la Nouvelle-Aquitaine, le Pavillon des Millésimes
              vous accueille pour des séjours d&apos;exception. Table
              d&apos;hôtes gastronomique, chambres raffinées et art de vivre à
              la française — une parenthèse enchanteresse pour les épicuriens
              exigeants.
            </p>
          </RevealOnScroll>

          <RevealOnScroll variant={fadeUp} custom={3}>
            <motion.a
              href="https://www.pavillon-des-millesimes.com"
              target="_blank"
              whileHover={{ gap: "1.3rem" }}
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
              <span>En savoir plus</span>
              <ArrowRight size={13} />
            </motion.a>
          </RevealOnScroll>
        </div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   TESTIMONIALS — full-width editorial stacks
════════════════════════════════════════════════════════════ */
const testimonials = [
  {
    quote:
      "David a sublimé notre mariage avec un buffet d'une qualité exceptionnelle. Nos invités en parlent encore — une prestation irréprochable du début à la fin.",
    author: "Sophie & Thomas",
    occasion: "Mariage · Gironde",
  },
  {
    quote:
      "Pour notre séminaire d'entreprise, David a su proposer des formules à la fois gastronomiques et conviviales. Un vrai professionnel, attentif aux moindres détails.",
    author: "Directrice RH",
    occasion: "Événement professionnel",
  },
  {
    quote:
      "Le baptême de notre fils était parfait. La cuisine était délicieuse, le service impeccable. Je recommande David les yeux fermés à tous mes proches.",
    author: "Marie & Julien",
    occasion: "Baptême · Bordeaux",
  },
];

function TestimonialsSection() {
  return (
    <section
      id="temoignages"
      className="section-pad"
      aria-label="Témoignages clients"
      style={{ backgroundColor: "var(--cream)", padding: "7rem 0" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "5rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <RevealOnScroll variant={fadeUp}>
              <Eyebrow>Ils nous font confiance</Eyebrow>
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
                Témoignages
              </h2>
            </HeadingReveal>
          </div>
          <RevealOnScroll variant={fadeIn}>
            <div style={{ display: "flex", gap: 4 }}>
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  size={14}
                  fill="var(--gold)"
                  color="var(--gold)"
                />
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* Full-width editorial testimonials */}
        <div>
          {testimonials.map((t, i) => (
            <RevealOnScroll key={t.author} variant={fadeUp} custom={i}>
              <div
                style={{
                  padding: "3.5rem 0",
                  borderBottom:
                    i < testimonials.length - 1
                      ? "1px solid rgba(196,166,97,0.15)"
                      : "none",
                  display: "grid",
                  gridTemplateColumns: "80px 1fr auto",
                  gap: "2rem",
                  alignItems: "start",
                }}
                className="testimonial-row"
              >
                {/* Large quote mark */}
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "6rem",
                    lineHeight: 0.8,
                    color: "var(--gold)",
                    opacity: 0.25,
                    fontStyle: "italic",
                    fontWeight: 300,
                    paddingTop: "0.2rem",
                  }}
                >
                  &ldquo;
                </p>

                {/* Quote text */}
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "clamp(1.2rem, 2.2vw, 1.55rem)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      lineHeight: 1.7,
                      color: "var(--charcoal)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {t.quote}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      color: "var(--charcoal)",
                    }}
                  >
                    {t.author}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--warm-gray)",
                      marginTop: "0.3rem",
                    }}
                  >
                    {t.occasion}
                  </p>
                </div>

                {/* Index */}
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.2rem",
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "rgba(196,166,97,0.3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  0{i + 1}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .testimonial-row { grid-template-columns: 48px 1fr !important; }
          .testimonial-row > *:last-child { display: none; }
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
        padding: "5rem 0",
        overflow: "hidden",
        position: "relative",
        borderTop: "1px solid rgba(196,166,97,0.12)",
        borderBottom: "1px solid rgba(196,166,97,0.12)",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "0 2rem",
          marginBottom: "3rem",
          textAlign: "center",
        }}
      >
        <RevealOnScroll variant={fadeUp}>
          <Eyebrow>Références</Eyebrow>
        </RevealOnScroll>
        <HeadingReveal delay={0.06}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "var(--charcoal)",
            }}
          >
            Ils nous font confiance
          </h2>
        </HeadingReveal>
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
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CONTACT — split layout with animated form
════════════════════════════════════════════════════════════ */
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="grain-overlay section-pad"
      aria-label="Contact et demande de devis"
      style={{
        backgroundColor: "var(--dark)",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative rings */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          right: "-10vw",
          transform: "translateY(-50%)",
          width: "50vw",
          height: "50vw",
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: "50%",
          border: "1px solid rgba(196,166,97,0.05)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          right: "-10vw",
          transform: "translateY(-50%)",
          width: "35vw",
          height: "35vw",
          maxWidth: 480,
          maxHeight: 480,
          borderRadius: "50%",
          border: "1px solid rgba(196,166,97,0.07)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "7rem",
          alignItems: "start",
        }}
        className="contact-grid"
      >
        {/* Left: info */}
        <div>
          <RevealOnScroll variant={fadeUp}>
            <Eyebrow light>Contact</Eyebrow>
          </RevealOnScroll>
          <HeadingReveal delay={0.08}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1.08,
                color: "var(--cream)",
                marginBottom: "1.5rem",
              }}
            >
              Parlons de votre
              <br />
              <span style={{ color: "var(--gold)" }}>projet</span>
            </h2>
          </HeadingReveal>

          <RevealOnScroll variant={fadeUp} custom={2}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.82rem",
                fontWeight: 300,
                color: "rgba(250,250,247,0.48)",
                lineHeight: 1.95,
                marginBottom: "3rem",
              }}
            >
              Chaque événement est unique. Contactez David pour établir un devis
              personnalisé et construire ensemble le menu parfait.
            </p>
          </RevealOnScroll>

          <RevealOnScroll variant={fadeUp} custom={3}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
              }}
            >
              {[
                {
                  href: "tel:+33650754406",
                  icon: (
                    <Phone size={14} color="var(--gold)" strokeWidth={1.5} />
                  ),
                  label: "+33 6 50 75 44 06",
                },
                {
                  href: "mailto:contact@david-chambaud.fr",
                  icon: (
                    <Mail size={14} color="var(--gold)" strokeWidth={1.5} />
                  ),
                  label: "contact@david-chambaud.fr",
                },
                {
                  href: "https://www.instagram.com/chambauddavid",
                  icon: <IconInstagram size={14} color="var(--gold)" />,
                  label: "@chambauddavid",
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
                  whileHover={{ color: "var(--gold)", x: 4 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.9rem",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 300,
                    color: "rgba(250,250,247,0.6)",
                    textDecoration: "none",
                  }}
                >
                  {item.icon}
                  {item.label}
                </motion.a>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant={fadeIn} custom={4}>
            <div
              style={{
                marginTop: "2.5rem",
                position: "relative",
                overflow: "hidden",
                aspectRatio: "16/10",
              }}
            >
              <Image
                src="/AdobeStock_132808376.jpeg"
                alt="Réception gastronomique orchestrée par David Chambaud"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="(max-width: 768px) 100vw, 38vw"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(11,11,9,0.18)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 14,
                  width: 28,
                  height: 1,
                  backgroundColor: "var(--gold)",
                  opacity: 0.45,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 14,
                  width: 1,
                  height: 28,
                  backgroundColor: "var(--gold)",
                  opacity: 0.45,
                }}
              />
            </div>
          </RevealOnScroll>
        </div>

        {/* Right: form */}
        <RevealOnScroll variant={fadeUp} custom={1}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "3rem",
                border: "1px solid rgba(196,166,97,0.2)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}
              >
                <Star size={18} color="var(--gold)" fill="var(--gold)" />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1.8rem",
                  fontStyle: "italic",
                  color: "var(--cream)",
                  marginBottom: "0.75rem",
                }}
              >
                Message envoyé
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 300,
                  color: "rgba(250,250,247,0.45)",
                  lineHeight: 1.8,
                }}
              >
                David vous contactera dans les plus brefs délais pour discuter
                de votre événement.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <FloatingInput label="Votre nom" type="text" />
              <FloatingInput label="Votre email" type="email" />
              <FloatingInput
                label="Type d'événement (mariage, réception…)"
                type="text"
              />
              <FloatingInput label="Votre message" multiline />

              <motion.button
                type="submit"
                whileHover={{ backgroundColor: "var(--gold-light)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: "100%",
                  padding: "1.1rem",
                  backgroundColor: "var(--gold)",
                  color: "var(--dark)",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  border: "none",
                  marginTop: "0.5rem",
                }}
              >
                Envoyer la demande
              </motion.button>
            </form>
          )}
        </RevealOnScroll>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3.5rem !important; }
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
        borderTop: "1px solid rgba(196,166,97,0.1)",
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
              color: "rgba(250,250,247,0.65)",
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
