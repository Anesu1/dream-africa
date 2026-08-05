export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dream Africa",
    description:
      "Luxury Victoria Falls safaris and premium vehicle rental across Zimbabwe, operating as one company through two divisions.",
    areaServed: ["Victoria Falls", "Hwange", "Zambezi", "Zimbabwe"],
    // Address, telephone and sameAs (social profiles) are intentionally omitted until
    // real, verified contact details and domain are available — publishing placeholder
    // or invented business data here would mislead real search users.
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function TravelAgencyJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Dream Africa Safaris",
    description:
      "Private guided safari expeditions through Victoria Falls, Hwange and the Zambezi — game drives, canoe trails, walking safaris and boutique camps.",
    areaServed: ["Victoria Falls", "Hwange National Park", "Zambezi", "Zimbabwe"],
    parentOrganization: { "@type": "Organization", name: "Dream Africa" },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function AutoRentalJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: "Eden Car Rental",
    description:
      "Self-drive, chauffeured and airport-transfer vehicle rental across Victoria Falls and Zimbabwe — 4x4 SUVs, executive sedans and rugged expedition vehicles.",
    areaServed: ["Victoria Falls", "Harare", "Zimbabwe"],
    parentOrganization: { "@type": "Organization", name: "Dream Africa" },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
