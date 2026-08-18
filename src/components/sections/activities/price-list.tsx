import Reveal from "@/components/ui/reveal";
import type { ActivityCategory } from "@/sanity/lib/types";

export default function PriceList({
  categories,
  disclaimer,
}: {
  categories: ActivityCategory[];
  disclaimer?: string;
}) {
  return (
    <section id="activity-directory" className="mx-auto max-w-[1440px] px-6 py-28 sm:px-10 sm:py-36">
      <Reveal className="mb-14 max-w-2xl">
        <div className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">(03) Activity Directory</div>
        <h2
          className="m-0 font-display font-semibold uppercase leading-[1.15] tracking-tight"
          style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}
        >
          Complete Directory, <span className="text-gold">every way to fill the day.</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2">
        {categories.map((category, i) => (
          <Reveal key={category.title} delay={i * 0.05}>
            <h3 className="m-0 mb-5 border-b border-line pb-4 font-subheading text-xl font-medium">
              {category.title}
            </h3>
            <div className="flex flex-col gap-4">
              {category.items.map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-ink">{item.label}</div>
                    {item.note && <div className="mt-1 max-w-[360px] text-xs leading-relaxed text-muted">{item.note}</div>}
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-gold font-semibold flex-shrink-0">
                    Available
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      {disclaimer && (
        <Reveal className="mt-16 rounded-sm border border-line bg-off-white p-6 text-center text-xs uppercase tracking-[0.06em] text-muted">
          {disclaimer}
        </Reveal>
      )}
    </section>
  );
}
