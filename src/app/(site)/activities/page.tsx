import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SafariHero from "@/components/sections/safari/hero";
import Combos from "@/components/sections/activities/combos";
import Packages from "@/components/sections/activities/packages";
import PriceList from "@/components/sections/activities/price-list";
import ActivitiesCta from "@/components/sections/activities/cta";
import MountReveal from "@/components/ui/mount-reveal";
import { ActivitiesJsonLd } from "@/components/seo/json-ld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ACTIVITIES_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { ActivitiesPageSettings, SiteSettings } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Things to Do in Victoria Falls — Adventure Activities",
  description:
    "Bungee jumping, white-water rafting, jet boat, scenic flights, river cruises and cultural experiences at Victoria Falls — combo deals and discounted packages, message us for current rates.",
  keywords: [
    "Victoria Falls helicopter flight of angels",
    "Zambezi luxury sunset dinner cruise",
    "Batoka gorge white water rafting",
    "Victoria Falls bridge bungee jump",
    "Victoria Falls jet boat",
    "best things to do in Victoria Falls",
    "Victoria Falls adventure activities",
  ],
  alternates: { canonical: "/activities" },
};

export default async function ActivitiesPage() {
  const [activitiesPage, siteSettings] = await Promise.all([
    sanityFetch<ActivitiesPageSettings>({ query: ACTIVITIES_PAGE_QUERY }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);

  return (
    <>
      <ActivitiesJsonLd parentName={siteSettings.name} />
      <SafariHero
        eyebrow={activitiesPage.heroEyebrow}
        title={activitiesPage.heroTitle}
        description={activitiesPage.heroDescription}
        image={activitiesPage.heroImage}
      />
      <Combos combos={activitiesPage.specialCombos} />
      <Packages tiers={activitiesPage.packageTiers} />
      <PriceList categories={activitiesPage.categories} disclaimer={activitiesPage.disclaimer} />

      {activitiesPage.relatedJournalPosts && activitiesPage.relatedJournalPosts.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-6 pb-20 sm:px-10">
          <MountReveal>
            <h2 className="mb-5 font-subheading text-xl font-medium">From the Journal</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {activitiesPage.relatedJournalPosts.map((post) => (
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
        </section>
      )}

      <ActivitiesCta whatsapp={siteSettings.whatsapp} />
    </>
  );
}
