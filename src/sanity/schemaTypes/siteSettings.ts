import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "brands", title: "Brands" },
    { name: "navigation", title: "Navigation & Footer" },
  ],
  fields: [
    defineField({ group: "general", name: "name", title: "Company name", type: "string", validation: (r) => r.required() }),
    defineField({ group: "general", name: "tagline", type: "string", validation: (r) => r.required() }),
    defineField({ group: "general", name: "address", type: "string", validation: (r) => r.required() }),
    defineField({ group: "general", name: "founded", title: "Founded year", type: "number", validation: (r) => r.required() }),
    defineField({ group: "general", name: "copyright", title: "Footer copyright line", type: "string", validation: (r) => r.required() }),
    defineField({
      group: "general",
      name: "whatsapp",
      title: "WhatsApp number",
      description: "Digits only, with country code, no + or spaces (e.g. 263775530678). Every \"book\"/\"plan your journey\" button on the site links here.",
      type: "string",
      validation: (r) => r.required().regex(/^\d+$/, { name: "digits only" }),
    }),
    defineField({
      group: "brands",
      name: "brandSafaris",
      title: "Safaris brand",
      type: "brandInfo",
      validation: (r) => r.required(),
    }),
    defineField({
      group: "brands",
      name: "brandRentals",
      title: "Rentals brand",
      type: "brandInfo",
      validation: (r) => r.required(),
    }),
    defineField({
      group: "navigation",
      name: "navLinks",
      title: "Main navigation links",
      type: "array",
      of: [{ type: "navLinkItem" }],
    }),
    defineField({
      group: "navigation",
      name: "footerSafarisLinks",
      title: "Footer — Safaris column links",
      type: "array",
      of: [{ type: "navLinkItem" }],
    }),
    defineField({
      group: "navigation",
      name: "footerRentalsLinks",
      title: "Footer — Eden Car Rental column links",
      type: "array",
      of: [{ type: "navLinkItem" }],
    }),
    defineField({
      group: "general",
      name: "trustIndicators",
      title: "Trust indicators (footer marquee)",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
