import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["filename", "alt", "updatedAt"],
    group: "Contenu",
    useAsTitle: "alt",
  },
  upload: {
    focalPoint: true,
    imageSizes: [
      {
        name: "thumb",
        width: 480,
        height: 320,
        position: "centre",
      },
      {
        name: "card",
        width: 960,
        height: 720,
        position: "centre",
      },
      {
        name: "hero",
        width: 1920,
        height: 1280,
        position: "centre",
      },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Texte alternatif",
      localized: true,
      required: true,
    },
  ],
};
