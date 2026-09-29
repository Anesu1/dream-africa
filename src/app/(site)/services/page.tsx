import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MountReveal from "@/components/ui/mount-reveal";
import Reveal from "@/components/ui/reveal";
import BookingSection from "@/components/sections/booking-section";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  SAFARI_PAGE_QUERY,
  ACTIVITIES_PAGE_QUERY,
  RENTALS_PAGE_QUERY,
  TOURS_QUERY,
  VEHICLES_QUERY,
} from "@/sanity/lib/queries";
import type {
  SafariPageSettings,
  ActivitiesPageSettings,
  RentalsPageSettings,
  Tour,
  Vehicle,
} from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Our Services — Safaris, Activities & Car Rental",
  description:
    "Everything Africa Dream Adventures offers from one Victoria Falls base — guided safaris and day trips, adventure activities, self-drive car rental, and ready-made trip itineraries.",
  keywords: [
    "Victoria Falls tour operator",
    "Victoria Falls travel agency",
    "Africa Dream Adventures services",
    "Victoria Falls tourism company",
    "things to do in Victoria Falls",
  ],
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const [safariPage, activitiesPage, rentalsPage, tours, vehicles] = await Promise.all([
    sanityFetch<SafariPageSettings>({ query: SAFARI_PAGE_QUERY }),
    sanityFetch<ActivitiesPageSettings>({ query: ACTIVITIES_PAGE_QUERY }),
    sanityFetch<RentalsPageSettings>({ query: RENTALS_PAGE_QUERY }),
    sanityFetch<Tour[]>({ query: TOURS_QUERY }),
    sanityFetch<Vehicle[]>({ query: VEHICLES_QUERY }),
  ]);

  const services = [
    {
      key: "safaris",
      title: "Guided Safaris & Day Trips",
      description:
        "Private guided expeditions through Victoria Falls, Hwange and the Zambezi — game drives, canoe trails, walking safaris and the Chobe day trip across the border into Botswana.",
      image: safariPage.heroImage,
      href: "/safaris",
      cta: "Explore Safaris",
      links: tours.slice(0, 3).map((t) => ({ label: t.title, href: `/safaris/${t.slug}` })),
    },
    {
      key: "activities",
      title: "Adventure Activities",
      description:
        "Bungee jumping, white-water rafting, the Zambezi Spectacular helicopter flight, jet boat runs and sunset cruises — adrenaline and scenic options side by side.",
      image: activitiesPage.heroImage,
      href: "/activities",
      cta: "See All Activities",
      links: [
        { label: "Adventure Activities & Pricing", href: "/activities" },
        { label: "Activity Packages & Combos", href: "/activities#activity-directory" },
      ],
    },
    {
      key: "rentals",
      title: "Car Rental & Self-Drive",
      description:
        "Self-drive 4x4s and SUVs, chauffeur service and airport transfers — with cross-border paperwork for Zambia, Botswana, Namibia and South Africa prepared before you collect the keys.",
      image: rentalsPage.heroImage,
      href: "/car-rental-victoria-falls",
      cta: "Browse the Fleet",
      links: vehicles.slice(0, 3).map((v) => ({ label: v.name, href: `/car-rental-victoria-falls/${v.slug}` })),
    },
    {
      key: "itineraries",
      title: "Trip Itineraries",
      description:
        "Ready-made frameworks for combining Victoria Falls, Hwange, Chobe and the Zambezi into a full trip — from a 3-day Falls visit to a 7-day Zimbabwe circuit.",
      image: safariPage.destinations[0]?.image ?? safariPage.heroImage,
      href: "/itineraries",
      cta: "View Itineraries",
      links: [
        { label: "3 Days in Victoria Falls", href: "/itineraries/3-days-in-victoria-falls" },
        { label: "7-Day Zimbabwe Safari", href: "/itineraries/7-day-zimbabwe-safari" },
      ],
    },
  ];

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-6 pb-16 pt-40 sm:px-10">
        <MountReveal className="max-w-2xl">
          <div className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">What We Offer</div>
          <h1
            className="m-0 mb-6 font-display font-semibold uppercase leading-[1.15] tracking-tight"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            One base in Victoria Falls, <span className="text-gold">every way to explore it.</span>
          </h1>
          <p className="m-0 text-[17px] leading-relaxed text-muted">
            Africa Dream Adventures runs guided safaris and adventure activities; Eden Car Rental, our self-drive
            division, handles the vehicles. Message us once and we'll plan across both.
          </p>
        </MountReveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-28 sm:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.key} delay={i * 0.08}>
              <div className="flex h-full flex-col overflow-hidden rounded-sm border border-line">
                <div className="overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={800}
                    height={360}
                    className="h-[220px] w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="m-0 mb-3 font-subheading text-xl font-medium">{service.title}</h2>
                  <p className="m-0 mb-5 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>

                  {service.links.length > 0 && (
                    <div className="mb-6 flex flex-col gap-2">
                      {service.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-xs uppercase tracking-[0.14em] text-gold underline underline-offset-2 hover:no-underline"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}

                  <Link
                    href={service.href}
                    className="inline-block self-start rounded-full bg-ink px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-gold hover:text-ink"
                  >
                    {service.cta}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <BookingSection
        division="general"
        eyebrow="Not Sure Where to Start?"
        headline={["Get in touch,", "we'll plan it together."]}
        body="Tell us what you're picturing — a specific safari, a self-drive trip, or just Victoria Falls itself — and we'll put the right combination together. We reply within the hour."
      />
    </>
  );
}
