"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Eyebrow, HeadingReveal, RevealOnScroll, fadeUp } from "./shared";

/* ════════════════════════════════════════════════════════════
   FORMULAS — waterfall asymmetric layout
════════════════════════════════════════════════════════════ */
export type Formula = {
  detail: string;
  features: string[];
  highlight: boolean;
  name: string;
  offset: boolean;
  price: string;
  sub: string;
  tone: string;
  unit: string;
};

export type PricingTab = {
  formulas: Formula[];
  key: string;
  label: string;
  summaryLabel: string;
};

export type PricingContent = {
  ctaLabel: string;
  eyebrow: string;
  footerNote: string;
  intro: string;
  tabs: PricingTab[];
  titleLineOne: string;
  titleLineTwo: string;
  yearLabel: string;
};

const fallbackFormulasByTab: Record<string, Formula[]> = {
  mariage: [
    {
      name: "Mariage buffet campagne",
      price: "à partir de 75",
      unit: "€ / pers.",
      sub: "",
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
      name: "Mariage buffet champêtre",
      price: "à partir de 85",
      unit: "€ / pers.",
      sub: "",
      tone: "Une formule vivante, chaleureuse, très adaptée aux grands groupes.",
      detail: "Produits de saison, présentation soignée, service fluide.",
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
      sub: "",
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
      name: "Mariage excellence gastronomique",
      price: "à partir de 280",
      unit: "€ / pers.",
      sub: "",
      tone: "",
      detail: "",
      features: [
        "Devis sur mesure",
        "Tarifs hors boissons, transport et mobilier",
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
      detail:
        "Entrée, plat, dessert, produits locaux et inspiration du moment.",
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
      detail:
        "Rythme, dressage, produits choisis et accord mets & vins possible.",
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
};

const fallbackPricingTabs: PricingTab[] = [
  { key: "mariage", label: "Mariage" },
  { key: "chef", label: "Chef à Domicile" },
  { key: "pavillon", label: "Pavillon des Millésimes" },
].map((tab) => ({
  ...tab,
  formulas: fallbackFormulasByTab[tab.key] || [],
  summaryLabel: "Sur mesure",
}));

export const fallbackPricing: PricingContent = {
  ctaLabel: "Demander un devis",
  eyebrow: "Tarifs 2026-27",
  footerNote:
    "Les tarifs sont indicatifs et hors boissons, transport, matériel et mobilier sauf mention contraire.",
  intro:
    "Les prix donnent un point de départ. Le devis affine ensuite le menu, l'équipe, le matériel et le rythme réel de votre journée.",
  tabs: fallbackPricingTabs,
  titleLineOne: "Des bases claires",
  titleLineTwo: "pour décider sereinement.",
  yearLabel: "2026-27",
};

function getFormulaSummary(formula: Formula) {
  return (
    formula.sub ||
    formula.tone ||
    formula.detail ||
    "Devis adapté à votre réception."
  );
}

function FormulaRow({ f, index }: { f: Formula; index: number }) {
  return (
    <motion.article
      className="formula-row"
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      whileHover={{
        backgroundColor: "rgba(var(--gold-rgb),0.045)",
      }}
      transition={{
        type: "spring",
        stiffness: 130,
        damping: 24,
        delay: index * 0.03,
      }}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        gap: "1.5rem",
        padding: "1.25rem 0",
        borderTop: "1px solid rgba(var(--charcoal-rgb),0.12)",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            marginBottom: "0.35rem",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(1.45rem, 2.3vw, 2rem)",
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "var(--charcoal)",
              letterSpacing: 0,
            }}
          >
            {f.name}
          </h3>
          {f.highlight ? (
            <span
              style={{
                border: "1px solid rgba(var(--gold-rgb),0.42)",
                padding: "0.28rem 0.45rem",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.52rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold)",
                whiteSpace: "nowrap",
              }}
            >
              Conseillé
            </span>
          ) : null}
        </div>

        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.82rem",
            fontWeight: 300,
            color: "rgba(var(--charcoal-rgb),0.68)",
            lineHeight: 1.6,
            maxWidth: 640,
          }}
        >
          {getFormulaSummary(f)}
        </p>
      </div>

      <div
        className="formula-row-price"
        style={{
          display: "grid",
          justifyItems: "end",
          alignContent: "center",
          minWidth: 154,
        }}
      >
        <div
          style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: f.unit ? "clamp(1.8rem, 3vw, 2.45rem)" : "1.55rem",
              fontStyle: f.unit ? "normal" : "italic",
              fontWeight: 300,
              lineHeight: 1,
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
                fontSize: "0.62rem",
                fontWeight: 300,
                color: "rgba(var(--charcoal-rgb),0.68)",
                whiteSpace: "nowrap",
              }}
            >
              {f.unit}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function FormulasSection({ pricing }: { pricing: PricingContent }) {
  const firstTabKey = pricing.tabs[0]?.key ?? "mariage";
  const [requestedTab, setRequestedTab] = useState(firstTabKey);
  const activeTab = pricing.tabs.some((tab) => tab.key === requestedTab)
    ? requestedTab
    : firstTabKey;
  const activePricingTab = pricing.tabs.find((tab) => tab.key === activeTab);
  const currentFormulas = activePricingTab?.formulas ?? [];
  const activeLabel = activePricingTab?.label ?? "";

  return (
    <section
      id="formules"
      className="section-pad formulas-section"
      aria-label="Nos formules et tarifs"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--cream)",
        padding: "6.5rem 0",
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
            gridTemplateColumns: "minmax(0, 0.9fr) minmax(280px, 0.5fr)",
            gap: "3.25rem",
            alignItems: "end",
            marginBottom: "3rem",
          }}
        >
          <div>
            <RevealOnScroll variant={fadeUp}>
              <Eyebrow>{pricing.eyebrow}</Eyebrow>
            </RevealOnScroll>
            <HeadingReveal delay={0.08}>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2.35rem, 4vw, 3.75rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 1,
                  color: "var(--charcoal)",
                  letterSpacing: 0,
                  marginTop: "1rem",
                }}
              >
                {pricing.titleLineOne}
                <br />
                {pricing.titleLineTwo}
              </h3>
            </HeadingReveal>

            <RevealOnScroll variant={fadeUp} custom={2}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 300,
                  color: "rgba(var(--charcoal-rgb),0.76)",
                  marginTop: "1.2rem",
                  lineHeight: 1.75,
                  maxWidth: 520,
                }}
              >
                {pricing.intro}
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
            {pricing.tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setRequestedTab(tab.key)}
                  style={{
                    position: "relative",
                    padding: "0 0.75rem 0.9rem",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: isActive
                      ? "var(--charcoal)"
                      : "rgba(var(--charcoal-rgb),0.64)",
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
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 28,
                      }}
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
              marginBottom: "0.25rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "1.85rem",
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--charcoal)",
                lineHeight: 1,
              }}
            >
              {activeLabel}
            </h3>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="formula-grid"
              style={{ display: "grid" }}
            >
              {currentFormulas.length > 0 ? (
                currentFormulas.map((formula, index) => (
                  <FormulaRow key={formula.name} f={formula} index={index} />
                ))
              ) : (
                <p
                  style={{
                    borderTop: "1px solid rgba(var(--charcoal-rgb),0.12)",
                    padding: "1.25rem 0",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.86rem",
                    color: "rgba(var(--charcoal-rgb),0.7)",
                  }}
                >
                  Les tarifs de cette catégorie arrivent bientôt.
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          <div
            className="formula-footer"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1.5rem",
              alignItems: "center",
              paddingTop: "1.35rem",
              borderTop: "1px solid rgba(var(--charcoal-rgb),0.12)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.76rem",
                lineHeight: 1.65,
                color: "rgba(var(--charcoal-rgb),0.7)",
                maxWidth: 600,
              }}
            >
              {pricing.footerNote}
            </p>
            <motion.a
              className="formula-cta"
              href="/contact"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "var(--dark)",
                backgroundColor: "var(--gold)",
                padding: "0.95rem 1.35rem",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <span>{pricing.ctaLabel}</span>
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
            width: 100% !important;
            padding: 0.95rem 1.35rem !important;
          }
        }

        @media (max-width: 430px) {
          .formulas-layout h3 {
            font-size: 2.35rem !important;
            letter-spacing: 0 !important;
          }
          .formula-list-header {
            gap: 0.45rem !important;
          }
          .formula-list-header h3 {
            font-size: 1.8rem !important;
          }
          .formula-row h3 {
            font-size: 1.55rem !important;
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
