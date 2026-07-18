import type { GlobalConfig } from "payload";

export const Nav: GlobalConfig = {
  slug: "nav",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    // contactEmail vive en site-settings (fuente única, ver decisión de unificación)
  ],
};
