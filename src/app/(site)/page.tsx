import Hero from "@/components/sections/home/hero";
import WhoWeAre from "@/components/sections/home/who-we-are";
import Experiences from "@/components/sections/home/experiences";
import Stats from "@/components/sections/home/stats";
import Testimonials from "@/components/sections/home/testimonials";
import Faq from "@/components/sections/home/faq";
import FinalCta from "@/components/sections/home/final-cta";
import GsapMarquee from "@/components/ui/gsap-marquee";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { HOME_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { HomePage, SiteSettings } from "@/sanity/lib/types";

export default async function Home() {
  const [home, siteSettings] = await Promise.all([
    sanityFetch<HomePage>({ query: HOME_PAGE_QUERY }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);

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
      <Stats stats={home.stats} />
      <Testimonials testimonials={home.testimonials} />
      <Faq faqs={home.faqs} />
      <FinalCta siteName={siteSettings.name} whatsapp={siteSettings.whatsapp} />
    </>
  );
}
