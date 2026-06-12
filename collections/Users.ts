import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    defaultColumns: ["email", "createdAt"],
    useAsTitle: "email",
  },
  fields: [],
};
