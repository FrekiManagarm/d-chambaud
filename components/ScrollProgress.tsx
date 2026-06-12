"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        scaleX,
        transformOrigin: "0%",
        background: "linear-gradient(to right, var(--gold), var(--gold-light))",
        zIndex: 200,
        pointerEvents: "none",
      }}
    />
  );
}
