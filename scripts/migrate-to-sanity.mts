import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE,
  BRANDS,
  NAV_LINKS,
  HERO,
  WHO_WE_ARE,
  EXPERIENCES,
  STATS,
  DESTINATIONS,
  TOURS,
  LODGES,
  VEHICLES,
  RENTAL_SERVICES,
  TESTIMONIALS,
  TRUST_INDICATORS,
  FAQS,
  JOURNAL_POSTS,
  FOOTER_LINKS,
} from "../src/lib/content.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const assetCache = new Map<string, { _type: "reference"; _ref: string }>();

async function uploadImageFromUrl(url: string, filename: string) {
  const cached = assetCache.get(url);
  if (cached) return cached;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());

  const asset = await client.assets.upload("image", buffer, { filename });
  const ref = { _type: "reference" as const, _ref: asset._id };
  assetCache.set(url, ref);
  console.log(`  uploaded: ${filename}`);
  return ref;
}

async function uploadLocalImage(publicPath: string) {
  const cached = assetCache.get(publicPath);
  if (cached) return cached;

  const absPath = resolve(__dirname, "..", "public", publicPath.replace(/^\//, ""));
  const buffer = readFileSync(absPath);
  const asset = await client.assets.upload("image", buffer, { filename: publicPath.split("/").pop() });
  const ref = { _type: "reference" as const, _ref: asset._id };
  assetCache.set(publicPath, ref);
  console.log(`  uploaded (local): ${publicPath}`);
  return ref;
}

function img(ref: { _type: "reference"; _ref: string }) {
  return { _type: "image" as const, asset: ref };
}

async function run() {
  console.log("Uploading images...");

  const heroImg = img(await uploadImageFromUrl(HERO.image, "home-hero.jpg"));
  const whoWeAreImg = img(await uploadImageFromUrl(WHO_WE_ARE.image, "who-we-are.jpg"));
  const experienceSafarisImg = img(await uploadImageFromUrl(EXPERIENCES[0].image, "experience-safaris.jpg"));
  const experienceRentalsImg = img(await uploadImageFromUrl(EXPERIENCES[1].image, "experience-rentals.jpg"));
  const safarisLogoImg = img(await uploadLocalImage(BRANDS.safaris.logo));
  const rentalsLogoImg = img(await uploadLocalImage(BRANDS.rentals.logo));

  const destinationImgs = await Promise.all(
    DESTINATIONS.map((d, i) => uploadImageFromUrl(d.image, `destination-${i}.jpg`).then(img)),
  );
  const lodgeImgs = await Promise.all(
    LODGES.map((l, i) => uploadImageFromUrl(l.image, `lodge-${i}.jpg`).then(img)),
  );
  const tourImgs = await Promise.all(
    TOURS.map((t) => uploadImageFromUrl(t.image, `${t.slug}.jpg`).then(img)),
  );
  const vehicleImgs = await Promise.all(
    VEHICLES.map((v) => uploadImageFromUrl(v.image, `${v.slug}.jpg`).then(img)),
  );
  const journalImgs = await Promise.all(
    JOURNAL_POSTS.map((p) => uploadImageFromUrl(p.image, `${p.slug}.jpg`).then(img)),
  );

  console.log("Creating documents...");

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: SITE.name,
    tagline: SITE.tagline,
    address: SITE.address,
    founded: SITE.founded,
    copyright: SITE.copyright,
    whatsapp: SITE.whatsapp,
    brandSafaris: {
      _type: "brandInfo",
      name: BRANDS.safaris.name,
      tagline: BRANDS.safaris.tagline,
      logo: safarisLogoImg,
    },
    brandRentals: {
      _type: "brandInfo",
      name: BRANDS.rentals.name,
      tagline: BRANDS.rentals.tagline,
      logo: rentalsLogoImg,
      parentNote: BRANDS.rentals.parentNote,
    },
    navLinks: NAV_LINKS.map((l) => ({ _type: "navLinkItem", _key: l.href, ...l })),
    footerSafarisLinks: FOOTER_LINKS.safaris.map((l, i) => ({ _type: "navLinkItem", _key: `s${i}`, ...l })),
    footerRentalsLinks: FOOTER_LINKS.rentals.map((l, i) => ({ _type: "navLinkItem", _key: `r${i}`, ...l })),
    trustIndicators: TRUST_INDICATORS,
  });
  console.log("  siteSettings done");

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: HERO.eyebrow,
    heroHeadline: HERO.headline,
    heroSub: HERO.sub,
    heroPrimaryCta: { _type: "ctaLink", ...HERO.primaryCta },
    heroSecondaryCta: { _type: "ctaLink", ...HERO.secondaryCta },
    heroImage: heroImg,
    whoWeAreEyebrow: WHO_WE_ARE.eyebrow,
    whoWeAreHeading: WHO_WE_ARE.heading,
    whoWeAreBody: WHO_WE_ARE.body,
    whoWeAreImage: whoWeAreImg,
    milestones: WHO_WE_ARE.milestones.map((m) => ({ _type: "milestone", _key: m.year, ...m })),
    experienceSafaris: {
      _type: "experienceCard",
      label: EXPERIENCES[0].label,
      title: EXPERIENCES[0].title,
      description: EXPERIENCES[0].description,
      image: experienceSafarisImg,
      cta: EXPERIENCES[0].cta,
    },
    experienceRentals: {
      _type: "experienceCard",
      label: EXPERIENCES[1].label,
      title: EXPERIENCES[1].title,
      description: EXPERIENCES[1].description,
      image: experienceRentalsImg,
      cta: EXPERIENCES[1].cta,
    },
    stats: STATS.map((s, i) => ({ _type: "statItem", _key: `stat${i}`, ...s })),
    testimonials: TESTIMONIALS.map((t, i) => ({ _type: "testimonialItem", _key: `t${i}`, ...t })),
    faqs: FAQS.map((f, i) => ({ _type: "faqItem", _key: `f${i}`, ...f })),
  });
  console.log("  homePage done");

  await client.createOrReplace({
    _id: "safariPageSettings",
    _type: "safariPageSettings",
    heroEyebrow: "Experience 01",
    heroTitle: "Luxury Safaris",
    heroDescription:
      "Private guided expeditions through Victoria Falls, Hwange and the Zambezi — small groups, exclusive concessions, and guides who were born on this river.",
    heroImage: img(await uploadImageFromUrl("https://images.unsplash.com/photo-1554490679-5b6a0a7eeab3?w=2400&q=80&auto=format&fit=crop", "safari-hero.jpg")),
    destinations: DESTINATIONS.map((d, i) => ({ _type: "namedImage", _key: `d${i}`, name: d.name, description: d.description, image: destinationImgs[i] })),
    lodges: LODGES.map((l, i) => ({ _type: "lodgeItem", _key: `l${i}`, name: l.name, region: l.region, image: lodgeImgs[i] })),
  });
  console.log("  safariPageSettings done");

  await client.createOrReplace({
    _id: "rentalsPageSettings",
    _type: "rentalsPageSettings",
    heroEyebrow: "Africa Dream Adventures · Vehicle Hire Division",
    heroTitle: "Eden Car Rental",
    heroDescription:
      "A meticulously serviced 4×4 fleet delivered to your lodge or the airport gate — self-drive freedom, or a chauffeur when you'd rather not.",
    heroImage: img(await uploadImageFromUrl("https://images.unsplash.com/photo-1663659321400-d397a637b59c?w=2400&q=80&auto=format&fit=crop", "rentals-hero.jpg")),
    rentalServices: RENTAL_SERVICES.map((s, i) => ({ _type: "rentalService", _key: `rs${i}`, ...s })),
  });
  console.log("  rentalsPageSettings done");

  for (let i = 0; i < TOURS.length; i++) {
    const t = TOURS[i];
    await client.createOrReplace({
      _id: `tour-${t.slug}`,
      _type: "tour",
      title: t.title,
      slug: { _type: "slug", current: t.slug },
      category: t.category,
      duration: t.duration,
      description: t.description,
      price: t.price,
      priceUnit: t.priceUnit,
      image: tourImgs[i],
      highlights: t.highlights,
      order: i,
    });
  }
  console.log(`  ${TOURS.length} tours done`);

  for (let i = 0; i < VEHICLES.length; i++) {
    const v = VEHICLES[i];
    await client.createOrReplace({
      _id: `vehicle-${v.slug}`,
      _type: "vehicle",
      name: v.name,
      slug: { _type: "slug", current: v.slug },
      category: v.category,
      subtitle: v.subtitle,
      price: v.price,
      image: vehicleImgs[i],
      specs: v.specs.map((s, j) => ({ _type: "vehicleSpec", _key: `s${j}`, ...s })),
      order: i,
    });
  }
  console.log(`  ${VEHICLES.length} vehicles done`);

  for (let i = 0; i < JOURNAL_POSTS.length; i++) {
    const p = JOURNAL_POSTS[i];
    await client.createOrReplace({
      _id: `journalPost-${p.slug}`,
      _type: "journalPost",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      category: p.category,
      excerpt: p.excerpt,
      body: p.body.map((paragraph, j) => ({
        _type: "block",
        _key: `b${j}`,
        style: "normal",
        children: [{ _type: "span", _key: `s${j}`, text: paragraph, marks: [] }],
        markDefs: [],
      })),
      image: journalImgs[i],
      publishedAt: new Date(2026, 0, i + 1).toISOString(),
    });
  }
  console.log(`  ${JOURNAL_POSTS.length} journal posts done`);

  console.log("Migration complete.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
