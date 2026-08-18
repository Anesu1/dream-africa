import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/reveal";
import MagneticButton from "@/components/ui/magnetic-button";
import CrossSellCard from "@/components/ui/cross-sell-card";
import { ActivityJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { whatsappLink } from "@/lib/whatsapp";
import { ACTIVITIES, type ActivityItem } from "@/lib/data/activities";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getActivityData(slug: string): Promise<ActivityItem | null> {
  const match = ACTIVITIES.find((a) => a.slug === slug);
  return match || null;
}

export async function generateStaticParams() {
  return ACTIVITIES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = await getActivityData(slug);
  if (!activity) return { title: "Victoria Falls Activity | Africa Dream Adventures" };

  const pageTitle = `${activity.title} | Africa Dream Adventures`;
  const pageDescription = `${activity.description} Guaranteed best price, certified safety standards, and instant confirmation in Victoria Falls.`;
  const canonicalUrl = `/activities/${activity.slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://africadreamadventures.co.zw${canonicalUrl}`,
      siteName: "Africa Dream Adventures",
      type: "website",
      images: [
        {
          url: activity.image,
          width: 1200,
          height: 630,
          alt: activity.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [activity.image],
    },
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  const [activity, siteSettings] = await Promise.all([
    getActivityData(slug),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);

  if (!activity) notFound();

  const activityUrl = `https://africadreamadventures.co.zw/activities/${activity.slug}`;

  return (
    <>
      <ActivityJsonLd
        name={activity.title}
        description={activity.description}
        url={activityUrl}
        image={activity.image}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Activities", item: "/activities" },
          { name: activity.title, item: `/activities/${activity.slug}` },
        ]}
      />

      <article className="min-h-screen bg-paper pb-24 pt-28 text-ink sm:pt-36">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
          <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
            <Link href="/activities" className="hover:underline">
              Activities
            </Link>
            <span>/</span>
            <span>{activity.category}</span>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <Reveal>
                <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl text-ink">
                  {activity.title}
                </h1>
              </Reveal>

              <Reveal className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                <span className="rounded-full bg-off-white px-3.5 py-1.5 border border-line">
                  ⏱ Duration: {activity.duration}
                </span>
                <span className="rounded-full bg-off-white px-3.5 py-1.5 border border-line">
                  🛡 Safety Code Certified
                </span>
                <span className="rounded-full bg-gold/15 text-gold px-3.5 py-1.5 border border-gold/30">
                  ⚡ Best Price Guaranteed
                </span>
              </Reveal>

              <Reveal className="my-8 overflow-hidden rounded-xl shadow-xl">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  width={1200}
                  height={675}
                  priority
                  className="h-[380px] w-full object-cover sm:h-[500px]"
                />
              </Reveal>

              <Reveal className="prose prose-lg max-w-none text-muted leading-relaxed">
                <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-ink">
                  Experience Description
                </h2>
                <p className="mt-3 text-base sm:text-lg">{activity.overview}</p>
              </Reveal>

              <Reveal className="mt-10 rounded-xl border border-line bg-off-white p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
                  Key Experience Features
                </h3>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {activity.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gold flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-line bg-paper p-6 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-3">
                    ⏰ Departure Slots
                  </h4>
                  <ul className="space-y-2 text-sm text-muted">
                    {activity.departureTimes.map((time, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span>•</span> {time}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-line bg-paper p-6 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-3">
                    🛡 Safety Standards
                  </h4>
                  <p className="text-xs leading-relaxed text-muted">{activity.safetyInfo}</p>
                </div>
              </Reveal>

              <Reveal className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-6 dark:bg-emerald-950/10">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-400 mb-3">
                  ✓ What is Included in Your Ticket
                </h4>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-muted">
                  {activity.whatsIncluded.map((inc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-emerald-600">✔</span> {inc}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <CrossSellCard
                type="safari-to-rental"
                customHeadline="Need ground mobility? Rent an Eden Car Rental SUV directly at the airport."
                customBody="Take full control of your Zimbabwe and Botswana itinerary. Rent a safari-ready Toyota Hilux 4x4 or luxury SUV with optional rooftop tents, GPS tracking, and complete gravel-road CDW insurance. Free terminal pickup at Victoria Falls (VFA) with zero hidden fees."
              />
            </div>

            {/* Sticky Booking Column */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 rounded-2xl border border-line bg-paper p-6 sm:p-8 shadow-xl">
                <div className="mb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">Ticket Rate</span>
                  <div className="mt-1 font-display text-2xl font-bold text-ink">
                    Inquire for Best Rates
                  </div>
                  <p className="text-xs text-muted mt-1">Best Price Guarantee • Instant Voucher</p>
                </div>

                <div className="border-t border-line my-5 pt-5 space-y-3 text-xs text-muted">
                  <div className="flex justify-between">
                    <span>Category</span>
                    <span className="font-semibold text-ink">{activity.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hotel Transfers</span>
                    <span className="font-semibold text-emerald-600">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Confirmation</span>
                    <span className="font-semibold text-ink">Instant Voucher</span>
                  </div>
                  <div className="flex justify-between">
                    <span>National Park Fees</span>
                    <span className="font-semibold text-ink">Disclosed Clearly</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={whatsappLink(
                      siteSettings?.whatsapp,
                      `Hi Africa Dream Adventures, I would like to reserve "${activity.title}". Please share current rates and available time slots.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <MagneticButton className="w-full rounded-full bg-gold py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-ink shadow-md transition-all hover:bg-ink hover:text-paper">
                      Book on WhatsApp
                    </MagneticButton>
                  </a>

                  <Link href="/activities" className="text-center text-xs uppercase tracking-[0.16em] text-muted hover:text-gold pt-2">
                    ← Back to All Activities
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
