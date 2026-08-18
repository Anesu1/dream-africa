import React from "react";

export const BASE_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://africadreamadventures.co.zw";

export interface SchemaOrgGraphProps {
  currentUrl?: string;
  pageTitle?: string;
  pageDescription?: string;
}

/**
 * Root multi-entity Schema.org @graph combining:
 * 1. Africa Dream Adventures (TravelAgency) - "Where Luxury Meets The Wild"
 * 2. Eden Car Rental (AutoRental) - "Drive Your Journey. Live Your Freedom."
 */
export default function SchemaOrgGraph({
  currentUrl: _currentUrl = BASE_SITE_URL,
  pageTitle: _pageTitle,
  pageDescription: _pageDescription,
}: SchemaOrgGraphProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_SITE_URL}/#website`,
        "url": BASE_SITE_URL,
        "name": "Africa Dream Adventures & Eden Car Rental",
        "description":
          "Premier luxury Victoria Falls safaris, Zambezi river cruises, helicopter flights, and 4x4 safari vehicle rentals in Zimbabwe.",
        "publisher": {
          "@id": `${BASE_SITE_URL}/#travel-agency`,
        },
        "inLanguage": "en-ZW",
      },
      {
        "@type": "TravelAgency",
        "@id": `${BASE_SITE_URL}/#travel-agency`,
        "name": "Africa Dream Adventures",
        "url": BASE_SITE_URL,
        "logo": `${BASE_SITE_URL}/images/africa-dream-logo.png`,
        "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=630&q=80&auto=format&fit=crop",
        "description":
          "Where Luxury Meets The Wild. Premier provider of luxury safaris, private Hwange expeditions, helicopter flights, and Zambezi river cruises in Victoria Falls.",
        "telephone": "+263-78-456-7890",
        "email": "info@africadreamadventures.co.zw",
        "priceRange": "$$$$",
        "currenciesAccepted": "USD",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Victoria Falls Town Center, Livingstone Way",
          "addressLocality": "Victoria Falls",
          "addressRegion": "Matabeleland North",
          "addressCountry": "ZW",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -17.9244,
          "longitude": 25.8357,
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            "opens": "06:00",
            "closes": "21:00",
          },
        ],
        "areaServed": [
          "Victoria Falls",
          "Hwange National Park",
          "Zambezi National Park",
          "Livingstone",
          "Kasane",
          "Chobe National Park",
          "Zimbabwe",
        ],
      },
      {
        "@type": "AutoRental",
        "@id": `${BASE_SITE_URL}/#auto-rental`,
        "name": "Eden Car Rental",
        "url": `${BASE_SITE_URL}/car-rental`,
        "logo": `${BASE_SITE_URL}/images/eden-car-rental-logo.png`,
        "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&h=630&q=80&auto=format&fit=crop",
        "description":
          "Drive Your Journey. Live Your Freedom. Reliable 4x4 safari vehicles, SUVs, and airport car rentals in Victoria Falls with transparent pricing, zero hidden fees, and cross-border permits for Botswana and Zambia.",
        "telephone": "+263-78-456-7890",
        "email": "rentals@africadreamadventures.co.zw",
        "priceRange": "$$",
        "currenciesAccepted": "USD",
        "parentOrganization": {
          "@id": `${BASE_SITE_URL}/#travel-agency`,
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Victoria Falls International Airport (VFA), Terminal Arrival Hall",
          "addressLocality": "Victoria Falls",
          "addressRegion": "Matabeleland North",
          "addressCountry": "ZW",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -17.9244,
          "longitude": 25.8357,
        },
        "areaServed": [
          "Victoria Falls",
          "Victoria Falls International Airport (VFA)",
          "Hwange National Park",
          "Livingstone",
          "Kasane",
          "Chobe",
          "Zimbabwe",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

/**
 * Detailed Tour & Safari Schema
 */
export function TourJsonLd({
  name,
  description,
  url,
  image,
  duration,
  touristType = ["Luxury Travelers", "Wildlife Enthusiasts", "Families"],
}: {
  name: string;
  description: string;
  url: string;
  image: string;
  duration?: string;
  touristType?: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": name,
    "description": description,
    "url": url,
    "image": image,
    "provider": {
      "@type": "TravelAgency",
      "name": "Africa Dream Adventures",
      "url": BASE_SITE_URL,
    },
    ...(duration ? { "duration": duration } : {}),
    "touristType": touristType,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Activity / Tourist Attraction Schema
 */
export function ActivityJsonLd({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": name,
    "description": description,
    "url": url,
    "image": image,
    "isAccessibleForFree": false,
    "touristType": ["Adventure Seekers", "Sightseers", "Luxury Travelers"],
    "provider": {
      "@type": "TravelAgency",
      "name": "Africa Dream Adventures",
      "url": BASE_SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Vehicle / Car Rental Product Schema
 */
export function VehicleJsonLd({
  name,
  description,
  url,
  image,
  category = "4x4 Safari Vehicle",
  specs = [],
}: {
  name: string;
  description: string;
  url: string;
  image: string;
  category?: string;
  specs?: { label: string; value: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Product", "IndividualProduct"],
    "name": `${name} Rental Victoria Falls`,
    "description": description,
    "url": url,
    "image": image,
    "brand": {
      "@type": "Brand",
      "name": "Eden Car Rental",
    },
    "category": category,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "AutoRental",
        "name": "Eden Car Rental",
        "url": `${BASE_SITE_URL}/car-rental`,
      },
    },
    "additionalProperty": specs.map((s) => ({
      "@type": "PropertyValue",
      "name": s.label,
      "value": s.value,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQ Structured Data
 */
export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs || faqs.length === 0) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * HowTo Guide Schema for Cross-Border Car Rentals
 */
export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((s, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": s.name,
      "text": s.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList Structured Data
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; item: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((crumb, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": crumb.name,
      "item": crumb.item.startsWith("http") ? crumb.item : `${BASE_SITE_URL}${crumb.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
