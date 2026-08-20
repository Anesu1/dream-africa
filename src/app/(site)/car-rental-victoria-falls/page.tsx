import type { Metadata } from "next";
import RentalsHero from "@/components/sections/rentals/hero";
import Services from "@/components/sections/rentals/services";
import Fleet from "@/components/sections/rentals/fleet";
import RentalsFaq from "@/components/sections/rentals/faq";
import BookingSection from "@/components/sections/booking-section";
import { AutoRentalJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { RENTALS_PAGE_QUERY, SITE_SETTINGS_QUERY, VEHICLES_QUERY } from "@/sanity/lib/queries";
import type { RentalsPageSettings, SiteSettings, Vehicle } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Car Rental in Victoria Falls, Zimbabwe",
  description:
    "Premium 4x4, SUV and self-drive car rental in Victoria Falls, Zimbabwe. Choose from our fleet for self-drive safaris, airport pickup, hotel delivery and journeys across Zimbabwe and beyond — Eden Car Rental, Africa Dream Adventures' vehicle hire division.",
  keywords: [
    "Victoria Falls car rental",
    "car hire Victoria Falls",
    "car rental Victoria Falls Zimbabwe",
    "4x4 rental Victoria Falls",
    "SUV rental Victoria Falls",
    "self drive Victoria Falls",
    "Victoria Falls airport car rental",
    "Hwange self drive 4x4 rental",
    "cross border car rental Victoria Falls Botswana Zambia",
    "affordable car hire Victoria Falls Zimbabwe",
  ],
  alternates: { canonical: "/car-rental-victoria-falls" },
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
      {rentalsPage.rentalFaqs && rentalsPage.rentalFaqs.length > 0 && <FaqJsonLd faqs={rentalsPage.rentalFaqs} />}
      <RentalsHero
        eyebrow={rentalsPage.heroEyebrow}
        title={rentalsPage.heroTitle}
        description={rentalsPage.heroDescription}
        image={rentalsPage.heroImage}
      />
      <Services services={rentalsPage.rentalServices} />
      <Fleet vehicles={vehicles} whatsapp={siteSettings.whatsapp} />
      <RentalsFaq faqs={rentalsPage.rentalFaqs ?? []} />
      <BookingSection
        division="rentals"
        eyebrow="Start Planning"
        headline={["let's get you", "on the road."]}
        body="Tell us your dates and which vehicle you're after — combine it with a guided day for 10% off the tour portion."
      />
    </>
  );
}
