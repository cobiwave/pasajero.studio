import type { CollectionConfig } from "payload";

export const Works: CollectionConfig = {
  slug: "works",
  admin: { useAsTitle: "title" },
  access: {
    read: ({ req }) => (req.user ? true : { status: { equals: "published" } }),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "artist", type: "relationship", relationTo: "artists", required: true },
    { name: "disciplines", type: "relationship", relationTo: "disciplines", hasMany: true },
    { name: "year", type: "text" },
    { name: "description", type: "textarea" },
    { name: "media", type: "upload", relationTo: "media" },
    { name: "externalUrl", type: "text" },
    { name: "featured", type: "checkbox", defaultValue: false },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: ["draft", "published"],
      admin: { position: "sidebar" },
    },
  ],
};
