"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/ui/reveal";

export default function RentalsHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section ref={ref} className="relative flex h-[85vh] min-h-[560px] items-end overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -top-[10%] h-[120%]">
        <Image
          src="https://images.unsplash.com/photo-1663659321400-d397a637b59c?w=2400&q=80&auto=format&fit=crop"
          alt="Land Cruiser overlooking the African bush at sunset"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-20 pt-40 text-paper sm:px-10">
        <Reveal className="mb-6 flex items-center gap-3.5">
          <span className="h-px w-12 bg-gold" />
          <span className="text-[11px] uppercase tracking-[0.28em] text-gold">Dream Africa · Vehicle Hire Division</span>
        </Reveal>
        <Reveal>
          <h1
            className="m-0 max-w-3xl font-display font-semibold uppercase leading-[1.05] tracking-tight text-balance"
            style={{ fontSize: "clamp(32px, 5vw, 68px)" }}
          >
            Eden Car Rental
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-paper/75">
            A meticulously serviced 4×4 fleet delivered to your lodge or the airport gate — self-drive freedom,
            or a chauffeur when you'd rather not.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
