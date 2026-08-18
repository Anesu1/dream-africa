"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappLink } from "@/lib/whatsapp";
import type { SiteSettings } from "@/sanity/lib/types";

export default function Footer({ siteSettings }: { siteSettings: SiteSettings }) {
  const pathname = usePathname();
  const isRentals = pathname?.startsWith("/car-rental") || pathname?.startsWith("/rentals");
  const brand = isRentals ? siteSettings.brandRentals : siteSettings.brandSafaris;

  const trustIndicators = siteSettings?.trustIndicators?.length
    ? siteSettings.trustIndicators
    : [
        "Licensed Tour Operator Zimbabwe",
        "Comprehensive 4x4 Safari Insurance",
        "Victoria Falls Airport (VFA) Meet & Greet",
        "Botswana & Zambia Cross-Border Permits",
        "24/7 Dedicated Ground Concierge",
      ];

  return (
    <footer id="contact" className="bg-[#121417] px-6 pb-12 pt-24 text-white sm:px-10">
      <div className="mx-auto max-w-[1440px]">
        {/* Trust Badges Bar */}
        <div className="mb-16 flex flex-wrap gap-4 border-b border-white/10 pb-10 text-[11px] uppercase tracking-[0.2em] text-white/50">
          {trustIndicators.map((item, idx) => (
            <span key={item + idx} className="flex items-center gap-4">
              <span className="text-white/80">{item}</span>
              <span className="text-gold last:hidden">·</span>
            </span>
          ))}
        </div>

        {/* 4-Column Footer Navigation Matrix */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-3">
              {brand?.logo ? (
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={64}
                  height={64}
                  className="h-12 w-12 rounded-md object-cover ring-1 ring-white/15"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gold font-bold text-ink">
                  {isRentals ? "ECR" : "ADA"}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-display text-lg font-semibold uppercase tracking-[0.08em] text-white">
                  {brand?.name ?? (isRentals ? "Eden Car Rental" : "Africa Dream Adventures")}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold">
                  {isRentals ? "Victoria Falls 4x4 Hire" : "Luxury Safaris & Tours"}
                </span>
              </div>
            </div>
            <p className="max-w-[300px] text-xs leading-relaxed text-white/60">
              Victoria Falls Town Center & Victoria Falls International Airport (VFA), Zimbabwe. Fully licensed ground operator for luxury safaris and self-drive exploration.
            </p>
          </div>

          {/* Africa Dream Safaris & Tours */}
          <div>
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Safaris & Experiences
            </div>
            <div className="flex flex-col gap-2.5 text-xs text-white/70">
              <Link href="/safaris" className="transition-colors hover:text-gold">
                Luxury Safaris Overview
              </Link>
              <Link href="/safaris/hwange-national-park" className="transition-colors hover:text-gold">
                Private Hwange Safari Tour
              </Link>
              <Link href="/safaris/luxury-victoria-falls" className="transition-colors hover:text-gold">
                Victoria Falls Guided Tour
              </Link>
              <Link href="/safaris/chobe-day-trip" className="transition-colors hover:text-gold">
                Chobe Day Trip (Botswana)
              </Link>
              <Link href="/activities" className="transition-colors hover:text-gold">
                Victoria Falls Adventure Activities
              </Link>
              <Link href="/activities/helicopter-flight-of-angels" className="transition-colors hover:text-gold">
                Helicopter Flight of Angels
              </Link>
              <Link href="/cruises" className="transition-colors hover:text-gold">
                Zambezi River Cruises
              </Link>
            </div>
          </div>

          {/* Eden Car Rental Silo */}
          <div>
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Eden Car Rental (4x4 & Airport)
            </div>
            <div className="flex flex-col gap-2.5 text-xs text-white/70">
              <Link href="/car-rental" className="transition-colors hover:text-gold">
                Car Hire Victoria Falls
              </Link>
              <Link href="/car-rental/4x4-safari" className="transition-colors hover:text-gold">
                4x4 Safari Vehicles & Rooftop Tents
              </Link>
              <Link href="/car-rental/victoria-falls-airport" className="transition-colors hover:text-gold">
                Airport Rental (VFA Terminal Pickup)
              </Link>
              <Link href="/car-rental/cross-border" className="transition-colors hover:text-gold">
                Botswana & Zambia Cross-Border Permits
              </Link>
              <Link href="/car-rental/toyota-hilux-4x4-double-cab" className="transition-colors hover:text-gold">
                Toyota Hilux Double Cab 4x4
              </Link>
              <Link href="/car-rental/toyota-fortuner-4x4" className="transition-colors hover:text-gold">
                Toyota Fortuner 4x4 Automatic
              </Link>
            </div>
          </div>

          {/* Direct Support & Journal */}
          <div>
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Concierge & Journal
            </div>
            <div className="flex flex-col gap-2.5 text-xs text-white/70">
              <Link href="/journal" className="transition-colors hover:text-gold">
                Victoria Falls Travel Journal
              </Link>
              <a
                href={whatsappLink(
                  siteSettings?.whatsapp,
                  "Hi Africa Dream Adventures & Eden Car Rental, I have an inquiry."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gold font-medium text-white flex items-center gap-1.5"
              >
                <span>WhatsApp Concierge:</span>
                <span className="text-gold">+263 78 456 7890</span>
              </a>
              <p className="mt-2 text-[11px] text-white/50 leading-relaxed">
                Response guarantee within 30 minutes. 7 days a week from 06:00 to 21:00 CAT.
              </p>
            </div>
          </div>
        </div>

        {/* Sub-Footer Copyright & Legal */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-8 text-[11px] uppercase tracking-[0.16em] text-white/40">
          <span>
            © {new Date().getFullYear()} Africa Dream Adventures & Eden Car Rental. All rights reserved.
          </span>
          <div className="flex gap-6">
            <Link href="/legal" className="transition-colors hover:text-gold">
              Terms & Safari Policies
            </Link>
            <Link href="/car-rental/cross-border" className="transition-colors hover:text-gold">
              Cross-Border Regulations
            </Link>
            <a
              href="http://africadreamadventures.co.zw/"
              className="text-gold/80 hover:text-gold"
            >
              africadreamadventures.co.zw
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
