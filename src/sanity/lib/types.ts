import type { PortableTextBlock } from "@portabletext/types";

export type CtaLink = { label: string; href: string };
export type NavLink = { label: string; href: string };
export type Milestone = { year: string; label: string };
export type StatItem = { value: number; label: string; suffix?: string; decimals?: number };
export type TestimonialItem = { quote: string; author: string; location: string };
export type FaqItem = { question: string; answer: string };
export type NamedImage = { name: string; description: string; image: string };
export type LodgeItem = { name: string; region: string; image: string };
export type RentalService = { title: string; description: string };

export type Brand = {
  name: string;
  tagline: string;
  logo: string;
  parentNote?: string;
};

export type SiteSettings = {
  name: string;
  tagline: string;
  address: string;
  founded: number;
  copyright: string;
  whatsapp: string;
  brandSafaris: Brand;
  brandRentals: Brand;
  navLinks: NavLink[];
  footerSafarisLinks: NavLink[];
  footerRentalsLinks: NavLink[];
  trustIndicators: string[];
};

export type ExperienceCard = {
  key: "safaris" | "rentals";
  label: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  href: string;
};

export type HomePage = {
  eyebrow: string;
  headline: [string, string];
  sub: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  image: string;
  whoWeAre: {
    eyebrow: string;
    heading: [string, string];
    body: string;
    image: string;
    milestones: Milestone[];
  };
  experiences: [ExperienceCard, ExperienceCard];
  stats: StatItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
};

export type SafariPageSettings = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  destinations: NamedImage[];
  lodges: LodgeItem[];
};

export type RentalsPageSettings = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  rentalServices: RentalService[];
};

export type ActivityItem = { label: string; price: string; note?: string };
export type ActivityCategory = { title: string; items: ActivityItem[] };
export type ComboPackage = { title: string; price: string; savings?: string; description: string; checklist?: string[] };
export type PackageTier = { tier: string; title: string; price: string; productCount?: string; included: string };

export type ActivitiesPageSettings = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  specialCombos: ComboPackage[];
  packageTiers: PackageTier[];
  categories: ActivityCategory[];
  disclaimer?: string;
};

export type Tour = {
  slug: string;
  category: string;
  duration: string;
  title: string;
  description: string;
  price: string;
  priceUnit: string;
  image: string;
  highlights: string[];
};

export type Vehicle = {
  slug: string;
  category: "SUV" | "4x4" | "Executive";
  name: string;
  subtitle: string;
  price: number;
  image: string;
  specs: { label: string; value: string }[];
};

export type JournalPostSummary = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
};

export type JournalPost = JournalPostSummary & {
  body: PortableTextBlock[];
};
