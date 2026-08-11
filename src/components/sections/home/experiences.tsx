"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/reveal";
import type { ExperienceCard } from "@/sanity/lib/types";

export default function Experiences({ experiences }: { experiences: [ExperienceCard, ExperienceCard] }) {
  return (
    <section id="experiences" className="border-t border-line bg-off-white py-28 sm:py-40">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
        <Reveal className="mb-16 max-w-2xl">
          <div className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">Our Experiences</div>
          <h2
            className="m-0 font-display font-semibold uppercase leading-[1.15] tracking-tight"
            style={{ fontSize: "clamp(24px, 3.4vw, 44px)" }}
          >
            One company, two ways to <span className="text-gold">meet Zimbabwe.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {experiences.map((exp, i) => (
            <Reveal key={exp.key} delay={i * 0.12}>
              <Link href={exp.href} className="group relative block h-[560px] overflow-hidden rounded-sm">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image src={exp.image} alt={exp.title} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/10 transition-opacity duration-500 group-hover:from-ink/95" />

                <div className="absolute inset-0 flex flex-col justify-end p-9 text-paper sm:p-12">
                  <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-gold">{exp.label}</div>
                  <h3 className="m-0 mb-4 font-subheading text-4xl font-medium sm:text-5xl">{exp.title}</h3>
                  <p className="m-0 mb-8 max-w-[400px] text-[15px] leading-relaxed text-paper/75">{exp.description}</p>
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                    <span>{exp.cta}</span>
                    <motion.span
                      className="inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 6 }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
