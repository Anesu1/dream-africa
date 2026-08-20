// Upgraded from plain Organization to LocalBusiness now that a real address,
// phone number and production domain are confirmed (see conversation history —
// previously withheld specifically because those weren't verified yet).
// `sameAs` (Tripadvisor, SafariBookings, etc.) stays out until those profiles
// actually exist — same reasoning, just not resolved yet.
export function OrganizationJsonLd({
  name,
  description,
  address,
  telephone,
}: {
  name: string;
  description: string;
  address?: string;
  telephone?: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    areaServed: ["Victoria Falls", "Hwange", "Zambezi", "Zimbabwe"],
    ...(address ? { address } : {}),
    ...(telephone ? { telephone: `+${telephone}` } : {}),
    ...(siteUrl ? { url: siteUrl } : {}),
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

// No Offer/price here deliberately — the page itself doesn't display a rate,
// so structured data shouldn't assert one either.
export function VehicleJsonLd({
  name,
  description,
  image,
  seatingCapacity,
}: {
  name: string;
  description: string;
  image: string;
  seatingCapacity?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Car",
    name,
    description,
    image,
    ...(seatingCapacity ? { vehicleSeatingCapacity: seatingCapacity } : {}),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// No Offer/price here deliberately — tour cards show "Message for rates," not
// a price, so structured data shouldn't assert one either.
export function TourJsonLd({
  name,
  description,
  image,
  duration,
}: {
  name: string;
  description: string;
  image: string;
  duration: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name,
    description,
    image,
    itinerary: { "@type": "ItemList", name: duration },
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
