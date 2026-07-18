import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [{ name: "contactEmail", type: "email", required: true }],
};
