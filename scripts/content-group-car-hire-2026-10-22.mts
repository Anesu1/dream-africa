/**
 * New journal post: choosing a rental vehicle by group size (the 10-seat Quantum had no coverage),
 * plus a fix to the rentals hub description, which called the whole fleet "4×4" although the
 * Sedan, X-Trail and Quantum aren't.
 *
 * Every fact comes from the existing vehicle and rentals documents in the CMS (seats, drive,
 * luggage notes, self-drive/chauffeur options, driver age). No prices, rates or discounts.
 *
 * Dry run:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=7zk2mk45 NEXT_PUBLIC_SANITY_DATASET=production node --experimental-strip-types scripts/content-group-car-hire-2026-10-22.mts
 * Stage as Studio drafts for review (live site unchanged until published in Studio):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=7zk2mk45 NEXT_PUBLIC_SANITY_DATASET=production node --env-file=.env.local --experimental-strip-types scripts/content-group-car-hire-2026-10-22.mts --draft
 *
 * Publish order in Studio: the journal post first, then the rentals page and the two vehicles
 * (they reference the post).
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

const POST_ID = "journalPost-group-car-hire-victoria-falls";

// Revisions read on 22 Oct 2026 — staging refuses to run if any of these changed since.
const REVISIONS: Record<string, string> = {
  rentalsPageSettings: "Gw5fvCwhtb37u7sHlaiTD6",
  "vehicle-toyota-fortuner": "LL9K1HK6ye3mqnvwcJzMmk",
  "vehicle-toyota-quantum": "cnh1QQ0Fd15PIuBcp8QF0w",
};

// --- Portable text helpers -------------------------------------------------------------------
type Part = string | [text: string, href: string];
let n = 0;
function block(style: "normal" | "h2", ...parts: Part[]) {
  const key = `g${n++}`;
  const markDefs: { _key: string; _type: "link"; href: string }[] = [];
  const children = parts.map((part, i) => {
    if (typeof part === "string") return { _key: `${key}s${i}`, _type: "span", marks: [], text: part };
    const markKey = `${key}m${i}`;
    markDefs.push({ _key: markKey, _type: "link", href: part[1] });
    return { _key: `${key}s${i}`, _type: "span", marks: [markKey], text: part[0] };
  });
  return { _key: key, _type: "block", style, markDefs, children };
}
const p = (...parts: Part[]) => block("normal", ...parts);
const h2 = (text: string) => block("h2", text);
const car = (slug: string) => `/car-rental-victoria-falls/${slug}`;

const body = [
  p(
    "Most car hire advice assumes two or three travellers. Once you're a family or a group, the first question isn't really whether you need a 4x4 — it's how many people and how much luggage you're moving. Here's how our fleet lines up by group size.",
  ),
  h2("Up to four people"),
  p(
    "The ",
    ["Toyota Sedan", car("executive-sedan")],
    " has four seats and an automatic gearbox, and comfortably fits airport-transfer luggage for up to four passengers. It's built for town, the airport and tarred roads — not national park tracks.",
  ),
  h2("Five people"),
  p(
    "Two five-seaters, and the choice comes down to where you're driving. The ",
    ["Nissan X-Trail", car("nissan-xtrail")],
    " is an automatic AWD crossover for town and tarred roads. The ",
    ["Hilux Double Cab", car("hilux-double-cab")],
    " is an automatic 4x4 that handles national park roads too, with a rooftop tent available if you plan to camp. AWD isn't the same as a proper 4x4, so for Hwange's park tracks choose the Hilux — more on that in ",
    ["Do you need a 4x4 in Zimbabwe?", "/journal/do-you-need-a-4x4-in-zimbabwe"],
  ),
  h2("Six or seven people"),
  p(
    "The ",
    ["Toyota Fortuner", car("toyota-fortuner")],
    " is a seven-seat automatic 4x4. With all three rows in use, luggage space is reduced: it's comfortable for five or six adults with full bags. If you're seven with luggage, tell us your group size and what you're bringing and we'll check the fit before you book.",
  ),
  h2("Eight to ten people"),
  p(
    "The ",
    ["Toyota Quantum Minibus", car("toyota-quantum-minibus")],
    " seats ten, is air-conditioned and has room for luggage. It's the vehicle for group trips, airport transfers and family excursions around Victoria Falls, Hwange and the region. It's a manual diesel, so if nobody in your group wants to drive a manual, you can have one of our drivers instead.",
  ),
  h2("Self-drive or a driver?"),
  p(
    "Self-drive gives you the vehicle for the length of your rental; our chauffeur service puts a driver in the seat instead — often the easier option with a larger group, since nobody has to drive after a long flight or find their way on unfamiliar roads. Tell us which you'd prefer when you enquire. We compare the two in ",
    ["Self-drive vs. chauffeur in Victoria Falls", "/journal/self-drive-vs-chauffeur-victoria-falls"],
    ".",
  ),
  h2("What to tell us when you enquire"),
  p(
    "Send the number of travellers, roughly how much luggage (and anything oversized), where you'll be driving — town and tar, or national park tracks — whether you'll cross a border, and the drivers' ages: the minimum driver age for the Fortuner is 23. The licence and passport requirements are in ",
    ["What Documents Do You Need to Rent a Car in Zimbabwe?", "/journal/documents-needed-rent-car-zimbabwe"],
    ".",
  ),
  p(
    "Rates depend on the vehicle, your dates, the rental length and any cross-border requirements, so we quote each booking directly. ",
    ["See the full fleet", "/car-rental-victoria-falls"],
    " or send your dates and group size for a quote.",
  ),
];

const post = {
  _id: `drafts.${POST_ID}`,
  _type: "journalPost",
  title: "Group Car Hire in Victoria Falls: Which Vehicle Fits Your Group?",
  slug: { _type: "slug", current: "group-car-hire-victoria-falls" },
  category: "Self drive",
  excerpt:
    "From a four-seat sedan to a ten-seat minibus — how to choose a rental vehicle in Victoria Falls by group size, luggage and where you'll drive.",
  // The Quantum's own photo from its vehicle page.
  image: {
    _type: "image",
    asset: { _type: "reference", _ref: "image-cee34a36f1d4def703111f1a4f4f21ff2999849c-810x1080-jpg" },
  },
  publishedAt: "2026-10-22T08:00:00Z",
  body,
  primaryCta: { _type: "ctaLink", label: "Get a group rental quote", href: "/car-rental-victoria-falls" },
};

// Weak until the post is published, then Studio strengthens it automatically.
const postRef = (key: string) => ({
  _key: key,
  _type: "reference",
  _ref: POST_ID,
  _weak: true,
  _strengthenOnPublish: { type: "journalPost" },
});

const HUB_DESCRIPTION =
  "A meticulously serviced fleet — 4×4s, SUVs, a sedan and a 10-seat minibus — delivered to your lodge or the airport gate. Self-drive freedom, or a chauffeur when you'd rather not.";

console.log(`New post: ${post.title}\n  /journal/${post.slug.current} — ${body.length} blocks`);
console.log(`rentalsPageSettings: heroDescription -> ${HUB_DESCRIPTION}`);
console.log("rentalsPageSettings, vehicle-toyota-fortuner, vehicle-toyota-quantum: add related journal link");

if (!stage) {
  console.log("\nDry run — nothing written. Re-run with --draft to stage for review.");
} else {
  if (!process.env.SANITY_TOKEN) throw new Error("SANITY_TOKEN is required to stage drafts.");
  const ids = Object.keys(REVISIONS);
  const existing = await client.fetch<string[]>(`*[_id in $ids]._id`, {
    ids: [POST_ID, `drafts.${POST_ID}`, ...ids.map((id) => `drafts.${id}`)],
  });
  if (existing.length > 0) throw new Error(`Already exists, not overwriting: ${existing.join(", ")}`);
  const published = await client.fetch<{ _id: string; _rev: string }[]>(`*[_id in $ids]`, { ids });

  const tx = client.transaction().create(post);
  for (const id of ids) {
    const doc = published.find((d) => d._id === id);
    if (!doc || doc._rev !== REVISIONS[id]) throw new Error(`${id} changed since 22 Oct — re-read it before staging.`);
    const { _rev, ...rest } = doc;
    void _rev;
    tx.create({ ...rest, _id: `drafts.${id}` });
    tx.patch(`drafts.${id}`, (patch) => {
      let next = patch.setIfMissing({ relatedJournalPosts: [] }).append("relatedJournalPosts", [postRef("rel-group-car-hire")]);
      if (id === "rentalsPageSettings") next = next.set({ heroDescription: HUB_DESCRIPTION });
      return next;
    });
  }
  const res = await tx.commit();
  console.log(`\nStaged as drafts (transaction ${res.transactionId}). Review and publish in Studio — post first.`);
}
