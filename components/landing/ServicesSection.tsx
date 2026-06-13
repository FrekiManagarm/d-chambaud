"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Heart, Home, TreePine, UtensilsCrossed } from "lucide-react";

import type { HomeImages } from "./types";
import { Eyebrow, HeadingReveal, RevealOnScroll, ease, fadeIn, fadeUp } from "./shared";

/* ════════════════════════════════════════════════════════════
   SERVICES — editorial rows, icon slides in on hover
════════════════════════════════════════════════════════════ */
export const services = [
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
              fontSize: "0.96rem",
              fontStyle: "italic",
              fontWeight: 400,
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
              fontSize: "1.32rem",
              fontWeight: 400,
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
          padding: "3rem",
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
            fontSize: "0.58rem",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "var(--gold)",
            marginBottom: "0.65rem",
          }}
        >
          {service.num} · {service.sub}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(2.15rem, 3vw, 3.15rem)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "var(--cream)",
            lineHeight: 1.04,
            marginBottom: "1rem",
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.9rem",
            fontWeight: 400,
            lineHeight: 1.8,
            color: "rgba(var(--cream-rgb),0.78)",
            marginBottom: "1.55rem",
            maxWidth: "40ch",
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
            fontSize: "0.58rem",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "var(--gold)",
            textDecoration: "none",
          }}
        >
          <span>Demander un devis</span>
          <ArrowRight size={12} />
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

export function ServicesSection({ images }: { images: HomeImages }) {
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
                pour votre évènement.
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
            service={{ ...s, img: images.services[i] || s.img }}
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
            height: 390px !important;
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
          .service-panel-expanded {
            padding: 2rem 1.35rem !important;
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
