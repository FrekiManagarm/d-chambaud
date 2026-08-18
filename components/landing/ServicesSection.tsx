"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Heart,
  Home,
  TreePine,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  getServiceBrochureDownloadHref,
  groupServiceBrochuresByCategory,
  type ServiceBrochureCategory,
  type ServiceBrochureSummary,
} from "@/lib/service-brochures";
import type { HomeImages, ServicesTextContent } from "./types";
import { Eyebrow, HeadingReveal, RevealOnScroll, ease, fadeIn, fadeUp } from "./shared";

/* ════════════════════════════════════════════════════════════
   SERVICES — editorial rows, icon slides in on hover
════════════════════════════════════════════════════════════ */
type ServiceItem = {
  brochureCategory: ServiceBrochureCategory;
  desc: string;
  Icon: LucideIcon;
  img: string;
  num: string;
  sub: string;
  title: string;
};

const serviceMeta: {
  Icon: LucideIcon;
  brochureCategory: ServiceBrochureCategory;
  contentKey: keyof Pick<
    ServicesTextContent,
    "traiteur" | "mariages" | "chefADomicile" | "receptions"
  >;
  img: string;
  num: string;
}[] = [
  {
    num: "01",
    Icon: UtensilsCrossed,
    contentKey: "traiteur",
    brochureCategory: "traiteur",
    img: "/AdobeStock_418339639.jpeg",
  },
  {
    num: "02",
    Icon: Heart,
    contentKey: "mariages",
    brochureCategory: "mariages",
    img: "/AdobeStock_522340892.jpeg",
  },
  {
    num: "03",
    Icon: Home,
    contentKey: "chefADomicile",
    brochureCategory: "chef-a-domicile",
    img: "/AdobeStock_54050217.jpeg",
  },
  {
    num: "04",
    Icon: TreePine,
    contentKey: "receptions",
    brochureCategory: "receptions",
    img: "/AdobeStock_555480279.jpeg",
  },
];

export function buildServices(content: ServicesTextContent): ServiceItem[] {
  return serviceMeta.map((meta) => ({
    ...content[meta.contentKey],
    Icon: meta.Icon,
    brochureCategory: meta.brochureCategory,
    img: meta.img,
    num: meta.num,
  }));
}

/* Mobile accordion geometry. Kept here rather than inline so the container
   height stays derived from the panel sizes: the two must agree or the fixed
   container height below stops matching its contents. */
const MOBILE_PANEL_COLLAPSED_PX = 72;
const MOBILE_PANEL_EXPANDED_PX = 390;

/* ─── ServicePanel — accordion slot ─── */
function ServicePanel({
  service,
  brochure,
  index,
  isActive,
  onActivate,
}: {
  service: ServiceItem;
  brochure?: ServiceBrochureSummary;
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
        style={{
          objectFit: "cover",
          objectPosition: "center",
          pointerEvents: "none",
        }}
        sizes="(max-width: 768px) 100vw, 25vw"
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: isActive
            ? "rgba(var(--dark-rgb),0.46)"
            : "rgba(var(--dark-rgb),0.70)",
          transition: reduce ? "none" : "background-color 0.65s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: isActive
            ? "linear-gradient(180deg, rgba(var(--dark-rgb),0.12) 0%, rgba(var(--dark-rgb),0.08) 38%, rgba(var(--dark-rgb),0.72) 100%), linear-gradient(90deg, rgba(var(--dark-rgb),0.52) 0%, rgba(var(--dark-rgb),0.10) 56%, rgba(var(--dark-rgb),0.22) 100%)"
            : "linear-gradient(180deg, rgba(var(--dark-rgb),0.18) 0%, rgba(var(--dark-rgb),0.54) 100%)",
          transition: reduce ? "none" : "opacity 0.65s ease",
          pointerEvents: "none",
          zIndex: 2,
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
            pointerEvents: "none",
            zIndex: 3,
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
              textShadow: "0 2px 14px rgba(var(--dark-rgb),0.72)",
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
          zIndex: 4,
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
            color: "rgba(var(--gold-light-rgb),0.96)",
            marginBottom: "0.65rem",
            textShadow: "0 2px 14px rgba(var(--dark-rgb),0.68)",
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
            textShadow: "0 4px 24px rgba(var(--dark-rgb),0.78)",
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.9rem",
            fontWeight: 500,
            lineHeight: 1.8,
            color: "rgba(var(--cream-rgb),0.94)",
            marginBottom: "1.55rem",
            maxWidth: "40ch",
            textShadow: "0 2px 18px rgba(var(--dark-rgb),0.78)",
          }}
        >
          {service.desc}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <motion.a
            href="/contact"
            whileHover={{ gap: "1.2rem" }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "rgba(var(--gold-light-rgb),0.98)",
              textDecoration: "none",
              textShadow: "0 2px 14px rgba(var(--dark-rgb),0.68)",
            }}
          >
            <span>Demander un devis</span>
            <ArrowRight size={12} />
          </motion.a>

          {brochure ? (
            <motion.a
              href={getServiceBrochureDownloadHref(brochure)}
              whileHover={{ gap: "1.2rem" }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--cream)",
                textDecoration: "none",
                textShadow: "0 2px 14px rgba(var(--dark-rgb),0.68)",
              }}
            >
              <span>Télécharger la plaquette</span>
              <Download size={12} />
            </motion.a>
          ) : null}
        </div>
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
          pointerEvents: "none",
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
          pointerEvents: "none",
          zIndex: 4,
        }}
      />
    </div>
  );
}

export function ServicesSection({
  content,
  images,
  serviceBrochures,
}: {
  content: ServicesTextContent;
  images: HomeImages;
  serviceBrochures: ServiceBrochureSummary[];
}) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduce = useReducedMotion();
  const brochuresByCategory = groupServiceBrochuresByCategory(serviceBrochures);
  const services = buildServices(content);

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
              <Eyebrow>{content.eyebrow}</Eyebrow>
            </RevealOnScroll>
            <HeadingReveal delay={0.08}>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2.05rem, 3.8vw, 3.35rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  color: "var(--charcoal)",
                }}
              >
                {content.titleLineOne}
                <br />
                {content.titleLineTwo}
              </h2>
            </HeadingReveal>
          </div>
          <RevealOnScroll variant={fadeIn} custom={2}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.82rem",
                fontWeight: 400,
                color: "var(--warm-gray)",
                maxWidth: 340,
                lineHeight: 1.8,
              }}
            >
              {content.intro}
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
          /* Both layouts animate a layout property (flex-basis on desktop,
             height on mobile). Containment tells the browser that work cannot
             affect anything outside this box, so it never escalates into a
             document-wide reflow. */
          contain: "layout",
        }}
      >
        {services.map((s, i) => (
          <ServicePanel
            key={s.num}
            service={{ ...s, img: images.services[i] || s.img }}
            brochure={brochuresByCategory[s.brochureCategory]}
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
            /* Pinned, exactly like the desktop layout. With height:auto the
               container grew by 318px as a panel opened, so the gallery,
               formulas, pavillon, testimonials and footer below it were all
               re-laid-out on every frame of the 0.55s transition. A fixed
               height keeps that work inside the accordion: panels still resize,
               but the rest of the document never moves. */
            height: ${
              MOBILE_PANEL_COLLAPSED_PX * (services.length - 1) +
              MOBILE_PANEL_EXPANDED_PX
            }px !important;
          }
          .service-panel {
            flex: none !important;
            height: ${MOBILE_PANEL_COLLAPSED_PX}px !important;
            min-height: ${MOBILE_PANEL_COLLAPSED_PX}px !important;
            transition: height 0.55s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .service-panel[data-active="true"] {
            height: ${MOBILE_PANEL_EXPANDED_PX}px !important;
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
          .service-panel-expanded h3 {
            font-size: clamp(1.85rem, 7.8vw, 2.25rem) !important;
          }
          .service-panel .service-panel-collapsed > div > div {
            width: 24px !important;
            height: 1px !important;
          }
        }

        /* The desktop flex transition is already gated on useReducedMotion, but
           this one lives in a stylesheet with !important, so JS could not reach
           it — visitors who ask for less motion still got the full 0.55s resize. */
        @media (max-width: 768px) and (prefers-reduced-motion: reduce) {
          .service-panel {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );

}
