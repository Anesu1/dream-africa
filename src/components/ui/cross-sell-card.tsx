"use client";

import Link from "next/link";
import MagneticButton from "@/components/ui/magnetic-button";

interface CrossSellCardProps {
  type: "safari-to-rental" | "rental-to-safari";
  customHeadline?: string;
  customBody?: string;
}

export default function CrossSellCard({
  type,
  customHeadline,
  customBody,
}: CrossSellCardProps) {
  if (type === "safari-to-rental") {
    return (
      <div className="relative my-16 overflow-hidden rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 text-white shadow-2xl sm:p-12">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              <span>Eden Car Rental Division</span>
              <span>•</span>
              <span>Ground Mobility & 4x4 Hire</span>
            </div>

            <h3 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl text-white">
              {customHeadline || "Need ground mobility? Rent an Eden Car Rental SUV directly at the airport."}
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {customBody ||
                "Take full control of your Zimbabwe and Botswana itinerary. Rent a safari-ready Toyota Hilux 4x4 or luxury SUV with optional rooftop tents, GPS tracking, and complete gravel-road CDW insurance. Free terminal pickup at Victoria Falls (VFA) with zero hidden fees."}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span>Unlimited Mileage Options Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span>Full Cross-Border Paperwork for Botswana & Zambia</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span>Comprehensive Insurance with Gravel Road CDW</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
            <Link href="/car-rental">
              <MagneticButton className="rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-950 shadow-lg transition-all hover:bg-white hover:text-slate-900">
                Explore 4x4 Fleet →
              </MagneticButton>
            </Link>
            <Link
              href="/car-rental/cross-border"
              className="text-xs uppercase tracking-[0.14em] text-slate-400 underline decoration-slate-600 underline-offset-4 hover:text-gold"
            >
              Cross-Border Documentation & Permits
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // rental-to-safari
  return (
    <div className="relative my-16 overflow-hidden rounded-2xl border border-gold/30 bg-[#1A1A1A] p-8 text-paper shadow-2xl sm:p-12">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
            <span>Africa Dream Adventures</span>
            <span>•</span>
            <span>Where Luxury Meets The Wild</span>
          </div>

          <h3 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl text-white">
            {customHeadline || "Add a Helicopter Flight of Angels or Zambezi Sunset Cruise to your trip and save 10%!"}
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            {customBody ||
              "Pair your vehicle hire with an unforgettable Victoria Falls helicopter 'Flight of Angels' or a private Zambezi luxury sunset dinner cruise. Enjoy bundle savings and seamless logistics."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span>Flight of Angels Helicopter Tours</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span>Zambezi Luxury Sunset Cruises</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span>Hwange & Chobe Private Safaris</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
          <Link href="/activities">
            <MagneticButton className="rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink shadow-lg transition-all hover:bg-white">
              View Activity Combos →
            </MagneticButton>
          </Link>
          <Link
            href="/safaris"
            className="text-xs uppercase tracking-[0.14em] text-gold/80 underline decoration-gold/40 underline-offset-4 hover:text-white"
          >
            Explore Luxury Safari Itineraries
          </Link>
        </div>
      </div>
    </div>
  );
}
