"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE, FOOTER_LINKS, TRUST_INDICATORS, BRANDS } from "@/lib/content";

export default function Footer() {
  const pathname = usePathname();
  const isRentals = pathname?.startsWith("/rentals");
  const brand = isRentals ? BRANDS.rentals : BRANDS.safaris;
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer id="contact" className="bg-ink px-6 pb-10 pt-24 text-paper sm:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 flex flex-wrap gap-3 border-b border-white/10 pb-10 text-[11px] uppercase tracking-[0.2em] text-white/50">
          {TRUST_INDICATORS.map((item) => (
            <span key={item} className="flex items-center gap-3">
              {item}
              <span className="text-gold last:hidden">·</span>
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Image src={brand.logo} alt={`${brand.name} logo`} width={64} height={64} className="h-14 w-14 rounded-md object-cover" />
              <span className="font-display text-xl font-semibold uppercase tracking-[0.08em]">{brand.name}</span>
            </div>
            <p className="max-w-[300px] text-sm leading-relaxed text-white/55">
              {isRentals ? BRANDS.rentals.parentNote : SITE.tagline} {SITE.address}.
            </p>
          </div>

          <div>
            <div className="mb-5 text-[10px] uppercase tracking-[0.24em] text-gold">Safaris</div>
            <div className="flex flex-col gap-3 text-sm text-white/65">
              {FOOTER_LINKS.safaris.map((link) => (
                <Link key={link.label} href={link.href} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 text-[10px] uppercase tracking-[0.24em] text-gold">Eden Car Rental</div>
            <div className="flex flex-col gap-3 text-sm text-white/65">
              {FOOTER_LINKS.rentals.map((link) => (
                <Link key={link.label} href={link.href} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 text-[10px] uppercase tracking-[0.24em] text-gold">Newsletter</div>
            <p className="mb-4 text-sm leading-relaxed text-white/55">
              Departures, road reports and the odd elephant photo.
            </p>
            {sent ? (
              <p className="text-sm text-gold">You&apos;re on the list.</p>
            ) : (
              <form
                className="flex gap-2.5 border-b border-white/30 pb-2.5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/40"
                />
                <button type="submit" className="text-[11px] uppercase tracking-[0.2em] text-gold">
                  Send
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-8 text-[11px] uppercase tracking-[0.16em] text-white/40">
          <span>{SITE.copyright}</span>
          <div className="flex gap-6">
            <a href="#top" className="transition-colors hover:text-gold">Instagram</a>
            <a href="#top" className="transition-colors hover:text-gold">WhatsApp</a>
            <a href="#top" className="transition-colors hover:text-gold">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
