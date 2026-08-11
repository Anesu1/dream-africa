import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PortableText from "@/components/ui/portable-text";
import Reveal from "@/components/ui/reveal";
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
  };
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await sanityFetch<JournalPost | null>({ query: JOURNAL_POST_BY_SLUG_QUERY, params: { slug } });
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[820px] px-6 py-28 sm:px-10 sm:py-40">
      <Reveal className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">{post.category}</Reveal>
      <Reveal>
        <h1
          className="m-0 mb-10 font-display font-semibold uppercase leading-[1.15] tracking-tight"
          style={{ fontSize: "clamp(26px, 4vw, 46px)" }}
        >
          {post.title}
        </h1>
      </Reveal>
      <Reveal className="mb-12 overflow-hidden rounded-sm">
        <Image src={post.image} alt={post.title} width={1200} height={500} className="h-[360px] w-full object-cover sm:h-[460px]" />
      </Reveal>
      <Reveal>
        <div className="max-w-2xl text-lg leading-relaxed text-muted text-pretty [&_p]:mb-6">
          <PortableText value={post.body} />
        </div>
      </Reveal>
      <Reveal className="mt-12 border-t border-line pt-8">
        <Link href="/journal" className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          ← Back to the Journal
        </Link>
      </Reveal>
    </article>
  );
}
