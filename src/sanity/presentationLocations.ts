import type { DocumentLocationResolvers } from "sanity/presentation";

// Lets Sanity's Presentation tool jump straight from a document to the page
// it actually appears on. Without this, editing e.g. a vehicle only opens
// the form — there's no link to its live preview.
export const locations: DocumentLocationResolvers = {
  siteSettings: { locations: [{ title: "Whole site", href: "/" }] },
  homePage: { locations: [{ title: "Home Page", href: "/" }] },
  safariPageSettings: { locations: [{ title: "Safaris Page", href: "/safaris" }] },
  rentalsPageSettings: { locations: [{ title: "Rentals Page", href: "/rentals" }] },
  activitiesPageSettings: { locations: [{ title: "Activities Page", href: "/activities" }] },
  vehicle: {
    select: { slug: "slug.current", name: "name" },
    resolve: (doc) =>
      doc?.slug
        ? {
            locations: [
              { title: doc.name ?? "Vehicle", href: `/rentals/${doc.slug}` },
              { title: "Car Rental", href: "/rentals" },
            ],
          }
        : null,
  },
  tour: {
    select: { slug: "slug.current", title: "title" },
    resolve: (doc) =>
      doc?.slug
        ? {
            locations: [
              { title: doc.title ?? "Tour", href: `/safaris/${doc.slug}` },
              { title: "Safaris", href: "/safaris" },
            ],
          }
        : null,
  },
  journalPost: {
    select: { slug: "slug.current", title: "title" },
    resolve: (doc) =>
      doc?.slug
        ? {
            locations: [
              { title: doc.title ?? "Journal Post", href: `/journal/${doc.slug}` },
              { title: "Journal", href: "/journal" },
            ],
          }
        : null,
  },
};
