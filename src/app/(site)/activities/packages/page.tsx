import type { Metadata } from "next";
import Link from "next/link";
import MountReveal from "@/components/ui/mount-reveal";
import Reveal from "@/components/ui/reveal";
import BookingSection from "@/components/sections/booking-section";
import { whatsappLink } from "@/lib/whatsapp";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Victoria Falls Activity Packages & 2026 Prices | Save up to 25%",
  description:
    "Complete Victoria Falls activity packages and 2026 pricing guide. Compare combo deals: Helicopter Flight of Angels, Zambezi Jet Boat, White Water Rafting, Bungee, Sunset Cruise, and Chobe day trips.",
  keywords: [
    "victoria falls activity packages",
    "victoria falls activities prices",
    "vic falls activities and prices",
    "adventure activities victoria falls",
    "adventure activities in victoria falls",
    "adventure sports victoria falls",
    "all inclusive victoria falls activities",
    "water activities in victoria falls",
    "victoria falls activity packages 2026",
    "zambezi spectacular helicopter flight",
  ],
  alternates: { canonical: "/activities/packages" },
};

const PACKAGES_2026 = [
  {
    tier: "Signature Trio",
    title: "The Classic Victoria Falls Combo",
    duration: "1–2 Days",
    tag: "Best Value",
    description: "The definitive Victoria Falls holiday experience. See the smoke from the sky, walk the rainforest rim, and toast the sunset on the river.",
    included: [
      "15-Minute Helicopter Flight of Angels over the Falls",
      "Guided Walking Tour of the Victoria Falls Rainforest",
      "Luxury Zambezi Sunset Cruise with Premium Drinks & Canapés",
      "Return transfers from all Victoria Falls town hotels",
    ],
    highlight: "Saves ~18% compared to single bookings",
  },
  {
    tier: "Adrenaline Combo",
    title: "The Ultimate Batoka Thrill Pack",
    duration: "1 Full Day",
    tag: "High Octane",
    description: "For true thrill-seekers wanting to conquer Batoka Gorge from every angle: sky, river rapids, and canyon wall.",
    included: [
      "Victoria Falls Jet Boat in Batoka Gorge (Rapids 23–27)",
      "Full Day White Water Rafting (Rapids 1–19) with Riverside Lunch",
      "Choice of Victoria Falls Bridge Bungee, Gorge Swing, or Zip Line",
      "Funicular cable car gorge access and all safety gear",
    ],
    highlight: "Most requested adventure combo",
  },
  {
    tier: "Wildlife & Falls",
    title: "The Falls & Chobe Safari Package",
    duration: "2 Full Days",
    tag: "Safari + Falls",
    description: "Combine the wonders of Victoria Falls with Botswana's world-famous Chobe National Park in one comprehensive package.",
    included: [
      "Full-Day Chobe Safari (Game Drive + Chobe River Cruise + Lunch)",
      "Zimbabwe–Botswana border crossing management (Kazungula)",
      "Zambezi Spectacular (25-Min) Helicopter Flight over Falls & Gorge",
      "Traditional Boma Dinner & Drumming Cultural Experience",
    ],
    highlight: "Includes border permits & national park guides",
  },
  {
    tier: "Family & Scenic",
    title: "Gentle Zambezi & Nature Package",
    duration: "2 Days (Flexible)",
    tag: "All Ages",
    description: "Designed for families, couples, and travelers wanting relaxed pacing, stunning photography, and zero extreme hiking.",
    included: [
      "Upper Zambezi River Canoe Safari or Luxury River Catamaran",
      "Guided Walking Safari & Rainforest Tour with local naturalist",
      "Breakfast or Lunch at the Lookout Café overlooking Batoka Gorge",
      "Private air-conditioned minibus transfers throughout",
    ],
    highlight: "Suitable for children and seniors",
  },
];

const INDIVIDUAL_PRICES_OVERVIEW = [
  { activity: "Helicopter Flight of Angels (13–15 min)", priceRange: "$150 – $165", duration: "15 min flight", parkFee: "$15 National Parks" },
  { activity: "Zambezi Spectacular Flight (25 min)", priceRange: "$280 – $310", duration: "25 min flight", parkFee: "$15 National Parks" },
  { activity: "Victoria Falls Jet Boat (Batoka Gorge)", priceRange: "$120 – $140", duration: "3 hours total", parkFee: "$12 National Parks" },
  { activity: "Full-Day White Water Rafting", priceRange: "$120 – $135", duration: "Full day", parkFee: "$12 National Parks" },
  { activity: "Victoria Falls Bridge Bungee Jump", priceRange: "$160 – $168", duration: "2 hours", parkFee: "Bridge entry included" },
  { activity: "Bridge Gorge Swing or Zip Line", priceRange: "$95 – $110", duration: "1.5 hours", parkFee: "Bridge entry included" },
  { activity: "Zambezi Luxury Sunset Cruise", priceRange: "$65 – $95", duration: "2.5 hours", parkFee: "$10 River levy" },
  { activity: "Chobe Full-Day Safari (from Vic Falls)", priceRange: "$160 – $185", duration: "Full day", parkFee: "$20 Botswana Parks" },
  { activity: "Guided Rainforest Tour of Falls", priceRange: "$30 – $40", duration: "2.5 hours", parkFee: "$50 International entry" },
];

export default async function PackagesPage() {
  const siteSettings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY });
  const whatsapp = siteSettings?.whatsapp || "263772123456";

  return (
    <>
      <article className="mx-auto max-w-[1240px] px-6 py-28 sm:px-10 sm:py-36">
        <MountReveal className="mb-6 flex items-center gap-3">
          <Link href="/activities" className="text-[11px] uppercase tracking-[0.28em] text-gold hover:underline">
            Activities
          </Link>
          <span className="text-[11px] text-muted">/</span>
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted">Packages & Prices</span>
        </MountReveal>

        <MountReveal>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            2026 Transparent Pricing & Discounted Combos
          </div>
          <h1
            className="m-0 mb-6 font-display font-semibold uppercase leading-[1.08] tracking-tight text-ink"
            style={{ fontSize: "clamp(30px, 5vw, 58px)" }}
          >
            Victoria Falls <span className="text-gold">Activity Packages</span> & Rates
          </h1>
          <p className="max-w-[800px] text-lg leading-relaxed text-muted sm:text-xl">
            Maximize your time and budget. Bundling your flights, river adventures, and safaris guarantees guaranteed booking slots,
            coordinated transfers between operators, and savings of up to 25%.
          </p>
        </MountReveal>

        {/* 4 Feature Package Cards */}
        <section className="mt-14 mb-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {PACKAGES_2026.map((pkg, idx) => (
              <Reveal key={pkg.title} delay={idx * 0.08}>
                <div className="flex h-full flex-col justify-between rounded-sm border border-line bg-paper p-8 transition-all hover:border-gold hover:shadow-sm">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[11px] uppercase tracking-[0.22em] text-gold">{pkg.tier}</span>
                      <span className="rounded-full bg-ink px-3 py-1 text-[10px] uppercase tracking-wider text-paper">
                        {pkg.tag}
                      </span>
                    </div>

                    <h2 className="mt-4 font-subheading text-2xl font-medium text-ink">{pkg.title}</h2>
                    <div className="mt-1 text-xs text-muted font-data">{pkg.duration} · {pkg.highlight}</div>

                    <p className="mt-4 text-sm leading-relaxed text-muted">{pkg.description}</p>

                    <div className="mt-6 border-t border-line pt-6">
                      <div className="text-xs uppercase tracking-wider font-semibold text-ink mb-3">Package Inclusions:</div>
                      <ul className="space-y-2.5 text-sm text-ink font-data">
                        {pkg.included.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.14em] text-muted">Customizable itinerary</span>
                    <a
                      href={whatsappLink(whatsapp, `Hi! I'm interested in booking the "${pkg.title}" package.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      Book Combo →
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 2026 Individual Activities Price Matrix */}
        <section className="mt-20">
          <Reveal className="mb-10 max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.28em] text-gold">2026 Benchmark Rates</div>
            <h2 className="mt-2 font-display text-3xl font-semibold uppercase text-ink">
              Individual Activity <span className="text-gold">Price Guide</span>
            </h2>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Standard retail rates per person for standalone activities in Victoria Falls. When combined in our activity packages,
              enjoy package discounts and coordinated round-trip hotel transfers.
            </p>
          </Reveal>

          <Reveal>
            <div className="overflow-x-auto rounded-sm border border-line bg-paper">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-line bg-off-white font-subheading text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="p-4 sm:px-6">Activity Name</th>
                    <th className="p-4 sm:px-6">Approx. Duration</th>
                    <th className="p-4 sm:px-6">Estimated Rate (USD)</th>
                    <th className="p-4 sm:px-6">Park / Conservation Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line font-data">
                  {INDIVIDUAL_PRICES_OVERVIEW.map((row) => (
                    <tr key={row.activity} className="transition-colors hover:bg-off-white/50">
                      <td className="p-4 sm:px-6 font-medium text-ink">
                        {row.activity.includes("Jet Boat") ? (
                          <Link href="/activities/victoria-falls-jet-boat" className="text-ink hover:text-gold underline underline-offset-4">
                            {row.activity}
                          </Link>
                        ) : row.activity.includes("Chobe") ? (
                          <Link href="/safaris/chobe-day-trip" className="text-ink hover:text-gold underline underline-offset-4">
                            {row.activity}
                          </Link>
                        ) : (
                          row.activity
                        )}
                      </td>
                      <td className="p-4 sm:px-6 text-muted">{row.duration}</td>
                      <td className="p-4 sm:px-6 font-semibold text-gold">{row.priceRange}</td>
                      <td className="p-4 sm:px-6 text-xs text-muted">{row.parkFee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-xs text-muted">
              * Rates are indicative in US Dollars and subject to official operator adjustments. National Parks & river conservation fees are paid directly to park authorities or included in your final invoice based on preference.
            </div>
          </Reveal>
        </section>

        {/* Why Book Combined Packages */}
        <section className="mt-20 rounded-sm border border-line bg-off-white p-8 sm:p-12">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.24em] text-gold">Seamless Logistics</div>
            <h3 className="mt-2 font-display text-2xl font-semibold uppercase text-ink">
              Why Book Packages Through Africa Dream Adventures?
            </h3>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <h4 className="font-subheading text-lg font-medium text-ink">Zero Transfer Stress</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Different operators run from different corners of the town and gorge. We coordinate the seamless transfer chain so you never miss a helicopter slot or boat departure.
                </p>
              </div>
              <div>
                <h4 className="font-subheading text-lg font-medium text-ink">Priority Weather Rescheduling</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  If rain, wind, or river conditions shift helicopter flights or white water rafting, our local team handles immediate rescheduling without losing your deposits.
                </p>
              </div>
              <div>
                <h4 className="font-subheading text-lg font-medium text-ink">Fleet & Safari Integration</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Need a 4x4 or private transfer between activities? We integrate our own vehicle fleet directly into your itinerary, keeping costs lean and private.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </article>

      {/* Booking Form Section */}
      <BookingSection
        division="activities"
        eyebrow="Custom Package Builder"
        headline={["Build your ideal", "Victoria Falls Package"]}
        body="Tell us which activities you want to experience and your preferred travel dates. We will build a discounted, perfectly timed combo itinerary for you."
      />
    </>
  );
}
