import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import MagneticButton from "@/components/ui/magnetic-button";
import CrossSellCard from "@/components/ui/cross-sell-card";
import { AutoRentalJsonLd } from "@/components/seo/json-ld";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { VEHICLES } from "@/lib/data/vehicles";
import { whatsappLink } from "@/lib/whatsapp";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Victoria Falls Car Rental & 4x4 Hire | Eden Car Rental",
  description:
    "Reliable car hire at Victoria Falls Airport (VFA). Safari-ready 4x4s, SUVs, zero hidden fees, and full cross-border permits for Botswana and Zambia.",
  keywords: [
    "Victoria Falls car rental",
    "car hire Victoria Falls International Airport VFA",
    "rent a 4x4 Victoria Falls",
    "affordable car rental Victoria Falls Zimbabwe",
    "Hwange self drive 4x4 rental",
    "Toyota Hilux double cab rental Victoria Falls",
    "cross border car rental Victoria Falls to Chobe Botswana",
    "4x4 rental Victoria Falls unpaved road insurance",
  ],
  alternates: { canonical: "/car-rental" },
  openGraph: {
    title: "Victoria Falls Car Rental & 4x4 Hire | Eden Car Rental",
    description:
      "Reliable car hire at Victoria Falls Airport (VFA). Safari-ready 4x4s, SUVs, zero hidden fees, and full cross-border permits.",
    url: "https://africadreamadventures.co.zw/car-rental",
    siteName: "Eden Car Rental",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&h=630&q=80&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Eden Car Rental - Victoria Falls 4x4 Safari Hire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Victoria Falls Car Rental & 4x4 Hire | Eden Car Rental",
    description:
      "Rent reliable 4x4s and SUVs at Victoria Falls Airport with zero hidden fees and cross-border permits.",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&h=630&q=80&auto=format&fit=crop",
    ],
  },
};

export default async function CarRentalPage() {
  const siteSettings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY });

  return (
    <>
      <AutoRentalJsonLd parentName={siteSettings?.name ?? "Africa Dream Adventures"} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Car Rental", item: "/car-rental" },
        ]}
      />

      <div className="min-h-screen bg-[#0D1117] pb-24 pt-28 text-white sm:pt-36">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
          {/* Section 1: Fleet & Airport Car Rental */}
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Eden Car Rental Division</span>
              <span className="text-slate-500">•</span>
              <span className="text-gold">Victoria Falls Airport VFA</span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl text-white">
              Reliable Car Hire at Victoria Falls Airport (VFA) – Drive Your Journey
            </h1>

            <p className="mt-4 max-w-3xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore Zimbabwe and Southern Africa on your own terms. Eden Car Rental offers a reliable fleet ranging from affordable city sedans and SUVs to fully equipped 4x4 safari vehicles. Land at Victoria Falls International Airport and step straight into your vehicle with zero waiting time and zero hidden fees.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappLink(
                  siteSettings?.whatsapp,
                  "Hi Eden Car Rental, I would like to check vehicle availability and daily rates at Victoria Falls Airport (VFA)."
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagneticButton className="rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-950 hover:bg-white shadow-xl">
                  Check Availability on WhatsApp →
                </MagneticButton>
              </a>
              <a
                href="#safari-4x4-section"
                className="rounded-full border border-slate-700 bg-slate-800/80 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-200 hover:border-gold hover:text-gold transition-colors"
              >
                4x4 Safari Rentals
              </a>
            </div>
          </Reveal>

          {/* Key Value Props Bar */}
          <Reveal className="my-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="text-gold text-lg mb-2 font-display font-bold">✓ 01</div>
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Unlimited Mileage Options</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Enjoy complete freedom with unlimited distance packages across Zimbabwe, Botswana, and Zambia.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="text-gold text-lg mb-2 font-display font-bold">✓ 02</div>
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Full Cross-Border Paperwork</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Official COMESA yellow cards and owner authority letters for Chobe (Botswana) & Livingstone (Zambia).
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="text-gold text-lg mb-2 font-display font-bold">✓ 03</div>
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Gravel Road CDW Protection</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Comprehensive insurance covering unpaved park roads in Hwange and Chobe with zero hidden cleaning charges.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="text-gold text-lg mb-2 font-display font-bold">✓ 04</div>
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Instant WhatsApp Confirmation</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Reserve in minutes directly with our local fleet manager. Free airport terminal delivery and return.
              </p>
            </div>
          </Reveal>

          {/* Section 2: Safari 4x4 Self-Drive & Cross-Border Logistics */}
          <div id="safari-4x4-section" className="my-16 rounded-2xl border border-slate-800 bg-slate-900/90 p-8 sm:p-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              <span>Overland & Wildlife Circuits</span>
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
              Safari-Ready 4x4 Rentals for Hwange & Chobe Cross-Border Trips
            </h2>
            <p className="mt-4 max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed">
              Planning a self-drive safari to Hwange National Park or crossing into Botswana and Zambia? Our Toyota Hilux Double Cabs and Land Cruisers come equipped with optional rooftop tents, camping gear, double fuel tanks, and full gravel-road coverage. We handle all cross-border permits and insurance documentation so you can cross borders hassle-free.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/car-rental/4x4-safari"
                className="rounded-full bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-950 hover:bg-white transition-colors"
              >
                View 4x4 Safari Vehicles & Rooftop Tents →
              </Link>
              <Link
                href="/car-rental/cross-border"
                className="rounded-full border border-slate-700 bg-slate-800 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300 hover:text-white transition-colors"
              >
                Cross-Border Permit Details →
              </Link>
            </div>
          </div>

          {/* Fleet Grid */}
          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl mb-8">
              Available 4x4 & SUV Fleet in Victoria Falls
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {VEHICLES.map((vehicle) => (
              <div
                key={vehicle.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl transition-all duration-300 hover:border-slate-700 hover:shadow-2xl"
              >
                <div className="relative h-72 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-slate-950/80 backdrop-blur-md px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold border border-slate-800">
                    {vehicle.category}
                  </div>
                  {vehicle.crossBorderEligible && (
                    <div className="absolute right-4 top-4 rounded-full bg-blue-900/80 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-200 border border-blue-700/50">
                      Cross-Border Ready
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>⚙ {vehicle.transmission}</span>
                    <span>👥 {vehicle.passengers} Passengers</span>
                    <span>⛽ {vehicle.fuelType}</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
                    {vehicle.name}
                  </h3>

                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-gold">
                    {vehicle.subtitle}
                  </p>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed flex-1">
                    {vehicle.summary}
                  </p>

                  {/* Bullet points on cards */}
                  <div className="my-5 border-t border-slate-800/80 pt-4 space-y-1.5 text-xs text-slate-300">
                    {vehicle.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-emerald-400 text-xs">✔</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-800/80 pt-6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Pricing</span>
                      <div className="font-display text-lg font-bold text-gold">
                        Inquire for Daily Rates
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link href={`/car-rental/${vehicle.slug}`}>
                        <MagneticButton className="rounded-full bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-950 shadow-lg transition-all hover:bg-white hover:text-slate-900">
                          View Specs & Rent
                        </MagneticButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CrossSellCard
            type="rental-to-safari"
            customHeadline="Add a Helicopter Flight of Angels or Zambezi Sunset Cruise to your trip and save 10%!"
            customBody="Pair your vehicle hire with an unforgettable Victoria Falls helicopter 'Flight of Angels' or a private Zambezi luxury sunset dinner cruise. Enjoy bundle savings and seamless logistics."
          />
        </div>
      </div>
    </>
  );
}
