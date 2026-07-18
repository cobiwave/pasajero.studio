import type { GlobalConfig } from "payload";

export const WorkSection: GlobalConfig = {
  slug: "work-section",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: "sectionTitle", type: "text", required: true },
    { name: "sectionNumber", type: "text", required: true },
    { name: "headline", type: "array", fields: [{ name: "line", type: "text", required: true }] },
    // los proyectos individuales viven en la Collection `films`
  ],
};
