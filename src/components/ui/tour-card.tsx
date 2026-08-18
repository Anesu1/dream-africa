import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/sanity/lib/types";

export default function TourCard({ tour }: { tour: Tour; whatsapp: string }) {
  const isCustomSlug = ["hwange-national-park", "luxury-victoria-falls", "chobe-day-trip", "tri-park-circuit-safari"].includes(tour.slug);
  const href = isCustomSlug ? `/safaris/${tour.slug}` : `/safaris`;

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-sm border border-line/40 transition-all hover:border-gold"
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
        <p className="mb-5 text-sm leading-relaxed text-paper/70 line-clamp-2">{tour.description}</p>
        <div className="flex items-center justify-between border-t border-paper/20 pt-4">
          <span className="font-data text-xs uppercase tracking-wider text-gold">
            Inquire for Rates
          </span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-paper/80 group-hover:text-gold transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
