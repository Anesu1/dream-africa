import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/reveal";
import MagneticButton from "@/components/ui/magnetic-button";
import CrossSellCard from "@/components/ui/cross-sell-card";
import { VehicleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { VEHICLES, getVehicleDetails } from "@/lib/data/vehicles";
import { whatsappLink } from "@/lib/whatsapp";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

type Props = {
  params: Promise<{ vehicle: string }>;
};

export async function generateStaticParams() {
  return VEHICLES.map((v) => ({ vehicle: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vehicle } = await params;
  const vehicleData = await getVehicleDetails(vehicle);

  if (!vehicleData) {
    return { title: "Vehicle Rental | Eden Car Rental Victoria Falls" };
  }

  const canonicalUrl = `/car-rental/${vehicleData.slug}`;

  return {
    title: `${vehicleData.name} Rental Victoria Falls | Eden Car Rental`,
    description: `Rent a fully insured ${vehicleData.name} in Victoria Falls. Ideal for self-drive safaris to Hwange & Chobe. Airport pickup available with zero hidden fees.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${vehicleData.name} Hire Victoria Falls - Eden Car Rental`,
      description: vehicleData.summary,
      url: `https://africadreamadventures.co.zw${canonicalUrl}`,
      siteName: "Eden Car Rental",
      images: [
        {
          url: vehicleData.image,
          width: 1200,
          height: 630,
          alt: `Eden Car Rental - ${vehicleData.name}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${vehicleData.name} Rental | Victoria Falls 4x4`,
      description: `Book your ${vehicleData.name} for self-drive safaris in Zimbabwe & Botswana.`,
      images: [vehicleData.image],
    },
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const { vehicle } = await params;
  const [vehicleData, siteSettings] = await Promise.all([
    getVehicleDetails(vehicle),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);

  if (!vehicleData) notFound();

  const vehicleUrl = `https://africadreamadventures.co.zw/car-rental/${vehicleData.slug}`;

  return (
    <>
      <VehicleJsonLd
        name={vehicleData.name}
        description={vehicleData.description}
        url={vehicleUrl}
        image={vehicleData.image}
        category={vehicleData.category}
        specs={vehicleData.specs}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Car Rental", item: "/car-rental" },
          { name: vehicleData.name, item: `/car-rental/${vehicleData.slug}` },
        ]}
      />

      <article className="min-h-screen bg-[#0D1117] pb-24 pt-28 text-white sm:pt-36">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
          <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            <Link href="/car-rental" className="hover:text-gold">
              Car Rental
            </Link>
            <span>/</span>
            <span className="text-gold">{vehicleData.category}</span>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                  <span>Eden Car Rental</span>
                  <span>•</span>
                  <span>Victoria Falls Airport Hub</span>
                </div>

                <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl text-white">
                  {vehicleData.name}
                </h1>

                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
                  {vehicleData.subtitle}
                </p>
              </Reveal>

              <Reveal className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
                <span className="rounded-full bg-slate-800 border border-slate-700 px-3.5 py-1.5">
                  ⚙️ {vehicleData.transmission}
                </span>
                <span className="rounded-full bg-slate-800 border border-slate-700 px-3.5 py-1.5">
                  👥 {vehicleData.passengers} Seats
                </span>
                <span className="rounded-full bg-slate-800 border border-slate-700 px-3.5 py-1.5">
                  ⛽ {vehicleData.fuelType}
                </span>
                {vehicleData.crossBorderEligible && (
                  <span className="rounded-full bg-blue-900/60 border border-blue-600/50 text-blue-200 px-3.5 py-1.5">
                    🛂 Botswana & Zambia Ready
                  </span>
                )}
              </Reveal>

              <Reveal className="my-8 overflow-hidden rounded-xl border border-slate-800 shadow-2xl">
                <Image
                  src={vehicleData.image}
                  alt={vehicleData.name}
                  width={1200}
                  height={675}
                  priority
                  className="h-[380px] w-full object-cover sm:h-[500px]"
                />
              </Reveal>

              <Reveal className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed">
                <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-white">
                  Vehicle Overview & Terrain Capabilities
                </h2>
                <p className="mt-3 text-base sm:text-lg">{vehicleData.description}</p>
              </Reveal>

              {/* Key Features Requested by User */}
              <Reveal className="mt-10 rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-white mb-4">
                  Key Rental Features & Inclusions
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <span className="text-emerald-400">✔</span>
                    <span>Unlimited Mileage Options Available</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-emerald-400">✔</span>
                    <span>Full Cross-Border Paperwork (Botswana & Zambia)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-emerald-400">✔</span>
                    <span>Comprehensive Insurance with Gravel Road CDW</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-emerald-400">✔</span>
                    <span>Instant WhatsApp Booking Confirmation</span>
                  </div>
                </div>
              </Reveal>

              {/* Technical Specifications Grid */}
              <Reveal className="mt-10 rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-white mb-6">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {vehicleData.specs.map((s, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border-b border-slate-800 pb-3 text-sm"
                    >
                      <span className="text-slate-400">{s.label}</span>
                      <span className="font-semibold text-white">{s.value}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Insurance Policy */}
              <Reveal className="mt-10 rounded-xl border border-gold/30 bg-gold/5 p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-gold mb-3">
                  🛡 Transparent Insurance & Unpaved Road Coverage
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">{vehicleData.insurancePolicy}</p>
              </Reveal>

              <CrossSellCard
                type="rental-to-safari"
                customHeadline="Add a Helicopter Flight of Angels or Zambezi Sunset Cruise to your trip and save 10%!"
                customBody="Pair your vehicle hire with an unforgettable Victoria Falls helicopter 'Flight of Angels' or a private Zambezi luxury sunset dinner cruise. Enjoy bundle savings and seamless logistics."
              />
            </div>

            {/* Sidebar Sticky Inquire Card */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl">
                <div className="mb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Daily Rental Rates</span>
                  <div className="mt-1 font-display text-2xl font-bold text-gold">
                    Inquire for Daily Rates
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Zero hidden fees • Airport delivery included</p>
                </div>

                <div className="border-t border-slate-800 my-5 pt-5 space-y-3 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pickup Location</span>
                    <span className="font-semibold text-white">Victoria Falls Airport (VFA)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cross-Border</span>
                    <span className="font-semibold text-emerald-400">
                      {vehicleData.crossBorderEligible ? "Available (Botswana/Zambia)" : "Zimbabwe Domestic"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mileage</span>
                    <span className="font-semibold text-white">Unlimited Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Booking Status</span>
                    <span className="font-semibold text-white">Instant WhatsApp Confirmation</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={whatsappLink(
                      siteSettings?.whatsapp,
                      `Hi Eden Car Rental, I would like to check daily rates and availability for the "${vehicleData.name}".`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <MagneticButton className="w-full rounded-full bg-gold py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-950 shadow-lg transition-all hover:bg-white hover:text-slate-900">
                      Check Rates on WhatsApp Now
                    </MagneticButton>
                  </a>

                  <Link
                    href="/car-rental"
                    className="text-center text-xs uppercase tracking-[0.16em] text-slate-400 hover:text-gold pt-2"
                  >
                    ← Back to Vehicle Fleet
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
