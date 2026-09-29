import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RentalsHero from "@/components/sections/rentals/hero";
import Services from "@/components/sections/rentals/services";
import Fleet from "@/components/sections/rentals/fleet";
import RentalsFaq from "@/components/sections/rentals/faq";
import BookingSection from "@/components/sections/booking-section";
import MountReveal from "@/components/ui/mount-reveal";
import { AutoRentalJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { RENTALS_PAGE_QUERY, SITE_SETTINGS_QUERY, VEHICLES_QUERY } from "@/sanity/lib/queries";
import type { RentalsPageSettings, SiteSettings, Vehicle } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Car Hire & Car Rental in Victoria Falls, Zimbabwe",
  description:
    "Hire a car in Victoria Falls with Eden Car Rental, Africa Dream Adventures' vehicle hire division. Premium 4x4, SUV and self-drive rentals for safaris, airport pickup, hotel delivery and journeys across Zimbabwe and beyond.",
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

      {rentalsPage.relatedJournalPosts && rentalsPage.relatedJournalPosts.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-6 pb-20 sm:px-10">
          <MountReveal>
            <h2 className="mb-5 font-subheading text-xl font-medium">From the Journal</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {rentalsPage.relatedJournalPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  className="group flex gap-4 overflow-hidden rounded-sm border border-line p-3 transition-colors hover:border-gold"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={120}
                    height={120}
                    className="h-20 w-20 shrink-0 rounded-sm object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div>
                    <div className="font-subheading text-sm font-medium leading-snug">{post.title}</div>
                    <div className="mt-1 text-xs text-muted line-clamp-2">{post.excerpt}</div>
                  </div>
                </Link>
              ))}
            </div>
          </MountReveal>
        </section>
      )}
      <BookingSection
        division="rentals"
        eyebrow="Start Planning"
        headline={["let's get you", "on the road."]}
        body="Tell us your dates and which vehicle you're after — combine it with a guided day for 10% off the tour portion."
      />
    </>
  );
}
