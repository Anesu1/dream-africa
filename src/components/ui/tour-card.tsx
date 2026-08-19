import Image from "next/image";
import { whatsappLink } from "@/lib/whatsapp";
import type { Tour } from "@/sanity/lib/types";

export default function TourCard({ tour, whatsapp }: { tour: Tour; whatsapp: string }) {
  return (
    <a
      href={whatsappLink(whatsapp, `Hi, I'd like to book the ${tour.title}.`)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-sm"
    >
      <div className="overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          width={1000}
          height={460}
          className="h-[420px] w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-7 text-paper">
        <div className="mb-3.5 flex gap-2.5 text-[10px] uppercase tracking-[0.18em] text-gold">
          <span>{tour.category}</span>
          <span>·</span>
          <span>{tour.duration}</span>
        </div>
        <h3 className="mb-2.5 font-subheading text-[28px] font-medium leading-none">{tour.title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-paper/70">{tour.description}</p>
        <div className="flex items-baseline justify-between border-t border-paper/20 pt-4">
          <span className="font-data text-xs uppercase tracking-[0.14em] text-paper/70">Message for rates</span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-gold">View →</span>
        </div>
      </div>
    </a>
  );
}
