/**
 * CMS content fixes from the 16–19 October SEO review (Chobe page, rental fleet, journal CTAs).
 *
 * Dry run (prints the plan, writes nothing):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=7zk2mk45 NEXT_PUBLIC_SANITY_DATASET=production node --experimental-strip-types scripts/content-fixes-2026-10-19.mts
 * Apply (needs a write token):
 *   SANITY_TOKEN=... NEXT_PUBLIC_SANITY_PROJECT_ID=7zk2mk45 NEXT_PUBLIC_SANITY_DATASET=production node --experimental-strip-types scripts/content-fixes-2026-10-19.mts --apply
 *
 * Every patch is pinned to the document revision read on 19 Oct 2026. If someone has edited a
 * document in Studio since, the whole transaction is rejected rather than overwriting their work —
 * re-read the document and update the revision below.
 */
import { createClient } from "@sanity/client";

const apply = process.argv.includes("--apply");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const REVISIONS: Record<string, string> = {
  "tour-chobe-day-trip": "71MFNdPZqN73n9slXDN3Q0",
  rentalsPageSettings: "infT1bNDKJbVdCXG2PVDG1",
  "journalPost-best-4x4-vehicles-zimbabwe-safari": "I3Ef5RIrs4lB0Q3Zb29I9a",
  "journalPost-do-you-need-a-4x4-in-zimbabwe": "tUgkK4x2jCQXvq6Lz1a0pL",
  "journalPost-documents-needed-rent-car-zimbabwe": "tUgkK4x2jCQXvq6Lz1a1un",
  "journalPost-crossing-into-botswana-without-the-queue": "XOGt20mEOdWdoggbs0VfWE",
  "journalPost-rental-car-zimbabwe-to-zambia": "r506ORX06Z9TVnQN3pyzxs",
  "journalPost-self-drive-vs-chauffeur-victoria-falls": "tUgkK4x2jCQXvq6Lz1a2Zv",
  "journalPost-driving-victoria-falls-to-hwange": "r506ORX06Z9TVnQN3pyzgU",
  "journalPost-best-safaris-near-victoria-falls": "Z3wo2wFUVokFCqRXE2hf8B",
  // "What your rental insurance actually covers on Hwange's gravel roads"
  sZarkGCWKodXiPseaTdJdG: "sZarkGCWKodXiPseaTdJcV",
};

type PatchSpec = { id: string; why: string; set?: Record<string, unknown>; unset?: string[]; insertAfter?: [string, unknown[]] };

const rentalCta = { _type: "ctaLink", label: "Get a rental quote", href: "/car-rental-victoria-falls" };

const PATCHES: PatchSpec[] = [
  // --- Chobe day trip ---------------------------------------------------------------------
  {
    id: "tour-chobe-day-trip",
    why: "Remove 'valid passport is all you need' (contradicts the nationality FAQ) and the unverified 30–45 min timing",
    set: {
      'itinerarySteps[_key=="step2"].description':
        "We assist with crossing arrangements. Entry and re-entry documents depend on nationality; confirm requirements with us before travel.",
      'highlights[0]': "Border crossing assistance",
      'faqs[_key=="faq2"].answer':
        "Transport from Victoria Falls, help with the border crossing, the game drive, lunch and the river cruise. Chobe National Park entry fees are not included and are paid on the day — our 2026 price list puts them at US$20 per person, and we confirm the current fee when we quote.",
      'faqs[_key=="faq5"].answer':
        "Your passport and any visa documents your nationality requires, sun protection, a hat, and money for the park entry fee. Mornings on the river can be cool, so a light layer for the drive over is worth having.",
      'faqs[_key=="faq-border-times"].answer':
        "We plan the Kazungula crossing for early morning, before the day's queues build up. Border opening hours and processing times can change, so we confirm the timing for your date when you book.",
    },
    insertAfter: [
      'faqs[_key=="faq2"]',
      [
        {
          _key: "faq-price",
          _type: "faqItem",
          question: "How much does the Chobe day trip cost?",
          answer:
            "We quote each booking directly rather than publish one fixed rate, because the price depends on your date, group size and whether you want a private or shared vehicle. Send those details and your quote will state the currency, whether it's per person or per group, what's included, and the park fees payable on the day.",
        },
        {
          _key: "faq-booking",
          _type: "faqItem",
          question: "How do I book the Chobe day trip?",
          answer:
            "Use the quote form on this page or message us on WhatsApp with your date, group size, nationalities and where you're staying. We collect from your accommodation in Victoria Falls, confirm availability and send your quote — ask us about deposit and cancellation terms before you confirm.",
        },
      ],
    ],
  },

  // --- Car rental hub: Land Cruiser was replaced by the Quantum ----------------------------
  {
    id: "rentalsPageSettings",
    why: "FAQs still referenced the Land Cruiser, which is no longer in the fleet",
    set: {
      'rentalFaqs[_key=="rf0"].answer':
        "A valid licence held for two years, in English or with an international permit, plus a passport. Minimum driver age is 23 for the Fortuner; tell us the drivers' ages when you enquire about other vehicles.",
      'rentalFaqs[_key=="faq-pricing"].answer':
        "Rates depend on your chosen vehicle, rental dates, rental length and cross-border requirements. Send your dates and vehicle preference for a quote.",
    },
  },

  // --- Journal: drop Land Cruiser 79 links (they 308 to the hub) ---------------------------
  {
    id: "journalPost-best-4x4-vehicles-zimbabwe-safari",
    why: "Paragraph advertised the Land Cruiser 79 as a rentable vehicle",
    unset: ['body[_key=="b1"]'],
    set: {
      'body[_key=="b2"].children[_key=="b2s2"].text':
        " is the other 4x4 option — five seats, automatic, and a rooftop tent option for guests planning to camp along the way. If you're not sure which fits, that's exactly the kind of question to send us on WhatsApp rather than guess.",
      primaryCta: { ...rentalCta, label: "See the 4x4 fleet" },
    },
  },
  {
    id: "journalPost-do-you-need-a-4x4-in-zimbabwe",
    why: "'our Fortuner, Land Cruiser 79 or Hilux' → 'our Fortuner or Hilux'",
    set: { 'body[_key=="b1"].children[_key=="b1s2"].text': " or ", primaryCta: rentalCta },
    unset: [
      'body[_key=="b1"].children[_key=="b1s3"]',
      'body[_key=="b1"].children[_key=="b1s4"]',
      'body[_key=="b1"].markDefs[_key=="b1m3"]',
    ],
  },
  {
    id: "journalPost-documents-needed-rent-car-zimbabwe",
    why: "Driver-age sentence named the Land Cruiser 79",
    set: {
      'body[_key=="b1"].children[_key=="b1s4"].text':
        " has a minimum driver age of 23, which is about vehicle size and insurance terms rather than an arbitrary rule. Our other vehicles don't carry that restriction.",
      primaryCta: rentalCta,
    },
    unset: [
      'body[_key=="b1"].children[_key=="b1s2"]',
      'body[_key=="b1"].children[_key=="b1s3"]',
      'body[_key=="b1"].markDefs[_key=="b1m3"]',
    ],
  },

  // --- Journal: CTA buttons where the post is about a service but had none -----------------
  { id: "journalPost-crossing-into-botswana-without-the-queue", why: "Self-drive border post had no link to rentals", set: { primaryCta: rentalCta } },
  { id: "journalPost-rental-car-zimbabwe-to-zambia", why: "Missing CTA", set: { primaryCta: rentalCta } },
  { id: "journalPost-self-drive-vs-chauffeur-victoria-falls", why: "Missing CTA", set: { primaryCta: rentalCta } },
  { id: "journalPost-driving-victoria-falls-to-hwange", why: "Missing CTA", set: { primaryCta: rentalCta } },
  { id: "sZarkGCWKodXiPseaTdJdG", why: "Rental-insurance post had no link to rentals", set: { primaryCta: rentalCta } },
  {
    id: "journalPost-best-safaris-near-victoria-falls",
    why: "Missing CTA",
    set: { primaryCta: { _type: "ctaLink", label: "Browse safaris", href: "/safaris" } },
  },
];

const tx = client.transaction();
for (const p of PATCHES) {
  console.log(`\n${p.id}\n  ${p.why}`);
  for (const [path, value] of Object.entries(p.set ?? {})) console.log(`  set    ${path} = ${JSON.stringify(value)}`);
  for (const path of p.unset ?? []) console.log(`  unset  ${path}`);
  if (p.insertAfter) console.log(`  insert after ${p.insertAfter[0]}: ${p.insertAfter[1].length} item(s)`);

  tx.patch(p.id, (patch) => {
    let next = patch.ifRevisionId(REVISIONS[p.id]);
    if (p.unset) next = next.unset(p.unset);
    if (p.set) next = next.set(p.set);
    if (p.insertAfter) next = next.insert("after", p.insertAfter[0], p.insertAfter[1]);
    return next;
  });
}

if (!apply) {
  console.log("\nDry run — nothing written. Re-run with --apply and SANITY_TOKEN to publish.");
} else {
  if (!process.env.SANITY_TOKEN) throw new Error("SANITY_TOKEN is required to apply.");
  const res = await tx.commit();
  console.log(`\nPublished ${res.results.length} patches (transaction ${res.transactionId}).`);
}
