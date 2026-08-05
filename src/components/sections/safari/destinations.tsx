"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/reveal";
import { DESTINATIONS } from "@/lib/content";

export default function Destinations() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-28 sm:px-10 sm:py-36">
      <Reveal className="mb-14 max-w-2xl">
        <div className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">(01) Where we go</div>
        <h2
          className="m-0 font-display font-semibold uppercase leading-[1.15] tracking-tight"
          style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}
        >
          Four regions, one <span className="text-gold">river running through them.</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {DESTINATIONS.map((d, i) => (
          <Reveal key={d.name} delay={i * 0.08}>
            <div className="group relative h-[380px] overflow-hidden rounded-sm">
              <motion.div className="absolute inset-0" whileHover={{ scale: 1.08 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <Image src={d.image} alt={d.name} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-paper">
                <h3 className="m-0 mb-2 font-subheading text-2xl font-medium">{d.name}</h3>
                <p className="m-0 text-[13px] leading-relaxed text-paper/70">{d.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
