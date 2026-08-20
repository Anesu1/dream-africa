import { defineField, defineType } from "sanity";

export default defineType({
  name: "rentalsPageSettings",
  title: "Rentals Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "services", title: "Services" },
    { name: "faq", title: "FAQ" },
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
    defineField({
      group: "services",
      name: "rentalServices",
      title: "Services (Self Drive, Chauffeur, etc.)",
      type: "array",
      of: [
        {
          type: "object",
          name: "rentalService",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", type: "text", rows: 2, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
    defineField({
      group: "faq",
      name: "rentalFaqs",
      title: "Rental FAQs",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Rentals Page" };
    },
  },
});
