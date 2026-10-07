import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PortableText from "@/components/ui/portable-text";
import MountReveal from "@/components/ui/mount-reveal";
import Reveal from "@/components/ui/reveal";
import BookingSection from "@/components/sections/booking-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { JOURNAL_POST_BY_SLUG_QUERY, JOURNAL_POST_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { JournalPost } from "@/sanity/lib/types";

export async function generateStaticParams() {
  // Build-time only — runs outside any request scope, so it can't use sanityFetch
  // (which reads draftMode() via next/headers). Always fetches the published dataset.
  const slugs = await client.fetch<{ slug: string }[]>(JOURNAL_POST_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<JournalPost | null>({ query: JOURNAL_POST_BY_SLUG_QUERY, params: { slug } });
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: post.image, width: 1200, height: 500, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await sanityFetch<JournalPost | null>({ query: JOURNAL_POST_BY_SLUG_QUERY, params: { slug } });
  if (!post) notFound();

  const bookingDivision =
    post.category?.toLowerCase().includes("rental") || post.category?.toLowerCase().includes("car") || post.category?.toLowerCase().includes("4x4")
      ? "rentals"
      : post.category?.toLowerCase().includes("safari") || post.category?.toLowerCase().includes("chobe") || post.category?.toLowerCase().includes("hwange")
        ? "safaris"
        : post.category?.toLowerCase().includes("activit") || post.category?.toLowerCase().includes("boat") || post.category?.toLowerCase().includes("adven")
          ? "activities"
          : "general";

  const updatedLabel = new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ label: "Home", href: "/" }, { label: "Journal", href: "/journal" }, { label: post.title, href: `/journal/${post.slug}` }]}
      />
      <article className="mx-auto max-w-[820px] px-6 py-28 sm:px-10 sm:py-40">
        <MountReveal className="mb-6 flex items-center gap-3">
          <Link href="/journal" className="text-[11px] uppercase tracking-[0.28em] text-gold hover:underline">
            Journal
          </Link>
          <span className="text-[11px] text-muted">/</span>
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted">{post.category}</span>
        </MountReveal>
        <MountReveal>
          <h1
            className="m-0 mb-3 font-display font-semibold uppercase leading-[1.15] tracking-tight"
            style={{ fontSize: "clamp(26px, 4vw, 46px)" }}
          >
            {post.title}
          </h1>
        </MountReveal>
        <MountReveal delay={0.05} className="mb-10">
          <span className="text-xs uppercase tracking-[0.14em] text-muted">Updated {updatedLabel}</span>
        </MountReveal>
        <Reveal className="mb-12 overflow-hidden rounded-sm">
          <Image src={post.image} alt={post.title} width={1200} height={500} className="h-[360px] w-full object-cover sm:h-[460px]" />
        </Reveal>
        <Reveal>
          <div className="max-w-2xl text-lg leading-relaxed text-muted text-pretty [&_p]:mb-6">
            <PortableText value={post.body} />
          </div>
        </Reveal>

        {post.primaryCta && (
          <Reveal className="mt-12 rounded-sm border border-line bg-off-white p-6 sm:p-8">
            <Link
              href={post.primaryCta.href}
              className="inline-block rounded-full bg-gold px-7 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {post.primaryCta.label}
            </Link>
          </Reveal>
        )}

        <Reveal className="mt-12 border-t border-line pt-8">
          <Link href="/journal" className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            ← Back to the Journal
          </Link>
        </Reveal>
      </article>

      <BookingSection
        division={bookingDivision}
        eyebrow="Plan Your Victoria Falls Adventure"
        headline={["Ready to start", "planning your trip?"]}
        body="Whether you need 4x4 vehicle rental, private safari game drives, or adrenaline activity bookings, our team is on the ground in Victoria Falls to confirm your itinerary."
      />
    </>
  );
}
