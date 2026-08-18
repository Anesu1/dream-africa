import Image from "next/image";
import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";
import type { Vehicle } from "@/sanity/lib/types";

export default function VehicleCard({ vehicle, whatsapp }: { vehicle: Vehicle; whatsapp: string }) {
  return (
    <article className="group overflow-hidden rounded-sm border border-line bg-paper transition-colors hover:border-gold">
      <div className="relative h-[240px] overflow-hidden bg-off-white">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
        <div className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-paper backdrop-blur-sm">
          {vehicle.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="m-0 font-subheading text-2xl font-medium leading-tight">{vehicle.name}</h3>
        <p className="m-0 mt-1 text-xs uppercase tracking-[0.14em] text-muted">{vehicle.subtitle}</p>

        <div className="my-5 grid grid-cols-2 sm:grid-cols-4 gap-2 border-y border-line py-4 font-data">
          {vehicle.specs.map((spec) => (
            <div key={spec.label}>
              <div className="text-[9px] uppercase tracking-[0.14em] text-muted">{spec.label}</div>
              <div className="mt-1 text-xs font-medium truncate">{spec.value}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="font-data text-xs uppercase tracking-wider text-muted">
            Inquire for Rates
          </span>
          <div className="flex items-center gap-3">
            <Link
              href={`/car-rental/${vehicle.slug}`}
              className="text-[11px] uppercase tracking-[0.16em] text-muted hover:text-ink transition-colors"
            >
              Specs
            </Link>
            <a
              href={whatsappLink(whatsapp, `Hi, I'd like to check availability and rates for the ${vehicle.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-3.5 py-1.5 text-[10px] uppercase tracking-[0.14em] text-paper hover:bg-gold hover:text-ink transition-colors font-medium"
            >
              Reserve on WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
