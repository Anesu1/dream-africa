import Image from "next/image";
import Link from "next/link";
import MountReveal from "@/components/ui/mount-reveal";
import Reveal from "@/components/ui/reveal";
import type { ItinerarySummary } from "@/sanity/lib/types";

export default function ItinerariesListing({ itineraries }: { itineraries: ItinerarySummary[] }) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-28 sm:px-10 sm:py-36">
      <MountReveal className="mb-14 max-w-2xl">
        <div className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">Trip Planning</div>
        <h1
          className="m-0 mb-5 font-display font-semibold uppercase leading-[1.15] tracking-tight"
          style={{ fontSize: "clamp(24px, 3.4vw, 44px)" }}
        >
          Zimbabwe safari <span className="text-gold">itineraries.</span>
        </h1>
        <p className="m-0 text-[17px] leading-relaxed text-muted">
          Starting frameworks for how much time to give Victoria Falls, Hwange, Chobe and the Zambezi — exact
          day counts flex around the specific safaris and activities you choose. Tell us your dates on WhatsApp
          and we'll build the real schedule around them.
        </p>
      </MountReveal>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {itineraries.map((itinerary, i) => (
          <Reveal key={itinerary.slug} delay={i * 0.08}>
            <Link href={`/itineraries/${itinerary.slug}`} className="group block">
              <div className="overflow-hidden rounded-sm">
                <Image
                  src={itinerary.heroImage}
                  alt={itinerary.title}
                  width={900}
                  height={300}
                  className="h-[280px] w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                />
              </div>
              <div className="mb-3 mt-6 text-[10px] uppercase tracking-[0.22em] text-gold">
                {itinerary.durationLabel}
              </div>
              <h2 className="m-0 mb-2.5 font-subheading text-[26px] font-medium leading-tight">{itinerary.title}</h2>
              <p className="m-0 text-sm leading-relaxed text-muted">{itinerary.summary}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
