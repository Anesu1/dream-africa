import Reveal from "@/components/ui/reveal";
import type { PackageTier } from "@/sanity/lib/types";

export default function Packages({ tiers }: { tiers: PackageTier[] }) {
  return (
    <section id="packages" className="border-t border-line bg-off-white py-28 sm:py-36">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
        <Reveal className="mb-14 max-w-2xl">
          <div className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">(02) Discounted packages</div>
          <h2
            className="m-0 font-display font-semibold uppercase leading-[1.15] tracking-tight"
            style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}
          >
            One booking, <span className="text-gold">a full day sorted.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, i) => (
            <Reveal key={tier.title} delay={i * 0.08}>
              <div className="h-full rounded-sm bg-paper p-7">
                <div className="mb-4 text-[10px] uppercase tracking-[0.2em] text-gold">{tier.tier}</div>
                <h3 className="m-0 mb-1 font-subheading text-xl font-medium leading-tight">{tier.title}</h3>
                {tier.productCount && <div className="mb-4 text-xs text-muted">{tier.productCount}</div>}
                <p className="m-0 border-t border-line pt-4 text-[13px] leading-relaxed text-muted">{tier.included}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
