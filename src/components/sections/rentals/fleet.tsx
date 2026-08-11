"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/reveal";
import VehicleCard from "@/components/ui/vehicle-card";
import type { Vehicle } from "@/sanity/lib/types";

const CATEGORIES = ["All", "SUV", "4x4", "Executive"] as const;

export default function Fleet({ vehicles, whatsapp }: { vehicles: Vehicle[]; whatsapp: string }) {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () => (category === "All" ? vehicles : vehicles.filter((v) => v.category === category)),
    [category, vehicles],
  );

  return (
    <section id="fleet" className="border-t border-line bg-off-white py-28 sm:py-36">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <Reveal className="max-w-2xl">
            <div className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">(02) The fleet</div>
            <h2
              className="m-0 font-display font-semibold uppercase leading-[1.15] tracking-tight"
              style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}
            >
              Thirty-two vehicles, <span className="text-gold">serviced every 5,000km.</span>
            </h2>
          </Reveal>

          <Reveal className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className="relative rounded-full border px-5 py-2.5 font-data text-[11px] font-medium uppercase tracking-[0.14em] transition-colors"
                style={{
                  borderColor: category === c ? "var(--gold)" : "var(--line)",
                  background: category === c ? "var(--gold)" : "transparent",
                  color: category === c ? "var(--ink)" : "var(--ink)",
                }}
              >
                {c}
              </button>
            ))}
          </Reveal>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((vehicle) => (
              <motion.div
                key={vehicle.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <VehicleCard vehicle={vehicle} whatsapp={whatsapp} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
