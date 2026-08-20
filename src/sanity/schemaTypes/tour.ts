import { defineField, defineType } from "sanity";

export default defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", type: "string", validation: (r) => r.required() }),
    defineField({ name: "duration", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "price", title: "Price (e.g. $180)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "priceUnit", title: "Price unit (e.g. /person)", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: "highlights", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "relatedJournalPosts",
      title: "Related Journal posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "journalPost" }] }],
    }),
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
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
