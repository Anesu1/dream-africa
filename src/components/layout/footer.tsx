"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappLink } from "@/lib/whatsapp";
import type { SiteSettings } from "@/sanity/lib/types";

export default function Footer({ siteSettings }: { siteSettings: SiteSettings }) {
  const pathname = usePathname();
  const isRentals = pathname?.startsWith("/rentals");
  const brand = isRentals ? siteSettings.brandRentals : siteSettings.brandSafaris;

  return (
    <footer id="contact" className="bg-ink px-6 pb-24 pt-24 text-paper sm:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 flex flex-wrap gap-3 border-b border-white/10 pb-10 text-[11px] uppercase tracking-[0.2em] text-white/50">
          {siteSettings.trustIndicators.map((item) => (
            <span key={item} className="flex items-center gap-3">
              {item}
              <span className="text-gold last:hidden">·</span>
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Image src={brand.logo} alt={`${brand.name} logo`} width={64} height={64} className="h-14 w-14 rounded-md object-cover" />
              <span className="font-display text-xl font-semibold uppercase tracking-[0.08em]">{brand.name}</span>
            </div>
            <p className="max-w-[300px] text-sm leading-relaxed text-white/55">
              {isRentals ? siteSettings.brandRentals.parentNote : siteSettings.tagline} {siteSettings.address}.
            </p>
          </div>

          <div>
            <div className="mb-5 text-[10px] uppercase tracking-[0.24em] text-gold">Safaris</div>
            <div className="flex flex-col gap-3 text-sm text-white/65">
              {siteSettings.footerSafarisLinks.map((link) => (
                <Link key={link.label} href={link.href} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 text-[10px] uppercase tracking-[0.24em] text-gold">Eden Car Rental</div>
            <div className="flex flex-col gap-3 text-sm text-white/65">
              {siteSettings.footerRentalsLinks.map((link) => (
                <Link key={link.label} href={link.href} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-8 text-[11px] uppercase tracking-[0.16em] text-white/40">
          <span>{siteSettings.copyright}</span>
          <div className="flex gap-6">
            <a
              href={whatsappLink(siteSettings.whatsapp, `Hi ${brand.name}, I'd like to plan a trip.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              WhatsApp
            </a>
            <Link href="/legal" className="transition-colors hover:text-gold">Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
