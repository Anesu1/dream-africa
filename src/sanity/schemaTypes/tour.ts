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
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string", description: "Describe what the photo shows." })],
      validation: (r) => r.required(),
    }),
    defineField({ name: "highlights", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "summary",
      title: "Trip summary",
      description: "Short confirmed facts shown near the top of the page (departure, duration, activities, border, price basis).",
      type: "array",
      of: [{ type: "tripFact" }],
    }),
    defineField({
      name: "itinerarySteps",
      title: "Itinerary",
      description: "Stage-by-stage breakdown for the day (or days) — optional, but strongly recommended for anything cross-border or multi-stop.",
      type: "array",
      of: [{ type: "itineraryDay" }],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "faqItem" }],
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
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
