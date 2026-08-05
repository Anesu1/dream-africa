"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import MagneticButton from "@/components/ui/magnetic-button";
import { NAV_LINKS, BRANDS } from "@/lib/content";

export default function Navbar() {
  const pathname = usePathname();
  const brand = pathname?.startsWith("/rentals") ? BRANDS.rentals : BRANDS.safaris;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const transparent = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        transparent ? "bg-transparent" : "bg-paper/90 backdrop-blur-md border-b border-line"
      } ${transparent ? "text-paper [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]" : "text-ink"}`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={brand.logo}
            alt={`${brand.name} logo`}
            width={56}
            height={56}
            className="h-11 w-11 rounded-md object-cover sm:h-12 sm:w-12"
            priority
          />
          <span className="hidden font-display text-lg font-semibold uppercase tracking-[0.08em] sm:inline">
            {brand.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-9 text-xs uppercase tracking-[0.18em] lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-gold">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton className="rounded-full bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-gold hover:text-ink">
            Plan Your Journey
          </MagneticButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 lg:hidden"
        >
          <motion.span
            className={`h-px w-6 ${transparent ? "bg-paper" : "bg-ink"}`}
            animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
          />
          <motion.span
            className={`h-px w-6 ${transparent ? "bg-paper" : "bg-ink"}`}
            animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-paper lg:hidden"
          >
            <nav className="flex flex-col gap-6 px-6 py-8 text-sm uppercase tracking-[0.16em]">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
