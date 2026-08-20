import type { Metadata } from "next";
import SafariHero from "@/components/sections/safari/hero";
import Combos from "@/components/sections/activities/combos";
import Packages from "@/components/sections/activities/packages";
import PriceList from "@/components/sections/activities/price-list";
import ActivitiesCta from "@/components/sections/activities/cta";
import { ActivitiesJsonLd } from "@/components/seo/json-ld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ACTIVITIES_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { ActivitiesPageSettings, SiteSettings } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Things to Do in Victoria Falls — Adventure Activities",
  description:
    "Bungee jumping, white-water rafting, jetboat, scenic flights, river cruises and cultural experiences at Victoria Falls — combo deals and discounted packages, message us for current rates.",
  keywords: [
    "Victoria Falls helicopter flight of angels",
    "Zambezi luxury sunset dinner cruise",
    "Batoka gorge white water rafting",
    "Victoria Falls bridge bungee jump",
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
      <ActivitiesCta whatsapp={siteSettings.whatsapp} />
    </>
  );
}
