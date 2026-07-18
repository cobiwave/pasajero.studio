import type { CollectionConfig } from "payload";

export const ArtistApplications: CollectionConfig = {
  slug: "artist-applications",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "status", "createdAt"],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true, // única puerta pública de escritura de todo el modelo
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "disciplines",
      type: "relationship",
      relationTo: "disciplines",
      hasMany: true,
      required: true,
    },
    { name: "contact", type: "text", required: true },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: ["new", "reviewed", "approved", "rejected"],
    },
    { name: "reviewedBy", type: "relationship", relationTo: "users" },
    {
      name: "reviewNotes",
      type: "textarea",
      access: { read: ({ req }) => Boolean(req.user) },
    },
  ],
};
