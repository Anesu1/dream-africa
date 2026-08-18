import { defineField, defineType } from "sanity";

export default defineType({
  name: "activityCategory",
  title: "Category",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "items",
      type: "array",
      of: [{ type: "activityItem" }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", items: "items" },
    prepare({ title, items }) {
      return { title, subtitle: `${items?.length ?? 0} items` };
    },
  },
});
