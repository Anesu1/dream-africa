import { defineQuery } from "groq";

const brandProjection = `{ name, tagline, "logo": logo.asset->url, parentNote }`;

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  name,
  tagline,
  address,
  founded,
  copyright,
  whatsapp,
  "brandSafaris": brandSafaris${brandProjection},
  "brandRentals": brandRentals${brandProjection},
  navLinks[]{ label, href },
  footerSafarisLinks[]{ label, href },
  footerRentalsLinks[]{ label, href },
  trustIndicators,
}`);

export const HOME_PAGE_QUERY = defineQuery(`*[_type == "homePage"][0]{
  "eyebrow": heroEyebrow,
  "headline": heroHeadline,
  "sub": heroSub,
  "primaryCta": heroPrimaryCta{ label, href },
  "secondaryCta": heroSecondaryCta{ label, href },
  "image": heroImage.asset->url,
  "whoWeAre": {
    "eyebrow": whoWeAreEyebrow,
    "heading": whoWeAreHeading,
    "body": whoWeAreBody,
    "image": whoWeAreImage.asset->url,
    "milestones": milestones[]{ year, label },
  },
  "experiences": [
    experienceSafaris{ "key": "safaris", label, title, description, "image": image.asset->url, cta, "href": "/safaris" },
    experienceRentals{ "key": "rentals", label, title, description, "image": image.asset->url, cta, "href": "/rentals" },
  ],
  "stats": stats[]{ value, suffix, decimals, label },
  "testimonials": testimonials[]{ quote, author, location },
  "faqs": faqs[]{ question, answer },
}`);

export const SAFARI_PAGE_QUERY = defineQuery(`*[_type == "safariPageSettings"][0]{
  heroEyebrow,
  heroTitle,
  heroDescription,
  "heroImage": heroImage.asset->url,
  "destinations": destinations[]{ name, description, "image": image.asset->url },
  "lodges": lodges[]{ name, region, "image": image.asset->url },
}`);

export const RENTALS_PAGE_QUERY = defineQuery(`*[_type == "rentalsPageSettings"][0]{
  heroEyebrow,
  heroTitle,
  heroDescription,
  "heroImage": heroImage.asset->url,
  "rentalServices": rentalServices[]{ title, description },
  "rentalFaqs": rentalFaqs[]{ question, answer },
}`);

export const ACTIVITIES_PAGE_QUERY = defineQuery(`*[_type == "activitiesPageSettings"][0]{
  heroEyebrow,
  heroTitle,
  heroDescription,
  "heroImage": heroImage.asset->url,
  "specialCombos": specialCombos[]{ title, price, savings, description, checklist },
  "packageTiers": packageTiers[]{ tier, title, price, productCount, included },
  "categories": categories[]{ title, "items": items[]{ label, price, note } },
  disclaimer,
}`);

export const TOURS_QUERY = defineQuery(`*[_type == "tour"] | order(order asc) {
  "slug": slug.current,
  category,
  duration,
  title,
  description,
  price,
  priceUnit,
  "image": image.asset->url,
  highlights,
}`);

export const TOUR_SLUGS_QUERY = defineQuery(`*[_type == "tour"]{ "slug": slug.current }`);

export const TOUR_BY_SLUG_QUERY = defineQuery(`*[_type == "tour" && slug.current == $slug][0]{
  "slug": slug.current,
  category,
  duration,
  title,
  description,
  price,
  priceUnit,
  "image": image.asset->url,
  highlights,
  "relatedJournalPosts": relatedJournalPosts[]->{ "slug": slug.current, title, excerpt, "image": image.asset->url },
}`);

export const VEHICLES_COUNT_QUERY = defineQuery(`count(*[_type == "vehicle"])`);

export const VEHICLES_QUERY = defineQuery(`*[_type == "vehicle"] | order(order asc) {
  "slug": slug.current,
  category,
  name,
  subtitle,
  price,
  "image": image.asset->url,
  "specs": specs[]{ label, value },
}`);

export const VEHICLE_SLUGS_QUERY = defineQuery(`*[_type == "vehicle"]{ "slug": slug.current }`);

export const VEHICLE_BY_SLUG_QUERY = defineQuery(`*[_type == "vehicle" && slug.current == $slug][0]{
  "slug": slug.current,
  category,
  name,
  subtitle,
  description,
  price,
  "image": image.asset->url,
  "specs": specs[]{ label, value },
  "relatedJournalPosts": relatedJournalPosts[]->{ "slug": slug.current, title, excerpt, "image": image.asset->url },
}`);

// publishedAt <= now() lets posts be written and dated ahead of time and
// simply appear on their own schedule — no cron job or manual publish step.
export const JOURNAL_POSTS_QUERY = defineQuery(`*[_type == "journalPost" && publishedAt <= now()] | order(publishedAt desc) {
  "slug": slug.current,
  category,
  title,
  excerpt,
  "image": image.asset->url,
}`);

export const JOURNAL_POST_SLUGS_QUERY = defineQuery(`*[_type == "journalPost" && publishedAt <= now()]{ "slug": slug.current }`);

export const JOURNAL_POST_BY_SLUG_QUERY = defineQuery(`*[_type == "journalPost" && slug.current == $slug && publishedAt <= now()][0] {
  "slug": slug.current,
  category,
  title,
  excerpt,
  body,
  "image": image.asset->url,
}`);
