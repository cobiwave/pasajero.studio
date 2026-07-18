import type { GlobalConfig } from "payload";

export const AboutSection: GlobalConfig = {
  slug: "about-section",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: "sectionTitle", type: "text", required: true },
    { name: "sectionNumber", type: "text", required: true },
    { name: "statement", type: "array", fields: [{ name: "line", type: "text", required: true }] },
    {
      name: "bio",
      type: "array",
      fields: [{ name: "paragraph", type: "textarea", required: true }],
    },
    {
      name: "principles",
      type: "array",
      fields: [
        { name: "number", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
  ],
};
