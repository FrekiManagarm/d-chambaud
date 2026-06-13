import type { CollectionConfig, FieldHook } from "payload";

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const formatSlug: FieldHook = ({ siblingData, value }) => {
  if (typeof value === "string" && value.trim()) {
    return slugify(value);
  }

  if (typeof siblingData?.title === "string") {
    return slugify(siblingData.title);
  }

  return value;
};

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Article",
    plural: "Articles",
  },
  access: {
    read: ({ req }) => {
      if (req.user) {
        return true;
      }

      return {
        _status: {
          equals: "published",
        },
      };
    },
  },
  admin: {
    defaultColumns: ["title", "publishedAt", "_status", "updatedAt"],
    group: "Contenu",
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Titre",
      localized: true,
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      admin: {
        description:
          "Utilisé dans l'URL de l'article. Laissez vide pour le générer depuis le titre.",
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug],
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Date de publication",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: "author",
      type: "text",
      label: "Auteur",
      localized: true,
      defaultValue: "David Chambaud",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "categories",
      type: "array",
      label: "Catégories",
      admin: {
        position: "sidebar",
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: "Nom",
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: "heroImage",
      type: "relationship",
      label: "Image principale",
      relationTo: "media",
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Extrait",
      localized: true,
      required: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Contenu",
      localized: true,
      required: true,
    },
    {
      name: "seo",
      type: "group",
      label: "SEO",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titre SEO",
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Description SEO",
          localized: true,
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
};
