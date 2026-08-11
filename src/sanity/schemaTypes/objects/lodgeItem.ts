import { defineField, defineType } from "sanity";

export default defineType({
  name: "lodgeItem",
  title: "Lodge",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "region", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "region", media: "image" },
  },
});
