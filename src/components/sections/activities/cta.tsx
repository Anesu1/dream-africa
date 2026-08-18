import Reveal from "@/components/ui/reveal";
import { whatsappLink } from "@/lib/whatsapp";

export default function ActivitiesCta({ whatsapp }: { whatsapp: string }) {
  return (
    <section className="bg-ink px-6 py-28 text-center text-paper sm:px-10 sm:py-36">
      <Reveal className="mb-7 text-[11px] uppercase tracking-[0.28em] text-gold">Ready when you are</Reveal>
      <Reveal>
        <h2
          className="m-0 mb-8 font-display font-semibold uppercase leading-[1.1] tracking-tight text-balance"
          style={{ fontSize: "clamp(26px, 4vw, 48px)" }}
        >
          Tell us which activities, <span className="text-gold">we&apos;ll sort the rest.</span>
        </h2>
      </Reveal>
      <Reveal>
        <p className="mx-auto mb-10 max-w-lg text-[17px] leading-relaxed text-paper/70">
          Message us on WhatsApp with the activities or combo you have in mind and your preferred dates — we reply
          within the hour with availability and booking details.
        </p>
        <a
          href={whatsappLink(whatsapp, "Hi, I'd like to book some activities in Victoria Falls.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-gold px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-paper"
        >
          Message us on WhatsApp
        </a>
      </Reveal>
    </section>
  );
}
