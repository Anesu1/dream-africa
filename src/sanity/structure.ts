import type { StructureResolver } from "sanity/structure";

const SINGLETONS = [
  { id: "siteSettings", title: "Site Settings" },
  { id: "homePage", title: "Home Page" },
  { id: "safariPageSettings", title: "Safaris Page" },
  { id: "rentalsPageSettings", title: "Rentals Page" },
  { id: "activitiesPageSettings", title: "Activities Page" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map(({ id, title }) =>
        S.listItem()
          .id(id)
          .title(title)
          .child(S.document().schemaType(id).documentId(id)),
      ),
      S.divider(),
      S.documentTypeListItem("tour").title("Tours"),
      S.documentTypeListItem("vehicle").title("Vehicles"),
      S.documentTypeListItem("journalPost").title("Journal Posts"),
    ]);
