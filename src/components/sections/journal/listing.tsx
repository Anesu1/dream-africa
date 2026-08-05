import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { JOURNAL_POSTS } from "@/lib/content";

export default function JournalListing() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-28 sm:px-10 sm:py-36">
      <Reveal className="mb-14 max-w-2xl">
        <div className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">The Journal</div>
        <h1
          className="m-0 font-display font-semibold uppercase leading-[1.15] tracking-tight"
          style={{ fontSize: "clamp(24px, 3.4vw, 44px)" }}
        >
          Field notes from <span className="text-gold">Victoria Falls.</span>
        </h1>
      </Reveal>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {JOURNAL_POSTS.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <Link href={`/journal/${post.slug}`} className="group block">
              <div className="overflow-hidden rounded-sm">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={900}
                  height={300}
                  className="h-[280px] w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                />
              </div>
              <div className="mb-3 mt-6 text-[10px] uppercase tracking-[0.22em] text-gold">{post.category}</div>
              <h2 className="m-0 mb-2.5 font-subheading text-[26px] font-medium leading-tight">{post.title}</h2>
              <p className="m-0 text-sm leading-relaxed text-muted">{post.excerpt}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
