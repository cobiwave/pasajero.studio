import type { GlobalConfig } from "payload";

export const MediaKitSection: GlobalConfig = {
  slug: "media-kit-section",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: "sectionTitle", type: "text", required: true },
    { name: "sectionNumber", type: "text", required: true },
    { name: "headline", type: "array", fields: [{ name: "line", type: "text", required: true }] },
    { name: "intro", type: "textarea", required: true },
    {
      name: "audience",
      type: "group",
      fields: [
        { name: "label", type: "text", required: true },
        {
          name: "metrics",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "value", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "formats",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
    { name: "networkLabel", type: "text", required: true },
    {
      name: "cta",
      type: "group",
      fields: [
        { name: "headline", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
  ],
};
