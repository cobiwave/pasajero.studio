import type { CollectionConfig } from "payload";

export const Films: CollectionConfig = {
  slug: "films",
  admin: { useAsTitle: "title", defaultColumns: ["title", "category", "year", "status"] },
  access: {
    read: ({ req }) => (req.user ? true : { status: { equals: "published" } }),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "category", type: "text", required: true },
    { name: "year", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "tags", type: "array", fields: [{ name: "tag", type: "text", required: true }] },
    { name: "videoUrl", type: "text" },
    { name: "thumbnail", type: "upload", relationTo: "media" },
    { name: "credits", type: "relationship", relationTo: "artists", hasMany: true },
    { name: "order", type: "number" },
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
