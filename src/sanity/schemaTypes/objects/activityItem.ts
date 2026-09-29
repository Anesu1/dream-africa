import { defineField, defineType } from "sanity";

export default defineType({
  name: "activityItem",
  title: "Activity",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "note", type: "string" }),
  ],
  preview: {
    select: { title: "label", subtitle: "note" },
  },
});
