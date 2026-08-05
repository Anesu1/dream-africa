import type { Metadata } from "next";
import RentalsHero from "@/components/sections/rentals/hero";
import Services from "@/components/sections/rentals/services";
import Fleet from "@/components/sections/rentals/fleet";
import BookingSection from "@/components/sections/booking-section";
import { AutoRentalJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Car Rental Victoria Falls & Zimbabwe — Eden Car Rental",
  description:
    "Rent 4x4 SUVs, executive sedans and rugged self-drive vehicles across Victoria Falls and Zimbabwe. Self-drive, chauffeur or airport transfer — Dream Africa's vehicle hire division.",
  alternates: { canonical: "/rentals" },
};

export default function RentalsPage() {
  return (
    <>
      <AutoRentalJsonLd />
      <RentalsHero />
      <Services />
      <Fleet />
      <BookingSection
        division="rentals"
        eyebrow="Start Planning"
        headline={["let's get you", "on the road."]}
        body="Tell us your dates and which vehicle you're after — combine it with a guided day for 10% off the tour portion."
      />
    </>
  );
}
