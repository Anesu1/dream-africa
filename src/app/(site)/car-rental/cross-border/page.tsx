import type { Metadata } from "next";
import Reveal from "@/components/ui/reveal";
import MagneticButton from "@/components/ui/magnetic-button";
import CrossSellCard from "@/components/ui/cross-sell-card";
import { HowToJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { whatsappLink } from "@/lib/whatsapp";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Cross-Border Car Rental Victoria Falls to Botswana & Zambia",
  description:
    "Drive seamlessly from Victoria Falls to Chobe & Livingstone. Eden Car Rental handles all cross-border permits and documentation.",
  keywords: [
    "cross border car rental Victoria Falls",
    "cross border car rental Victoria Falls to Botswana",
    "car hire Victoria Falls to Zambia Livingstone",
    "cross border vehicle permits Zimbabwe",
    "Kazungula bridge car rental crossing",
    "COMESA yellow card car rental Victoria Falls",
  ],
  alternates: { canonical: "/car-rental/cross-border" },
  openGraph: {
    title: "Cross-Border Car Rental Victoria Falls to Botswana & Zambia",
    description:
      "Drive seamlessly from Victoria Falls to Chobe & Livingstone. Eden Car Rental handles all cross-border permits and documentation.",
    url: "https://africadreamadventures.co.zw/car-rental/cross-border",
    siteName: "Eden Car Rental",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&h=630&q=80&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Cross-Border 4x4 rental at Kazungula bridge border post",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cross-Border Car Rental Victoria Falls to Botswana & Zambia",
    description:
      "Drive seamlessly from Victoria Falls to Chobe & Livingstone. Eden Car Rental handles all permits and cross-border paperwork.",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&h=630&q=80&auto=format&fit=crop",
    ],
  },
};

const BORDER_STEPS = [
  {
    name: "Request Cross-Border Permits in Advance",
    text: "Notify Eden Car Rental at least 48 hours prior to your rental start date. We prepare the official Certified Letter of Authority, Police Clearance Certificate, and vehicle registration papers.",
  },
  {
    name: "Collection of COMESA Yellow Card Insurance",
    text: "Upon vehicle delivery in Victoria Falls or VFA Airport, you receive the physical Cross-Border Dossier containing the COMESA Yellow Card (third-party liability insurance valid across SADC).",
  },
  {
    name: "Entering Botswana via Kazungula Border Post",
    text: "At the Kazungula One-Stop Border Post (70km west of Victoria Falls), present your passport for immigration, then proceed to the vehicle clearance desk to stamp your Temporary Import Permit (TIP) and settle standard road safety fund charges.",
  },
  {
    name: "Entering Zambia via Victoria Falls Bridge",
    text: "Drive across the historic Victoria Falls Bridge. Clear Zimbabwe border control, proceed to the Zambian side, present your letter of authority, and settle the standard carbon tax and council toll fee.",
  },
];

export default async function CrossBorderPage() {
  const siteSettings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY });

  return (
    <>
      <HowToJsonLd
        name="How to Drive a Rental Car from Victoria Falls to Botswana and Zambia"
        description="Comprehensive step-by-step guide on crossing international borders from Victoria Falls into Chobe (Botswana) and Livingstone (Zambia) with an Eden Car Rental vehicle."
        steps={BORDER_STEPS}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Car Rental", item: "/car-rental" },
          { name: "Cross-Border Permits", item: "/car-rental/cross-border" },
        ]}
      />

      <div className="min-h-screen bg-[#0D1117] pb-24 pt-28 text-white sm:pt-36">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
              <span>Cross-Border Logistics</span>
              <span>•</span>
              <span>Botswana & Zambia Authority</span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl text-white">
              Cross-Border Car Rental Victoria Falls
            </h1>

            <p className="mt-4 max-w-3xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Drive effortlessly across international borders. Eden Car Rental provides complete cross-border documentation, certified owner authority letters, and COMESA third-party insurance for seamless entry into Botswana (Chobe / Kasane) and Zambia (Livingstone).
            </p>
          </Reveal>

          {/* Border Breakdown Columns */}
          <div className="my-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Botswana Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-full bg-blue-900/60 border border-blue-600/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-200">
                  🇧🇼 Zimbabwe → Botswana
                </span>
                <span className="text-xs text-slate-400">Border: Kazungula (06:00 - 22:00)</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
                Victoria Falls to Chobe National Park
              </h3>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Distance: 70 km (approx. 1 hour paved drive). Ideal for self-drive game drives along the Chobe River front and camping at Kasane safari lodges.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-5">
                <div className="font-semibold text-gold uppercase tracking-wider mb-2">Required Paperwork (Provided by Eden):</div>
                <div className="flex items-center gap-2"><span>✔</span> Certified Letter of Authority from Vehicle Owner</div>
                <div className="flex items-center gap-2"><span>✔</span> Police Vehicle Clearance Certificate</div>
                <div className="flex items-center gap-2"><span>✔</span> Certified Copy of Zimbabwe Registration Book</div>
                <div className="flex items-center gap-2"><span>✔</span> Valid Driver&apos;s License (English or International)</div>
              </div>
            </div>

            {/* Zambia Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-full bg-emerald-900/60 border border-emerald-600/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-200">
                  🇿🇲 Zimbabwe → Zambia
                </span>
                <span className="text-xs text-slate-400">Border: Victoria Falls Bridge (06:00 - 22:00)</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
                Victoria Falls to Livingstone
              </h3>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Distance: 12 km (approx. 20 minute drive across the iconic gorge bridge). Perfect for visiting the Zambian side of the falls, Devil&apos;s Pool, and Livingstone Museum.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-5">
                <div className="font-semibold text-gold uppercase tracking-wider mb-2">Required Paperwork (Provided by Eden):</div>
                <div className="flex items-center gap-2"><span>✔</span> COMESA Yellow Card Third-Party Insurance</div>
                <div className="flex items-center gap-2"><span>✔</span> Cross-Border Letter of Authority</div>
                <div className="flex items-center gap-2"><span>✔</span> Interpol / CID Clearance Voucher</div>
                <div className="flex items-center gap-2"><span>✔</span> Carbon Tax & Council Toll Guidance</div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Border Clearance Guide */}
          <Reveal className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12 mb-16">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl mb-8">
              Step-by-Step Crossing Protocol
            </h2>

            <div className="space-y-8 border-l-2 border-gold/40 pl-6 ml-2">
              {BORDER_STEPS.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold ring-4 ring-slate-950">
                    <span className="text-[9px] font-bold text-slate-950">{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{step.name}</h3>
                  <p className="mt-1 text-sm text-slate-300 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Action CTA */}
          <div className="text-center rounded-2xl border border-gold/40 bg-gold/5 p-8 sm:p-12 mb-16">
            <h3 className="font-display text-2xl font-bold text-white uppercase">
              Ready to Reserve Your Cross-Border 4x4?
            </h3>
            <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto">
              Permits are prepared ahead of time so your vehicle handover takes under 10 minutes.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href={whatsappLink(
                  siteSettings?.whatsapp,
                  "Hi Eden Car Rental, I need a 4x4 with cross-border permits for Botswana/Zambia."
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagneticButton className="rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-950 hover:bg-white shadow-xl">
                  Order Cross-Border 4x4 on WhatsApp
                </MagneticButton>
              </a>
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
