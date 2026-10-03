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
  title: "Victoria Falls Activity Packages | Africa Dream Adventures",
  description:
    "Combine Victoria Falls experiences into a package — helicopter flights, jet boat, white water rafting, bungee, sunset cruises and Chobe day trips. Message us for an itemised quote.",
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
      "Helicopter Flight of Angels over the Falls",
      "Guided Walking Tour of the Victoria Falls Rainforest",
      "Zambezi Sunset Cruise",
      "Return transfers from Victoria Falls town hotels",
    ],
  },
  {
    tier: "Adrenaline Combo",
    title: "The Ultimate Batoka Thrill Pack",
    duration: "1 Full Day",
    tag: "High Octane",
    description: "For true thrill-seekers wanting to conquer Batoka Gorge from every angle: sky, river rapids, and canyon wall.",
    included: [
      "Victoria Falls Jet Boat in Batoka Gorge",
      "Full Day White Water Rafting with Riverside Lunch",
      "Choice of Victoria Falls Bridge Bungee, Gorge Swing, or Zip Line",
    ],
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
      "Zambezi Spectacular Helicopter Flight over Falls & Gorge",
    ],
  },
  {
    tier: "Family & Scenic",
    title: "Gentle Zambezi & Nature Package",
    duration: "2 Days (Flexible)",
    tag: "All Ages",
    description: "Designed for families, couples, and travelers wanting relaxed pacing, stunning photography, and zero extreme hiking.",
    included: [
      "Upper Zambezi River Canoe Safari",
      "Guided Walking Safari & Rainforest Tour",
      "Private transfers throughout",
    ],
  },
];

const INDIVIDUAL_ACTIVITIES_OVERVIEW = [
  { activity: "Helicopter Flight of Angels", link: null },
  { activity: "Zambezi Spectacular Flight", link: null },
  { activity: "Victoria Falls Jet Boat (Batoka Gorge)", link: "/activities/victoria-falls-jet-boat" },
  { activity: "Full-Day White Water Rafting", link: null },
  { activity: "Victoria Falls Bridge Bungee Jump", link: null },
  { activity: "Bridge Gorge Swing or Zip Line", link: null },
  { activity: "Zambezi Sunset Cruise", link: null },
  { activity: "Chobe Full-Day Safari (from Vic Falls)", link: "/safaris/chobe-day-trip" },
  { activity: "Guided Rainforest Tour of Falls", link: null },
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
            Maximize your time and budget. Bundling your flights, river adventures, and safaris means coordinated transfers between
            operators — message us for an itemised quote on any combination.
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
                    <div className="mt-1 text-xs text-muted font-data">{pkg.duration}</div>

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
                      href={whatsappLink(whatsapp, `Hi! I'd like a quote for the "${pkg.title}" package.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      Get a Quote →
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Individual Activities Overview */}
        <section className="mt-20">
          <Reveal className="mb-10 max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.28em] text-gold">Build Your Own</div>
            <h2 className="mt-2 font-display text-3xl font-semibold uppercase text-ink">
              Individual <span className="text-gold">Activities</span>
            </h2>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Any of these can also be booked on its own. Message us with your dates and we'll quote each activity individually or
              as a combination, including any national park or conservation fees.
            </p>
          </Reveal>

          <Reveal>
            <div className="overflow-x-auto rounded-sm border border-line bg-paper">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-line bg-off-white font-subheading text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="p-4 sm:px-6">Activity Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line font-data">
                  {INDIVIDUAL_ACTIVITIES_OVERVIEW.map((row) => (
                    <tr key={row.activity} className="transition-colors hover:bg-off-white/50">
                      <td className="p-4 sm:px-6 font-medium text-ink">
                        {row.link ? (
                          <Link href={row.link} className="text-ink hover:text-gold underline underline-offset-4">
                            {row.activity}
                          </Link>
                        ) : (
                          row.activity
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
