import { defineField, defineType } from "sanity";

export default defineType({
  name: "experienceCard",
  title: "Experience card",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Eyebrow label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: "cta", title: "Button label", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "image" },
  },
});
