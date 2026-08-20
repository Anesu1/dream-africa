import Image from "next/image";
import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";
import type { Vehicle } from "@/sanity/lib/types";

export default function VehicleCard({ vehicle, whatsapp }: { vehicle: Vehicle; whatsapp: string }) {
  return (
    <article className="group overflow-hidden rounded-sm border border-line transition-colors hover:border-gold">
      <Link href={`/car-rental-victoria-falls/${vehicle.slug}`}>
        <div className="relative h-[240px] overflow-hidden">
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
        <div className="px-6 pt-6">
          <h3 className="m-0 font-subheading text-2xl font-medium leading-tight">{vehicle.name}</h3>
          <p className="m-0 mt-1 text-xs uppercase tracking-[0.14em] text-muted">{vehicle.subtitle}</p>

          <div className="my-5 grid grid-cols-4 gap-2 border-y border-line py-4 font-data">
            {vehicle.specs.map((spec) => (
              <div key={spec.label}>
                <div className="text-[9px] uppercase tracking-[0.14em] text-muted">{spec.label}</div>
                <div className="mt-1 text-sm font-medium">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Link>
      <div className="flex items-baseline justify-between px-6 pb-6">
        <span className="font-data text-xs uppercase tracking-[0.14em] text-muted">Message for rates</span>
        <a
          href={whatsappLink(whatsapp, `Hi, I'd like to reserve the ${vehicle.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] uppercase tracking-[0.16em] text-gold"
        >
          Reserve →
        </a>
      </div>
    </article>
  );
}
