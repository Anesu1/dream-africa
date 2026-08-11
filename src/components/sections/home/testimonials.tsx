"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/reveal";
import type { TestimonialItem } from "@/sanity/lib/types";

export default function Testimonials({ testimonials }: { testimonials: TestimonialItem[] }) {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  return (
    <section className="border-t border-line px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[900px] text-center">
        <Reveal className="mb-10 text-[11px] uppercase tracking-[0.28em] text-gold">Guest Notes</Reveal>

        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote
                className="m-0 mb-8 font-subheading italic font-normal leading-[1.25] tracking-tight text-balance"
                style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="text-xs uppercase tracking-[0.22em] text-muted">
                {t.author} — {t.location}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: i === index ? 28 : 8, background: i === index ? "var(--gold)" : "var(--line)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
