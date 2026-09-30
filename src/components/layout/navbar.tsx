"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import MagneticButton from "@/components/ui/magnetic-button";
import { whatsappLink } from "@/lib/whatsapp";
import type { SiteSettings } from "@/sanity/lib/types";

export default function Navbar({ siteSettings }: { siteSettings: SiteSettings }) {
  const pathname = usePathname();
  const isRentals = pathname?.startsWith("/car-rental-victoria-falls");
  const brand = isRentals ? siteSettings.brandRentals : siteSettings.brandSafaris;
  
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  // Track scroll position for header compression & background transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Track hash for active state on anchor links like #about and #contact
  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open to prevent background bleed
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [open]);

  // Close drawer on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    },
    [open],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Only pages with full-bleed dark hero at top start with a transparent navbar
  const hasHero =
    pathname === "/" ||
    pathname === "/safaris" ||
    pathname === "/car-rental-victoria-falls" ||
    pathname === "/activities";
  const transparent = hasHero && !scrolled && !open;

  // Determine if a link is active
  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && !activeHash;
    }
    if (href.startsWith("/#") || href.startsWith("#")) {
      const hash = href.startsWith("/#") ? href.replace("/", "") : href;
      return pathname === "/" && activeHash === hash;
    }
    return pathname === href || (href !== "/" && pathname?.startsWith(`${href}/`));
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          transparent
            ? "bg-transparent text-paper [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]"
            : "bg-paper/95 text-ink backdrop-blur-md border-b border-line shadow-xs"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-8 xl:px-10 transition-all duration-300 ${
            scrolled ? "py-2.5 sm:py-3.5" : "py-4 sm:py-5"
          }`}
        >
          {/* Brand Logo & Title */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 sm:gap-3 transition-transform duration-200 active:scale-[0.98]"
            aria-label={`${brand.name} Home`}
          >
            <div className="relative overflow-hidden rounded-md border border-white/10 shadow-xs">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={48}
                height={48}
                className="h-9 w-9 object-cover sm:h-11 sm:w-11 transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[13px] xs:text-sm sm:text-base font-semibold uppercase tracking-[0.06em] sm:tracking-[0.08em] whitespace-nowrap leading-tight">
                {brand.name}
              </span>
              <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-gold font-medium leading-none mt-0.5">
                {isRentals ? "Victoria Falls Car Hire" : "Victoria Falls Safaris"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (xl and above: 1280px+) */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center gap-5 2xl:gap-8 text-[11px] 2xl:text-xs font-semibold uppercase tracking-[0.16em] xl:flex whitespace-nowrap"
          >
            {siteSettings.navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1.5 transition-colors duration-200 hover:text-gold ${
                    active
                      ? "text-gold font-bold"
                      : transparent
                        ? "text-paper/90 hover:text-paper"
                        : "text-ink/80 hover:text-ink"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Action Button (xl and above) */}
          <div className="hidden xl:block">
            <MagneticButton
              className={`rounded-full px-5 py-2.5 2xl:px-6 2xl:py-3 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 shadow-sm whitespace-nowrap ${
                transparent
                  ? "bg-gold text-ink hover:bg-paper hover:text-ink shadow-black/25"
                  : "bg-ink text-paper hover:bg-gold hover:text-ink shadow-black/10"
              }`}
              onClick={() =>
                window.open(
                  whatsappLink(siteSettings.whatsapp, `Hi ${brand.name}, I'd like to plan a trip.`),
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              Plan Your Journey
            </MagneticButton>
          </div>

          {/* Mobile & Tablet Controls (Below xl: < 1280px) */}
          <div className="flex items-center gap-2 sm:gap-3 xl:hidden">
            {/* Quick Action Plan Button for Tablet / Large Mobile (640px to 1279px) */}
            <a
              href={whatsappLink(siteSettings.whatsapp, `Hi ${brand.name}, I'd like to plan a trip.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center justify-center rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-all whitespace-nowrap ${
                transparent
                  ? "bg-gold text-ink hover:bg-paper hover:text-ink shadow-sm"
                  : "bg-ink text-paper hover:bg-gold hover:text-ink shadow-xs"
              }`}
            >
              Plan Journey
            </a>

            {/* Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-controls="mobile-navigation-drawer"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 min-h-[44px] min-w-[44px] justify-center select-none active:scale-95 ${
                transparent
                  ? "bg-paper/15 text-paper hover:bg-paper/25 backdrop-blur-sm border border-paper/20"
                  : "bg-ink/5 text-ink hover:bg-ink/10 border border-line"
              }`}
            >
              <span className="hidden md:inline text-[11px] tracking-[0.16em]">
                {open ? "Close" : "Menu"}
              </span>
              <div className="relative flex flex-col justify-center items-center w-5 h-4 gap-1.5" aria-hidden="true">
                <motion.span
                  className={`block h-[2px] w-5 rounded-full ${transparent ? "bg-paper" : "bg-ink"}`}
                  animate={{
                    rotate: open ? 45 : 0,
                    y: open ? 4 : 0,
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
                <motion.span
                  className={`block h-[2px] w-5 rounded-full ${transparent ? "bg-paper" : "bg-ink"}`}
                  animate={{
                    rotate: open ? -45 : 0,
                    y: open ? -4 : 0,
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Featured Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[70] xl:hidden" id="mobile-navigation-drawer" role="dialog" aria-modal="true" aria-label="Main Navigation">
            {/* Backdrop Overlay with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-ink/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Sliding Drawer Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              data-lenis-prevent="true"
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] md:w-[460px] bg-paper text-ink shadow-2xl flex flex-col justify-between overflow-y-auto overscroll-contain z-[71] border-l border-line pb-safe"
            >
              {/* Drawer Top Header */}
              <div>
                <div className="flex items-center justify-between px-6 py-5 border-b border-line">
                  <div className="flex items-center gap-3">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-md object-cover border border-line"
                    />
                    <div className="flex flex-col">
                      <span className="font-display text-sm font-semibold uppercase tracking-[0.08em] leading-tight">
                        {brand.name}
                      </span>
                      <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-gold font-medium">
                        Victoria Falls · Zimbabwe
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink/10 transition-colors active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                {/* Division Quick Switcher (Safaris & Tours vs Car Rental) */}
                <div className="px-6 pt-5 pb-3">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-muted mb-2 font-medium">
                    Explore Experiences
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-ink/5 rounded-xl border border-line">
                    <Link
                      href="/safaris"
                      onClick={() => setOpen(false)}
                      className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-lg text-center transition-all ${
                        !isRentals
                          ? "bg-paper text-ink font-semibold shadow-xs border border-line"
                          : "text-muted hover:text-ink hover:bg-paper/50"
                      }`}
                    >
                      <span className="text-xs font-display uppercase tracking-wider">Safaris</span>
                      <span className="text-[9px] text-gold font-medium tracking-normal">Guided Tours</span>
                    </Link>
                    <Link
                      href="/car-rental-victoria-falls"
                      onClick={() => setOpen(false)}
                      className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-lg text-center transition-all ${
                        isRentals
                          ? "bg-paper text-ink font-semibold shadow-xs border border-line"
                          : "text-muted hover:text-ink hover:bg-paper/50"
                      }`}
                    >
                      <span className="text-xs font-display uppercase tracking-wider">Car Rental</span>
                      <span className="text-[9px] text-gold font-medium tracking-normal">4x4 Hire</span>
                    </Link>
                  </div>
                </div>

                {/* Drawer Nav Links with Staggered Entrance */}
                <nav className="flex flex-col px-4 py-3 gap-1" aria-label="Drawer Navigation Links">
                  {siteSettings.navLinks.map((link, idx) => {
                    const active = isLinkActive(link.href);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + idx * 0.035, duration: 0.25 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-xs uppercase tracking-[0.16em] transition-all ${
                            active
                              ? "bg-gold/10 text-gold font-bold pl-5"
                              : "text-ink/80 hover:bg-ink/5 hover:text-gold hover:pl-5"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {active && <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />}
                            <span>{link.label}</span>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-200 ${active ? "text-gold" : "text-ink/30"}`}
                            aria-hidden="true"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer with Actions and Direct Contact */}
              <div className="p-6 pb-8 sm:pb-6 border-t border-line bg-paper/95 space-y-3.5 shrink-0">
                {/* Primary CTA */}
                <a
                  href={whatsappLink(siteSettings.whatsapp, `Hi ${brand.name}, I'd like to plan a trip.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-ink px-6 py-3.5 text-center text-xs font-bold uppercase tracking-[0.16em] text-paper shadow-md transition-all hover:bg-gold hover:text-ink active:scale-[0.98]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Plan Your Journey</span>
                </a>

                {/* Direct Contact Row */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]">
                  <a
                    href={`tel:${siteSettings.whatsapp}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-line bg-paper hover:bg-ink/5 transition-colors text-ink"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>Direct Call</span>
                  </a>
                  <a
                    href={whatsappLink(siteSettings.whatsapp, `Hi ${brand.name}, I have a question.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-line bg-paper hover:bg-ink/5 transition-colors text-gold"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Operating hours & trust */}
                <div className="pt-2 text-center text-[10px] text-muted tracking-wider uppercase">
                  <span>Victoria Falls, Zimbabwe</span>
                  <span className="mx-2 text-gold">·</span>
                  <span>Open Daily 07:00 – 19:00</span>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
