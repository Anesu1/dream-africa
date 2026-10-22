import { defineField, defineType } from "sanity";

export default defineType({
  name: "tripFact",
  title: "Trip fact",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "value",
      type: "text",
      rows: 2,
      description: "Only confirmed details — leave a fact out rather than guess.",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
