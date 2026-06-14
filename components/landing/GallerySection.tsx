"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { GalleryItem, HomeImages } from "./types";
import { Eyebrow, HeadingReveal, RevealOnScroll, ease, fadeIn, fadeUp } from "./shared";

/* ════════════════════════════════════════════════════════════
   GALLERY — editorial masonry grid
════════════════════════════════════════════════════════════ */
export const galleryItems: GalleryItem[] = [
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

export function GallerySection({ images }: { images: HomeImages }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const items = images.gallery.length > 0 ? images.gallery : galleryItems;
  const total = items.length;
  const active = items[current] || items[0];
  const prevItem = items[(current - 1 + total) % total];
  const nextItem = items[(current + 1) % total];

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
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2.55rem, 5.2vw, 5.1rem)",
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
              </h3>
            </HeadingReveal>
          </div>
          <RevealOnScroll variant={fadeIn} custom={2}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.95rem",
                fontWeight: 400,
                color: "rgba(var(--cream-rgb),0.78)",
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
                    color: "rgba(var(--cream-rgb),0.62)",
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
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "center",
                }}
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

          <div
            className="gallery-stage"
            style={{ position: "relative", minHeight: 650 }}
          >
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
                      color: "rgba(var(--cream-rgb),0.7)",
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
            {items.map((item, index) => (
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
          .gallery-header h3 {
            font-size: clamp(2.35rem, 10vw, 3.1rem) !important;
            line-height: 0.98 !important;
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
