import Reveal from "@/components/ui/reveal";
import FaqItem from "@/components/ui/faq-item";
import type { FaqItem as FaqItemType } from "@/sanity/lib/types";

export default function RentalsFaq({ faqs }: { faqs: FaqItemType[] }) {
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="border-t border-line py-28 sm:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 sm:px-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
        <div>
          <Reveal className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">Before you book</Reveal>
          <Reveal>
            <h2
              className="m-0 mb-7 font-display font-semibold uppercase leading-tight tracking-tight"
              style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
            >
              Rental <span className="text-gold">questions</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="m-0 text-[15px] leading-relaxed text-muted">
              Licence requirements, cross-border paperwork, cancellations — the details that matter before you commit.
            </p>
          </Reveal>
        </div>
        <div>
          {faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
