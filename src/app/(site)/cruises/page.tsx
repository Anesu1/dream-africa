import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import MagneticButton from "@/components/ui/magnetic-button";
import CrossSellCard from "@/components/ui/cross-sell-card";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { RIVER_CRUISES } from "@/lib/data/cruises";

export const metadata: Metadata = {
  title: "Luxury Zambezi River Cruises Victoria Falls | Sunset & Dinner",
  description:
    "Glide along the Zambezi River on luxury vessels. Enjoy complimentary fine wines, gourmet dining, and frequent elephant and hippopotamus sightings.",
  keywords: [
    "Zambezi luxury sunset dinner cruise",
    "Victoria Falls river cruise",
    "private Zambezi boat charter",
    "upper Zambezi sunset safari",
    "Victoria Falls dinner cruise",
  ],
  alternates: { canonical: "/cruises" },
  openGraph: {
    title: "Luxury Zambezi River Cruises Victoria Falls | Sunset & Dinner",
    description:
      "Experience the Zambezi River on luxury vessels. Sunset cocktails, fine dining, and elephant sightings along the riverbank.",
    url: "https://africadreamadventures.co.zw/cruises",
    siteName: "Africa Dream Adventures",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&h=630&q=80&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Luxury Zambezi Sunset River Cruise Victoria Falls",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Zambezi River Cruises Victoria Falls",
    description:
      "Sunset cocktails, fine dining, and elephant sightings along the Zambezi riverbank.",
    images: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&h=630&q=80&auto=format&fit=crop",
    ],
  },
};

export default function CruisesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "River Cruises", item: "/cruises" },
        ]}
      />

      <div className="min-h-screen bg-paper pb-24 pt-28 text-ink sm:pt-36">
        <section className="mx-auto max-w-[1440px] px-6 sm:px-10">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              Upper Zambezi National Park Fleet
            </span>
            <h1 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl lg:text-6xl text-ink">
              Zambezi Luxury Sunset & Dinner Cruises
            </h1>
            <p className="mt-4 max-w-3xl text-base sm:text-lg text-muted leading-relaxed">
              Glide along the Zambezi River on luxury vessels. Enjoy complimentary fine wines, gourmet dining, and frequent elephant and hippopotamus sightings as the sun dips below the horizon.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
            {RIVER_CRUISES.map((cruise) => (
              <div
                key={cruise.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-off-white shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={cruise.image}
                    alt={cruise.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-ink/80 backdrop-blur-md px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                    {cruise.vesselType}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-center justify-between text-xs text-muted mb-2">
                    <span>⏱ {cruise.duration}</span>
                    <span>⏰ {cruise.departureTime}</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
                    {cruise.title}
                  </h3>

                  <p className="mt-3 text-sm text-muted leading-relaxed flex-1">
                    {cruise.description}
                  </p>

                  <div className="mt-6 border-t border-line/60 pt-6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Pricing</span>
                      <div className="font-display text-lg font-bold text-ink">
                        Inquire for Current Rates
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link href={`/cruises/${cruise.slug}`}>
                        <MagneticButton className="rounded-full bg-ink px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-all hover:bg-gold hover:text-ink">
                          View Details →
                        </MagneticButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CrossSellCard
            type="safari-to-rental"
            customHeadline="Need ground mobility? Rent an Eden Car Rental SUV directly at the airport."
            customBody="Take full control of your Zimbabwe and Botswana itinerary. Rent a safari-ready Toyota Hilux 4x4 or luxury SUV with optional rooftop tents, GPS tracking, and complete gravel-road CDW insurance. Free terminal pickup at Victoria Falls (VFA) with zero hidden fees."
          />
        </section>
      </div>
    </>
  );
}
