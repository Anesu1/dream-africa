import Reveal from "@/components/ui/reveal";
import type { RentalService } from "@/sanity/lib/types";

export default function Services({ services }: { services: RentalService[] }) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-28 sm:px-10 sm:py-36">
      <Reveal className="mb-14 max-w-2xl">
        <div className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">(01) How you travel</div>
        <h2
          className="m-0 font-display font-semibold uppercase leading-[1.15] tracking-tight"
          style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}
        >
          Behind the wheel, or <span className="text-gold">behind the scenes.</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.1}>
            <div className="rounded-sm border border-line p-9 transition-colors hover:border-gold">
              <div className="mb-4 font-subheading text-2xl font-medium">{service.title}</div>
              <p className="m-0 text-sm leading-relaxed text-muted">{service.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
