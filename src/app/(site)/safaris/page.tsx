import type { Metadata } from "next";
import Link from "next/link";
import SafariHero from "@/components/sections/safari/hero";
import Destinations from "@/components/sections/safari/destinations";
import Packages from "@/components/sections/safari/packages";
import EditorialGallery from "@/components/sections/safari/editorial-gallery";
import Lodges from "@/components/sections/safari/lodges";
import BookingSection from "@/components/sections/booking-section";
import Reveal from "@/components/ui/reveal";
import { TravelAgencyJsonLd } from "@/components/seo/json-ld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SAFARI_PAGE_QUERY, SITE_SETTINGS_QUERY, TOURS_QUERY } from "@/sanity/lib/queries";
import type { SafariPageSettings, SiteSettings, Tour } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Luxury Victoria Falls Safaris & Zambezi Tours",
  description:
    "Private guided safari expeditions through Victoria Falls, Hwange and the Zambezi — game drives, canoe trails, walking safaris and boutique camps. Licensed Zimbabwe tour operator.",
  keywords: [
    "Victoria Falls luxury safaris",
    "private Hwange safari tour",
    "guided Victoria Falls national park tours",
    "Zambezi canoe safari",
    "Chobe day trip from Victoria Falls",
    "Zimbabwe safari packages",
  ],
  alternates: { canonical: "/safaris" },
};

export default async function SafarisPage() {
  const [safariPage, tours, siteSettings] = await Promise.all([
    sanityFetch<SafariPageSettings>({ query: SAFARI_PAGE_QUERY }),
    sanityFetch<Tour[]>({ query: TOURS_QUERY }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);

  return (
    <>
      <TravelAgencyJsonLd parentName={siteSettings.name} />
      <SafariHero
        eyebrow={safariPage.heroEyebrow}
        title={safariPage.heroTitle}
        description={safariPage.heroDescription}
        image={safariPage.heroImage}
      />
      <Destinations destinations={safariPage.destinations} />
      <Packages tours={tours} whatsapp={siteSettings.whatsapp} />
      <EditorialGallery />
      <Lodges lodges={safariPage.lodges} />

      <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-sm border border-line bg-off-white p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <div className="mb-2 text-[11px] uppercase tracking-[0.24em] text-gold">Not sure how many days?</div>
            <p className="m-0 max-w-[52ch] text-[17px] leading-relaxed">
              See ready-made frameworks for combining Victoria Falls, Hwange, Chobe and the Zambezi into a full trip.
            </p>
          </div>
          <Link
            href="/itineraries"
            className="shrink-0 rounded-full bg-ink px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-gold hover:text-ink"
          >
            View Itineraries
          </Link>
        </Reveal>
      </section>

      <BookingSection
        division="safaris"
        eyebrow="Start Planning"
        headline={["let's get you", "on the water."]}
        body="Tell us your dates and group size — private departures and combined rental bookings both welcome. We reply within the hour."
      />
    </>
  );
}
