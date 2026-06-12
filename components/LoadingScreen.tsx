"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2300);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.75, ease }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99990,
            backgroundColor: "#2a2820",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "3rem",
          }}
        >
          {/* Decorative ring */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease }}
            style={{
              position: "absolute",
              width: "clamp(340px, 38vw, 520px)",
              height: "clamp(340px, 38vw, 520px)",
              borderRadius: "50%",
              border: "1px solid rgba(var(--gold-rgb),0.06)",
            }}
          />
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            style={{
              position: "absolute",
              width: "clamp(210px, 24vw, 320px)",
              height: "clamp(210px, 24vw, 320px)",
              borderRadius: "50%",
              border: "1px solid rgba(var(--gold-rgb),0.1)",
            }}
          />

          {/* Logo block */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease }}
            style={{ textAlign: "center", position: "relative", zIndex: 1 }}
          >
            <p
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.65rem, 7.5vw, 5.8rem)",
                fontWeight: 300,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#f5edd8",
                marginBottom: "0.9rem",
                lineHeight: 0.95,
              }}
            >
              David Chambaud
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "clamp(0.64rem, 1.1vw, 0.86rem)",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "#bd9c6e",
              }}
            >
              Traiteur &amp; Chef à Domicile
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              width: "clamp(132px, 15vw, 220px)",
              height: 1,
              backgroundColor: "rgba(var(--gold-rgb),0.15)",
              position: "relative",
              zIndex: 1,
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.6, ease }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#bd9c6e",
                transformOrigin: "left",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
