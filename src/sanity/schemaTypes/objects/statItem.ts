import { defineField, defineType } from "sanity";

export default defineType({
  name: "statItem",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value", type: "number", validation: (r) => r.required() }),
    defineField({ name: "suffix", title: "Suffix (e.g. +)", type: "string" }),
    defineField({ name: "decimals", title: "Decimal places", type: "number" }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "label", value: "value", suffix: "suffix" },
    prepare({ title, value, suffix }) {
      return { title, subtitle: `${value}${suffix ?? ""}` };
    },
  },
});
