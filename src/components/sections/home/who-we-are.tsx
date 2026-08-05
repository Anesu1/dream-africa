"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/ui/reveal";
import { WHO_WE_ARE } from "@/lib/content";

export default function WhoWeAre() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="mx-auto max-w-[1440px] px-6 py-28 sm:px-10 sm:py-40">
      <div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
        <div ref={ref} className="overflow-hidden rounded-sm">
          <motion.div style={{ y }} className="relative h-[420px] w-full sm:h-[560px]">
            <Image src={WHO_WE_ARE.image} alt="Guide at the Zambezi" fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
          </motion.div>
        </div>

        <div>
          <Reveal className="mb-7 text-[11px] uppercase tracking-[0.28em] text-gold">{WHO_WE_ARE.eyebrow}</Reveal>
          <Reveal>
            <h2
              className="m-0 mb-8 font-display font-semibold uppercase leading-[1.15] tracking-tight"
              style={{ fontSize: "clamp(26px, 3.1vw, 42px)" }}
            >
              {WHO_WE_ARE.heading[0]}
              <br />
              {WHO_WE_ARE.heading[1]}
            </h2>
          </Reveal>
          <Reveal>
            <p className="mb-14 max-w-[620px] text-lg leading-relaxed text-muted text-pretty">{WHO_WE_ARE.body}</p>
          </Reveal>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {WHO_WE_ARE.milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.08} className="border-t border-line pt-5">
                <div className="font-data text-2xl font-medium text-gold">{m.year}</div>
                <div className="mt-2 text-xs leading-snug text-muted">{m.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
