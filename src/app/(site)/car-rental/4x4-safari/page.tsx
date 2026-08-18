import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import CrossSellCard from "@/components/ui/cross-sell-card";
import { AutoRentalJsonLd } from "@/components/seo/json-ld";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Rent 4x4 Self-Drive Safari Vehicles Victoria Falls | Eden",
  description:
    "Safari-ready Toyota Hilux & Land Cruisers for Hwange & Chobe self-drive trips. Unlimited mileage, rooftop tents & camping gear.",
  keywords: [
    "4x4 self drive Victoria Falls",
    "Hwange self drive 4x4 rental with camping gear",
    "Victoria Falls safari vehicle hire with rooftop tents",
    "Toyota Hilux double cab rental Victoria Falls",
    "self drive safari tours Zimbabwe",
    "camping car rental Victoria Falls",
  ],
  alternates: { canonical: "/car-rental/4x4-safari" },
  openGraph: {
    title: "Rent 4x4 Self-Drive Safari Vehicles Victoria Falls | Eden Car Rental",
    description:
      "Safari-ready Toyota Hilux & Land Cruisers for Hwange & Chobe self-drive trips. Unlimited mileage, rooftop tents & camping gear.",
    url: "https://africadreamadventures.co.zw/car-rental/4x4-safari",
    siteName: "Eden Car Rental",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&h=630&q=80&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Safari 4x4 vehicle with rooftop tent in Victoria Falls",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rent 4x4 Self-Drive Safari Vehicles Victoria Falls | Eden",
    description:
      "Safari-ready Toyota Hilux & Land Cruisers for Hwange & Chobe self-drive trips. Unlimited mileage, rooftop tents & camping gear.",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&h=630&q=80&auto=format&fit=crop",
    ],
  },
};

export default async function Safari4x4Page() {
  const siteSettings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY });

  return (
    <>
      <AutoRentalJsonLd parentName={siteSettings?.name ?? "Africa Dream Adventures"} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Car Rental", item: "/car-rental" },
          { name: "4x4 Safari Vehicles", item: "/car-rental/4x4-safari" },
        ]}
      />

      <div className="min-h-screen bg-[#0D1117] pb-24 pt-28 text-white sm:pt-36">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <span>Overland Safari Fleet</span>
              <span>•</span>
              <span>Hwange & Chobe Self-Drive</span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl text-white">
              4x4 Safari Vehicles & Rooftop Camping Tents
            </h1>

            <p className="mt-4 max-w-3xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore the wildest corners of Southern Africa in total autonomy. Our safari-equipped 4x4 fleet features heavy-duty suspension, dual battery systems, Engel refrigerators, double rooftop tents, and complete bush camping kits.
            </p>
          </Reveal>

          {/* Overland Equipment Grid */}
          <div className="my-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
              <div className="text-3xl mb-3">🏕</div>
              <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">
                Rooftop Tents & Bedding
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Easy 3-minute setup aluminium or canvas rooftop tents with high-density foam mattresses, cotton sheets, warm sleeping bags, and pillows for up to 4 adults.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
              <div className="text-3xl mb-3">❄️</div>
              <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">
                Dual Battery & Engel Fridge
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                40L 12V/220V Engel dual-zone fridge-freezer connected to a deep-cycle auxiliary battery with solar recharging, ensuring your provisions stay ice-cold deep in the bush.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
              <div className="text-3xl mb-3">🛠</div>
              <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">
                Self-Recovery Gear
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Heavy-duty air compressor, tyre deflator, high-lift jack, kinetic tow ropes, bow shackles, spade, and comprehensive tool kit included with every safari booking.
              </p>
            </div>
          </div>

          {/* Featured Safari Models */}
          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl mb-8">
              Recommended Safari Expeditions Vehicles
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Flagship Workhorse</span>
                <h3 className="font-display text-2xl font-bold text-white uppercase mt-1">
                  Toyota Hilux 2.8 GD-6 Double Cab 4x4
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Ideal for couples or small families exploring Hwange, Chobe, and the Caprivi Strip. Equipped with optional dual rooftop tents and 140L long-range diesel tank.
                </p>
                <div className="mt-4 text-xs text-slate-400">
                  <span className="font-bold text-gold">Pricing:</span> Inquire for Daily Rates • Super CDW Included
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
                <Link
                  href="/car-rental/toyota-hilux-4x4-double-cab"
                  className="rounded-full bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-950 hover:bg-white transition-colors"
                >
                  View Details & Book →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Heavy-Duty Legend</span>
                <h3 className="font-display text-2xl font-bold text-white uppercase mt-1">
                  Toyota Land Cruiser 79 Series Expedition
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  The unbreakable expedition rig designed for deep Kalahari sands, Mana Pools, and remote trans-frontier overland safaris. 180L dual tanks and Warn winch.
                </p>
                <div className="mt-4 text-xs text-slate-400">
                  <span className="font-bold text-gold">Pricing:</span> Inquire for Daily Rates • SADC Cross-Border Ready
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
                <Link
                  href="/car-rental/toyota-land-cruiser-79-safari"
                  className="rounded-full bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-950 hover:bg-white transition-colors"
                >
                  View Details & Book →
                </Link>
              </div>
            </div>
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
