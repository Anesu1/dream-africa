"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-line last:border-b">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-7 text-left"
      >
        <span className="font-subheading text-xl font-medium sm:text-2xl">{question}</span>
        <motion.span
          aria-hidden="true"
          className="shrink-0 text-2xl text-gold"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-muted">{answer}</p>
      </motion.div>
    </div>
  );
}
