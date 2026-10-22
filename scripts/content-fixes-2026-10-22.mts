/**
 * Chobe Day Trip accuracy pass (22 Oct 2026).
 *
 * Removes claims that were seeded by an earlier AI-assisted edit (commit 93743e3) and never confirmed
 * by the operator — exact clock times, lunch, open vehicle, hotel pickup, private/shared — keeping
 * only what traces back to the operator's original content or the 2026 price list PDF:
 *   - one day; back at the Falls by evening; border paperwork handled (original tour content)
 *   - game drive + river cruise in Chobe (original tour content)
 *   - National Parks fees excluded, paid at check-in (2026 price list) — amounts are never published,
 *     because they change
 *
 * Dry run:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=7zk2mk45 NEXT_PUBLIC_SANITY_DATASET=production node --experimental-strip-types scripts/content-fixes-2026-10-22.mts
 * Stage as Studio drafts for review (live site unchanged until published in Studio):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=7zk2mk45 NEXT_PUBLIC_SANITY_DATASET=production node --env-file=.env.local --experimental-strip-types scripts/content-fixes-2026-10-22.mts --draft
 * Publish directly:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=7zk2mk45 NEXT_PUBLIC_SANITY_DATASET=production node --env-file=.env.local --experimental-strip-types scripts/content-fixes-2026-10-22.mts --apply
 *
 * Each patch is pinned to the revision read on 22 Oct 2026; if a document was edited in Studio
 * since, the whole transaction is rejected instead of overwriting that edit.
 */
import { createClient } from "@sanity/client";

const apply = process.argv.includes("--apply");
const stage = process.argv.includes("--draft");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const REVISIONS: Record<string, string> = {
  "tour-chobe-day-trip": "Gw5fvCwhtb37u7sHlaiTD6",
  activitiesPageSettings: "N1G5rtOZj8187JlhVFQqur",
  "journalPost-chobe-day-trip-itinerary": "cnh1QQ0Fd15PIuBcp8MeJv",
  "itineraryPage-3-days-in-victoria-falls": "0YKpiHcLUDtAprmSUhHqVE",
};

const BORDER_SENTENCE =
  "We assist with crossing arrangements. Entry and re-entry documents depend on nationality; confirm requirements with us before travel.";

const fact = (key: string, label: string, value: string) => ({ _key: key, _type: "tripFact", label, value });
const step = (key: string, rangeLabel: string, title: string, description: string) => ({
  _key: key,
  _type: "itineraryDay",
  rangeLabel,
  title,
  description,
});
const faq = (key: string, question: string, answer: string) => ({ _key: key, _type: "faqItem", question, answer });

type PatchSpec = { id: string; why: string; set: Record<string, unknown> };

const PATCHES: PatchSpec[] = [
  {
    id: "tour-chobe-day-trip",
    why: "Verified-only summary, itinerary and FAQs; hero alt text",
    set: {
      "image.alt": "An elephant standing on a green floodplain beside a river, with more elephants behind",
      summary: [
        fact("departs", "Departs from", "Victoria Falls, Zimbabwe"),
        fact("duration", "Duration", "A full day — back in Victoria Falls by evening"),
        fact("activities", "Activities", "A game drive in Chobe National Park and a river cruise on the Chobe River"),
        fact("border", "Border crossing", `Into Botswana and back. ${BORDER_SENTENCE}`),
        fact(
          "price",
          "Price",
          "Quoted for your date and group. Chobe National Park entry fees are not included and are paid at check-in; we confirm the current fee when we quote.",
        ),
      ],
      itinerarySteps: [
        step(
          "step1",
          "Early morning",
          "Leave Victoria Falls",
          "An early start — the border and the best game viewing both favour setting off before the day heats up. Pickup arrangements are confirmed with your quote.",
        ),
        step("step2", "Morning", "Kazungula border crossing", BORDER_SENTENCE),
        step(
          "step3",
          "Morning",
          "Chobe National Park game drive",
          "A game drive through Chobe National Park, known for one of the highest elephant densities in Africa, alongside buffalo, lion and a wide range of plains game.",
        ),
        step(
          "step5",
          "Afternoon",
          "Chobe River cruise",
          "A boat cruise along the Chobe River — often where you get closest to elephant, hippo and crocodile.",
        ),
        step(
          "step6",
          "Evening",
          "Return to Victoria Falls",
          "Back across the border and into Victoria Falls by evening — a full day, but you sleep in your own bed.",
        ),
      ],
      faqs: [
        faq(
          "faq-depart",
          "Where does the trip depart from?",
          "Victoria Falls, Zimbabwe. Tell us where you're staying when you enquire and we'll confirm pickup arrangements with your quote.",
        ),
        faq(
          "faq2",
          "What does the quote include, and which charges are excluded?",
          "The trip covers the crossing into Botswana with our help at the border, a game drive in Chobe National Park and a river cruise on the Chobe River. Chobe National Park entry fees are not included and are paid at check-in; we confirm the current fee when we quote. Ask us to confirm which other fees and charges are included in your quote.",
        ),
        faq(
          "faq-price",
          "How much does the Chobe day trip cost?",
          "We quote each booking rather than publish one fixed rate. Send your preferred travel date, number of travellers and pickup location so we can confirm availability and provide a quote. The quote states the currency and whether the price is per person or per group.",
        ),
        faq(
          "faq-booking",
          "How do I request availability?",
          "Use the enquiry form on this page or message us on WhatsApp with your preferred date, the number of adults and children, where you're staying and the nationalities in your group. We'll confirm availability and send your quote. Ask us about deposit and cancellation terms before you confirm.",
        ),
        faq(
          "faq1",
          "What documents should I confirm before travelling?",
          "Entry and re-entry documents depend on nationality: some passports get Botswana entry on arrival, others need it arranged beforehand, and re-entering Zimbabwe afterwards is a separate question from the Botswana side. Tell us your nationality when you enquire and confirm requirements with us before travel, or check current official guidance yourself.",
        ),
        faq(
          "faq-border-times",
          "When do we cross the border?",
          "We plan the Kazungula crossing for early morning, before the day's queues build up. Border opening hours and processing times can change, so we confirm the timing for your date when you book.",
        ),
        faq(
          "faq5",
          "What should I bring?",
          "Your passport and any visa documents your nationality requires, and money for the Chobe National Park entry fee. Sun protection and a hat are worth having for the game drive and river cruise.",
        ),
        faq(
          "faq3",
          "Is a Chobe day trip worth it if I only have 3 days at Victoria Falls?",
          "It takes a full day — you leave early and are back in Victoria Falls by evening, so there's no extra night to book. On a three-day stay that's one of your three days, so it suits travellers who would rather add a second country and a game drive than another activity at the Falls.",
        ),
      ],
    },
  },
  {
    id: "activitiesPageSettings",
    why: "Link the Chobe price-list entry to the full trip page",
    set: { 'categories[_key=="cat-safari"].items[_key=="i5"].href': "/safaris/chobe-day-trip" },
  },
  {
    id: "journalPost-chobe-day-trip-itinerary",
    why: "'Paperwork gets handled … exactly the part we handle for you' overstated what we can promise at the border",
    set: {
      'body[_key=="b0"].children[_key=="b0s0"].text':
        "The day starts early — you're crossing into Botswana in the morning. The border is the one part of the day that depends on your documents: entry and re-entry requirements depend on nationality, so confirm them with us before travel, and we assist with the crossing arrangements on the day.",
      'body[_key=="b2"].children[_key=="b2s0"].text':
        "You're back at the Falls by evening. It's a full day, but not a rushed one — if you'd rather not handle the border logistics yourself, that's the point of booking it as a ",
    },
  },
  {
    id: "itineraryPage-3-days-in-victoria-falls",
    why: "Remove unconfirmed '6 AM to late afternoon' timing",
    set: {
      'days[_key=="day3"].description':
        "A slow final morning before your departure transfer. Chobe takes a full day on its own, so it doesn't fit neatly into a 3-day trip — if you want to add it, our longer itineraries build it in properly.",
    },
  },
];

for (const p of PATCHES) {
  console.log(`\n${p.id}\n  ${p.why}`);
  for (const [path, value] of Object.entries(p.set)) {
    const shown = typeof value === "string" ? value : `${(value as unknown[]).length} item(s)`;
    console.log(`  set ${path} = ${shown}`);
  }
}

if (stage) {
  // Stage as Studio drafts for review: the live site is untouched until an editor publishes them.
  if (!process.env.SANITY_TOKEN) throw new Error("SANITY_TOKEN is required to stage drafts.");
  const ids = PATCHES.map((p) => p.id);
  const existing = await client.fetch<string[]>(`*[_id in $drafts]._id`, { drafts: ids.map((id) => `drafts.${id}`) });
  if (existing.length > 0) throw new Error(`Drafts already exist, not overwriting: ${existing.join(", ")}`);
  const published = await client.fetch<{ _id: string; _rev: string }[]>(`*[_id in $ids]`, { ids });
  const draftTx = client.transaction();
  for (const p of PATCHES) {
    const doc = published.find((d) => d._id === p.id);
    if (!doc || doc._rev !== REVISIONS[p.id]) throw new Error(`${p.id} changed since 22 Oct — re-read it before staging.`);
    const { _rev, ...rest } = doc;
    void _rev;
    draftTx.create({ ...rest, _id: `drafts.${p.id}` });
    draftTx.patch(`drafts.${p.id}`, (patch) => patch.set(p.set));
  }
  const res = await draftTx.commit();
  console.log(`\nStaged ${PATCHES.length} drafts (transaction ${res.transactionId}). Review and publish them in Studio.`);
} else if (!apply) {
  console.log("\nDry run — nothing written. Re-run with --draft to stage for review, or --apply to publish.");
} else {
  const tx = client.transaction();
  for (const p of PATCHES) tx.patch(p.id, (patch) => patch.ifRevisionId(REVISIONS[p.id]).set(p.set));
  if (!process.env.SANITY_TOKEN) throw new Error("SANITY_TOKEN is required to apply.");
  const res = await tx.commit();
  console.log(`\nPublished ${res.results.length} patches (transaction ${res.transactionId}).`);
}
