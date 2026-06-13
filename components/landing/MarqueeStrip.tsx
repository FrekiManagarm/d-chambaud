"use client";

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

export function MarqueeStrip() {
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
              color:
                item === "·" ? "var(--gold)" : "rgba(var(--cream-rgb),0.65)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );

}
