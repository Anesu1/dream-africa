"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import MagneticButton from "@/components/ui/magnetic-button";
import { whatsappLink } from "@/lib/whatsapp";
import type { SiteSettings } from "@/sanity/lib/types";

const DEFAULT_NAV_LINKS = [
  { label: "Safaris", href: "/safaris" },
  { label: "Activities", href: "/activities" },
  { label: "Cruises", href: "/cruises" },
  { label: "Car Rental", href: "/car-rental" },
  { label: "Journal", href: "/journal" },
];

export default function Navbar({ siteSettings }: { siteSettings: SiteSettings }) {
  const pathname = usePathname();
  const isRentalRoute = pathname?.startsWith("/car-rental") || pathname?.startsWith("/rentals");
  const brand = isRentalRoute ? siteSettings.brandRentals : siteSettings.brandSafaris;
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
  const navLinks = siteSettings?.navLinks?.length ? siteSettings.navLinks : DEFAULT_NAV_LINKS;

  // Add cruises and car-rental if not present in sanity links
  const unifiedNavLinks = DEFAULT_NAV_LINKS.map((def) => {
    const existing = navLinks.find(
      (n) => n.href === def.href || (def.href === "/car-rental" && n.href === "/rentals")
    );
    return existing ? { label: def.label, href: def.href } : def;
  });

  const ctaMessage = isRentalRoute
    ? `Hi Eden Car Rental, I'd like to check vehicle availability in Victoria Falls.`
    : `Hi Africa Dream Adventures, I'd like to plan a luxury safari/activity package.`;

  const ctaLabel = isRentalRoute ? "Book 4x4 / Rental" : "Plan Your Journey";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        transparent
          ? "bg-transparent"
          : isRentalRoute
          ? "bg-slate-900/90 backdrop-blur-md border-b border-slate-700/50 text-white"
          : "bg-paper/90 backdrop-blur-md border-b border-line text-ink"
      } ${
        transparent
          ? "text-paper [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]"
          : isRentalRoute
          ? "text-white"
          : "text-ink"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href={isRentalRoute ? "/car-rental" : "/"}
          className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
        >
          {brand?.logo ? (
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              width={56}
              height={56}
              className="h-10 w-10 rounded-md object-cover sm:h-11 sm:w-11 ring-1 ring-white/20"
              priority
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold text-ink font-bold">
              {isRentalRoute ? "ECR" : "ADA"}
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-display text-base font-semibold uppercase tracking-[0.08em] sm:text-lg">
              {brand?.name ?? (isRentalRoute ? "Eden Car Rental" : "Africa Dream Adventures")}
            </span>
            <span
              className={`text-[9px] uppercase tracking-[0.2em] ${
                isRentalRoute ? "text-slate-300" : "text-gold"
              }`}
            >
              {isRentalRoute ? "4x4 & Airport Mobility" : "Where Luxury Meets The Wild"}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.18em] lg:flex">
          {unifiedNavLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href)) ||
              (link.href === "/car-rental" && pathname?.startsWith("/rentals"));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-gold ${
                  isActive
                    ? isRentalRoute
                      ? "text-gold font-semibold"
                      : "text-gold font-semibold"
                    : transparent
                    ? "text-paper/90 hover:text-white"
                    : isRentalRoute
                    ? "text-slate-200 hover:text-white"
                    : "text-ink/80 hover:text-ink"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {isRentalRoute ? (
            <Link
              href="/safaris"
              className="text-[11px] uppercase tracking-[0.16em] text-slate-300 hover:text-gold transition-colors"
            >
              Safaris Hub →
            </Link>
          ) : (
            <Link
              href="/car-rental"
              className="text-[11px] uppercase tracking-[0.16em] text-ink/70 hover:text-gold transition-colors"
            >
              4x4 Rentals →
            </Link>
          )}
          <MagneticButton
            className={`rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all shadow-md ${
              isRentalRoute
                ? "bg-gold text-ink hover:bg-white hover:text-slate-900"
                : "bg-ink text-paper hover:bg-gold hover:text-ink"
            }`}
            onClick={() =>
              window.open(
                whatsappLink(siteSettings.whatsapp, ctaMessage),
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            {ctaLabel}
          </MagneticButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 p-2 lg:hidden"
        >
          <motion.span
            className={`h-0.5 w-6 ${
              transparent ? "bg-paper" : isRentalRoute ? "bg-white" : "bg-ink"
            }`}
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
          />
          <motion.span
            className={`h-0.5 w-6 ${
              transparent ? "bg-paper" : isRentalRoute ? "bg-white" : "bg-ink"
            }`}
            animate={{ opacity: open ? 0 : 1 }}
          />
          <motion.span
            className={`h-0.5 w-6 ${
              transparent ? "bg-paper" : isRentalRoute ? "bg-white" : "bg-ink"
            }`}
            animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden border-t lg:hidden ${
              isRentalRoute
                ? "border-slate-800 bg-slate-950 text-white"
                : "border-line bg-paper text-ink"
            }`}
          >
            <nav className="flex flex-col gap-5 px-6 py-8 text-sm uppercase tracking-[0.16em]">
              {unifiedNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-1 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-line/40 flex flex-col gap-3">
                <a
                  href={whatsappLink(siteSettings.whatsapp, ctaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-gold px-6 py-3 text-center text-[11px] font-semibold text-ink uppercase tracking-[0.14em]"
                >
                  {ctaLabel}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
