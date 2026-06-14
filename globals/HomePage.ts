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
          ],
        },
        {
          label: "Galerie",
          fields: [
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
