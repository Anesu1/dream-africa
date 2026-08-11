export function OrganizationJsonLd({ name, description }: { name: string; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    areaServed: ["Victoria Falls", "Hwange", "Zambezi", "Zimbabwe"],
    // Address, telephone and sameAs (social profiles) are intentionally omitted until
    // real, verified contact details and domain are available — publishing placeholder
    // or invented business data here would mislead real search users.
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

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
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
    areaServed: ["Victoria Falls", "Harare", "Zimbabwe"],
    parentOrganization: { "@type": "Organization", name: parentName },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
