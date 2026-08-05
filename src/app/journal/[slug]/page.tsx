import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/reveal";
import { JOURNAL_POSTS } from "@/lib/content";

export function generateStaticParams() {
  return JOURNAL_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
  };
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);
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
      {post.body.map((paragraph, i) => (
        <Reveal key={i} delay={i * 0.05}>
          <p className="mb-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{paragraph}</p>
        </Reveal>
      ))}
      <Reveal className="mt-12 border-t border-line pt-8">
        <Link href="/journal" className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          ← Back to the Journal
        </Link>
      </Reveal>
    </article>
  );
}
