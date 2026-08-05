import Reveal from "@/components/ui/reveal";
import TourCard from "@/components/ui/tour-card";
import { TOURS } from "@/lib/content";

export default function Packages() {
  return (
    <section className="border-t border-line bg-off-white py-28 sm:py-36">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
        <Reveal className="mb-14 max-w-2xl">
          <div className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">(02) Packages</div>
          <h2
            className="m-0 font-display font-semibold uppercase leading-[1.15] tracking-tight"
            style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}
          >
            Game drives, canoe trails and <span className="text-gold">walking safaris.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {TOURS.map((tour, i) => (
            <Reveal key={tour.slug} delay={i * 0.08}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
