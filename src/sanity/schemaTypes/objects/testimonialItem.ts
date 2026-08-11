import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonialItem",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({ name: "quote", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "author", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "author", subtitle: "location" },
  },
});
