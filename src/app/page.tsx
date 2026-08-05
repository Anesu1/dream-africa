import Hero from "@/components/sections/home/hero";
import WhoWeAre from "@/components/sections/home/who-we-are";
import Experiences from "@/components/sections/home/experiences";
import Stats from "@/components/sections/home/stats";
import Testimonials from "@/components/sections/home/testimonials";
import Faq from "@/components/sections/home/faq";
import FinalCta from "@/components/sections/home/final-cta";
import GsapMarquee from "@/components/ui/gsap-marquee";
import { TRUST_INDICATORS } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Experiences />
      <GsapMarquee items={TRUST_INDICATORS} />
      <Stats />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
