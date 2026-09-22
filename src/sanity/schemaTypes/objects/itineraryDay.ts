import { defineField, defineType } from "sanity";

export default defineType({
  name: "itineraryDay",
  title: "Day",
  type: "object",
  fields: [
    defineField({
      name: "rangeLabel",
      title: "Day range (e.g. Day 1–2)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "link", type: "ctaLink" }),
  ],
  preview: {
    select: { title: "title", subtitle: "rangeLabel" },
  },
});
