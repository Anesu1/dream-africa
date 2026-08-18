import { defineField, defineType } from "sanity";

export default defineType({
  name: "comboPackage",
  title: "Combo",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "price", type: "string", validation: (r) => r.required() }),
    defineField({ name: "savings", type: "string", description: "e.g. (SAVE US$10)" }),
    defineField({ name: "description", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({
      name: "checklist",
      type: "array",
      of: [{ type: "string" }],
      description: "Only used for combos that offer a choice from a shared activity list",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "price" },
  },
});
