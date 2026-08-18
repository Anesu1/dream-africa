"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "@/components/ui/magnetic-button";

const TRUST_POINTS = [
  "Guaranteed Airport Pickup at Victoria Falls (VFA)",
  "Zero Hidden Fees on 4x4 Rentals & Cross-Border Permits",
  "Tailor-Made Private Safaris & Helicopter Flights",
  "Instant WhatsApp Booking & 24/7 Local Support",
];

export default function Hero({
  hero,
}: {
  hero: {
    eyebrow?: string;
    headline?: [string, string];
    sub?: string;
    image?: string;
    primaryCta?: { label: string; href?: string };
    secondaryCta?: { label: string; href?: string };
  };
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const bgImage =
    hero?.image ||
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&h=900&q=80&auto=format&fit=crop";

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen items-end overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -top-[10%] h-[120%]">
        <Image src={bgImage} alt="Victoria Falls Safaris and 4x4 Rental" fill priority className="object-cover" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/50 to-[#0B0B0B]/40" />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-36 text-paper sm:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 flex items-center gap-3.5"
        >
          <span className="h-px w-10 bg-gold" />
          <span className="text-[11px] uppercase tracking-[0.28em] text-gold">
            Africa Dream Adventures & Eden Car Rental
          </span>
        </motion.div>

        {/* User-Specified Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="m-0 max-w-5xl font-display font-semibold uppercase leading-[1.05] tracking-tight text-white"
          style={{ fontSize: "clamp(32px, 5.2vw, 84px)" }}
        >
          Experience Victoria Falls:{" "}
          <span className="text-gold">From Luxury Safaris to Self-Drive Freedom</span>
        </motion.h1>

        {/* User-Specified Subheadline */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="m-0 max-w-2xl text-base sm:text-lg leading-relaxed text-paper/85"
          >
            Discover Africa Dream Adventures for private luxury safaris and helicopter tours, or take the wheel with Eden Car Rental for safari-ready 4x4s and airport pickups.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 lg:justify-end"
          >
            <Link href="/safaris">
              <MagneticButton className="rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink shadow-lg transition-colors hover:bg-white">
                Luxury Safaris →
              </MagneticButton>
            </Link>
            <Link href="/car-rental">
              <MagneticButton className="rounded-full border border-paper/40 bg-ink/40 backdrop-blur-sm px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-paper transition-colors hover:border-gold hover:text-gold">
                4x4 Car Hire →
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Trust Banner (Key Selling Points) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid grid-cols-1 gap-3 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRUST_POINTS.map((point, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs uppercase tracking-wider text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
