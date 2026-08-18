import type { Metadata } from "next";
import RentalsHero from "@/components/sections/rentals/hero";
import Services from "@/components/sections/rentals/services";
import Fleet from "@/components/sections/rentals/fleet";
import BookingSection from "@/components/sections/booking-section";
import CrossSellCard from "@/components/ui/cross-sell-card";
import { AutoRentalJsonLd } from "@/components/seo/json-ld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { RENTALS_PAGE_QUERY, SITE_SETTINGS_QUERY, VEHICLES_QUERY } from "@/sanity/lib/queries";
import type { RentalsPageSettings, SiteSettings, Vehicle } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Victoria Falls Car Rental & 4x4 Hire | Eden Car Rental",
  description:
    "Rent reliable 4x4s and SUVs at Victoria Falls Airport. Transparent rates, zero hidden fees, and full self-drive safari insurance.",
  alternates: { canonical: "/car-rental" },
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

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
        <CrossSellCard
          type="rental-to-safari"
          customHeadline="Bundle Your Vehicle with Victoria Falls Activities"
          customBody="Add a helicopter flight over the falls or a sunset cruise on the Zambezi to your rental booking for special bundled package rates."
        />
      </div>

      <BookingSection
        division="rentals"
        eyebrow="Start Planning"
        headline={["let's get you", "on the road."]}
        body="Tell us your dates and which vehicle you're after — combine it with a guided day for 10% off the tour portion."
      />
    </>
  );
}
