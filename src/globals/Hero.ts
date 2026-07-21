import type { GlobalConfig } from "payload";

export const Hero: GlobalConfig = {
  slug: "hero",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [{ name: "subtitle", type: "textarea", required: true }],
};
