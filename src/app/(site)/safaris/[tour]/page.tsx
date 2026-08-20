import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MountReveal from "@/components/ui/mount-reveal";
import { TourJsonLd } from "@/components/seo/json-ld";
import { whatsappLink } from "@/lib/whatsapp";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { TOUR_BY_SLUG_QUERY, TOUR_SLUGS_QUERY, TOURS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings, Tour } from "@/sanity/lib/types";

export async function generateStaticParams() {
  // Build-time only — runs outside any request scope, so it can't use sanityFetch
  // (which reads draftMode() via next/headers). Always fetches the published dataset.
  const slugs = await client.fetch<{ slug: string }[]>(TOUR_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ tour: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tour: string }>;
}): Promise<Metadata> {
  const { tour: slug } = await params;
  const tour = await sanityFetch<Tour | null>({ query: TOUR_BY_SLUG_QUERY, params: { slug } });
  if (!tour) return {};
  return {
    title: `${tour.title} — Victoria Falls ${tour.category} Safari`,
    description: tour.description,
    alternates: { canonical: `/safaris/${tour.slug}` },
  };
}

export default async function TourPage({ params }: { params: Promise<{ tour: string }> }) {
  const { tour: slug } = await params;
  const [tour, allTours, siteSettings] = await Promise.all([
    sanityFetch<Tour | null>({ query: TOUR_BY_SLUG_QUERY, params: { slug } }),
    sanityFetch<Tour[]>({ query: TOURS_QUERY }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);
  if (!tour) notFound();

  const related = allTours.filter((t) => t.slug !== tour.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-[1000px] px-6 py-28 sm:px-10 sm:py-40">
      <TourJsonLd name={tour.title} description={tour.description} image={tour.image} duration={tour.duration} />

      <MountReveal className="mb-6 flex items-center gap-3">
        <Link href="/safaris" className="text-[11px] uppercase tracking-[0.28em] text-gold hover:underline">
          Safaris
        </Link>
        <span className="text-[11px] text-muted">/</span>
        <span className="text-[11px] uppercase tracking-[0.28em] text-muted">{tour.category}</span>
      </MountReveal>

      <MountReveal>
        <h1
          className="m-0 mb-3 font-display font-semibold uppercase leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(28px, 4.4vw, 50px)" }}
        >
          {tour.title}
        </h1>
      </MountReveal>
      <MountReveal delay={0.05}>
        <p className="mb-10 text-lg text-muted">{tour.duration}</p>
      </MountReveal>

      <MountReveal delay={0.1} className="mb-12 overflow-hidden rounded-sm">
        <Image
          src={tour.image}
          alt={tour.title}
          width={1200}
          height={620}
          priority
          className="h-[360px] w-full object-cover sm:h-[480px]"
        />
      </MountReveal>

      <div className="grid gap-12 sm:grid-cols-[1fr_260px]">
        <div>
          <MountReveal delay={0.15}>
            <p className="mb-10 max-w-[60ch] text-[17px] leading-relaxed text-muted">{tour.description}</p>
          </MountReveal>

          {related.length > 0 && (
            <MountReveal delay={0.2}>
              <h2 className="mb-5 font-subheading text-xl font-medium">Other tours</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {related.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/safaris/${t.slug}`}
                    className="group block overflow-hidden rounded-sm border border-line transition-colors hover:border-gold"
                  >
                    <Image
                      src={t.image}
                      alt={t.title}
                      width={400}
                      height={220}
                      className="h-[120px] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                    <div className="p-3">
                      <div className="font-subheading text-sm font-medium">{t.title}</div>
                      <div className="text-xs text-muted">{t.category}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </MountReveal>
          )}

          {tour.relatedJournalPosts && tour.relatedJournalPosts.length > 0 && (
            <MountReveal delay={0.25} className="mt-10">
              <h2 className="mb-5 font-subheading text-xl font-medium">From the Journal</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {tour.relatedJournalPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/journal/${post.slug}`}
                    className="group flex gap-4 overflow-hidden rounded-sm border border-line p-3 transition-colors hover:border-gold"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={120}
                      height={120}
                      className="h-20 w-20 shrink-0 rounded-sm object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                    <div>
                      <div className="font-subheading text-sm font-medium leading-snug">{post.title}</div>
                      <div className="mt-1 text-xs text-muted line-clamp-2">{post.excerpt}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </MountReveal>
          )}
        </div>

        <MountReveal delay={0.15}>
          <div className="rounded-sm border border-line p-6">
            {tour.highlights.length > 0 && (
              <ul className="mb-5 flex flex-col gap-2.5 font-data text-sm">
                {tour.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
            <a
              href={whatsappLink(siteSettings.whatsapp, `Hi, I'd like to book the ${tour.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-gold px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-paper"
            >
              Book on WhatsApp
            </a>
          </div>
        </MountReveal>
      </div>
    </article>
  );
}
