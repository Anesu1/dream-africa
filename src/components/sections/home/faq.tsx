import Reveal from "@/components/ui/reveal";
import FaqItem from "@/components/ui/faq-item";
import { FAQS } from "@/lib/content";

export default function Faq() {
  return (
    <section className="border-t border-line py-28 sm:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 sm:px-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
        <div>
          <Reveal className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">Questions</Reveal>
          <Reveal>
            <h2
              className="m-0 mb-7 font-display font-semibold uppercase leading-tight tracking-tight"
              style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
            >
              Common <span className="text-gold">questions</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="m-0 text-[15px] leading-relaxed text-muted">
              Still unsure? Our Victoria Falls office answers within the hour, every day.
            </p>
          </Reveal>
        </div>
        <div>
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
