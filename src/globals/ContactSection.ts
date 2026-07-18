import type { GlobalConfig } from "payload";

export const ContactSection: GlobalConfig = {
  slug: "contact-section",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: "sectionTitle", type: "text", required: true },
    { name: "sectionNumber", type: "text", required: true },
    { name: "headline", type: "array", fields: [{ name: "line", type: "text", required: true }] },
    // contactEmail vive en site-settings (fuente única, ver decisión de unificación)
    {
      name: "socials",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "form",
      type: "group",
      fields: [
        { name: "nameLabel", type: "text", required: true },
        { name: "namePlaceholder", type: "text", required: true },
        { name: "emailLabel", type: "text", required: true },
        { name: "emailPlaceholder", type: "text", required: true },
        { name: "messageLabel", type: "text", required: true },
        { name: "messagePlaceholder", type: "text", required: true },
        { name: "submitLabel", type: "text", required: true },
      ],
    },
    {
      name: "footer",
      type: "group",
      fields: [
        { name: "copyright", type: "text", required: true },
        { name: "tagline", type: "text", required: true },
      ],
    },
  ],
};
