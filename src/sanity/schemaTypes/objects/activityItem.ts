import { defineField, defineType } from "sanity";

export default defineType({
  name: "activityItem",
  title: "Activity",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "note", type: "string" }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Optional internal page with full details, e.g. /safaris/chobe-day-trip",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "note" },
  },
});
