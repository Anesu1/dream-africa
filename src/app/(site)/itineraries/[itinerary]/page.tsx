import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MountReveal from "@/components/ui/mount-reveal";
import BookingSection from "@/components/sections/booking-section";
import { ItineraryJsonLd } from "@/components/seo/json-ld";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ITINERARY_BY_SLUG_QUERY, ITINERARY_SLUGS_QUERY, ITINERARIES_QUERY } from "@/sanity/lib/queries";
import type { ItineraryPage, ItinerarySummary } from "@/sanity/lib/types";

export async function generateStaticParams() {
  // Build-time only — runs outside any request scope, so it can't use sanityFetch
  // (which reads draftMode() via next/headers). Always fetches the published dataset.
  const slugs = await client.fetch<{ slug: string }[]>(ITINERARY_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ itinerary: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ itinerary: string }>;
}): Promise<Metadata> {
  const { itinerary: slug } = await params;
  const itinerary = await sanityFetch<ItineraryPage | null>({ query: ITINERARY_BY_SLUG_QUERY, params: { slug } });
  if (!itinerary) return {};
  return {
    title: itinerary.title,
    description: itinerary.metaDescription,
    alternates: { canonical: `/itineraries/${itinerary.slug}` },
  };
}

export default async function ItineraryDetailPage({ params }: { params: Promise<{ itinerary: string }> }) {
  const { itinerary: slug } = await params;
  const [itinerary, allItineraries] = await Promise.all([
    sanityFetch<ItineraryPage | null>({ query: ITINERARY_BY_SLUG_QUERY, params: { slug } }),
    sanityFetch<ItinerarySummary[]>({ query: ITINERARIES_QUERY }),
  ]);
  if (!itinerary) notFound();

  const related = allItineraries.filter((i) => i.slug !== itinerary.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-[1000px] px-6 py-28 sm:px-10 sm:py-40">
      <ItineraryJsonLd
        name={itinerary.title}
        description={itinerary.metaDescription}
        image={itinerary.heroImage}
        durationLabel={itinerary.durationLabel}
        days={itinerary.days}
      />

      <MountReveal className="mb-6 flex items-center gap-3">
        <Link href="/itineraries" className="text-[11px] uppercase tracking-[0.28em] text-gold hover:underline">
          Itineraries
        </Link>
        <span className="text-[11px] text-muted">/</span>
        <span className="text-[11px] uppercase tracking-[0.28em] text-muted">{itinerary.durationLabel}</span>
      </MountReveal>

      <MountReveal>
        <h1
          className="m-0 mb-3 font-display font-semibold uppercase leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(28px, 4.4vw, 50px)" }}
        >
          {itinerary.heroTitle}
        </h1>
      </MountReveal>
      <MountReveal delay={0.05}>
        <p className="mb-10 text-lg text-muted">{itinerary.heroDescription}</p>
      </MountReveal>

      <MountReveal delay={0.1} className="mb-12 overflow-hidden rounded-sm">
        <Image
          src={itinerary.heroImage}
          alt={itinerary.title}
          width={1200}
          height={620}
          priority
          className="h-[360px] w-full object-cover sm:h-[480px]"
        />
      </MountReveal>

      <div className="grid gap-12 sm:grid-cols-[1fr_260px]">
        <div>
          <MountReveal delay={0.15}>
            <p className="mb-12 max-w-[60ch] text-[17px] leading-relaxed text-muted">{itinerary.summary}</p>
          </MountReveal>

          <MountReveal delay={0.18}>
            <h2 className="mb-6 font-subheading text-xl font-medium">Day by day</h2>
          </MountReveal>
          <div className="mb-12 flex flex-col gap-8">
            {itinerary.days.map((day, i) => (
              <MountReveal key={day.rangeLabel} delay={0.2 + i * 0.05} className="border-l-2 border-line pl-6">
                <div className="mb-1.5 text-[11px] uppercase tracking-[0.24em] text-gold">{day.rangeLabel}</div>
                <h3 className="m-0 mb-2 font-subheading text-lg font-medium">{day.title}</h3>
                <p className="m-0 text-[15px] leading-relaxed text-muted">{day.description}</p>
                {day.link && (
                  <Link
                    href={day.link.href}
                    className="mt-3 inline-block text-sm text-gold underline underline-offset-2"
                  >
                    {day.link.label}
                  </Link>
                )}
              </MountReveal>
            ))}
          </div>

          {related.length > 0 && (
            <MountReveal delay={0.2}>
              <h2 className="mb-5 font-subheading text-xl font-medium">Other itineraries</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {related.map((it) => (
                  <Link
                    key={it.slug}
                    href={`/itineraries/${it.slug}`}
                    className="group block overflow-hidden rounded-sm border border-line transition-colors hover:border-gold"
                  >
                    <Image
                      src={it.heroImage}
                      alt={it.title}
                      width={400}
                      height={220}
                      className="h-[120px] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                    <div className="p-3">
                      <div className="font-subheading text-sm font-medium">{it.title}</div>
                      <div className="text-xs text-muted">{it.durationLabel}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </MountReveal>
          )}

          {itinerary.relatedJournalPosts && itinerary.relatedJournalPosts.length > 0 && (
            <MountReveal delay={0.25} className="mt-10">
              <h2 className="mb-5 font-subheading text-xl font-medium">From the Journal</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {itinerary.relatedJournalPosts.map((post) => (
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

        {itinerary.idealFor && itinerary.idealFor.length > 0 && (
          <MountReveal delay={0.15}>
            <div className="rounded-sm border border-line p-6">
              <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-gold">Ideal for</div>
              <ul className="flex flex-col gap-2.5 font-data text-sm">
                {itinerary.idealFor.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </MountReveal>
        )}
      </div>

      <div className="mt-20 -mx-6 sm:-mx-10">
        <BookingSection
          division="safaris"
          eyebrow="Plan This Trip"
          headline={["let's build", "your itinerary."]}
          body="Day counts here are a starting framework — tell us your dates and group size on WhatsApp and we'll confirm the exact schedule around the safaris, activities and rentals you want."
        />
      </div>
    </article>
  );
}
