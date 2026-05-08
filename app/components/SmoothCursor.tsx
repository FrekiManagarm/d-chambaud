"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function SmoothCursor() {
  const [visible, setVisible] = useState(false);
  const [onLink, setOnLink] = useState(false);
  const isFine = useRef(false);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useSpring(dotX, { stiffness: 100, damping: 22, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 100, damping: 22, mass: 0.4 });

  useEffect(() => {
    isFine.current = window.matchMedia("(pointer: fine)").matches;
    if (!isFine.current) return;

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      setOnLink(!!t.closest("a, button, [role='button'], input, textarea, select, label"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [dotX, dotY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Lagging ring */}
      <motion.div
        aria-hidden
        animate={{
          width: onLink ? 52 : 34,
          height: onLink ? 52 : 34,
          borderColor: onLink ? "rgba(196,166,97,0.9)" : "rgba(196,166,97,0.45)",
          backgroundColor: onLink ? "rgba(196,166,97,0.06)" : "transparent",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          border: "1px solid rgba(196,166,97,0.45)",
          pointerEvents: "none",
          zIndex: 99998,
        }}
      />
      {/* Precise dot */}
      <motion.div
        aria-hidden
        animate={{
          width: onLink ? 3 : 5,
          height: onLink ? 3 : 5,
          opacity: onLink ? 0.5 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          backgroundColor: "var(--gold)",
          pointerEvents: "none",
          zIndex: 99999,
        }}
      />
    </>
  );
}
