import type { Metadata } from "next";
import Link from "next/link";
import Combos from "@/components/sections/activities/combos";
import Packages from "@/components/sections/activities/packages";
import PriceList from "@/components/sections/activities/price-list";
import ActivitiesCta from "@/components/sections/activities/cta";
import CrossSellCard from "@/components/ui/cross-sell-card";
import Reveal from "@/components/ui/reveal";
import MagneticButton from "@/components/ui/magnetic-button";
import { ActivitiesJsonLd } from "@/components/seo/json-ld";
import { ACTIVITIES } from "@/lib/data/activities";
import { whatsappLink } from "@/lib/whatsapp";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ACTIVITIES_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { ActivitiesPageSettings, SiteSettings } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Top Victoria Falls Activities & Adventure Packages | Africa Dream",
  description:
    "Make the most of your trip to Victoria Falls. Book helicopter flights, Zambezi sunset dinner cruises, Devil's Pool, and white-water rafting with guaranteed best pricing.",
  keywords: [
    "best things to do in Victoria Falls",
    "Victoria Falls helicopter flight of angels",
    "Batoka gorge white water rafting",
    "Victoria Falls bridge bungee jump",
    "Zambezi river luxury sunset dinner cruise",
    "Devils Pool tour price Livingstone Island",
  ],
  alternates: { canonical: "/activities" },
  openGraph: {
    title: "Top Victoria Falls Activities & Adventure Packages | Africa Dream Adventures",
    description:
      "Book Victoria Falls helicopter flights, white-water rafting, and bridge activities. Premium activity packages with best price guarantee.",
    url: "https://africadreamadventures.co.zw/activities",
    siteName: "Africa Dream Adventures",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&h=630&q=80&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Victoria Falls Adventure Activities & Helicopter Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Victoria Falls Activities & Adventure Packages",
    description:
      "Helicopter flights, white-water rafting, river cruises, and Devil's Pool with best price guarantee.",
    images: [
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&h=630&q=80&auto=format&fit=crop",
    ],
  },
};

export default async function ActivitiesPage() {
  const [activitiesPage, siteSettings] = await Promise.all([
    sanityFetch<ActivitiesPageSettings>({ query: ACTIVITIES_PAGE_QUERY }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);

  return (
    <>
      <ActivitiesJsonLd parentName={siteSettings.name} />

      {/* Hero Section with exact user copy */}
      <section className="min-h-[70vh] bg-[#121417] text-white pt-36 pb-20 px-6 sm:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              <span>Victoria Falls Adventures</span>
              <span>•</span>
              <span>Seven Natural Wonders of the World</span>
            </div>

            <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl text-white max-w-5xl">
              Unforgettable Experiences: Helicopter Flights, River Cruises & Adventure
            </h1>

            <p className="mt-5 max-w-3xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Make the most of your trip to one of the Seven Natural Wonders of the World. Book iconic Victoria Falls activities with guaranteed best pricing and seamless transfers.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappLink(
                  siteSettings?.whatsapp,
                  "Hi Africa Dream Adventures, I'd like to book Victoria Falls activities & helicopter flights."
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagneticButton className="rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-950 hover:bg-white shadow-xl">
                  Book via WhatsApp →
                </MagneticButton>
              </a>
              <a
                href="#activity-cards"
                className="rounded-full border border-slate-700 bg-slate-800/80 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-200 hover:border-gold hover:text-gold transition-colors"
              >
                Explore All Activities
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Iconic Activities Grid */}
      <section id="activity-cards" className="border-t border-line bg-off-white py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
          <Reveal className="mb-14 max-w-3xl">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              Iconic Experiences
            </div>
            <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl text-ink">
              Top Rated Excursions & Scenic Adventures
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
              Door-to-door hotel transfers, certified commercial safety standards, and transparent fee policies.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {ACTIVITIES.map((activity, i) => (
              <Reveal key={activity.slug} delay={i * 0.08}>
                <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-md transition-all duration-300 hover:shadow-xl">
                  <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-ink/80 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur-md">
                      {activity.category}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center justify-between text-xs text-muted mb-2">
                      <span>⏱ {activity.duration}</span>
                      <span className="text-emerald-700 font-semibold">Hotel Transfers Included</span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-ink uppercase tracking-tight">
                      {activity.title}
                    </h3>

                    <p className="mt-3 text-sm text-muted leading-relaxed flex-1">
                      {activity.description}
                    </p>

                    <div className="my-5 border-t border-line/60 pt-4 flex flex-wrap gap-2 text-xs text-muted">
                      {activity.highlights.slice(0, 3).map((h, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 bg-off-white rounded-full px-3 py-1 border border-line/50">
                          <span className="text-gold">•</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-line/60 pt-5 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gold">
                        Inquire for Best Rates
                      </span>

                      <Link href={`/activities/${activity.slug}`}>
                        <MagneticButton className="rounded-full bg-ink px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper hover:bg-gold hover:text-ink transition-colors">
                          View Details →
                        </MagneticButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Combos combos={activitiesPage.specialCombos} />
      <Packages tiers={activitiesPage.packageTiers} />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
        <CrossSellCard
          type="safari-to-rental"
          customHeadline="Need ground mobility? Rent an Eden Car Rental SUV directly at the airport."
          customBody="Take full control of your Zimbabwe and Botswana itinerary. Rent a safari-ready Toyota Hilux 4x4 or luxury SUV with optional rooftop tents, GPS tracking, and complete gravel-road CDW insurance. Free terminal pickup at Victoria Falls (VFA) with zero hidden fees."
        />
      </div>

      <PriceList categories={activitiesPage.categories} disclaimer={activitiesPage.disclaimer} />
      <ActivitiesCta whatsapp={siteSettings.whatsapp} />
    </>
  );
}
