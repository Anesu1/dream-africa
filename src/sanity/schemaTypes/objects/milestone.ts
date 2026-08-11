import { defineField, defineType } from "sanity";

export default defineType({
  name: "milestone",
  title: "Milestone",
  type: "object",
  fields: [
    defineField({ name: "year", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "year", subtitle: "label" },
  },
});
