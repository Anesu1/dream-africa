import { draftMode } from "next/headers";
import VisualEditing from "@/components/providers/visual-editing";
import SmoothScroll from "@/components/providers/smooth-scroll";
import Cursor from "@/components/providers/cursor";
import LoadingScreen from "@/components/providers/loading-screen";
import PageTransition from "@/components/providers/page-transition";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const isDraftMode = (await draftMode()).isEnabled;
  const siteSettings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY });

  return (
    <>
      <OrganizationJsonLd name={siteSettings.name} description={siteSettings.tagline} />
      <LoadingScreen siteSettings={siteSettings} />
      <Cursor />
      <SmoothScroll>
        <Navbar siteSettings={siteSettings} />
        <PageTransition>{children}</PageTransition>
        <Footer siteSettings={siteSettings} />
      </SmoothScroll>
      {isDraftMode && (
        <>
          <VisualEditing />
          <a
            href="/api/draft-mode/disable"
            className="fixed bottom-4 left-4 z-[10001] rounded-full bg-gold px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink shadow-lg"
          >
            Exit preview
          </a>
        </>
      )}
    </>
  );
}
