import type { GlobalConfig } from "payload";

export const Loader: GlobalConfig = {
  slug: "loader",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: "words", type: "array", fields: [{ name: "word", type: "text", required: true }] },
  ],
};
