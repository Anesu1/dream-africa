import type { Metadata } from "next";
import RentalsHero from "@/components/sections/rentals/hero";
import Services from "@/components/sections/rentals/services";
import Fleet from "@/components/sections/rentals/fleet";
import BookingSection from "@/components/sections/booking-section";
import { AutoRentalJsonLd } from "@/components/seo/json-ld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { RENTALS_PAGE_QUERY, SITE_SETTINGS_QUERY, VEHICLES_QUERY } from "@/sanity/lib/queries";
import type { RentalsPageSettings, SiteSettings, Vehicle } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Car Rental Victoria Falls & Zimbabwe — Eden Car Rental",
  description:
    "Rent 4x4 SUVs, executive sedans and rugged self-drive vehicles across Victoria Falls and Zimbabwe. Self-drive, chauffeur or airport transfer — Africa Dream Adventures' vehicle hire division.",
  keywords: [
    "Victoria Falls car rental",
    "car hire Victoria Falls airport",
    "4x4 self drive Victoria Falls",
    "Hwange self drive 4x4 rental",
    "cross border car rental Victoria Falls Botswana Zambia",
    "affordable car hire Victoria Falls Zimbabwe",
  ],
  alternates: { canonical: "/rentals" },
};

export default async function RentalsPage() {
  const [rentalsPage, vehicles, siteSettings] = await Promise.all([
    sanityFetch<RentalsPageSettings>({ query: RENTALS_PAGE_QUERY }),
    sanityFetch<Vehicle[]>({ query: VEHICLES_QUERY }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);

  return (
    <>
      <AutoRentalJsonLd parentName={siteSettings.name} />
      <RentalsHero
        eyebrow={rentalsPage.heroEyebrow}
        title={rentalsPage.heroTitle}
        description={rentalsPage.heroDescription}
        image={rentalsPage.heroImage}
      />
      <Services services={rentalsPage.rentalServices} />
      <Fleet vehicles={vehicles} whatsapp={siteSettings.whatsapp} />
      <BookingSection
        division="rentals"
        eyebrow="Start Planning"
        headline={["let's get you", "on the road."]}
        body="Tell us your dates and which vehicle you're after — combine it with a guided day for 10% off the tour portion."
      />
    </>
  );
}
