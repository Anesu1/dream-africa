import Image from "next/image";
import Reveal from "@/components/ui/reveal";
import type { LodgeItem } from "@/sanity/lib/types";

export default function Lodges({ lodges }: { lodges: LodgeItem[] }) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-28 sm:px-10 sm:py-36">
      <Reveal className="mb-14 max-w-2xl">
        <div className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">(03) Where you stay</div>
        <h2
          className="m-0 font-display font-semibold uppercase leading-[1.15] tracking-tight"
          style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}
        >
          Camps you can&apos;t book <span className="text-gold">anywhere else.</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-3">
        {lodges.map((lodge, i) => (
          <Reveal key={lodge.name} delay={i * 0.1}>
            <div className="group overflow-hidden rounded-sm">
              <div className="relative h-[320px] overflow-hidden">
                <Image
                  src={lodge.image}
                  alt={lodge.name}
                  fill
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              </div>
              <div className="pt-5">
                <h3 className="m-0 mb-1 font-subheading text-2xl font-medium">{lodge.name}</h3>
                <p className="m-0 text-xs uppercase tracking-[0.16em] text-muted">{lodge.region}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
