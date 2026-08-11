import { defineField, defineType } from "sanity";

export default defineType({
  name: "brandInfo",
  title: "Brand",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "logo",
      type: "image",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "parentNote",
      title: "Parent brand note (rentals only)",
      description: "Shown in the footer, e.g. \"Eden Car Rental is Africa Dream Adventures' premium vehicle-hire division.\"",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline", media: "logo" },
  },
});
