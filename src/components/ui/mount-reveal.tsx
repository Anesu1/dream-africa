"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// For content guaranteed to be in the initial viewport (page headings with
// no hero above them). Reveal's whileInView is for below-the-fold content —
// using it here risks the element never getting an "in view" signal and
// staying stuck at opacity 0.
export default function MountReveal({
  children,
  className = "",
  delay = 0,
  y = 32,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
