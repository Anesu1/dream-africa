import { defineField, defineType } from "sanity";

export default defineType({
  name: "activitiesPageSettings",
  title: "Activities Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "combos", title: "Special Combos" },
    { name: "packages", title: "Discounted Packages" },
    { name: "priceList", title: "Price List" },
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
    defineField({ group: "combos", name: "specialCombos", type: "array", of: [{ type: "comboPackage" }] }),
    defineField({ group: "packages", name: "packageTiers", type: "array", of: [{ type: "packageTier" }] }),
    defineField({ group: "priceList", name: "categories", type: "array", of: [{ type: "activityCategory" }] }),
    defineField({
      group: "priceList",
      name: "disclaimer",
      type: "text",
      rows: 2,
      description: "Fine-print note shown beneath the price list",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Activities Page" };
    },
  },
});
