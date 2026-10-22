import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingSection from "@/components/sections/booking-section";
import MountReveal from "@/components/ui/mount-reveal";
import { BreadcrumbJsonLd, FaqJsonLd, TourJsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/site";
import { tripQuoteMessage, whatsappLink } from "@/lib/whatsapp";
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

// Images are served unoptimized (see next.config), so ask the Sanity CDN for the size each slot needs
// instead of downloading the full original everywhere.
function sized(url: string, params: string) {
  return `${url}?${params}&auto=format`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tour: string }>;
}): Promise<Metadata> {
  const { tour: slug } = await params;
  const tour = await sanityFetch<Tour | null>({ query: TOUR_BY_SLUG_QUERY, params: { slug } });
  if (!tour) return {};
  const title = `${tour.title} from Victoria Falls`;
  const socialImage = sized(tour.image, "w=1200&h=630&fit=crop");
  return {
    title,
    description: tour.description,
    alternates: { canonical: `/safaris/${tour.slug}` },
    openGraph: {
      title,
      description: tour.description,
      url: `/safaris/${tour.slug}`,
      images: [{ url: socialImage, width: 1200, height: 630, alt: tour.imageAlt ?? title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: tour.description,
      images: [socialImage],
    },
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
  const tripName = `${tour.title} from Victoria Falls`;
  const pageUrl = `${SITE_URL}/safaris/${tour.slug}`;
  const hasItinerary = Boolean(tour.itinerarySteps && tour.itinerarySteps.length > 0);
  // Border tours need nationalities up front — entry and re-entry documents depend on them.
  const crossesBorder = tour.slug === "chobe-day-trip";

  return (
    <>
      <article className="mx-auto max-w-[1000px] px-6 py-28 sm:px-10 sm:py-40">
        <TourJsonLd
          name={tour.title}
          description={tour.description}
          image={tour.image}
          url={pageUrl}
          providerName={siteSettings.name}
          steps={tour.itinerarySteps?.map((step) => step.title)}
        />
        {tour.faqs && tour.faqs.length > 0 && <FaqJsonLd faqs={tour.faqs} />}
        <BreadcrumbJsonLd items={[{ label: "Home", href: "/" }, { label: "Safaris", href: "/safaris" }, { label: tour.title, href: `/safaris/${tour.slug}` }]} />

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
            {tripName}
          </h1>
        </MountReveal>
        <MountReveal delay={0.05}>
          <p className="mb-10 text-lg text-muted">{tour.duration}</p>
        </MountReveal>

        <MountReveal delay={0.1} className="mb-12 overflow-hidden rounded-sm">
          <Image
            src={sized(tour.image, "w=1400")}
            alt={tour.imageAlt ?? tripName}
            width={1200}
            height={620}
            priority
            className="h-[360px] w-full object-cover sm:h-[480px]"
          />
        </MountReveal>

        <div className="grid gap-12 sm:grid-cols-[1fr_260px]">
          <div>
            <MountReveal delay={0.15} className="mb-10">
              <p className="mb-8 max-w-[60ch] text-[17px] leading-relaxed text-muted">{tour.description}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#enquire"
                  className="rounded-full bg-gold px-7 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  Enquire About This Trip
                </a>
                {hasItinerary && (
                  <a
                    href="#itinerary"
                    className="rounded-full border border-ink/25 px-7 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-gold hover:text-gold"
                  >
                    View the Itinerary
                  </a>
                )}
              </div>
            </MountReveal>

            {tour.summary && tour.summary.length > 0 && (
              <MountReveal delay={0.16} className="mb-12">
                <h2 className="mb-5 font-subheading text-xl font-medium">Trip summary</h2>
                <dl className="m-0 grid grid-cols-1 gap-x-8 gap-y-5 rounded-sm border border-line p-6 sm:grid-cols-2">
                  {tour.summary.map((fact) => (
                    <div key={fact.label}>
                      <dt className="mb-1 text-[11px] uppercase tracking-[0.2em] text-gold">{fact.label}</dt>
                      <dd className="m-0 text-sm leading-relaxed text-muted">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </MountReveal>
            )}

            {hasItinerary && (
              <MountReveal delay={0.17} className="mb-12">
                <section id="itinerary" className="scroll-mt-28">
                  <h2 className="mb-2 font-subheading text-xl font-medium">How the day runs</h2>
                  <p className="mb-6 text-sm text-muted">Timings are a guide and are confirmed with your booking.</p>
                  <ol className="m-0 flex list-none flex-col gap-6 p-0">
                    {tour.itinerarySteps!.map((step, i) => (
                      <li key={`${i}-${step.title}`} className="border-l-2 border-line pl-6">
                        <div className="mb-1.5 text-[11px] uppercase tracking-[0.24em] text-gold">{step.rangeLabel}</div>
                        <h3 className="m-0 mb-1.5 font-subheading text-base font-medium">{step.title}</h3>
                        <p className="m-0 text-sm leading-relaxed text-muted">{step.description}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              </MountReveal>
            )}

            {tour.slug === "hwange-big-five" && (
              <MountReveal delay={0.18} className="mb-10 rounded-sm border border-line bg-off-white p-6">
                <p className="m-0 text-[15px] leading-relaxed">
                  <span className="font-subheading text-lg font-medium">Rather explore Hwange yourself?</span>
                  <br />
                  Our 4x4 fleet is built for exactly this route —{" "}
                  <Link href="/car-rental-victoria-falls" className="text-gold underline underline-offset-2">
                    see the self-drive vehicles
                  </Link>
                  .
                </p>
              </MountReveal>
            )}

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
                        src={sized(t.image, "w=600&h=330&fit=crop")}
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

            {tour.faqs && tour.faqs.length > 0 && (
              <MountReveal delay={0.22} className="mt-10">
                <h2 className="mb-5 font-subheading text-xl font-medium">Frequently asked questions</h2>
                <div className="flex flex-col gap-5">
                  {tour.faqs.map((faq) => (
                    <div key={faq.question} className="border-b border-line pb-5">
                      <h3 className="m-0 mb-1.5 font-subheading text-sm font-medium">{faq.question}</h3>
                      <p className="m-0 text-sm leading-relaxed text-muted">{faq.answer}</p>
                    </div>
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
                        src={sized(post.image, "w=240&h=240&fit=crop")}
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
              <p className="mb-3 text-sm leading-relaxed text-muted">
                Send your preferred travel date, number of travellers and pickup location so we can confirm availability
                and provide a quote.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Ask us to confirm which fees and charges are included in your quote.
              </p>
              <a href="#enquire" className="block w-full rounded-full bg-gold px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-paper">
                Enquire About This Trip
              </a>
              <a
                href={whatsappLink(siteSettings.whatsapp, tripQuoteMessage(tripName, pageUrl))}
                target="_blank"
                rel="noopener noreferrer"
                data-wa-location="tour_sidebar"
                className="mt-3 block w-full rounded-full border border-gold px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                Ask on WhatsApp
              </a>
              <p className="m-0 mt-4 text-xs text-muted">
                Planning more than this trip?{" "}
                <Link href="/#contact" className="text-gold underline underline-offset-2">
                  Contact us
                </Link>
              </p>
            </div>
          </MountReveal>
        </div>
      </article>
      <BookingSection
        id="enquire"
        division="safaris"
        item={tripName}
        eyebrow="Enquire about this trip"
        headline={["Check availability", "and get a quote."]}
        body="Send your preferred travel date, number of travellers and pickup location so we can confirm availability and provide a quote. Ask us to confirm which fees and charges are included."
        whatsapp={siteSettings.whatsapp}
        pageUrl={pageUrl}
        messagePlaceholder={
          crossesBorder
            ? "Nationalities in your group (entry documents depend on them), and any questions"
            : "Any questions or requirements"
        }
      />
    </>
  );
}
