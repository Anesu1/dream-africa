import { defineField, defineType } from "sanity";

export default defineType({
  name: "vehicle",
  title: "Vehicle",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: { list: ["SUV", "4x4", "Executive"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "subtitle", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "description",
      title: "Detail page description",
      type: "text",
      rows: 4,
      description: "Shown on this vehicle's own page. Keep it grounded in the specs below — no claims that aren't true of this specific vehicle.",
    }),
    defineField({ name: "price", title: "Price per day (USD)", type: "number", validation: (r) => r.required() }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: "specs", type: "array", of: [{ type: "vehicleSpec" }] }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers show first.",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "image" },
  },
});
