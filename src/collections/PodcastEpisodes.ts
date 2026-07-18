import type { CollectionConfig } from "payload";

export const PodcastEpisodes: CollectionConfig = {
  slug: "podcast-episodes",
  admin: { useAsTitle: "title" },
  access: {
    read: ({ req }) => (req.user ? true : { status: { equals: "published" } }),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "episodeNumber", type: "number" },
    { name: "guestArtists", type: "relationship", relationTo: "artists", hasMany: true },
    { name: "description", type: "textarea" },
    { name: "publishDate", type: "date" },
    { name: "embedUrl", type: "text" },
    { name: "thumbnail", type: "upload", relationTo: "media" },
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
