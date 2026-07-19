"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

import {
  ContactField,
  Eyebrow,
  HeadingReveal,
  IconInstagram,
  RevealOnScroll,
  fadeUp,
} from "./shared";

/* ════════════════════════════════════════════════════════════
   CONTACT — split layout with animated form
════════════════════════════════════════════════════════════ */
export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const nextErrors: Record<string, string> = {};
    const requiredFields = [
      ["name", "Indiquez votre nom."],
      ["email", "Indiquez une adresse email."],
      ["phone", "Indiquez votre numéro de téléphone."],
      ["eventType", "Précisez le type d'événement."],
      ["message", "Ajoutez quelques mots sur votre demande."],
    ] as const;

    requiredFields.forEach(([field, message]) => {
      if (!String(formData.get(field) || "").trim()) {
        nextErrors[field] = message;
      }
    });

    const email = String(formData.get("email") || "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "L'adresse email semble incomplète.";
    }

    const phone = String(formData.get("phone") || "").trim();
    const phoneDigits = phone.replace(/\D/g, "");
    if (
      phone &&
      (!/^[+\d][\d\s().-]*$/.test(phone) ||
        phoneDigits.length < 10 ||
        phoneDigits.length > 15)
    ) {
      nextErrors.phone = "Le numéro de téléphone semble invalide.";
    }

    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        }
        setSubmitError(
          result.message ||
            "Impossible d'envoyer le message pour le moment. Merci d'essayer à nouveau.",
        );
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitError(
        "La connexion a échoué. Merci d'essayer à nouveau ou d'écrire directement à contact@david-chambaud.fr.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-pad contact-section"
      aria-label="Contact et demande de devis"
      style={{
        background:
          "linear-gradient(135deg, rgba(var(--cream-rgb),0.96) 0%, rgba(var(--cream-rgb),0.82) 28%, rgba(var(--sage-rgb),0.72) 68%, rgba(var(--olive-rgb),0.84) 100%)",
        padding: "7.5rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="contact-shell"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.78fr) minmax(360px, 0.72fr)",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          <div className="contact-intro">
            <RevealOnScroll variant={fadeUp}>
              <Eyebrow>Contact</Eyebrow>
            </RevealOnScroll>
            <HeadingReveal delay={0.08}>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2.45rem, 4.6vw, 4.35rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 0.96,
                  color: "var(--charcoal)",
                  letterSpacing: 0,
                  marginTop: "1rem",
                }}
              >
                Une date,
                <br />
                un lieu, une envie.
              </h3>
            </HeadingReveal>

            <RevealOnScroll variant={fadeUp} custom={2}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.92rem",
                  fontWeight: 300,
                  color: "rgba(var(--charcoal-rgb),0.78)",
                  lineHeight: 1.9,
                  maxWidth: 540,
                  marginTop: "1.5rem",
                }}
              >
                Racontez-nous l&apos;ambiance, le nombre d&apos;invités, vos
                goûts et ce qui compte le plus pour vous. David vous aide
                ensuite à transformer l&apos;idée en réception concrète.
              </p>
            </RevealOnScroll>

            <RevealOnScroll variant={fadeUp} custom={3}>
              <div
                className="contact-details"
                style={{
                  display: "grid",
                  gap: "1.15rem",
                  marginTop: "3rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(var(--charcoal-rgb),0.12)",
                }}
              >
                {[
                  {
                    href: "tel:+33650754406",
                    icon: (
                      <Phone size={15} color="var(--gold)" strokeWidth={1.5} />
                    ),
                    label: "+33 6 50 75 44 06",
                    meta: "Téléphone",
                  },
                  {
                    href: "mailto:contact@david-chambaud.fr",
                    icon: (
                      <Mail size={15} color="var(--gold)" strokeWidth={1.5} />
                    ),
                    label: "contact@david-chambaud.fr",
                    meta: "Email",
                  },
                  {
                    href: "https://www.instagram.com/chambauddavid",
                    icon: <IconInstagram size={14} color="var(--gold)" />,
                    label: "@chambauddavid",
                    meta: "Instagram",
                  },
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 160, damping: 18 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.8rem 1fr",
                      gap: "0.8rem",
                      alignItems: "center",
                      color: "var(--charcoal)",
                      textDecoration: "none",
                    }}
                  >
                    <span aria-hidden>{item.icon}</span>
                    <span>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-montserrat), sans-serif",
                          fontSize: "0.54rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "rgba(var(--charcoal-rgb),0.62)",
                          marginBottom: "0.18rem",
                        }}
                      >
                        {item.meta}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-montserrat), sans-serif",
                          fontSize: "0.86rem",
                          color: "rgba(var(--charcoal-rgb),0.78)",
                        }}
                      >
                        {item.label}
                      </span>
                    </span>
                  </motion.a>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant={fadeUp} custom={4}>
              <div
                className="contact-note"
                style={{
                  marginTop: "3rem",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "1rem",
                  alignItems: "start",
                  color: "rgba(var(--charcoal-rgb),0.74)",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    width: 28,
                    height: 1,
                    backgroundColor: "var(--gold)",
                    marginTop: "0.65rem",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.78rem",
                    lineHeight: 1.75,
                    maxWidth: 430,
                  }}
                >
                  Réponse sous 24 à 48 h ouvrées. Pour un mariage ou une demande
                  proche, le téléphone reste le plus direct.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant={fadeUp} custom={5}>
              <div
                className="contact-brief"
                style={{
                  marginTop: "2.5rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {[
                  ["Le lieu", "Domaine, maison, salle ou lieu à confirmer."],
                  ["Le rythme", "Cocktail, dîner, brunch, retour de soirée."],
                  ["Les invités", "Nombre approximatif, enfants, régimes."],
                  [
                    "L'envie",
                    "Champêtre, gastronomique, familial, très festif.",
                  ],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    style={{
                      padding: "1rem",
                      border: "1px solid rgba(var(--charcoal-rgb),0.1)",
                      backgroundColor: "rgba(var(--cream-rgb),0.34)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "0.56rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        marginBottom: "0.45rem",
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "0.76rem",
                        lineHeight: 1.55,
                        color: "rgba(var(--charcoal-rgb),0.72)",
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll variant={fadeUp} custom={1}>
            <div
              className="contact-form-panel"
              style={{
                background:
                  "linear-gradient(145deg, rgba(var(--charcoal-rgb),0.98) 0%, rgba(var(--olive-rgb),0.96) 100%)",
                border: "1px solid rgba(var(--gold-rgb),0.26)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 34px 90px -56px rgba(var(--charcoal-rgb),0.72)",
                padding: "2.15rem",
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    minHeight: 420,
                    display: "grid",
                    alignContent: "center",
                    justifyItems: "start",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 1,
                      backgroundColor: "var(--gold)",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "2.15rem",
                      fontStyle: "italic",
                      color: "var(--cream)",
                      lineHeight: 1,
                    }}
                  >
                    Message envoyé
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 300,
                      color: "rgba(var(--cream-rgb),0.74)",
                      lineHeight: 1.8,
                      maxWidth: 390,
                    }}
                  >
                    David vous contactera dans les plus brefs délais pour
                    discuter de votre événement.
                  </p>
                </motion.div>
              ) : (
                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ display: "none" }}
                  />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                    className="contact-form-two"
                  >
                    <ContactField
                      label="Votre nom"
                      name="name"
                      error={errors.name}
                      required
                    />
                    <ContactField
                      label="Votre email"
                      name="email"
                      type="email"
                      error={errors.email}
                      required
                    />
                  </div>
                  <ContactField
                    label="Votre téléphone"
                    name="phone"
                    type="tel"
                    helper="Ex. 06 50 75 44 06"
                    error={errors.phone}
                    required
                  />
                  <ContactField
                    label="Type d'événement"
                    name="eventType"
                    helper="Mariage, réception privée, dîner, séminaire..."
                    error={errors.eventType}
                    required
                  />
                  <ContactField
                    label="Lieu de réception"
                    name="location"
                    helper="Ville, domaine ou lieu encore à confirmer."
                  />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                    className="contact-form-two contact-form-compact"
                  >
                    <ContactField
                      label="Invités"
                      name="guests"
                      type="number"
                      helper="Une estimation suffit."
                    />
                    <ContactField
                      label="Date"
                      name="date"
                      type="text"
                      helper="Même approximative."
                    />
                  </div>
                  <ContactField
                    label="Votre message"
                    name="message"
                    textarea
                    helper="Le style du repas, vos contraintes, vos premières envies."
                    error={errors.message}
                    required
                  />

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{
                      backgroundColor: "var(--cream)",
                      color: "var(--charcoal)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 160, damping: 18 }}
                    style={{
                      width: "100%",
                      padding: "1.1rem",
                      backgroundColor: "var(--gold)",
                      color: "var(--charcoal)",
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      border: "1px solid rgba(var(--gold-rgb),0.72)",
                      cursor: isSubmitting ? "wait" : "pointer",
                      opacity: isSubmitting ? 0.72 : 1,
                      marginTop: "0.25rem",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.2), 0 16px 34px -28px rgba(var(--dark-rgb),0.76)",
                    }}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
                  </motion.button>
                  {submitError && (
                    <p
                      role="alert"
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "0.72rem",
                        lineHeight: 1.55,
                        color: "rgba(245,190,170,0.95)",
                        marginTop: "0.75rem",
                      }}
                    >
                      {submitError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-section {
            padding-top: 4.5rem !important;
            padding-bottom: 4.5rem !important;
          }
          .contact-shell {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .contact-grid,
          .contact-form-two {
            grid-template-columns: 1fr !important;
          }
          .contact-form-compact {
            grid-template-columns: 1fr 1fr !important;
          }
          .contact-grid {
            gap: 2.5rem !important;
          }
          .contact-details {
            margin-top: 2.25rem !important;
          }
          .contact-note {
            margin-top: 2.25rem !important;
          }
          .contact-brief {
            grid-template-columns: 1fr !important;
            margin-top: 2rem !important;
          }
          .contact-form-panel {
            padding: 1.15rem !important;
          }
        }

        @media (max-width: 430px) {
          .contact-section h3 {
            font-size: 2.35rem !important;
            letter-spacing: 0 !important;
          }
          .contact-field input,
          .contact-field textarea {
            font-size: 0.84rem !important;
          }
          .contact-form {
            display: grid !important;
            gap: 0.15rem !important;
          }
        }

        @media (max-width: 360px) {
          .contact-form-compact {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
