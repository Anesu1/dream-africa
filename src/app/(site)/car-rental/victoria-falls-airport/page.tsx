import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import MagneticButton from "@/components/ui/magnetic-button";
import CrossSellCard from "@/components/ui/cross-sell-card";
import { AutoRentalJsonLd } from "@/components/seo/json-ld";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { whatsappLink } from "@/lib/whatsapp";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Car Hire Victoria Falls Airport (VFA) | Eden Car Rental",
  description:
    "Book direct airport car rental at Victoria Falls International Airport (VFA). Terminal meet-and-greet, no shuttle delays, zero hidden fees.",
  keywords: [
    "car hire Victoria Falls International Airport VFA",
    "Victoria Falls airport car rental",
    "rent a car Victoria Falls airport",
    "airport pickup car rental Victoria Falls",
    "VFA car hire no hidden fees",
  ],
  alternates: { canonical: "/car-rental/victoria-falls-airport" },
  openGraph: {
    title: "Car Hire Victoria Falls Airport (VFA) | Eden Car Rental",
    description:
      "Book direct airport car rental at Victoria Falls International Airport (VFA). Terminal meet-and-greet, no shuttle delays, zero hidden fees.",
    url: "https://africadreamadventures.co.zw/car-rental/victoria-falls-airport",
    siteName: "Eden Car Rental",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&h=630&q=80&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Eden Car Rental Victoria Falls Airport terminal delivery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Hire Victoria Falls Airport (VFA) | Eden Car Rental",
    description:
      "Terminal meet-and-greet, no shuttle delays, zero hidden fees at Victoria Falls International Airport.",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&h=630&q=80&auto=format&fit=crop",
    ],
  },
};

export default async function AirportCarRentalPage() {
  const siteSettings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY });

  return (
    <>
      <AutoRentalJsonLd parentName={siteSettings?.name ?? "Africa Dream Adventures"} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Car Rental", item: "/car-rental" },
          { name: "Victoria Falls Airport (VFA)", item: "/car-rental/victoria-falls-airport" },
        ]}
      />

      <div className="min-h-screen bg-[#0D1117] pb-24 pt-28 text-white sm:pt-36">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <span>Terminal Arrival Desk</span>
              <span>•</span>
              <span>IATA: VFA</span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl text-white">
              Victoria Falls Airport Car Hire (VFA)
            </h1>

            <p className="mt-4 max-w-3xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Step straight off your flight and onto the open road. Our terminal concierge meets you at international arrivals with keys, pre-completed paperwork, and your vehicle parked right outside. Zero waiting, zero off-airport shuttles.
            </p>
          </Reveal>

          {/* Airport Advantage Grid */}
          <div className="my-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
              <h3 className="font-display text-xl font-bold text-white uppercase">Direct Terminal Handover</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Avoid crowded shuttle buses. Meet our uniformed representative in the arrival hall immediately after baggage clearance.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
              <h3 className="font-display text-xl font-bold text-white uppercase">Flight Tracking Guarantee</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                We monitor incoming flights into VFA in real time. If your flight is delayed, our team will be waiting with no extra fee.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
              <h3 className="font-display text-xl font-bold text-white uppercase">Fast-Track Key Return</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Drop off the vehicle right at the departures drop zone before your onward flight with a 2-minute express checkout.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 sm:p-12 mb-16 text-center">
            <h3 className="font-display text-2xl font-bold text-white uppercase">
              Arriving at Victoria Falls International Airport?
            </h3>
            <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto">
              Reserve your SUV or 4x4 now with your flight number and we will have your vehicle staged upon arrival.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href={whatsappLink(
                  siteSettings?.whatsapp,
                  "Hi Eden Car Rental, I'd like to book an airport pickup at Victoria Falls International Airport (VFA)."
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagneticButton className="rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-950 hover:bg-white shadow-xl">
                  Reserve Airport Car on WhatsApp
                </MagneticButton>
              </a>
              <Link
                href="/car-rental"
                className="rounded-full border border-slate-700 bg-slate-800 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white hover:border-gold transition-colors"
              >
                View Full Fleet →
              </Link>
            </div>
          </div>

          <CrossSellCard
            type="rental-to-safari"
            customHeadline="Need Airport Transfers or Private Chauffeur?"
            customBody="Prefer not to drive? Africa Dream Adventures provides luxury executive airport transfers and private chauffeur-driven safari tours across Victoria Falls."
          />
        </div>
      </div>
    </>
  );
}
