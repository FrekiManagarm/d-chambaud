"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";

export const IconInstagram = ({
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
export const ease = [0.25, 0.46, 0.45, 0.94] as const;
export const easeOut = [0.16, 1, 0.3, 1] as const;

/* ─── Animation variants ─── */
export const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: i * 0.1, ease },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.1 },
  }),
};

export const lineGrow = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1, ease } },
};

/* ─── RevealOnScroll ─── */
export function RevealOnScroll({
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
export function HeadingReveal({
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
export function CharReveal({
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
export function MagneticButton({
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
        color: isGold ? "var(--dark)" : "rgba(var(--cream-rgb),0.86)",
        border: isGold ? "none" : "1px solid rgba(var(--cream-rgb),0.38)",
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
export function CountUpStat({
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
export const Eyebrow = ({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) => (
  <h2
    style={{
      fontFamily: "var(--font-montserrat), sans-serif",
      fontSize: "clamp(0.92rem, 1.25vw, 1.12rem)",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      fontWeight: 700,
      color: light ? "rgba(var(--gold-light-rgb),0.94)" : "var(--bronze)",
      marginBottom: "1.25rem",
      opacity: light ? 0.9 : 1,
    }}
  >
    {children}
  </h2>
);

/* ─── ContactField ─── */
export function ContactField({
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
          color: error
            ? "rgba(245,190,170,0.95)"
            : "rgba(var(--cream-rgb),0.74)",
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
          required={required}
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
          required={required}
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
          color: error
            ? "rgba(245,190,170,0.95)"
            : "rgba(var(--cream-rgb),0.64)",
        }}
      >
        {error || helper || ""}
      </p>
    </div>
  );

}
