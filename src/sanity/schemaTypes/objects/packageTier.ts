import { defineField, defineType } from "sanity";

export default defineType({
  name: "packageTier",
  title: "Package Tier",
  type: "object",
  fields: [
    defineField({ name: "tier", type: "string", description: "e.g. Platinum Package", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", description: "e.g. The Full Monty", validation: (r) => r.required() }),
    defineField({ name: "price", type: "string", validation: (r) => r.required() }),
    defineField({ name: "productCount", type: "string", description: "e.g. Four Products/One Package" }),
    defineField({ name: "included", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title", subtitle: "price" },
  },
});
