import type { CollectionConfig } from "payload";

export const Disciplines: CollectionConfig = {
  slug: "disciplines",
  admin: { useAsTitle: "name" },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text", required: true, unique: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar" } },
    {
      name: "group",
      type: "select",
      required: true,
      options: ["Skate", "Surf", "Música", "Cine", "Foto"],
    },
    { name: "active", type: "checkbox", defaultValue: true },
  ],
};
