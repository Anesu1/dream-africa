import Reveal from "@/components/ui/reveal";
import BookingForm from "@/components/ui/booking-form";

export default function BookingSection({
  division,
  eyebrow,
  headline,
  body,
}: {
  division: "safaris" | "rentals";
  eyebrow: string;
  headline: [string, string];
  body: string;
}) {
  return (
    <section id="book" className="bg-ink px-6 py-28 text-paper sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <Reveal className="mb-7 text-[11px] uppercase tracking-[0.28em] text-gold">{eyebrow}</Reveal>
          <Reveal>
            <h2
              className="m-0 font-display font-semibold uppercase leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(26px, 4vw, 48px)" }}
            >
              {headline[0]}
              <br />
              <span className="text-gold">{headline[1]}</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-8 max-w-[460px] text-[17px] leading-relaxed text-paper/70">{body}</p>
          </Reveal>
        </div>
        <Reveal>
          <BookingForm division={division} />
        </Reveal>
      </div>
    </section>
  );
}
