import type { Metadata } from "next";
import Link from "next/link";
import MountReveal from "@/components/ui/mount-reveal";
import Reveal from "@/components/ui/reveal";
import BookingSection from "@/components/sections/booking-section";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { sanityFetch } from "@/sanity/lib/fetch";
import { VEHICLES_QUERY } from "@/sanity/lib/queries";
import type { Vehicle } from "@/sanity/lib/types";

// Road advice on this page comes from two official sources (linked on the page), checked
// 17 Nov 2026. Rental requirements come from the car rental page's CMS FAQs. Nothing here
// states a price, a speed limit or a required-equipment list: none of those is confirmed.
const FCDO_URL = "https://www.gov.uk/foreign-travel-advice/zimbabwe/safety-and-security";
const CANADA_URL = "https://travel.gc.ca/destinations/zimbabwe";

export const metadata: Metadata = {
  title: "Driving in Zimbabwe: Road Tips",
  description:
    "Driving a hire car in Zimbabwe? Keep left, stop at every police roadblock, avoid driving after dark and fill up when you can. Tips for Victoria Falls visitors.",
  alternates: { canonical: "/driving-in-zimbabwe" },
};

const FAQS = [
  {
    question: "Which side of the road do you drive on in Zimbabwe?",
    answer:
      "The left. Traffic in Zimbabwe drives on the left, according to the Government of Canada's travel advice for Zimbabwe.",
  },
  {
    question: "What should I do at a police roadblock in Zimbabwe?",
    answer:
      "Slow down and stop, even if the roadblock looks unattended, and cooperate with the officers. If you are fined, ask for a ticket or an official receipt: Canada's travel advice says on-the-spot fines are illegal in Zimbabwe.",
  },
  {
    question: "Is it safe to drive at night in Zimbabwe?",
    answer:
      "Official travel advice from the UK and Canada says to avoid it, especially outside the main towns. Most roads have no street lights, and pedestrians, animals and vehicles without working lights are hard to see after dark.",
  },
  {
    question: "Do I need an International Driving Permit to drive in Zimbabwe?",
    answer:
      "To rent from us, your licence must have been held for two years and be in English, or come with an international driving permit. Canada's travel advice recommends carrying an International Driving Permit anyway, so it is worth getting one before you travel.",
  },
];

export default async function DrivingInZimbabwePage() {
  const vehicles = await sanityFetch<Vehicle[]>({ query: VEHICLES_QUERY });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Car Rental", href: "/car-rental-victoria-falls" },
          { label: "Driving in Zimbabwe", href: "/driving-in-zimbabwe" },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      <article className="mx-auto max-w-[900px] px-6 py-28 sm:px-10 sm:py-36">
        <MountReveal className="mb-6 flex items-center gap-3">
          <Link
            href="/car-rental-victoria-falls"
            className="text-[11px] uppercase tracking-[0.28em] text-gold hover:underline"
          >
            Car Rental
          </Link>
          <span className="text-[11px] text-muted">/</span>
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted">Driving in Zimbabwe</span>
        </MountReveal>

        <MountReveal>
          <h1
            className="m-0 mb-6 font-display font-semibold uppercase leading-[1.08] tracking-tight text-ink"
            style={{ fontSize: "clamp(30px, 5vw, 56px)" }}
          >
            Driving in <span className="text-gold">Zimbabwe</span>: what to know before you set off
          </h1>
          <p className="text-lg leading-relaxed text-muted sm:text-xl">
            The short version: keep left, stop at every police roadblock, plan to arrive before dark and fill up
            whenever you can. Below is what each of those means in practice if you are collecting a hire car in
            Victoria Falls.
          </p>
        </MountReveal>

        <div className="mt-14 space-y-12 text-base leading-relaxed text-muted sm:text-[17px]">
          <Reveal>
            <h2 className="mb-4 font-subheading text-2xl font-medium text-ink sm:text-3xl">Keep left</h2>
            <p>
              Traffic in Zimbabwe drives on the left. If you normally drive on the right, the first few junctions
              and roundabouts take the most concentration, so give yourself an easy first drive, such as the airport
              run or a loop around town, before a longer trip.
            </p>
            <p className="mt-4">
              Wear your seatbelt and keep the doors locked while you drive. Both are in the UK government&apos;s
              advice for Zimbabwe.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mb-4 font-subheading text-2xl font-medium text-ink sm:text-3xl">
              Police roadblocks and fines
            </h2>
            <p>
              Police and security forces can set up roadblocks anywhere in Zimbabwe without notice, so be ready to
              stop at any point on a drive. Slow down, stop, and cooperate. Don&apos;t drive through one without stopping, even if it looks
              unattended. Stop at toll gates too.
            </p>
            <p className="mt-4">
              Keep your licence, passport and the rental paperwork somewhere you can reach them easily. If you are
              fined, ask for a ticket or an official receipt. Canada&apos;s travel advice says on-the-spot fines are
              illegal in Zimbabwe, and the UK&apos;s says to make sure you get a receipt if you pay one.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mb-4 font-subheading text-2xl font-medium text-ink sm:text-3xl">Plan to arrive before dark</h2>
            <p>
              Both the UK and Canadian governments advise against driving after dark, particularly outside the main
              towns. Most roads have no street lights, and at night you share them with pedestrians, stray livestock
              and vehicles or cyclists without lights.
            </p>
            <p className="mt-4">
              In practice, work out when you need to leave to reach your lodge or camp in daylight, and leave some
              slack for a roadblock or a slow stretch of road.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mb-4 font-subheading text-2xl font-medium text-ink sm:text-3xl">Potholes and road conditions</h2>
            <p>
              Deep potholes are common and cause many accidents. You will also meet broken traffic lights and badly
              marked roads. Keep your speed down on unfamiliar roads, leave plenty of distance to the vehicle in
              front, and expect animals and people on the verges.
            </p>
            <p className="mt-4">
              Inside national parks such as Hwange, the tar gives way to gravel and sand. That is where you need a
              real 4x4, and where it pays to check{" "}
              <Link href="/journal/hwange-gravel-road-insurance-guide" className="text-gold underline">
                what rental insurance covers on gravel roads
              </Link>{" "}
              before you go.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mb-4 font-subheading text-2xl font-medium text-ink sm:text-3xl">Fuel and cash</h2>
            <p>
              Fuel is sometimes unavailable in Zimbabwe, and there can be queues. Top up whenever you get the chance
              rather than running the tank low, fill up in Victoria Falls before heading into Hwange, and carry some
              cash in case a card isn&apos;t accepted.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mb-4 font-subheading text-2xl font-medium text-ink sm:text-3xl">
              Your licence and what to carry
            </h2>
            <p>
              To rent from us you need a driving licence held for two years, in English or with an international
              driving permit, plus your passport. The minimum driver age for the Toyota Fortuner is 23; tell us the
              drivers&apos; ages when you enquire about the other vehicles.
            </p>
            <p className="mt-4">
              Separately from our requirements, Canada&apos;s travel advice recommends carrying an International
              Driving Permit, and the UK&apos;s says a UK licence can be used in Zimbabwe for up to 12 months. If
              you&apos;re unsure, get the permit in your home country before you travel. The UK advice also suggests
              keeping copies of your passport photo page and visa in the car.
            </p>
            <p className="mt-4">
              There&apos;s more detail in{" "}
              <Link href="/journal/documents-needed-rent-car-zimbabwe" className="text-gold underline">
                the documents you need to rent a car in Zimbabwe
              </Link>
              .
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mb-4 font-subheading text-2xl font-medium text-ink sm:text-3xl">
              If the presidential motorcade passes
            </h2>
            <p>
              It is illegal to keep driving while the President&apos;s motorcade goes past, whichever side of the
              road you&apos;re on. Pull off the road, or onto the side of it if you can&apos;t, and wait until it has
              gone.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mb-4 font-subheading text-2xl font-medium text-ink sm:text-3xl">
              Driving beyond Victoria Falls
            </h2>
            <p>
              Hwange National Park&apos;s main entrance is roughly two hours by road, tarred most of the way. Our{" "}
              <Link href="/journal/driving-victoria-falls-to-hwange" className="text-gold underline">
                Victoria Falls to Hwange driving guide
              </Link>{" "}
              covers the route, and{" "}
              <Link href="/journal/self-drive-safari-zimbabwe-guide" className="text-gold underline">
                planning a self-drive safari in Zimbabwe
              </Link>{" "}
              helps you match the vehicle to the roads.
            </p>
            <p className="mt-4">
              Our vehicles can go to South Africa, Zambia, Botswana and Namibia, and we prepare the cross-border
              paperwork before collection. Read{" "}
              <Link href="/journal/rental-car-zimbabwe-to-zambia" className="text-gold underline">
                taking a rental car from Zimbabwe into Zambia
              </Link>{" "}
              or{" "}
              <Link href="/journal/victoria-falls-to-chobe-self-drive-guide" className="text-gold underline">
                driving from Victoria Falls to Chobe
              </Link>{" "}
              before you plan a border crossing. If you&apos;d rather not drive, a{" "}
              <Link href="/journal/self-drive-vs-chauffeur-victoria-falls" className="text-gold underline">
                chauffeur instead of self-drive
              </Link>{" "}
              is also an option.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mb-6 font-subheading text-2xl font-medium text-ink sm:text-3xl">Quick answers</h2>
            <div className="divide-y divide-line border-y border-line">
              {FAQS.map((faq) => (
                <div key={faq.question} className="py-5">
                  <h3 className="font-subheading text-lg font-medium text-ink">{faq.question}</h3>
                  <p className="mt-2">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="rounded-sm border border-line bg-off-white p-5 text-sm">
              The road advice on this page is based on official travel advice from the{" "}
              <a href={FCDO_URL} target="_blank" rel="noopener noreferrer" className="text-gold underline">
                UK government (GOV.UK)
              </a>{" "}
              and the{" "}
              <a href={CANADA_URL} target="_blank" rel="noopener noreferrer" className="text-gold underline">
                Government of Canada
              </a>
              , checked in November 2026. Rules and conditions change, so check the current advice for your
              nationality before you travel. Rental requirements are on our{" "}
              <Link href="/car-rental-victoria-falls#faq" className="text-gold underline">
                car hire questions
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </article>

      <BookingSection
        division="rentals"
        vehicleOptions={vehicles.map((v) => v.name)}
        eyebrow="Ready to drive?"
        headline={["pick your dates,", "we'll match the vehicle."]}
        body="Tell us your dates, where you're heading and whether you'll cross a border, and we'll come back with the right vehicle for the route."
      />
    </>
  );
}
