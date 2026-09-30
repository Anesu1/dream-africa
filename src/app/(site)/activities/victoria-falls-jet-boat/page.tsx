import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MountReveal from "@/components/ui/mount-reveal";
import Reveal from "@/components/ui/reveal";
import BookingSection from "@/components/sections/booking-section";
import { whatsappLink } from "@/lib/whatsapp";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Victoria Falls Jet Boat | Zambezi Rapid Jet Boat Experience & Combos",
  description:
    "Experience the ultimate adrenaline rush: Victoria Falls Jet Boat down the Batoka Gorge rapids. High-speed 360° spins, cable car gorge descent, combo packages with helicopter flights and rafting. Book now.",
  keywords: [
    "victoria falls jet boat",
    "jet boat victoria falls",
    "zambezi jet boat",
    "batoka gorge jet boat",
    "victoria falls adrenaline activities",
    "zambezi spectacular",
    "victoria falls adventure activities",
    "victoria falls activity packages",
  ],
  alternates: { canonical: "/activities/victoria-falls-jet-boat" },
};

const JET_BOAT_SPECS = [
  { label: "Engine", value: "460 HP Yanmar Twin Turbo" },
  { label: "Location", value: "Batoka Gorge Rapids #23–#27" },
  { label: "Duration", value: "Approx. 2.5–3 Hours Total" },
  { label: "Gorge Access", value: "Funicular Cable Car Included" },
  { label: "Min Age", value: "10 Years (Must fit life jacket)" },
  { label: "Transfers", value: "Return Hotel Pick-up Included" },
];

const JET_BOAT_FAQS = [
  {
    q: "Where does the Victoria Falls Jet Boat operate?",
    a: "The jet boat operates deep in the Batoka Gorge below Victoria Falls, specifically surging through rapids 23 to 27 where the Zambezi boils between vertical sheer rock cliffs. Access down into and out of the gorge is made effortless via a scenic funicular cable lift.",
  },
  {
    q: "How fast does the jet boat travel?",
    a: "Powered by a high-output 460 HP Yanmar twin turbo marine diesel engine with Hamilton waterjet propulsion, the craft speeds over 75 km/h across surging rapids, performing rapid 360-degree spins and skimming centimetres past towering black basalt canyon walls.",
  },
  {
    q: "Do I have to hike up and down the Batoka Gorge?",
    a: "No! Unlike traditional rafting trips where you must hike 200 vertical metres up steep gorge paths in the heat, the Victoria Falls Jet Boat experience includes a comfortable cable car (funicular lift) that whisks you smoothly down to the water and back to the canyon rim.",
  },
  {
    q: "Can I combine the Jet Boat with Helicopter Flights or Rafting?",
    a: "Yes! The most popular combination is the Adrenaline Combo: combining the Jet Boat with the Zambezi Spectacular or 15-minute Helicopter Flight of Angels and the Victoria Falls Bridge Bungee or Gorge Swing.",
  },
];

export default async function JetBoatPage() {
  const siteSettings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY });
  const whatsapp = siteSettings?.whatsapp || "263772123456";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Victoria Falls Jet Boat - Batoka Gorge Extreme Rapids",
    description:
      "High-speed jet boat experience through Batoka Gorge rapids below Victoria Falls with funicular cable car access and return transfers.",
    provider: {
      "@type": "TravelAgency",
      name: siteSettings?.name || "Africa Dream Adventures",
      url: "https://africadreamadventures.co.zw",
    },
    location: {
      "@type": "Place",
      name: "Batoka Gorge, Victoria Falls",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Victoria Falls",
        addressCountry: "ZW",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-[1200px] px-6 py-28 sm:px-10 sm:py-36">
        <MountReveal className="mb-6 flex items-center gap-3">
          <Link href="/activities" className="text-[11px] uppercase tracking-[0.28em] text-gold hover:underline">
            Activities
          </Link>
          <span className="text-[11px] text-muted">/</span>
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted">Adrenaline & Water</span>
        </MountReveal>

        <MountReveal>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Batoka Gorge Extreme Rapid Experience
          </div>
          <h1
            className="m-0 mb-6 font-display font-semibold uppercase leading-[1.08] tracking-tight text-ink"
            style={{ fontSize: "clamp(30px, 5vw, 60px)" }}
          >
            Victoria Falls <span className="text-gold">Jet Boat</span>
          </h1>
          <p className="max-w-[760px] text-lg leading-relaxed text-muted sm:text-xl">
            Power through the boiling white-water rapids of the mighty Zambezi in a 460-horsepower jet boat.
            360-degree spins, sheer basalt canyon walls, and effortless funicular cable car access.
          </p>
        </MountReveal>

        {/* Hero image and quick specs */}
        <MountReveal delay={0.1} className="my-12 overflow-hidden rounded-sm border border-line">
          <div className="relative h-[380px] w-full sm:h-[520px]">
            <Image
              src="/images/rafting.jpg"
              alt="Victoria Falls Jet Boat in Batoka Gorge"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1200px) 1200px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-paper sm:bottom-10 sm:left-10 sm:right-10">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-gold">High Octane Action</div>
                <div className="font-display text-2xl font-semibold sm:text-3xl">Rapids #23 to #27 · Batoka Gorge</div>
              </div>
              <a
                href={whatsappLink(whatsapp, "Hi, I'd like to book the Victoria Falls Jet Boat.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-all hover:bg-paper hover:scale-105"
              >
                Book on WhatsApp →
              </a>
            </div>
          </div>
        </MountReveal>

        {/* Specs Grid */}
        <MountReveal delay={0.15} className="mb-16">
          <div className="grid grid-cols-2 gap-4 rounded-sm border border-line bg-off-white p-6 sm:grid-cols-3 lg:grid-cols-6 sm:p-8">
            {JET_BOAT_SPECS.map((spec) => (
              <div key={spec.label} className="border-l-2 border-gold pl-3">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted">{spec.label}</div>
                <div className="mt-1 font-subheading text-sm font-semibold text-ink sm:text-base">{spec.value}</div>
              </div>
            ))}
          </div>
        </MountReveal>

        {/* Details & Experience description */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <Reveal>
              <h2 className="mb-5 font-subheading text-2xl font-medium sm:text-3xl">
                The Most Thrilling Ride on the Zambezi
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-muted sm:text-[17px]">
                <p>
                  The Victoria Falls Jet Boat is not a gentle scenic float — it is a pulse-racing white-water expedition
                  into one of the deepest river canyons on Earth. Your adventure begins with an effortless descent down the
                  near-vertical 200-metre cliffs of Batoka Gorge aboard a state-of-the-art funicular cable lift, treating
                  you to sweeping aerial vistas of the canyon.
                </p>
                <p>
                  At the river level, you board an engineered custom jet craft piloted by an internationally certified
                  white-water skipper. Powered by a deafening 460 HP Yanmar twin turbo engine, the boat explodes across the
                  boiling rapids at speeds exceeding 75 km/h. Experience pulse-pounding 360-degree flat spins, sudden
                  accelerations, and hair-raising glides inches from the massive basalt gorge walls.
                </p>
                <p>
                  Unlike standard whitewater rafting which requires strenuous swimming and paddling, the jet boat puts you
                  right in the heart of class IV and V turbulence with maximum safety and zero climbing fatigue on the return.
                </p>
              </div>
            </Reveal>

            {/* What's Included */}
            <Reveal className="mt-12">
              <h3 className="mb-4 font-subheading text-xl font-medium">What is Included in Your Ticket</h3>
              <ul className="grid grid-cols-1 gap-3 font-data text-sm text-ink sm:grid-cols-2">
                {[
                  "Return hotel transfers in Victoria Falls",
                  "Scenic cable car funicular lift (down & up)",
                  "Approx. 30–40 min high-speed jet boat run",
                  "Full safety equipment (life vest & helmet)",
                  "Chilled refreshments at the canyon rim",
                  "Professional skipper & safety briefings",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 rounded-sm border border-line bg-paper p-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Popular Combos */}
            <Reveal className="mt-12">
              <h3 className="mb-4 font-subheading text-xl font-medium">Top Activity Packages with Jet Boat</h3>
              <div className="space-y-4">
                <div className="rounded-sm border border-line p-5 transition-colors hover:border-gold">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-subheading text-lg font-medium text-ink">Jet Boat + 15-Min Flight of Angels</h4>
                    <span className="text-xs uppercase tracking-wider text-gold font-semibold">Most Popular</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    Witness Victoria Falls from the clouds on a helicopter flight, then dive into the bottom of Batoka Gorge
                    for high-speed rapid thrills.
                  </p>
                </div>

                <div className="rounded-sm border border-line p-5 transition-colors hover:border-gold">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-subheading text-lg font-medium text-ink">Adrenaline Trio: Jet Boat + Rafting + Bungee</h4>
                    <span className="text-xs uppercase tracking-wider text-gold font-semibold">Ultimate Adrenaline</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    The ultimate adrenaline package for thrill-seekers: tackle rapids 1–19, leap off the historic bridge, and
                    power through rapids 23–27 on the jet boat.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar CTA & FAQs */}
          <div className="space-y-8">
            <Reveal className="rounded-sm border border-gold/40 bg-ink p-7 text-paper">
              <div className="text-[10px] uppercase tracking-[0.24em] text-gold">Direct Reservation</div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-paper">Reserve Your Jet Boat Seats</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/75">
                Spaces on the jet boat are limited to maintain optimal weight balance and safety. Pre-booking is essential,
                especially during high season.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={whatsappLink(whatsapp, "Hi, I want to check availability and rates for the Victoria Falls Jet Boat.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gold py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-paper"
                >
                  Check Rates on WhatsApp
                </a>
                <Link
                  href="/activities/packages"
                  className="rounded-full border border-paper/30 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:border-gold hover:text-gold"
                >
                  View All Activity Packages
                </Link>
              </div>
            </Reveal>

            {/* Quick FAQs */}
            <Reveal className="rounded-sm border border-line p-6">
              <h3 className="mb-4 font-subheading text-lg font-medium text-ink">Frequently Asked Questions</h3>
              <div className="divide-y divide-line">
                {JET_BOAT_FAQS.map((faq) => (
                  <div key={faq.q} className="py-4 first:pt-0 last:pb-0">
                    <div className="font-subheading text-sm font-medium text-ink">{faq.q}</div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">{faq.a}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      {/* Booking Form Section */}
      <BookingSection
        division="activities"
        eyebrow="Confirm Your Dates"
        headline={["Book your Victoria Falls", "Jet Boat Experience"]}
        body="Tell us your preferred dates and group size. We coordinate pickup from your hotel or lodge anywhere in Victoria Falls town with zero hassle."
      />
    </>
  );
}
