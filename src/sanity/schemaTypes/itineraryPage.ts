import { defineField, defineType } from "sanity";

export default defineType({
  name: "itineraryPage",
  title: "Itinerary",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "days", title: "Day by Day" },
  ],
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "metaDescription",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({ group: "hero", name: "heroEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ group: "hero", name: "heroTitle", type: "string", validation: (r) => r.required() }),
    defineField({ group: "hero", name: "heroDescription", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      group: "hero",
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "durationLabel",
      title: "Duration (e.g. 5 Days / 4 Nights)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "summary", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "idealFor", title: "Ideal for", type: "array", of: [{ type: "string" }] }),
    defineField({
      group: "days",
      name: "days",
      type: "array",
      of: [{ type: "itineraryDay" }],
      validation: (r) => r.required().min(1),
    }),
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
    select: { title: "title", subtitle: "durationLabel", media: "heroImage" },
  },
});
