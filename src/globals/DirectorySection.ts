import type { GlobalConfig } from "payload";

export const DirectorySection: GlobalConfig = {
  slug: "directory-section",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: "sectionTitle", type: "text", required: true },
    { name: "sectionNumber", type: "text", required: true },
    { name: "headline", type: "array", fields: [{ name: "line", type: "text", required: true }] },
    { name: "intro", type: "textarea", required: true },
    {
      name: "joinForm",
      type: "group",
      fields: [
        { name: "sectionTitle", type: "text", required: true },
        { name: "sectionNumber", type: "text", required: true },
        {
          name: "headline",
          type: "array",
          fields: [{ name: "line", type: "text", required: true }],
        },
        { name: "intro", type: "textarea", required: true },
        // dropdown de disciplinas: se resuelve en runtime contra `disciplines` (active: true)
        {
          name: "form",
          type: "group",
          fields: [
            { name: "nameLabel", type: "text", required: true },
            { name: "namePlaceholder", type: "text", required: true },
            { name: "disciplinesLabel", type: "text", required: true },
            { name: "contactLabel", type: "text", required: true },
            { name: "contactPlaceholder", type: "text", required: true },
            { name: "submitLabel", type: "text", required: true },
            { name: "sendingLabel", type: "text", required: true },
            { name: "successMessage", type: "text", required: true },
            { name: "errorMessage", type: "text", required: true },
          ],
        },
      ],
    },
  ],
};
