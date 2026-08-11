import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "whoWeAre", title: "Who We Are" },
    { name: "experiences", title: "Experiences" },
    { name: "stats", title: "Stats" },
    { name: "testimonials", title: "Testimonials" },
    { name: "faqs", title: "FAQs" },
  ],
  fields: [
    defineField({ group: "hero", name: "heroEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({
      group: "hero",
      name: "heroHeadline",
      title: "Headline (two lines)",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().length(2),
    }),
    defineField({ group: "hero", name: "heroSub", title: "Subtext", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ group: "hero", name: "heroPrimaryCta", title: "Primary button", type: "ctaLink", validation: (r) => r.required() }),
    defineField({ group: "hero", name: "heroSecondaryCta", title: "Secondary button", type: "ctaLink", validation: (r) => r.required() }),
    defineField({
      group: "hero",
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),

    defineField({ group: "whoWeAre", name: "whoWeAreEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({
      group: "whoWeAre",
      name: "whoWeAreHeading",
      title: "Heading (two lines)",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().length(2),
    }),
    defineField({ group: "whoWeAre", name: "whoWeAreBody", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({
      group: "whoWeAre",
      name: "whoWeAreImage",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      group: "whoWeAre",
      name: "milestones",
      type: "array",
      of: [{ type: "milestone" }],
    }),

    defineField({ group: "experiences", name: "experienceSafaris", title: "Safaris card", type: "experienceCard", validation: (r) => r.required() }),
    defineField({ group: "experiences", name: "experienceRentals", title: "Rentals card", type: "experienceCard", validation: (r) => r.required() }),

    defineField({ group: "stats", name: "stats", type: "array", of: [{ type: "statItem" }] }),
    defineField({ group: "testimonials", name: "testimonials", type: "array", of: [{ type: "testimonialItem" }] }),
    defineField({ group: "faqs", name: "faqs", type: "array", of: [{ type: "faqItem" }] }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
