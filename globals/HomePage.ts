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
            imageRelationship("valuesPrimaryImage", "Image éditoriale principale"),
            imageRelationship("valuesSecondaryImage", "Image éditoriale secondaire"),
            imageRelationship("valuesBridgeImage", "Grande image de transition"),
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
      ],
    },
  ],
};
