import type { CollectionConfig } from "payload";

export {
  serviceBrochureCategoryOptions,
  serviceBrochureMimeTypes,
} from "@/lib/service-brochures";
import {
  serviceBrochureCategoryOptions,
  serviceBrochureMimeTypes,
} from "@/lib/service-brochures";

export const ServiceBrochures: CollectionConfig = {
  slug: "service-brochures",
  labels: {
    singular: "Plaquette de prestation",
    plural: "Plaquettes de prestation",
  },
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title", "filename", "updatedAt"],
    group: "Contenu",
    useAsTitle: "title",
  },
  upload: {
    staticDir: "service-brochures",
    mimeTypes: serviceBrochureMimeTypes,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Titre",
      required: true,
    },
    {
      name: "category",
      type: "select",
      label: "Catégorie",
      options: serviceBrochureCategoryOptions,
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
  ],
};
