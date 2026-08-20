import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MountReveal from "@/components/ui/mount-reveal";
import { VehicleJsonLd } from "@/components/seo/json-ld";
import { whatsappLink } from "@/lib/whatsapp";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { VEHICLE_BY_SLUG_QUERY, VEHICLE_SLUGS_QUERY, VEHICLES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings, Vehicle } from "@/sanity/lib/types";

export async function generateStaticParams() {
  // Build-time only — runs outside any request scope, so it can't use sanityFetch
  // (which reads draftMode() via next/headers). Always fetches the published dataset.
  const slugs = await client.fetch<{ slug: string }[]>(VEHICLE_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ vehicle: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vehicle: string }>;
}): Promise<Metadata> {
  const { vehicle: slug } = await params;
  const vehicle = await sanityFetch<Vehicle | null>({ query: VEHICLE_BY_SLUG_QUERY, params: { slug } });
  if (!vehicle) return {};
  return {
    title: `${vehicle.name} Rental in Victoria Falls`,
    description: `Rent the ${vehicle.name} — ${vehicle.subtitle} — from Eden Car Rental in Victoria Falls. ${vehicle.description ?? ""}`.trim(),
    alternates: { canonical: `/rentals/${vehicle.slug}` },
  };
}

export default async function VehiclePage({ params }: { params: Promise<{ vehicle: string }> }) {
  const { vehicle: slug } = await params;
  const [vehicle, allVehicles, siteSettings] = await Promise.all([
    sanityFetch<Vehicle | null>({ query: VEHICLE_BY_SLUG_QUERY, params: { slug } }),
    sanityFetch<Vehicle[]>({ query: VEHICLES_QUERY }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);
  if (!vehicle) notFound();

  const related = allVehicles.filter((v) => v.slug !== vehicle.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-[1000px] px-6 py-28 sm:px-10 sm:py-40">
      <VehicleJsonLd
        name={vehicle.name}
        description={vehicle.description ?? vehicle.subtitle}
        image={vehicle.image}
        seatingCapacity={vehicle.specs.find((s) => s.label === "Seats")?.value}
      />

      <MountReveal className="mb-6 flex items-center gap-3">
        <Link href="/rentals" className="text-[11px] uppercase tracking-[0.28em] text-gold hover:underline">
          Car Rental
        </Link>
        <span className="text-[11px] text-muted">/</span>
        <span className="text-[11px] uppercase tracking-[0.28em] text-muted">{vehicle.category}</span>
      </MountReveal>

      <MountReveal>
        <h1
          className="m-0 mb-3 font-display font-semibold uppercase leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(28px, 4.4vw, 50px)" }}
        >
          {vehicle.name}
        </h1>
      </MountReveal>
      <MountReveal delay={0.05}>
        <p className="mb-10 text-lg text-muted">{vehicle.subtitle}</p>
      </MountReveal>

      <MountReveal delay={0.1} className="mb-12 overflow-hidden rounded-sm">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          width={1200}
          height={620}
          priority
          className="h-[360px] w-full object-cover sm:h-[480px]"
        />
      </MountReveal>

      <div className="grid gap-12 sm:grid-cols-[1fr_260px]">
        <div>
          {vehicle.description && (
            <MountReveal delay={0.15}>
              <p className="mb-10 max-w-[60ch] text-[17px] leading-relaxed text-muted">{vehicle.description}</p>
            </MountReveal>
          )}

          {related.length > 0 && (
            <MountReveal delay={0.2}>
              <h2 className="mb-5 font-subheading text-xl font-medium">Other vehicles in the fleet</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {related.map((v) => (
                  <Link
                    key={v.slug}
                    href={`/rentals/${v.slug}`}
                    className="group block overflow-hidden rounded-sm border border-line transition-colors hover:border-gold"
                  >
                    <Image
                      src={v.image}
                      alt={v.name}
                      width={400}
                      height={220}
                      className="h-[120px] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                    <div className="p-3">
                      <div className="font-subheading text-sm font-medium">{v.name}</div>
                      <div className="text-xs text-muted">{v.category}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </MountReveal>
          )}

          {vehicle.relatedJournalPosts && vehicle.relatedJournalPosts.length > 0 && (
            <MountReveal delay={0.25} className="mt-10">
              <h2 className="mb-5 font-subheading text-xl font-medium">From the Journal</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {vehicle.relatedJournalPosts.map((post) => (
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
            <div className="mb-5 grid grid-cols-2 gap-4 font-data">
              {vehicle.specs.map((spec) => (
                <div key={spec.label}>
                  <div className="text-[9px] uppercase tracking-[0.14em] text-muted">{spec.label}</div>
                  <div className="mt-1 text-sm font-medium">{spec.value}</div>
                </div>
              ))}
            </div>
            <a
              href={whatsappLink(siteSettings.whatsapp, `Hi, I'd like to reserve the ${vehicle.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-gold px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-paper"
            >
              Reserve on WhatsApp
            </a>
          </div>
        </MountReveal>
      </div>
    </article>
  );
}
