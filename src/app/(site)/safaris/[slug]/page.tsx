import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/reveal";
import MagneticButton from "@/components/ui/magnetic-button";
import CrossSellCard from "@/components/ui/cross-sell-card";
import { TourJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { whatsappLink } from "@/lib/whatsapp";
import { SAFARI_TOURS, type SafariTour } from "@/lib/data/safaris";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY, TOURS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings, Tour } from "@/sanity/lib/types";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getTourData(slug: string): Promise<SafariTour | null> {
  const staticTour = SAFARI_TOURS.find((t) => t.slug === slug);
  if (staticTour) return staticTour;

  try {
    const sanityTours = await sanityFetch<Tour[]>({ query: TOURS_QUERY });
    const match = sanityTours?.find((t) => t.slug === slug);
    if (match) {
      return {
        slug: match.slug,
        title: match.title,
        category: match.category || "Luxury Safari",
        duration: match.duration || "Full Day",
        price: "Inquire for Rates",
        priceUnit: "Best Price Guarantee",
        image: match.image,
        description: match.description,
        overview: match.description,
        highlights: match.highlights || ["Exclusive private guide", "Park entrance fees coordinated"],
        itinerary: [
          { day: "Day 1", title: "Expedition Departure", desc: match.description },
        ],
        inclusions: ["Private transfers", "Professional naturalist guide", "Cold refreshments"],
        exclusions: ["Items of personal nature", "Gratuities"],
        bestTimeToVisit: "Year-round",
      };
    }
  } catch {
    // Sanity query fallback
  }

  return null;
}

export async function generateStaticParams() {
  return SAFARI_TOURS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourData(slug);
  if (!tour) return { title: "Safari Tour | Africa Dream Adventures" };

  const pageTitle = `${tour.title} | Africa Dream Safaris Victoria Falls`;
  const pageDescription = `${tour.description} Book direct with Africa Dream Adventures. Private guides, luxury vehicles, and all-inclusive logistics.`;
  const canonicalUrl = `/safaris/${tour.slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://africadreamadventures.co.zw${canonicalUrl}`,
      siteName: "Africa Dream Adventures",
      type: "website",
      images: [
        {
          url: tour.image,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [tour.image],
    },
  };
}

export default async function SafariDetailPage({ params }: Props) {
  const { slug } = await params;
  const [tour, siteSettings] = await Promise.all([
    getTourData(slug),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);

  if (!tour) notFound();

  const tourUrl = `https://africadreamadventures.co.zw/safaris/${tour.slug}`;

  return (
    <>
      <TourJsonLd
        name={tour.title}
        description={tour.description}
        url={tourUrl}
        image={tour.image}
        duration={tour.duration}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Safaris", item: "/safaris" },
          { name: tour.title, item: `/safaris/${tour.slug}` },
        ]}
      />

      <article className="min-h-screen bg-paper pb-24 pt-28 text-ink sm:pt-36">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
          <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
            <Link href="/safaris" className="hover:underline">
              Safaris
            </Link>
            <span>/</span>
            <span>{tour.category}</span>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <Reveal>
                <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl text-ink">
                  {tour.title}
                </h1>
              </Reveal>

              <Reveal className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                <span className="rounded-full bg-off-white px-3.5 py-1.5 border border-line">
                  ⏳ {tour.duration}
                </span>
                <span className="rounded-full bg-off-white px-3.5 py-1.5 border border-line">
                  🌿 {tour.bestTimeToVisit}
                </span>
                <span className="rounded-full bg-gold/15 text-gold px-3.5 py-1.5 border border-gold/30">
                  ✨ Private Certified Guide
                </span>
              </Reveal>

              <Reveal className="my-8 overflow-hidden rounded-xl shadow-xl">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  width={1200}
                  height={675}
                  priority
                  className="h-[380px] w-full object-cover sm:h-[500px]"
                />
              </Reveal>

              <Reveal className="prose prose-lg max-w-none text-muted leading-relaxed">
                <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-ink">
                  Expedition Overview
                </h2>
                <p className="mt-3 text-base sm:text-lg">{tour.overview}</p>
              </Reveal>

              <Reveal className="mt-10 rounded-xl border border-line bg-off-white p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
                  Safari Highlights
                </h3>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {tour.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gold flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {tour.itinerary && tour.itinerary.length > 0 && (
                <Reveal className="mt-12">
                  <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-ink mb-6">
                    Structured Schedule & Route
                  </h3>
                  <div className="space-y-6 border-l-2 border-gold/40 pl-6 ml-2">
                    {tour.itinerary.map((step, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-paper" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                          {step.day}
                        </span>
                        <h4 className="text-lg font-semibold text-ink mt-0.5">{step.title}</h4>
                        <p className="text-sm text-muted mt-1 leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}

              <Reveal className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-6 dark:bg-emerald-950/10">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-400 mb-3">
                    ✓ What is Included
                  </h4>
                  <ul className="space-y-2 text-xs text-muted">
                    {tour.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-emerald-600">✔</span> {inc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-rose-500/20 bg-rose-50/50 p-6 dark:bg-rose-950/10">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-rose-800 dark:text-rose-400 mb-3">
                    ✕ What is Excluded
                  </h4>
                  <ul className="space-y-2 text-xs text-muted">
                    {tour.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-rose-500">✕</span> {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <CrossSellCard
                type="safari-to-rental"
                customHeadline="Need ground mobility? Rent an Eden Car Rental SUV directly at the airport."
                customBody="Take full control of your Zimbabwe and Botswana itinerary. Rent a safari-ready Toyota Hilux 4x4 or luxury SUV with optional rooftop tents, GPS tracking, and complete gravel-road CDW insurance. Free terminal pickup at Victoria Falls (VFA) with zero hidden fees."
              />
            </div>

            {/* Sidebar Sticky Inquire Card */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 rounded-2xl border border-line bg-paper p-6 sm:p-8 shadow-xl">
                <div className="mb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">Pricing Status</span>
                  <div className="mt-1 font-display text-2xl font-bold text-ink">
                    Custom Quote on Request
                  </div>
                  <p className="text-xs text-muted mt-1">Direct transparent pricing • No hidden fees</p>
                </div>

                <div className="border-t border-line my-5 pt-5 space-y-3 text-xs text-muted">
                  <div className="flex justify-between">
                    <span>Departure Hub</span>
                    <span className="font-semibold text-ink">Victoria Falls</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span className="font-semibold text-ink">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transfers</span>
                    <span className="font-semibold text-emerald-600">Door-to-Door Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>National Park Fees</span>
                    <span className="font-semibold text-ink">Disclosed Upfront</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={whatsappLink(
                      siteSettings?.whatsapp,
                      `Hi Africa Dream Adventures, I would like to request rates and availability for "${tour.title}".`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <MagneticButton className="w-full rounded-full bg-gold py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-ink shadow-md transition-all hover:bg-ink hover:text-paper">
                      Inquire on WhatsApp Now
                    </MagneticButton>
                  </a>

                  <Link href="/safaris" className="text-center text-xs uppercase tracking-[0.16em] text-muted hover:text-gold pt-2">
                    ← Back to All Safaris
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
