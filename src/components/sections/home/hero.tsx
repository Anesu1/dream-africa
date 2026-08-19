"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "@/components/ui/magnetic-button";
import type { HomePage } from "@/sanity/lib/types";

export default function Hero({ hero }: { hero: Pick<HomePage, "eyebrow" | "headline" | "sub" | "primaryCta" | "secondaryCta" | "image"> }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex h-screen min-h-[720px] items-end overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0 -top-[10%] h-[120%]">
        <Image src={hero.image} alt="" fill priority className="object-cover" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-24 pt-40 text-paper sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex items-center gap-3.5"
        >
          <span className="h-px w-12 bg-gold" />
          <span className="text-[11px] uppercase tracking-[0.28em] text-gold">{hero.eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.65, ease: [0.22, 1, 0.36, 1] }}
          className="m-0 max-w-4xl font-display font-semibold uppercase leading-[1.02] tracking-tight text-balance"
          style={{ fontSize: "clamp(36px, 5.8vw, 92px)" }}
        >
          {hero.headline[0]}
          <br />
          <span className="text-gold">{hero.headline[1]}</span>
        </motion.h1>

        <div className="mt-10 grid gap-10 sm:grid-cols-[1.15fr_.85fr] sm:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.85, ease: [0.22, 1, 0.36, 1] }}
            className="m-0 max-w-[520px] text-[17px] leading-relaxed text-paper/75"
          >
            {hero.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3.5 sm:justify-end"
          >
            <MagneticButton
              className="rounded-full bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-paper"
              onClick={() => document.getElementById("experiences")?.scrollIntoView({ behavior: "smooth" })}
            >
              {hero.primaryCta.label}
            </MagneticButton>
            <MagneticButton
              className="rounded-full border border-paper/35 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:border-gold hover:text-gold"
              onClick={() => document.getElementById("experiences")?.scrollIntoView({ behavior: "smooth" })}
            >
              {hero.secondaryCta.label}
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
