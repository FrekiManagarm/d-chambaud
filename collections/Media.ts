import type { CollectionConfig } from "payload";

import { revalidatePublishedResource } from "@/lib/published-resource-cache";

const revalidateMedia = () => {
  revalidatePublishedResource("media");
};

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [revalidateMedia],
    afterDelete: [revalidateMedia],
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
