"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

import { Eyebrow, HeadingReveal, RevealOnScroll, ease, fadeUp } from "./shared";

/* ════════════════════════════════════════════════════════════
   TESTIMONIALS — masonry grid with real reviews
════════════════════════════════════════════════════════════ */
const testimonials = [
  {
    quote:
      "Nous avons eu le plaisir de faire appel à David pour le cocktail, le dîner et le brunch de notre mariage et la surprise fut juste magnifique ! Le raffinement, le goût, le service, le professionnalisme… tout était au rendez-vous.",
    author: "Fatima-zahra H.",
    occasion: "Mariage · Cocktail, dîner & brunch",
    source: "site",
  },
  {
    quote:
      "David and his team did an incredible job for our wedding at Chateau Soulac. Every piece of food served was out of this world. I cannot recommend him highly enough.",
    author: "Erika D.",
    occasion: "Mariage · Château Soulac",
    source: "site",
  },
  {
    quote: "A unique experience and exceptional welcoming.",
    author: "Jeremy Enaud",
    occasion: "Pavillon des Millésimes · Août 2025",
    source: "tripadvisor",
  },
  {
    quote:
      "Tout simplement parfait. Équipe agréable à notre service qui a fait preuve de souplesse sur les menus particuliers (végétarien, intolérance, allergie). Nos invités étaient ravis.",
    author: "Anne-Laure B.",
    occasion: "Baptême · Chef à domicile",
    source: "site",
  },
  {
    quote:
      "We oscillate between luxury and voluptuousness with this feeling of being at home !",
    author: "Isa",
    occasion: "Pavillon des Millésimes · Mai 2025",
    source: "tripadvisor",
  },
  {
    quote:
      "Évènement organisé sur l'Aerocampus avec l'équipe de David. Une équipe hyper pro et dévouée ! Une prestation qui a ravi les papilles et qui nous a permis de vivre un moment convivial et gourmand.",
    author: "Yannick R.",
    occasion: "Séminaire · Aerocampus",
    source: "site",
  },
  {
    quote:
      "Beautiful home with a charming decor in a relaxing setting with very attentive hosts.",
    author: "Jean-luc S.",
    occasion: "Pavillon des Millésimes · Avril 2026",
    source: "tripadvisor",
  },
  {
    quote: "What a wonderful time we had. Thank you to Nathalie and David.",
    author: "Isabelle I.",
    occasion: "Pavillon des Millésimes · Août 2025",
    source: "tripadvisor",
  },
  {
    quote: "I couldn't recommend Pavillon more highly.",
    author: "James M.",
    occasion: "Pavillon des Millésimes · Mars 2025",
    source: "tripadvisor",
  },
];

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduce = useReducedMotion();
  const isTripadvisor = t.source === "tripadvisor";

  return (
    <motion.article
      className="testimonial-item"
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.04, ease }}
      style={{
        display: "grid",
        gap: "1.2rem",
        padding: "1.65rem 0 1.9rem",
        borderTop: "1px solid rgba(var(--gold-rgb),0.16)",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div
          aria-label="Note de cinq étoiles"
          style={{ display: "flex", gap: 3 }}
        >
          {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} size={11} fill="var(--gold)" color="var(--gold)" />
          ))}
        </div>
        <span
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.46rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(var(--cream-rgb),0.68)",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {isTripadvisor ? "Tripadvisor" : "Avis vérifié"}
        </span>
      </div>

      <p
        className="testimonial-quote"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(1.35rem, 2.2vw, 2rem)",
          fontStyle: "italic",
          fontWeight: 300,
          lineHeight: 1.35,
          color: "rgba(var(--cream-rgb),0.86)",
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      <div
        className="testimonial-author"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <div
          style={{
            width: 18,
            height: 1,
            backgroundColor: "var(--gold)",
            opacity: 0.4,
            flexShrink: 0,
          }}
        />
        <div>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "rgba(var(--cream-rgb),0.86)",
            }}
          >
            {t.author}
          </p>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.52rem",
              letterSpacing: "0.1em",
              color: "rgba(var(--cream-rgb),0.64)",
              marginTop: "0.15rem",
            }}
          >
            {t.occasion}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function FeaturedTestimonial({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <RevealOnScroll variant={fadeUp}>
      <article
        className="testimonial-featured"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.62fr) minmax(240px, 0.38fr)",
          gap: "3rem",
          alignItems: "end",
          padding: "2.2rem 0 3rem",
          borderTop: "1px solid rgba(var(--bronze-rgb),0.22)",
          borderBottom: "1px solid rgba(var(--bronze-rgb),0.22)",
          marginBottom: "2.2rem",
        }}
      >
        <div>
          <div
            aria-label="Note de cinq étoiles"
            style={{ display: "flex", gap: 4, marginBottom: "1.4rem" }}
          >
            {Array.from({ length: 5 }).map((_, j) => (
              <Star key={j} size={13} fill="var(--gold)" color="var(--gold)" />
            ))}
          </div>
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(1rem, 2.1vw, 2rem)",
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1.12,
              color: "var(--cream)",
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            color: "rgba(var(--cream-rgb),0.74)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            Avis de réception
          </p>
          <div>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.76rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(var(--cream-rgb),0.86)",
                marginBottom: "0.3rem",
              }}
            >
              {t.author}
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.78rem",
                lineHeight: 1.7,
              }}
            >
              {t.occasion}
            </p>
          </div>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.82rem",
              lineHeight: 1.85,
              maxWidth: 320,
            }}
          >
            Le type de retour qui compte: pas seulement “bon”, mais fluide,
            généreux, rassurant et mémorable pour les invités.
          </p>
        </div>
      </article>
    </RevealOnScroll>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="temoignages"
      className="section-pad testimonials-section"
      aria-label="Témoignages clients"
      style={{
        backgroundColor: "var(--dark)",
        padding: "7.5rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="testimonials-shell"
        style={{ maxWidth: 1240, margin: "0 auto", padding: "0 2rem" }}
      >
        <div
          className="testimonials-header"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.85fr) minmax(260px, 0.36fr)",
            gap: "4rem",
            alignItems: "end",
            marginBottom: "4rem",
          }}
        >
          <div>
            <RevealOnScroll variant={fadeUp}>
              <Eyebrow light>Ils nous font confiance</Eyebrow>
            </RevealOnScroll>
            <HeadingReveal delay={0.08}>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2.45rem, 4.6vw, 4.35rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 0.95,
                  color: "var(--cream)",
                  letterSpacing: 0,
                }}
              >
                Quelques mots
                <br />
                après le service.
              </h3>
            </HeadingReveal>
          </div>
          <RevealOnScroll variant={fadeUp} custom={2}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.88rem",
                fontWeight: 300,
                lineHeight: 1.85,
                color: "rgba(var(--cream-rgb),0.76)",
                maxWidth: 360,
              }}
            >
              Mariages, séjours, baptêmes ou séminaires : des retours sobres,
              directs, et souvent très généreux.
            </p>
          </RevealOnScroll>
        </div>

        <FeaturedTestimonial t={testimonials[0]} />

        <div className="testimonials-grid">
          {testimonials.slice(1).map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>

        <RevealOnScroll variant={fadeUp} custom={2}>
          <div
            className="testimonials-footer"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1.5rem",
              alignItems: "center",
              paddingTop: "1.6rem",
              borderTop: "1px solid rgba(var(--gold-rgb),0.16)",
              marginTop: "1.6rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(var(--cream-rgb),0.66)",
              }}
            >
              Avis collectés sur Google, Tripadvisor &amp; site officiel
            </p>
            <motion.a
              href="/contact"
              whileHover={{ gap: "1rem" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <span>Échanger avec nous</span>
              <ArrowRight size={13} />
            </motion.a>
          </div>
        </RevealOnScroll>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: 4rem;
        }
        @media (max-width: 768px) {
          .testimonials-section {
            padding-top: 4.5rem !important;
            padding-bottom: 4.5rem !important;
          }
          .testimonials-shell {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .testimonials-header,
          .testimonials-grid,
          .testimonial-featured {
            grid-template-columns: 1fr !important;
          }
          .testimonials-header {
            gap: 1.5rem !important;
            margin-bottom: 2.5rem !important;
          }
          .testimonials-footer {
            align-items: flex-start !important;
            flex-direction: column !important;
          }
          .testimonial-item {
            gap: 1rem !important;
            padding: 1.45rem 0 1.65rem !important;
          }
          .testimonial-quote {
            font-size: clamp(1.18rem, 6.2vw, 1.45rem) !important;
            line-height: 1.42 !important;
          }
          .testimonial-author {
            align-items: flex-start !important;
          }
        }
        @media (max-width: 430px) {
          .testimonials-section h3 {
            font-size: 2.35rem !important;
            letter-spacing: 0 !important;
          }
          .testimonials-section {
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
          }
          .testimonials-header {
            margin-bottom: 2rem !important;
          }
          .testimonial-item > div:first-child span {
            font-size: 0.42rem !important;
            letter-spacing: 0.2em !important;
          }
          .testimonial-author p {
            word-break: normal !important;
            overflow-wrap: anywhere !important;
          }
          .testimonials-footer p {
            line-height: 1.7 !important;
            letter-spacing: 0.16em !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1050px) {
          .testimonials-header,
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );

}
