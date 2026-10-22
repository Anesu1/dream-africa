/**
 * Publishes the drafts staged on 22 Oct 2026 by content-fixes-2026-10-22.mts and
 * content-group-car-hire-2026-10-22.mts — the same thing as pressing Publish on each in Studio.
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=7zk2mk45 NEXT_PUBLIC_SANITY_DATASET=production node --env-file=.env.local --experimental-strip-types scripts/publish-drafts-2026-10-22.mts [--apply]
 *
 * Refuses to publish if a published document changed after its draft was staged (someone edited
 * it in Studio meanwhile), or if any draft contains a price.
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

// Published revision each draft was based on; null = brand-new document. Order matters: the new
// post is published before the documents that reference it.
const STAGED: [id: string, baseRev: string | null][] = [
  ["journalPost-group-car-hire-victoria-falls", null],
  ["tour-chobe-day-trip", "Gw5fvCwhtb37u7sHlaiTD6"],
  ["activitiesPageSettings", "N1G5rtOZj8187JlhVFQqur"],
  ["journalPost-chobe-day-trip-itinerary", "cnh1QQ0Fd15PIuBcp8MeJv"],
  ["itineraryPage-3-days-in-victoria-falls", "0YKpiHcLUDtAprmSUhHqVE"],
  ["rentalsPageSettings", "Gw5fvCwhtb37u7sHlaiTD6"],
  ["vehicle-toyota-fortuner", "LL9K1HK6ye3mqnvwcJzMmk"],
  ["vehicle-toyota-quantum", "cnh1QQ0Fd15PIuBcp8QF0w"],
];

type Doc = { _id: string; _rev: string; [key: string]: unknown };

// Drafts reference the not-yet-published post weakly; publishing makes the reference strong,
// as Studio does.
function strengthen(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(strengthen);
  if (value && typeof value === "object") {
    const { _weak, _strengthenOnPublish, ...rest } = value as Record<string, unknown>;
    void _weak;
    void _strengthenOnPublish;
    return Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, strengthen(v)]));
  }
  return value;
}

if (!process.env.SANITY_TOKEN) throw new Error("SANITY_TOKEN is required.");
const ids = STAGED.map(([id]) => id);
const docs = await client.fetch<Doc[]>(`*[_id in $all]`, { all: [...ids, ...ids.map((id) => `drafts.${id}`)] });

const tx = client.transaction();
for (const [id, baseRev] of STAGED) {
  const draft = docs.find((d) => d._id === `drafts.${id}`);
  const published = docs.find((d) => d._id === id);
  if (!draft) throw new Error(`No draft for ${id} — already published or discarded?`);
  if ((published?._rev ?? null) !== baseRev) throw new Error(`${id} was edited after its draft was staged; review it in Studio.`);
  // Block any price the draft would add; amounts already published (activities page notes) are
  // left for a separate decision.
  const prices = (d?: Doc) => new Set(JSON.stringify(d ?? {}).match(/(?:US)?\$\s?\d[\d,.]*/g) ?? []);
  const before = prices(published);
  const added = [...prices(draft)].filter((p) => !before.has(p));
  if (added.length > 0) throw new Error(`Draft ${id} would add prices: ${added.join(", ")}`);

  const { _rev, _id, ...content } = draft;
  void _rev;
  void _id;
  const doc = { ...(strengthen(content) as Record<string, unknown>), _id: id, _type: draft._type as string };
  console.log(`${published ? "update" : "create"} ${id}`);
  tx.createOrReplace(doc).delete(`drafts.${id}`);
}

if (!apply) {
  console.log("\nChecks passed — nothing written. Re-run with --apply to publish.");
} else {
  const res = await tx.commit();
  console.log(`\nPublished ${STAGED.length} documents (transaction ${res.transactionId}).`);
}
