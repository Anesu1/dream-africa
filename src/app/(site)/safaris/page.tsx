import type { Metadata } from "next";
import SafariHero from "@/components/sections/safari/hero";
import Destinations from "@/components/sections/safari/destinations";
import Packages from "@/components/sections/safari/packages";
import EditorialGallery from "@/components/sections/safari/editorial-gallery";
import Lodges from "@/components/sections/safari/lodges";
import BookingSection from "@/components/sections/booking-section";
import { TravelAgencyJsonLd } from "@/components/seo/json-ld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SAFARI_PAGE_QUERY, SITE_SETTINGS_QUERY, TOURS_QUERY } from "@/sanity/lib/queries";
import type { SafariPageSettings, SiteSettings, Tour } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Luxury Victoria Falls Safaris & Zambezi Tours",
  description:
    "Private guided safari expeditions through Victoria Falls, Hwange and the Zambezi — game drives, canoe trails, walking safaris and boutique camps. Licensed Zimbabwe tour operator.",
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
      <BookingSection
        division="safaris"
        eyebrow="Start Planning"
        headline={["let's get you", "on the water."]}
        body="Tell us your dates and group size — private departures and combined rental bookings both welcome. We reply within the hour."
      />
    </>
  );
}
