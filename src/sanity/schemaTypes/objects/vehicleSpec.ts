import { defineField, defineType } from "sanity";

export default defineType({
  name: "vehicleSpec",
  title: "Spec",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
