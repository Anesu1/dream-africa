import type { Metadata } from "next";
import SafariHero from "@/components/sections/safari/hero";
import Destinations from "@/components/sections/safari/destinations";
import Packages from "@/components/sections/safari/packages";
import EditorialGallery from "@/components/sections/safari/editorial-gallery";
import Lodges from "@/components/sections/safari/lodges";
import BookingSection from "@/components/sections/booking-section";
import { TravelAgencyJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Luxury Victoria Falls Safaris & Zambezi Tours",
  description:
    "Private guided safari expeditions through Victoria Falls, Hwange and the Zambezi — game drives, canoe trails, walking safaris and boutique camps. Licensed Zimbabwe tour operator.",
  alternates: { canonical: "/safaris" },
};

export default function SafarisPage() {
  return (
    <>
      <TravelAgencyJsonLd />
      <SafariHero />
      <Destinations />
      <Packages />
      <EditorialGallery />
      <Lodges />
      <BookingSection
        division="safaris"
        eyebrow="Start Planning"
        headline={["let's get you", "on the water."]}
        body="Tell us your dates and group size — private departures and combined rental bookings both welcome. We reply within the hour."
      />
    </>
  );
}
