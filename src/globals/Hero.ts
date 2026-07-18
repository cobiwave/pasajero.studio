import type { GlobalConfig } from "payload";

export const Hero: GlobalConfig = {
  slug: "hero",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: "headline", type: "array", fields: [{ name: "line", type: "text", required: true }] },
    { name: "tagline", type: "text", required: true },
    { name: "subtitle", type: "textarea", required: true },
    { name: "comingSoon", type: "textarea", required: true },
  ],
};
