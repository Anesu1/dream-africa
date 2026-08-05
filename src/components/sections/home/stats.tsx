import { STATS } from "@/lib/content";
import Reveal from "@/components/ui/reveal";
import Counter from "@/components/ui/counter";

export default function Stats() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 px-6 sm:px-10 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.08}
            className={`border-white/10 py-16 sm:py-20 ${i < STATS.length - 1 ? "border-r" : ""} ${
              i % 2 === 0 ? "pr-4" : "pl-4"
            } lg:px-8`}
          >
            <div className="font-data font-medium leading-none" style={{ fontSize: "clamp(38px, 4.6vw, 68px)" }}>
              <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
            </div>
            <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/50">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
