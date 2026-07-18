import type { CollectionConfig } from "payload";

export const Artists: CollectionConfig = {
  slug: "artists",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "status", "featured", "disciplines"],
  },
  access: {
    read: ({ req }) => (req.user ? true : { status: { equals: "approved" } }),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar" } },
    {
      name: "disciplines",
      type: "relationship",
      relationTo: "disciplines",
      hasMany: true,
      minRows: 1,
      maxRows: 3,
      required: true,
    },
    { name: "location", type: "text", required: true },
    { name: "bio", type: "textarea", required: true },
    { name: "avatar", type: "upload", relationTo: "media" },
    { name: "contactHref", type: "text", required: true },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "order", type: "number" },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      options: ["pending", "approved", "archived"],
      admin: { position: "sidebar" },
    },
    {
      name: "sourceApplication",
      type: "relationship",
      relationTo: "artist-applications",
      admin: { position: "sidebar" },
    },
  ],
};
