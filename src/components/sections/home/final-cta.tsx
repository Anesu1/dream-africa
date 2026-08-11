"use client";

import Image from "next/image";
import Reveal from "@/components/ui/reveal";
import MagneticButton from "@/components/ui/magnetic-button";
import { whatsappLink } from "@/lib/whatsapp";

export default function FinalCta({ siteName, whatsapp }: { siteName: string; whatsapp: string }) {
  return (
    <section className="relative overflow-hidden px-6 py-32 sm:px-10 sm:py-44">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=2400&q=80&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-ink/80" />

      <div className="relative z-10 mx-auto max-w-[900px] text-center text-paper">
        <Reveal className="mb-8 text-[11px] uppercase tracking-[0.28em] text-gold">Start Planning</Reveal>
        <Reveal>
          <h2
            className="m-0 mb-10 font-display font-semibold uppercase leading-[1.1] tracking-tight text-balance"
            style={{ fontSize: "clamp(28px, 4.4vw, 56px)" }}
          >
            Create memories that <span className="text-gold">last a lifetime.</span>
          </h2>
        </Reveal>
        <Reveal className="flex flex-wrap justify-center gap-4">
          <MagneticButton
            className="rounded-full bg-gold px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-paper"
            onClick={() => window.open(whatsappLink(whatsapp, `Hi ${siteName}, I'd like to plan a trip.`), "_blank", "noopener,noreferrer")}
          >
            Plan Your Journey
          </MagneticButton>
          <MagneticButton
            className="rounded-full border border-paper/35 px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:border-gold hover:text-gold"
            onClick={() => window.open(whatsappLink(whatsapp, `Hi ${siteName}, I'd like to speak to your team.`), "_blank", "noopener,noreferrer")}
          >
            Speak To Our Team
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
