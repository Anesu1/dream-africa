export {
  default as SchemaOrgGraph,
  BASE_SITE_URL,
  TourJsonLd,
  ActivityJsonLd,
  VehicleJsonLd,
  FaqJsonLd,
  HowToJsonLd,
  BreadcrumbJsonLd,
} from "./JsonLd";

export function OrganizationJsonLd({ name, description }: { name: string; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://africadreamadventures.co.zw",
    areaServed: ["Victoria Falls", "Hwange", "Zambezi", "Livingstone", "Chobe", "Zimbabwe"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Victoria Falls Town Center",
      addressLocality: "Victoria Falls",
      addressCountry: "ZW",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function TravelAgencyJsonLd({ parentName }: { parentName: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: `${parentName} Safaris`,
    description:
      "Private guided safari expeditions through Victoria Falls, Hwange and the Zambezi — game drives, canoe trails, walking safaris and boutique camps.",
    areaServed: ["Victoria Falls", "Hwange National Park", "Zambezi", "Zimbabwe"],
    parentOrganization: { "@type": "Organization", name: parentName },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ActivitiesJsonLd({ parentName }: { parentName: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: `${parentName} Activities`,
    description:
      "Victoria Falls adventure activities and tour bookings — bungee jumping, white-water rafting, jetboat, scenic flights, river cruises and cultural experiences.",
    areaServed: ["Victoria Falls", "Zambezi", "Zimbabwe"],
    parentOrganization: { "@type": "Organization", name: parentName },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function AutoRentalJsonLd({ parentName }: { parentName: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: "Eden Car Rental",
    description:
      "Self-drive, chauffeured and airport-transfer vehicle rental across Victoria Falls and Zimbabwe — 4x4 SUVs, executive sedans and rugged expedition vehicles.",
    areaServed: ["Victoria Falls", "Harare", "Zimbabwe", "Hwange", "Livingstone", "Kasane"],
    parentOrganization: { "@type": "Organization", name: parentName },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
