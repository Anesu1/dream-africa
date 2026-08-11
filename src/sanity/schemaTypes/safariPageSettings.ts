import { defineField, defineType } from "sanity";

export default defineType({
  name: "safariPageSettings",
  title: "Safaris Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "destinations", title: "Destinations" },
    { name: "lodges", title: "Lodges" },
  ],
  fields: [
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
    defineField({ group: "destinations", name: "destinations", type: "array", of: [{ type: "namedImage" }] }),
    defineField({ group: "lodges", name: "lodges", type: "array", of: [{ type: "lodgeItem" }] }),
  ],
  preview: {
    prepare() {
      return { title: "Safaris Page" };
    },
  },
});
