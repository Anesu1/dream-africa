/**
 * Unverified claims + enquiry consistency pass (27 Oct 2026).
 *
 * The trust banner, testimonials, guest/rating stats, award milestone, cancellation policy, group-size
 * promise and 10% combined-booking discount all trace back to the design template in the first commit
 * (7aff987, alongside stock photos and placeholder prices) and have never been confirmed by the
 * operator. Licensing, award and review claims need verification before they're kept, so they're
 * removed here until the operator supplies evidence; cancellation now matches the Chobe page
 * ("confirmed with your quote"). Also adds two next-step links in journal posts.
 *
 * Dry run:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=7zk2mk45 NEXT_PUBLIC_SANITY_DATASET=production node --env-file=.env.local --experimental-strip-types scripts/content-claims-2026-10-27.mts
 * Stage as Studio drafts (live site unchanged until published):
 *   ... scripts/content-claims-2026-10-27.mts --draft
 */
import { createClient } from "@sanity/client";

const stage = process.argv.includes("--draft");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

type Doc = Record<string, unknown> & { _id: string; _rev: string };
type Item = Record<string, unknown> & { _key: string };

const CANCELLATION =
  "Cancellation terms depend on what you book, so we confirm them with your quote. Ask us about cancellation and deposit terms before you confirm a booking.";
const LICENCE =
  "A valid licence held for two years, in English or with an international permit, plus a passport. Minimum driver age is 23 for the Fortuner; tell us the drivers' ages when you enquire about other vehicles.";

const setAnswer = (faqs: Item[], key: string, answer: string) =>
  faqs.map((f) => (f._key === key ? { ...f, answer } : f));

// Revision each transform was written against (read 27 Oct 2026).
const CHANGES: { id: string; rev: string; why: string; transform: (d: Doc) => Doc }[] = [
  {
    id: "siteSettings",
    rev: "infT1bNDKJbVdCXG2POdXJ",
    why: "Trust banner (footer on every page + homepage): replace unverified licence/award/rating/24-7 claims with what the business offers",
    transform: (d) => ({
      ...d,
      trustIndicators: [
        "Based in Victoria Falls, Zimbabwe",
        "Guided safaris & day trips",
        "Self-drive & chauffeur car hire",
        "Activities & airport transfers",
      ],
    }),
  },
  {
    id: "homePage",
    rev: "0YKpiHcLUDtAprmSV3YVPM",
    why: "Remove template testimonials, guest-count/rating stats and award milestone; fix FAQ discount, group size, licence and cancellation",
    transform: (d) => {
      const faqs = (d.faqs as Item[])
        .filter((f) => f._key !== "f2") // "Six guests maximum… flat supplement" — unconfirmed, and the Chobe page makes no group-size promise
        .map((f) =>
          f._key === "f0"
            ? {
                ...f,
                answer:
                  "Yes — keep the vehicle for your trip and we'll fit guided days around it. Send your dates and the tours you're interested in, and we'll quote both together.",
              }
            : f,
        );
      return {
        ...d,
        testimonials: [],
        stats: (d.stats as Item[]).filter((s) => !["Guests hosted", "Average guest rating"].includes(s.label as string)),
        milestones: (d.milestones as Item[]).filter((m) => m._key !== "2019"),
        faqs: setAnswer(setAnswer(faqs, "f1", LICENCE), "f4", CANCELLATION),
      };
    },
  },
  {
    id: "rentalsPageSettings",
    rev: "uazGyfGmMD8C5egC9JFCKs",
    why: "Cancellation answer now matches the Chobe page and homepage",
    transform: (d) => ({ ...d, rentalFaqs: setAnswer(d.rentalFaqs as Item[], "rf2", CANCELLATION) }),
  },
  {
    id: "journalPost-how-many-days-victoria-falls",
    rev: "r506ORX06Z9TVnQN3ntjCY",
    why: "Link 'rental days' to car hire",
    transform: (d) => ({
      ...d,
      body: (d.body as Item[]).map((b) =>
        b._key !== "b2"
          ? b
          : {
              ...b,
              children: [
                ...(b.children as Item[]).filter((c) => c._key !== "b2s2"),
                { _key: "b2s2", _type: "span", marks: [], text: " into four or five days total. Pick two of the three properly rather than all three badly, and add " },
                { _key: "b2s3", _type: "span", marks: ["b2m3"], text: "rental days" },
                { _key: "b2s4", _type: "span", marks: [], text: " around whichever you choose." },
              ],
              markDefs: [...(b.markDefs as Item[]), { _key: "b2m3", _type: "link", href: "/car-rental-victoria-falls" }],
            },
      ),
    }),
  },
  {
    id: "journalPost-is-victoria-falls-worth-visiting",
    rev: "0YKpiHcLUDtAprmSV3bI3M",
    why: "'Hwange or Chobe' linked to the safaris hub; link each to its own trip page",
    transform: (d) => ({
      ...d,
      body: (d.body as Item[]).map((b) =>
        b._key !== "b6"
          ? b
          : {
              ...b,
              children: (b.children as Item[]).flatMap((c) =>
                c._key !== "s4"
                  ? [c]
                  : [
                      { _key: "s4", _type: "span", marks: ["lnkHwange"], text: "Hwange" },
                      { _key: "s4b", _type: "span", marks: [], text: " or " },
                      { _key: "s4c", _type: "span", marks: ["lnkChobe"], text: "Chobe" },
                    ],
              ),
              markDefs: [
                { _key: "lnkHwange", _type: "link", href: "/safaris/hwange-big-five" },
                { _key: "lnkChobe", _type: "link", href: "/safaris/chobe-day-trip" },
              ],
            },
      ),
    }),
  },
];

const ids = CHANGES.map((c) => c.id);
const published = await client.fetch<Doc[]>(`*[_id in $ids]`, { ids });
const drafts: Doc[] = [];
for (const c of CHANGES) {
  const doc = published.find((d) => d._id === c.id);
  if (!doc || doc._rev !== c.rev) throw new Error(`${c.id} changed since 27 Oct — re-read it before staging.`);
  const next = c.transform(doc);
  const added = (JSON.stringify(next).match(/(?:US)?\$\s?\d[\d,.]*|\d+% off/g) ?? []).filter(
    (p) => !JSON.stringify(doc).includes(p),
  );
  if (added.length) throw new Error(`${c.id} would add prices/discounts: ${added.join(", ")}`);
  console.log(`${c.id}\n  ${c.why}`);
  drafts.push({ ...next, _id: `drafts.${c.id}` });
}

if (!stage) {
  console.log("\nDry run — nothing written. Re-run with --draft to stage for review.");
} else {
  if (!process.env.SANITY_TOKEN) throw new Error("SANITY_TOKEN is required to stage drafts.");
  const existing = await client.fetch<string[]>(`*[_id in $d]._id`, { d: drafts.map((d) => d._id) });
  if (existing.length) throw new Error(`Drafts already exist, not overwriting: ${existing.join(", ")}`);
  const tx = client.transaction();
  for (const { _rev, ...draft } of drafts) {
    void _rev;
    tx.create(draft as Doc);
  }
  const res = await tx.commit();
  console.log(`\nStaged ${drafts.length} drafts (transaction ${res.transactionId}). Review in Studio before publishing.`);
}
