import Reveal from "@/components/ui/reveal";
import type { ComboPackage } from "@/sanity/lib/types";

export default function Combos({ combos }: { combos: ComboPackage[] }) {
  return (
    <section id="combos" className="mx-auto max-w-[1440px] px-6 py-28 sm:px-10 sm:py-36">
      <Reveal className="mb-14 max-w-2xl">
        <div className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">(01) Special combos</div>
        <h2
          className="m-0 font-display font-semibold uppercase leading-[1.15] tracking-tight"
          style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}
        >
          Bundle the adrenaline, <span className="text-gold">save on the total.</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        {combos.map((combo, i) => (
          <Reveal key={combo.title} delay={i * 0.06}>
            <div className="h-full rounded-sm border border-line p-8 transition-colors hover:border-gold">
              <h3 className="m-0 mb-4 font-subheading text-2xl font-medium leading-tight">{combo.title}</h3>
              <p className="m-0 mb-5 text-sm leading-relaxed text-muted">{combo.description}</p>
              {combo.checklist && combo.checklist.length > 0 && (
                <div className="flex flex-wrap gap-2 border-t border-line pt-5">
                  {combo.checklist.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-off-white px-3 py-1.5 font-data text-[11px] uppercase tracking-[0.06em] text-ink"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
