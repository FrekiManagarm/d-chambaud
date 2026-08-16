import type { GlobalConfig } from "payload";

const imageRelationship = (name: string, label: string) =>
  ({
    name,
    type: "relationship",
    label,
    relationTo: "media",
  }) as const;

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Accueil",
  access: {
    read: () => true,
  },
  admin: {
    group: "Contenu",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Images principales",
          fields: [
            imageRelationship("heroImage", "Image du hero"),
            imageRelationship("aboutImage", "Portrait / image à propos"),
            imageRelationship(
              "valuesPrimaryImage",
              "Image éditoriale principale",
            ),
            imageRelationship(
              "valuesSecondaryImage",
              "Image éditoriale secondaire",
            ),
            imageRelationship(
              "valuesBridgeImage",
              "Grande image de transition",
            ),
          ],
        },
        {
          label: "Hero & bandeau",
          fields: [
            {
              name: "hero",
              type: "group",
              label: "Section hero",
              fields: [
                {
                  name: "locationLine",
                  type: "text",
                  label: "Ligne de localisation",
                  localized: true,
                  defaultValue: "Nouvelle‑Aquitaine · Bordeaux · Saint‑Émilion",
                },
                {
                  name: "titleWords",
                  type: "text",
                  label: "Titre - début (animé mot à mot)",
                  localized: true,
                  defaultValue: "L'Art de la",
                },
                {
                  name: "titleAccent",
                  type: "text",
                  label: "Titre - mot en surbrillance",
                  localized: true,
                  defaultValue: "Gastronomie",
                },
                {
                  name: "subtitle",
                  type: "text",
                  label: "Sous-titre",
                  localized: true,
                  defaultValue: "L'histoire d'une cuisine gourmande",
                },
                {
                  name: "tagline",
                  type: "text",
                  label: "Ligne de prestations",
                  localized: true,
                  defaultValue:
                    "Traiteur · Chef à Domicile · Réceptions · Mariages",
                },
                {
                  name: "primaryCtaLabel",
                  type: "text",
                  label: "Libellé du bouton principal",
                  localized: true,
                  defaultValue: "Demander un Devis",
                },
                {
                  name: "secondaryCtaLabel",
                  type: "text",
                  label: "Libellé du bouton secondaire",
                  localized: true,
                  defaultValue: "Découvrir",
                },
              ],
            },
            {
              name: "marquee",
              type: "group",
              label: "Bandeau défilant",
              fields: [
                {
                  name: "items",
                  type: "array",
                  label: "Phrases",
                  labels: {
                    singular: "Phrase",
                    plural: "Phrases",
                  },
                  fields: [
                    {
                      name: "text",
                      type: "text",
                      label: "Texte",
                      localized: true,
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Services",
          fields: [
            {
              name: "serviceImages",
              type: "group",
              label: "Images des prestations",
              fields: [
                imageRelationship("traiteur", "Traiteur"),
                imageRelationship("mariages", "Mariages"),
                imageRelationship("chefADomicile", "Chef à domicile"),
                imageRelationship("receptions", "Réceptions"),
              ],
            },
            {
              name: "servicesText",
              type: "group",
              label: "Textes des prestations",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Petit titre",
                  localized: true,
                  defaultValue: "Nos Prestations",
                },
                {
                  name: "titleLineOne",
                  type: "text",
                  label: "Titre - ligne 1",
                  localized: true,
                  defaultValue: "Le bon format",
                },
                {
                  name: "titleLineTwo",
                  type: "text",
                  label: "Titre - ligne 2",
                  localized: true,
                  defaultValue: "pour votre évènement.",
                },
                {
                  name: "intro",
                  type: "textarea",
                  label: "Texte d'introduction",
                  localized: true,
                  defaultValue:
                    "Pas de formule plaquée: le service, les quantités et le rythme s'adaptent au lieu, à la météo et au style de vos invités.",
                },
                {
                  name: "traiteur",
                  type: "group",
                  label: "Traiteur",
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      label: "Titre",
                      localized: true,
                      defaultValue: "Traiteur",
                    },
                    {
                      name: "sub",
                      type: "text",
                      label: "Sous-titre",
                      localized: true,
                      defaultValue: "Réceptions",
                    },
                    {
                      name: "desc",
                      type: "textarea",
                      label: "Description",
                      localized: true,
                      defaultValue:
                        "Cocktails dinatoires, buffets dessinés pour circuler, repas assis et formats hybrides pour donner du relief à vos invités.",
                    },
                  ],
                },
                {
                  name: "mariages",
                  type: "group",
                  label: "Mariages",
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      label: "Titre",
                      localized: true,
                      defaultValue: "Mariages",
                    },
                    {
                      name: "sub",
                      type: "text",
                      label: "Sous-titre",
                      localized: true,
                      defaultValue: "Célébrations",
                    },
                    {
                      name: "desc",
                      type: "textarea",
                      label: "Description",
                      localized: true,
                      defaultValue:
                        "Du vin d'honneur au dîner puis au brunch, une prestation pensée pour tenir la journée sans perdre la gourmandise.",
                    },
                  ],
                },
                {
                  name: "chefADomicile",
                  type: "group",
                  label: "Chef à domicile",
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      label: "Titre",
                      localized: true,
                      defaultValue: "Chef à Domicile",
                    },
                    {
                      name: "sub",
                      type: "text",
                      label: "Sous-titre",
                      localized: true,
                      defaultValue: "Service Privé",
                    },
                    {
                      name: "desc",
                      type: "textarea",
                      label: "Description",
                      localized: true,
                      defaultValue:
                        "Une expérience à la maison, en petit comité, avec le confort d'un service précis et l'intensité d'une vraie table.",
                    },
                  ],
                },
                {
                  name: "receptions",
                  type: "group",
                  label: "Réceptions",
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      label: "Titre",
                      localized: true,
                      defaultValue: "Réceptions",
                    },
                    {
                      name: "sub",
                      type: "text",
                      label: "Sous-titre",
                      localized: true,
                      defaultValue: "Tous Événements",
                    },
                    {
                      name: "desc",
                      type: "textarea",
                      label: "Description",
                      localized: true,
                      defaultValue:
                        "Séminaires, baptêmes, anniversaires, lancements: une cuisine qui rassemble sans faire perdre le fil de l'événement.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Galerie",
          fields: [
            {
              name: "galleryText",
              type: "group",
              label: "Texte de la section galerie",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Petit titre",
                  localized: true,
                  defaultValue: "Nos Réalisations",
                },
                {
                  name: "titleLineOne",
                  type: "text",
                  label: "Titre - ligne 1",
                  localized: true,
                  defaultValue: "Des images qui",
                },
                {
                  name: "titleLineTwo",
                  type: "text",
                  label: "Titre - ligne 2",
                  localized: true,
                  defaultValue: "donnent faim.",
                },
                {
                  name: "intro",
                  type: "textarea",
                  label: "Texte d'introduction",
                  localized: true,
                  defaultValue:
                    "Une galerie vivante, entre gestes de service, dressages nets et tables prêtes à recevoir.",
                },
              ],
            },
            {
              name: "gallery",
              type: "array",
              label: "Photos de la galerie",
              labels: {
                singular: "Photo",
                plural: "Photos",
              },
              maxRows: 12,
              fields: [
                imageRelationship("image", "Image"),
                {
                  name: "title",
                  type: "text",
                  label: "Titre",
                  localized: true,
                },
                {
                  name: "note",
                  type: "text",
                  label: "Note courte",
                  localized: true,
                },
                {
                  name: "alt",
                  type: "text",
                  label: "Texte alternatif",
                  localized: true,
                },
                {
                  name: "position",
                  type: "text",
                  defaultValue: "center center",
                  label: "Position CSS de l'image",
                },
              ],
            },
          ],
        },
        {
          label: "Pavillon",
          fields: [
            {
              name: "pavillonImages",
              type: "group",
              label: "Images du Pavillon",
              fields: [
                imageRelationship("main", "Image principale"),
                imageRelationship("portrait", "Image verticale"),
                imageRelationship("table", "Image de table"),
                imageRelationship("stripOne", "Bandeau 1"),
                imageRelationship("stripTwo", "Bandeau 2"),
                imageRelationship("stripThree", "Bandeau 3"),
              ],
            },
            {
              name: "pavillonText",
              type: "group",
              label: "Texte du Pavillon",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Petit titre",
                  localized: true,
                  defaultValue: "Le lieu de David & Nathalie",
                },
                {
                  name: "titleLineOne",
                  type: "text",
                  label: "Titre - ligne 1",
                  localized: true,
                  defaultValue: "Une parenthèse",
                },
                {
                  name: "titleLineTwo",
                  type: "text",
                  label: "Titre - ligne 2",
                  localized: true,
                  defaultValue: "où l'on reste.",
                },
                {
                  name: "intro",
                  type: "textarea",
                  label: "Texte d'introduction",
                  localized: true,
                  defaultValue:
                    "Le Pavillon des Millésimes n'est pas seulement une adresse à visiter. C'est une maison où le repas, la chambre et le lendemain se répondent avec la même attention.",
                },
                {
                  name: "badgeKicker",
                  type: "text",
                  label: "Badge - petit titre",
                  localized: true,
                  defaultValue: "Maison confidentielle",
                },
                {
                  name: "badgeQuote",
                  type: "text",
                  label: "Badge - citation",
                  localized: true,
                  defaultValue: "Dormir sur place, dîner juste, repartir lentement.",
                },
                {
                  name: "points",
                  type: "array",
                  label: "Points clés",
                  labels: {
                    singular: "Point",
                    plural: "Points",
                  },
                  minRows: 3,
                  maxRows: 3,
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      label: "Titre",
                      localized: true,
                      required: true,
                    },
                    {
                      name: "text",
                      type: "textarea",
                      label: "Texte",
                      localized: true,
                      required: true,
                    },
                  ],
                  defaultValue: [
                    {
                      label: "Table d'hôtes",
                      text: "Une cuisine bistronomique en quatre temps, pensée comme un dîner de maison très soigné.",
                    },
                    {
                      label: "Chambres",
                      text: "Des espaces calmes pour prolonger un mariage, une escapade ou un week-end gourmand.",
                    },
                    {
                      label: "Adresse",
                      text: "Une maison de caractère en Nouvelle-Aquitaine, entre intimité, vin et art de recevoir.",
                    },
                  ],
                },
                {
                  name: "linkUrl",
                  type: "text",
                  label: "Lien externe",
                  defaultValue: "https://www.pavillon-des-millesimes.com",
                },
                {
                  name: "linkLabel",
                  type: "text",
                  label: "Libellé du lien",
                  localized: true,
                  defaultValue: "Découvrir le lieu",
                },
                {
                  name: "linkNote",
                  type: "textarea",
                  label: "Texte à côté du lien",
                  localized: true,
                  defaultValue:
                    "Table d'hôtes sur réservation, séjour et cuisine de saison au même endroit.",
                },
                {
                  name: "stripKicker",
                  type: "text",
                  label: "Bandeau - petit titre",
                  localized: true,
                  defaultValue: "Séjour gourmand",
                },
                {
                  name: "stripTitle",
                  type: "text",
                  label: "Bandeau - titre",
                  localized: true,
                  defaultValue: "Quand le dîner devient le centre d'un week-end.",
                },
              ],
            },
          ],
        },
        {
          label: "Valeurs & Stats",
          fields: [
            {
              name: "values",
              type: "group",
              label: "Section valeurs",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Petit titre",
                  localized: true,
                  defaultValue: "Scénographie culinaire",
                },
                {
                  name: "titleLineOne",
                  type: "text",
                  label: "Titre - ligne 1",
                  localized: true,
                  defaultValue: "Un repas ne se pose pas",
                },
                {
                  name: "titleLineTwo",
                  type: "text",
                  label: "Titre - ligne 2",
                  localized: true,
                  defaultValue: "sur une table.",
                },
                {
                  name: "intro",
                  type: "textarea",
                  label: "Texte d'introduction",
                  localized: true,
                  defaultValue:
                    "Il se construit comme une progression: l'arrivée, la première bouchée, le plat que l'on attend, le dessert qui signe la soirée. C'est cette montée que David dessine.",
                },
                {
                  name: "signatureKicker",
                  type: "text",
                  label: "Badge - petit titre",
                  localized: true,
                  defaultValue: "Signature",
                },
                {
                  name: "signatureQuote",
                  type: "text",
                  label: "Badge - citation",
                  localized: true,
                  defaultValue: "Gourmandise, élégance, précision ...",
                },
                {
                  name: "bands",
                  type: "array",
                  label: "Étapes",
                  labels: {
                    singular: "Étape",
                    plural: "Étapes",
                  },
                  minRows: 3,
                  maxRows: 3,
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      label: "Titre",
                      localized: true,
                      required: true,
                    },
                    {
                      name: "desc",
                      type: "textarea",
                      label: "Description",
                      localized: true,
                      required: true,
                    },
                  ],
                  defaultValue: [
                    {
                      title: "L'arrivée donne le ton",
                      desc: "Un cocktail qui se lit vite, circule bien et installe l'énergie de la fête sans bloquer les invités autour d'un buffet.",
                    },
                    {
                      title: "Le dîner tient la salle",
                      desc: "Cuissons, envois, dressages et transitions sont pensés pour garder le repas vivant, même avec une grande tablée.",
                    },
                    {
                      title: "La fin reste en bouche",
                      desc: "Desserts, fromages, brunch ou retour de soirée: les derniers moments gardent la même attention que la première coupe.",
                    },
                  ],
                },
              ],
            },
            {
              name: "stats",
              type: "group",
              label: "Section chiffres clés",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Petit titre",
                  localized: true,
                  defaultValue: "Ce que vous achetez vraiment",
                },
                {
                  name: "titleLineOne",
                  type: "text",
                  label: "Titre - ligne 1",
                  localized: true,
                  defaultValue: "Du calme",
                },
                {
                  name: "titleLineTwo",
                  type: "text",
                  label: "Titre - ligne 2",
                  localized: true,
                  defaultValue: "pendant l'intense.",
                },
                {
                  name: "intro",
                  type: "textarea",
                  label: "Texte d'introduction",
                  localized: true,
                  defaultValue:
                    "Le jour d'un mariage, tout bouge. La valeur d'un traiteur, c'est de rendre la cuisine invisible dans l'effort et évidente dans le plaisir.",
                },
                {
                  name: "items",
                  type: "array",
                  label: "Chiffres",
                  labels: {
                    singular: "Chiffre",
                    plural: "Chiffres",
                  },
                  minRows: 4,
                  maxRows: 4,
                  fields: [
                    {
                      name: "value",
                      type: "number",
                      label: "Valeur",
                      required: true,
                    },
                    {
                      name: "suffix",
                      type: "text",
                      label: "Suffixe (ex: +, %, ans)",
                      localized: true,
                    },
                    {
                      name: "label",
                      type: "text",
                      label: "Libellé",
                      localized: true,
                      required: true,
                    },
                    {
                      name: "detail",
                      type: "text",
                      label: "Détail",
                      localized: true,
                    },
                  ],
                  defaultValue: [
                    {
                      value: 25,
                      suffix: " ans",
                      label: "d'expérience",
                      detail: "",
                    },
                    {
                      value: 500,
                      suffix: "+",
                      label: "Prestations servies",
                      detail: "Mariages, domaines, séminaires",
                    },
                    {
                      value: 48,
                      suffix: "h",
                      label: "Premier retour",
                      detail: "Pour cadrer votre demande",
                    },
                    {
                      value: 99,
                      suffix: "%",
                      label: "Clients satisfaits",
                      detail: "Recommandation & fidélité",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Témoignages",
          fields: [
            {
              name: "testimonials",
              type: "group",
              label: "Section témoignages",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Petit titre",
                  localized: true,
                  defaultValue: "Ils nous font confiance",
                },
                {
                  name: "titleLineOne",
                  type: "text",
                  label: "Titre - ligne 1",
                  localized: true,
                  defaultValue: "Quelques mots",
                },
                {
                  name: "titleLineTwo",
                  type: "text",
                  label: "Titre - ligne 2",
                  localized: true,
                  defaultValue: "après le service.",
                },
                {
                  name: "intro",
                  type: "textarea",
                  label: "Texte d'introduction",
                  localized: true,
                  defaultValue:
                    "Mariages, séjours, baptêmes ou séminaires : des retours sobres, directs, et souvent très généreux.",
                },
                {
                  name: "featuredNote",
                  type: "textarea",
                  label: "Texte à côté de l'avis mis en avant",
                  localized: true,
                  defaultValue:
                    "Le type de retour qui compte: pas seulement “bon”, mais fluide, généreux, rassurant et mémorable pour les invités.",
                },
                {
                  name: "footerNote",
                  type: "text",
                  label: "Mention sous les avis",
                  localized: true,
                  defaultValue:
                    "Avis collectés sur Google, Tripadvisor & site officiel",
                },
                {
                  name: "ctaLabel",
                  type: "text",
                  label: "Libellé du lien",
                  localized: true,
                  defaultValue: "Échanger avec nous",
                },
                {
                  name: "items",
                  type: "array",
                  label: "Avis",
                  labels: {
                    singular: "Avis",
                    plural: "Avis",
                  },
                  admin: {
                    description:
                      "Le premier avis de la liste est mis en avant en haut de la section.",
                  },
                  fields: [
                    {
                      name: "quote",
                      type: "textarea",
                      label: "Citation",
                      localized: true,
                      required: true,
                    },
                    {
                      name: "author",
                      type: "text",
                      label: "Auteur",
                      localized: true,
                      required: true,
                    },
                    {
                      name: "occasion",
                      type: "text",
                      label: "Contexte",
                      localized: true,
                    },
                    {
                      name: "source",
                      type: "select",
                      label: "Source",
                      defaultValue: "site",
                      options: [
                        { label: "Avis vérifié (site)", value: "site" },
                        { label: "Tripadvisor", value: "tripadvisor" },
                      ],
                    },
                  ],
                  defaultValue: [
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
                      quote:
                        "What a wonderful time we had. Thank you to Nathalie and David.",
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
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Clients & Zones",
          fields: [
            {
              name: "clients",
              type: "group",
              label: "Section références",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Petit titre",
                  localized: true,
                  defaultValue: "Références",
                },
                {
                  name: "titleLineOne",
                  type: "text",
                  label: "Titre - ligne 1",
                  localized: true,
                  defaultValue: "Des lieux exigeants,",
                },
                {
                  name: "titleLineTwo",
                  type: "text",
                  label: "Titre - ligne 2",
                  localized: true,
                  defaultValue: "des repas remarqués.",
                },
                {
                  name: "intro",
                  type: "textarea",
                  label: "Texte d'introduction",
                  localized: true,
                  defaultValue:
                    "Châteaux, domaines viticoles, entreprises et institutions: le décor change, l'exigence reste la même.",
                },
                {
                  name: "logos",
                  type: "array",
                  label: "Logos",
                  labels: {
                    singular: "Logo",
                    plural: "Logos",
                  },
                  admin: {
                    description:
                      "Laissez vide pour garder les logos par défaut du site.",
                  },
                  fields: [
                    imageRelationship("image", "Logo"),
                    {
                      name: "alt",
                      type: "text",
                      label: "Nom (texte alternatif)",
                      localized: true,
                    },
                  ],
                },
              ],
            },
            {
              name: "serviceAreasText",
              type: "group",
              label: "Section zones d'intervention",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Petit titre",
                  localized: true,
                  defaultValue: "Zones d'intervention",
                },
                {
                  name: "title",
                  type: "text",
                  label: "Titre",
                  localized: true,
                  defaultValue: "Une table ancrée à Bordeaux, mobile en Gironde.",
                },
              ],
            },
          ],
        },
        {
          label: "Contact & CTA final",
          fields: [
            {
              name: "contact",
              type: "group",
              label: "Section contact",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Petit titre",
                  localized: true,
                  defaultValue: "Contact",
                },
                {
                  name: "titleLineOne",
                  type: "text",
                  label: "Titre - ligne 1",
                  localized: true,
                  defaultValue: "Une date,",
                },
                {
                  name: "titleLineTwo",
                  type: "text",
                  label: "Titre - ligne 2",
                  localized: true,
                  defaultValue: "un lieu, une envie.",
                },
                {
                  name: "intro",
                  type: "textarea",
                  label: "Texte d'introduction",
                  localized: true,
                  defaultValue:
                    "Racontez-nous l'ambiance, le nombre d'invités, vos goûts et ce qui compte le plus pour vous. David vous aide ensuite à transformer l'idée en réception concrète.",
                },
                {
                  name: "responseNote",
                  type: "textarea",
                  label: "Mention délai de réponse",
                  localized: true,
                  defaultValue:
                    "Réponse sous 24 à 48 h ouvrées. Pour un mariage ou une demande proche, le téléphone reste le plus direct.",
                },
                {
                  name: "briefItems",
                  type: "array",
                  label: "Points à préciser",
                  labels: {
                    singular: "Point",
                    plural: "Points",
                  },
                  minRows: 4,
                  maxRows: 4,
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      label: "Titre",
                      localized: true,
                      required: true,
                    },
                    {
                      name: "desc",
                      type: "text",
                      label: "Description",
                      localized: true,
                      required: true,
                    },
                  ],
                  defaultValue: [
                    {
                      title: "Le lieu",
                      desc: "Domaine, maison, salle ou lieu à confirmer.",
                    },
                    {
                      title: "Le rythme",
                      desc: "Cocktail, dîner, brunch, retour de soirée.",
                    },
                    {
                      title: "Les invités",
                      desc: "Nombre approximatif, enfants, régimes.",
                    },
                    {
                      title: "L'envie",
                      desc: "Champêtre, gastronomique, familial, très festif.",
                    },
                  ],
                },
              ],
            },
            {
              name: "finalCta",
              type: "group",
              label: "Section CTA final",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Petit titre",
                  localized: true,
                  defaultValue: "Demande de devis",
                },
                {
                  name: "titleLineOne",
                  type: "text",
                  label: "Titre - ligne 1",
                  localized: true,
                  defaultValue: "Une date à poser,",
                },
                {
                  name: "titleLineTwo",
                  type: "text",
                  label: "Titre - ligne 2",
                  localized: true,
                  defaultValue: "une réception à imaginer.",
                },
                {
                  name: "ctaLabel",
                  type: "text",
                  label: "Libellé du bouton",
                  localized: true,
                  defaultValue: "Accéder au formulaire",
                },
              ],
            },
            {
              name: "footer",
              type: "group",
              label: "Pied de page",
              fields: [
                {
                  name: "tagline",
                  type: "textarea",
                  label: "Texte de présentation",
                  localized: true,
                  defaultValue:
                    "Cuisine de réception, chef à domicile et accompagnement événementiel pour les tables privées et professionnelles en Nouvelle-Aquitaine.",
                },
              ],
            },
          ],
        },
        {
          label: "À propos",
          fields: [
            {
              name: "about",
              type: "group",
              label: "Section à propos",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Petit titre",
                  localized: true,
                  defaultValue: "À Propos",
                },
                {
                  name: "titleLineOne",
                  type: "text",
                  label: "Titre - ligne 1",
                  localized: true,
                  defaultValue: "Le chef que l'on choisit",
                },
                {
                  name: "titleLineTwo",
                  type: "text",
                  label: "Titre - ligne 2",
                  localized: true,
                  defaultValue: "quand le repas compte vraiment.",
                },
                {
                  name: "firstParagraph",
                  type: "textarea",
                  label: "Premier paragraphe",
                  localized: true,
                  defaultValue:
                    "David Chambaud accompagne les mariages, réceptions privées et événements professionnels avec une cuisine lisible, généreuse et tenue jusqu'au dernier service.",
                },
                {
                  name: "secondParagraph",
                  type: "textarea",
                  label: "Deuxième paragraphe",
                  localized: true,
                  defaultValue:
                    "Son approche réunit le goût du produit, l'exigence du dressage et une organisation discrète: les invités voient la fluidité, jamais la mécanique.",
                },
                {
                  name: "quote",
                  type: "textarea",
                  label: "Citation",
                  localized: true,
                  defaultValue:
                    "Un événement réussi se reconnaît à ce que les invités ressentent: le plaisir, le rythme, l'évidence.",
                },
                {
                  name: "quoteAuthor",
                  type: "text",
                  label: "Auteur de la citation",
                  localized: true,
                  defaultValue: "David Chambaud",
                },
                {
                  name: "ctaLabel",
                  type: "text",
                  label: "Libellé du lien",
                  localized: true,
                  defaultValue: "Prendre contact",
                },
              ],
            },
          ],
        },
        {
          label: "Tarifs",
          fields: [
            {
              name: "pricing",
              type: "group",
              label: "Section tarifs",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Petit titre",
                  localized: true,
                  defaultValue: "Tarifs 2026-27",
                },
                {
                  name: "titleLineOne",
                  type: "text",
                  label: "Titre - ligne 1",
                  localized: true,
                  defaultValue: "Des bases claires",
                },
                {
                  name: "titleLineTwo",
                  type: "text",
                  label: "Titre - ligne 2",
                  localized: true,
                  defaultValue: "pour décider sereinement.",
                },
                {
                  name: "intro",
                  type: "textarea",
                  label: "Texte d'introduction",
                  localized: true,
                  defaultValue:
                    "Les prix donnent un point de départ. Le devis affine ensuite le menu, l'équipe, le matériel et le rythme réel de votre journée.",
                },
                {
                  name: "footerNote",
                  type: "textarea",
                  label: "Mention sous les tarifs",
                  localized: true,
                  defaultValue:
                    "Les tarifs sont indicatifs et hors boissons, transport, matériel et mobilier sauf mention contraire.",
                },
                {
                  name: "ctaLabel",
                  type: "text",
                  label: "Libellé du bouton",
                  localized: true,
                  defaultValue: "Demander un devis",
                },
                {
                  name: "years",
                  type: "array",
                  label: "Années tarifaires",
                  labels: {
                    singular: "Année tarifaire",
                    plural: "Années tarifaires",
                  },
                  admin: {
                    description:
                      "Créez une ligne par saison tarifaire. Si une année est marquée comme affichée, le site utilisera celle-ci.",
                  },
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      label: "Année / saison",
                      required: true,
                      defaultValue: "2026-27",
                    },
                    {
                      name: "isActive",
                      type: "checkbox",
                      label: "Afficher cette année sur le site",
                      defaultValue: false,
                    },
                    {
                      name: "categories",
                      type: "array",
                      label: "Catégories d'offres",
                      labels: {
                        singular: "Catégorie",
                        plural: "Catégories",
                      },
                      fields: [
                        {
                          name: "label",
                          type: "text",
                          label: "Nom de l'onglet",
                          localized: true,
                          required: true,
                        },
                        {
                          name: "summaryLabel",
                          type: "text",
                          label: "Libellé à droite du titre",
                          localized: true,
                          defaultValue: "Sur mesure",
                        },
                        {
                          name: "offers",
                          type: "array",
                          label: "Offres",
                          labels: {
                            singular: "Offre",
                            plural: "Offres",
                          },
                          fields: [
                            {
                              name: "name",
                              type: "text",
                              label: "Nom de l'offre",
                              localized: true,
                              required: true,
                            },
                            {
                              name: "price",
                              type: "text",
                              label: "Prix",
                              localized: true,
                              required: true,
                            },
                            {
                              name: "unit",
                              type: "text",
                              label: "Unité",
                              localized: true,
                              defaultValue: "€ / pers.",
                            },
                            {
                              name: "sub",
                              type: "text",
                              label: "Sous-titre",
                              localized: true,
                            },
                            {
                              name: "tone",
                              type: "textarea",
                              label: "Phrase d'ambiance",
                              localized: true,
                            },
                            {
                              name: "detail",
                              type: "textarea",
                              label: "Détail",
                              localized: true,
                            },
                            {
                              name: "features",
                              type: "array",
                              label: "Points clés",
                              labels: {
                                singular: "Point clé",
                                plural: "Points clés",
                              },
                              fields: [
                                {
                                  name: "text",
                                  type: "text",
                                  label: "Texte",
                                  localized: true,
                                  required: true,
                                },
                              ],
                            },
                            {
                              name: "highlight",
                              type: "checkbox",
                              label: "Mettre cette offre en avant",
                              defaultValue: false,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
