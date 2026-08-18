import type { Metadata } from "next";
import Link from "next/link";
import Destinations from "@/components/sections/safari/destinations";
import EditorialGallery from "@/components/sections/safari/editorial-gallery";
import Lodges from "@/components/sections/safari/lodges";
import BookingSection from "@/components/sections/booking-section";
import CrossSellCard from "@/components/ui/cross-sell-card";
import Reveal from "@/components/ui/reveal";
import MagneticButton from "@/components/ui/magnetic-button";
import { TravelAgencyJsonLd } from "@/components/seo/json-ld";
import { SAFARI_TOURS } from "@/lib/data/safaris";
import { whatsappLink } from "@/lib/whatsapp";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SAFARI_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SafariPageSettings, SiteSettings } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Luxury Victoria Falls Safaris & Hwange Tours | Africa Dream",
  description:
    "Private luxury safaris in Hwange, Chobe & Victoria Falls. Private game drives, luxury lodges, and custom African wildlife itineraries.",
  keywords: [
    "Victoria Falls luxury safaris",
    "private Hwange safari packages",
    "guided Victoria Falls national park tours",
    "best luxury safari operators Victoria Falls",
    "Zambezi canoe safari",
    "Chobe day trip from Victoria Falls",
    "tri park circuit safari Zimbabwe Botswana",
  ],
  alternates: { canonical: "/safaris" },
  openGraph: {
    title: "Luxury Victoria Falls Safaris & Hwange Tours | Africa Dream Adventures",
    description:
      "Private luxury safaris in Hwange, Chobe & Victoria Falls. Private game drives, luxury lodges, and custom African wildlife itineraries.",
    url: "https://africadreamadventures.co.zw/safaris",
    siteName: "Africa Dream Adventures",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=630&q=80&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Luxury Victoria Falls Safaris & Game Drives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Victoria Falls Safaris & Hwange Tours",
    description:
      "Private game drives, luxury lodges, and custom African wildlife itineraries in Victoria Falls & Hwange.",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=630&q=80&auto=format&fit=crop",
    ],
  },
};

export default async function SafarisPage() {
  const [safariPage, siteSettings] = await Promise.all([
    sanityFetch<SafariPageSettings>({ query: SAFARI_PAGE_QUERY }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);

  return (
    <>
      <TravelAgencyJsonLd parentName={siteSettings.name} />

      {/* Safari Hero with User Copy */}
      <section className="min-h-[70vh] bg-[#121417] text-white pt-36 pb-20 px-6 sm:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              <span>Africa Dream Adventures</span>
              <span>•</span>
              <span>Where Luxury Meets The Wild</span>
            </div>

            <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl text-white max-w-5xl">
              Private Luxury Safaris in Hwange, Chobe & Victoria Falls
            </h1>

            <p className="mt-5 max-w-3xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Step into the wild without compromising on comfort. Africa Dream Adventures offers curated luxury safari packages combining private wildlife game drives in Hwange National Park, day trips into Chobe, and five-star lodge stays. Enjoy private airport transfers, dedicated expert guides, and tailored itineraries designed around your schedule.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappLink(
                  siteSettings?.whatsapp,
                  "Hi Africa Dream Adventures, I would like to inquire about private luxury safari packages in Victoria Falls, Hwange, and Chobe."
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagneticButton className="rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-950 hover:bg-white shadow-xl">
                  Inquire on WhatsApp →
                </MagneticButton>
              </a>
              <a
                href="#packages"
                className="rounded-full border border-slate-700 bg-slate-800/80 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-200 hover:border-gold hover:text-gold transition-colors"
              >
                View Curated Packages
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Safari Packages Grid */}
      <section id="packages" className="border-t border-line bg-off-white py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
          <Reveal className="mb-14 max-w-3xl">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              Curated Wildlife Itineraries
            </div>
            <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl text-ink">
              Signature Safari Circuits & Private Expeditions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
              Transparent package planning with certified professional guides, private 4x4 open safari vehicles, and luxury accommodations.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {SAFARI_TOURS.map((tour, i) => (
              <Reveal key={tour.slug} delay={i * 0.08}>
                <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-md transition-all duration-300 hover:shadow-xl">
                  <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-ink/80 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur-md">
                      {tour.category}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center justify-between text-xs text-muted mb-2">
                      <span>⏳ {tour.duration}</span>
                      <span className="text-emerald-700 font-semibold">Private Guided</span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-ink uppercase tracking-tight">
                      {tour.title}
                    </h3>

                    <p className="mt-3 text-sm text-muted leading-relaxed flex-1">
                      {tour.description}
                    </p>

                    <div className="my-5 border-t border-line/60 pt-4 flex flex-wrap gap-2 text-xs text-muted">
                      {tour.highlights.slice(0, 3).map((h, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 bg-off-white rounded-full px-3 py-1 border border-line/50">
                          <span className="text-gold">•</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-line/60 pt-5 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gold">
                        Inquire for Current Rates
                      </span>

                      <Link href={`/safaris/${tour.slug}`}>
                        <MagneticButton className="rounded-full bg-ink px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper hover:bg-gold hover:text-ink transition-colors">
                          View Itinerary →
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

      <Destinations destinations={safariPage.destinations} />
      <EditorialGallery />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
        <CrossSellCard
          type="safari-to-rental"
          customHeadline="Need ground mobility? Rent an Eden Car Rental SUV directly at the airport."
          customBody="Take full control of your Zimbabwe and Botswana itinerary. Rent a safari-ready Toyota Hilux 4x4 or luxury SUV with optional rooftop tents, GPS tracking, and complete gravel-road CDW insurance. Free terminal pickup at Victoria Falls (VFA) with zero hidden fees."
        />
      </div>

      <Lodges lodges={safariPage.lodges} />
      <BookingSection
        division="safaris"
        eyebrow="Start Planning"
        headline={["let's get you", "on safari."]}
        body="Tell us your dates and group size — private departures, lodge transfers, and custom multi-day wildlife itineraries."
      />
    </>
  );
}
