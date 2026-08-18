import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/reveal";
import MagneticButton from "@/components/ui/magnetic-button";
import CrossSellCard from "@/components/ui/cross-sell-card";
import { TourJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { RIVER_CRUISES, type RiverCruise } from "@/lib/data/cruises";
import { whatsappLink } from "@/lib/whatsapp";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getCruiseData(slug: string): Promise<RiverCruise | null> {
  const match = RIVER_CRUISES.find((c) => c.slug === slug);
  return match || null;
}

export async function generateStaticParams() {
  return RIVER_CRUISES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cruise = await getCruiseData(slug);
  if (!cruise) return { title: "Zambezi Cruise | Africa Dream Adventures" };

  const pageTitle = `${cruise.title} | Victoria Falls Cruises`;
  const pageDescription = `${cruise.description} Complimentary premium open bar, gourmet canapés, and scenic Zambezi sunset views.`;
  const canonicalUrl = `/cruises/${cruise.slug}`;

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
          url: cruise.image,
          width: 1200,
          height: 630,
          alt: cruise.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [cruise.image],
    },
  };
}

export default async function CruiseDetailPage({ params }: Props) {
  const { slug } = await params;
  const [cruise, siteSettings] = await Promise.all([
    getCruiseData(slug),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);

  if (!cruise) notFound();

  const cruiseUrl = `https://africadreamadventures.co.zw/cruises/${cruise.slug}`;

  return (
    <>
      <TourJsonLd
        name={cruise.title}
        description={cruise.description}
        url={cruiseUrl}
        image={cruise.image}
        duration={cruise.duration}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Cruises", item: "/cruises" },
          { name: cruise.title, item: `/cruises/${cruise.slug}` },
        ]}
      />

      <article className="min-h-screen bg-paper pb-24 pt-28 text-ink sm:pt-36">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
          <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
            <Link href="/cruises" className="hover:underline">
              Cruises
            </Link>
            <span>/</span>
            <span>{cruise.vesselType}</span>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <Reveal>
                <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl text-ink">
                  {cruise.title}
                </h1>
              </Reveal>

              <Reveal className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                <span className="rounded-full bg-off-white px-3.5 py-1.5 border border-line">
                  ⏱ Duration: {cruise.duration}
                </span>
                <span className="rounded-full bg-off-white px-3.5 py-1.5 border border-line">
                  ⛵ {cruise.vesselType}
                </span>
                <span className="rounded-full bg-gold/15 text-gold px-3.5 py-1.5 border border-gold/30">
                  🥂 Premium Open Bar Included
                </span>
              </Reveal>

              <Reveal className="my-8 overflow-hidden rounded-xl shadow-xl">
                <Image
                  src={cruise.image}
                  alt={cruise.title}
                  width={1200}
                  height={675}
                  priority
                  className="h-[380px] w-full object-cover sm:h-[500px]"
                />
              </Reveal>

              <Reveal className="prose prose-lg max-w-none text-muted leading-relaxed">
                <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-ink">
                  Cruise Experience & Wildlife
                </h2>
                <p className="mt-3 text-base sm:text-lg">{cruise.overview}</p>
              </Reveal>

              <Reveal className="mt-10 rounded-xl border border-line bg-off-white p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
                  Cruise Features
                </h3>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {cruise.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gold flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {cruise.menuHighlights && cruise.menuHighlights.length > 0 && (
                <Reveal className="mt-10 rounded-xl border border-gold/30 bg-gold/5 p-6 sm:p-8">
                  <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-ink mb-3">
                    🍽 Culinary & Beverage Menu Highlights
                  </h3>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-muted">
                    {cruise.menuHighlights.map((menu, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-gold">✦</span> {menu}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              <Reveal className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-6 dark:bg-emerald-950/10">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-400 mb-3">
                  ✓ Cruise Inclusions
                </h4>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-muted">
                  {cruise.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-emerald-600">✔</span> {inc}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <CrossSellCard
                type="safari-to-rental"
                customHeadline="Need ground mobility? Rent an Eden Car Rental SUV directly at the airport."
                customBody="Take full control of your Zimbabwe and Botswana itinerary. Rent a safari-ready Toyota Hilux 4x4 or luxury SUV with optional rooftop tents, GPS tracking, and complete gravel-road CDW insurance. Free terminal pickup at Victoria Falls (VFA) with zero hidden fees."
              />
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-28 rounded-2xl border border-line bg-paper p-6 sm:p-8 shadow-xl">
                <div className="mb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">Pricing</span>
                  <div className="mt-1 font-display text-2xl font-bold text-ink">
                    Inquire for Seasonal Rates
                  </div>
                  <p className="text-xs text-muted mt-1">All drinks and gourmet dinner included</p>
                </div>

                <div className="border-t border-line my-5 pt-5 space-y-3 text-xs text-muted">
                  <div className="flex justify-between">
                    <span>Departure Time</span>
                    <span className="font-semibold text-ink">{cruise.departureTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vessel Class</span>
                    <span className="font-semibold text-ink">{cruise.vesselType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Open Bar</span>
                    <span className="font-semibold text-emerald-600">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hotel Transfers</span>
                    <span className="font-semibold text-ink">Round-trip Included</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={whatsappLink(
                      siteSettings?.whatsapp,
                      `Hi Africa Dream Adventures, I would like to book the "${cruise.title}". Please confirm rates and departure availability.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <MagneticButton className="w-full rounded-full bg-gold py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-ink shadow-md transition-all hover:bg-ink hover:text-paper">
                      Reserve Cruise on WhatsApp
                    </MagneticButton>
                  </a>

                  <Link href="/cruises" className="text-center text-xs uppercase tracking-[0.16em] text-muted hover:text-gold pt-2">
                    ← Back to All Cruises
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
