"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteSettings } from "@/sanity/lib/types";

export default function LoadingScreen({ siteSettings }: { siteSettings: SiteSettings }) {
  const pathname = usePathname();
  const isRental = pathname?.startsWith("/car-rental") || pathname?.startsWith("/rentals");
  const brand = isRental ? siteSettings?.brandRentals : siteSettings?.brandSafaris;
  const brandName = brand?.name || (isRental ? "Eden Car Rental" : "Africa Dream Adventures");
  const brandTagline =
    brand?.tagline ||
    (isRental
      ? "Drive Your Journey. Live Your Freedom."
      : "Where Luxury Meets The Wild");

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#08090A] px-4 text-center select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient Background Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1.2 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="pointer-events-none absolute h-96 w-96 rounded-full bg-gold blur-[120px]"
          />

          <div className="relative z-10 flex flex-col items-center justify-center max-w-lg w-full mx-auto">
            {/* Animated SVG Logo being drawn */}
            <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center mb-6">
              <svg
                viewBox="0 0 120 120"
                className="h-full w-full overflow-visible"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C8A14A" />
                    <stop offset="50%" stopColor="#F5E6BE" />
                    <stop offset="100%" stopColor="#9E782F" />
                  </linearGradient>
                  <linearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C8A14A" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#C8A14A" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Outer Diamond Crest */}
                <motion.polygon
                  points="60,6 114,60 60,114 6,60"
                  fill="none"
                  stroke="url(#goldGrad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0, rotate: -45 }}
                  animate={{ pathLength: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Inner Concentric Diamond */}
                <motion.polygon
                  points="60,16 104,60 60,104 16,60"
                  fill="rgba(200, 161, 74, 0.04)"
                  stroke="url(#goldGrad)"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                />

                {/* Acacia Tree & Horizon Curves (SVG path drawing) */}
                {isRental ? (
                  /* Mobility / Road to Adventure Horizon */
                  <>
                    {/* Horizon Arcs */}
                    <motion.path
                      d="M 28 78 Q 60 40 92 78"
                      fill="none"
                      stroke="url(#goldGrad)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
                    />
                    {/* Road Perspective */}
                    <motion.path
                      d="M 60 42 L 40 88 M 60 42 L 80 88 M 60 52 L 60 76"
                      fill="none"
                      stroke="url(#goldGrad)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.1, delay: 0.5, ease: "easeInOut" }}
                    />
                    {/* North Star Compass */}
                    <motion.path
                      d="M 60 26 L 62 36 L 72 38 L 62 40 L 60 50 L 58 40 L 48 38 L 58 36 Z"
                      fill="url(#goldGrad)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.9, ease: "backOut" }}
                    />
                  </>
                ) : (
                  /* Safari Acacia & African Sunrise */
                  <>
                    {/* Rising Sun Arc */}
                    <motion.circle
                      cx="60"
                      cy="54"
                      r="16"
                      fill="none"
                      stroke="url(#goldGrad)"
                      strokeWidth="1.2"
                      strokeDasharray="2 2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.7 }}
                      transition={{ duration: 0.9, delay: 0.3 }}
                    />
                    {/* Acacia Trunk and Branches */}
                    <motion.path
                      d="M 60 84 L 60 62 M 60 68 Q 44 58 38 52 M 60 66 Q 76 56 82 50 M 52 64 Q 42 62 34 60 M 68 63 Q 78 61 86 58"
                      fill="none"
                      stroke="url(#goldGrad)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                    />
                    {/* Acacia Umbrella Canopy */}
                    <motion.path
                      d="M 30 52 Q 60 38 90 52 Q 60 46 30 52 Z"
                      fill="url(#goldGrad)"
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                    />
                    {/* Ground line */}
                    <motion.path
                      d="M 32 84 L 88 84"
                      fill="none"
                      stroke="url(#goldGrad)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    />
                  </>
                )}
              </svg>

              {/* Glowing Pulse Ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: [0, 0.4, 0], scale: [0.7, 1.2, 1.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-gold/40"
              />
            </div>

            {/* Centered Eyebrow / Region */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mb-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-gold text-center"
            >
              Victoria Falls • Zimbabwe
            </motion.div>

            {/* Centered Brand Title */}
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.14em] text-white text-center px-2"
            >
              {brandName}
            </motion.h2>

            {/* Centered Animated Gold Separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="my-3.5 h-[1.5px] w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
            />

            {/* Centered Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="text-xs sm:text-sm font-medium tracking-[0.18em] text-slate-300 uppercase text-center px-4 max-w-md"
            >
              {brandTagline}
            </motion.p>

            {/* Elegant Loading Dots Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-8 flex items-center justify-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-ping" />
              <span className="h-1 w-12 rounded-full bg-slate-800 overflow-hidden">
                <motion.span
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="block h-full w-1/2 bg-gold"
                />
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
