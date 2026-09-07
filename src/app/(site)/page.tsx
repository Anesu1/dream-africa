import Hero from "@/components/sections/home/hero";
import WhoWeAre from "@/components/sections/home/who-we-are";
import Experiences from "@/components/sections/home/experiences";
import Stats from "@/components/sections/home/stats";
import Testimonials from "@/components/sections/home/testimonials";
import Faq from "@/components/sections/home/faq";
import FinalCta from "@/components/sections/home/final-cta";
import BookingSection from "@/components/sections/booking-section";
import GsapMarquee from "@/components/ui/gsap-marquee";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { HOME_PAGE_QUERY, SITE_SETTINGS_QUERY, VEHICLES_COUNT_QUERY } from "@/sanity/lib/queries";
import type { HomePage, SiteSettings } from "@/sanity/lib/types";

export default async function Home() {
  const [home, siteSettings, vehicleCount] = await Promise.all([
    sanityFetch<HomePage>({ query: HOME_PAGE_QUERY }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
    sanityFetch<number>({ query: VEHICLES_COUNT_QUERY }),
  ]);

  // "Vehicles in fleet" and "Years on the Zambezi" both track live values
  // instead of manually entered numbers that go stale — the years figure
  // was already wrong (hardcoded 14, actually 15 as of this year).
  const yearsSinceFounded = new Date().getFullYear() - siteSettings.founded;
  const stats = home.stats.map((stat) => {
    if (stat.label === "Vehicles in fleet") return { ...stat, value: vehicleCount };
    if (stat.label === "Years on the Zambezi") return { ...stat, value: yearsSinceFounded };
    return stat;
  });

  return (
    <>
      <FaqJsonLd faqs={home.faqs} />
      <Hero
        hero={{
          eyebrow: home.eyebrow,
          headline: home.headline,
          sub: home.sub,
          primaryCta: home.primaryCta,
          secondaryCta: home.secondaryCta,
          image: home.image,
        }}
      />
      <WhoWeAre whoWeAre={home.whoWeAre} />
      <Experiences experiences={home.experiences} />
      <GsapMarquee items={siteSettings.trustIndicators} />
      <Stats stats={stats} />
      <Testimonials testimonials={home.testimonials} />
      <Faq faqs={home.faqs} />
      <FinalCta siteName={siteSettings.name} whatsapp={siteSettings.whatsapp} />
      <BookingSection
        id="contact"
        division="general"
        eyebrow="Get In Touch"
        headline={["Ask us", "anything."]}
        body="Not booking a specific safari or rental yet? Tell us what's on your mind — we reply within the hour."
      />
    </>
  );
}
