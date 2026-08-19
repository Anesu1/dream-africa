"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SafariHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section ref={ref} className="relative flex h-[85vh] min-h-[560px] items-end overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0 -top-[10%] h-[120%]">
        <Image src={image} alt={title} fill priority className="object-cover" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-20 pt-40 text-paper sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex items-center gap-3.5"
        >
          <span className="h-px w-12 bg-gold" />
          <span className="text-[11px] uppercase tracking-[0.28em] text-gold">{eyebrow}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="m-0 max-w-3xl font-display font-semibold uppercase leading-[1.05] tracking-tight text-balance"
          style={{ fontSize: "clamp(32px, 5vw, 68px)" }}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-paper/75"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
