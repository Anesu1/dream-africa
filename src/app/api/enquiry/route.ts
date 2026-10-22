import { NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/mailer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_WHATSAPP_QUERY } from "@/sanity/lib/queries";

const DIVISIONS = ["safaris", "rentals", "activities", "general"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Every field ends up in an email, so anything that isn't a short single-line string is dropped.
function optional(value: unknown, max = 120) {
  if (typeof value !== "string") return undefined;
  const clean = value.replace(/[\r\n]+/g, " ").trim();
  return clean ? clean.slice(0, max) : undefined;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.name !== "string" || typeof body.email !== "string") {
    return NextResponse.json({ error: "Please enter your name and email address." }, { status: 400 });
  }

  const division = DIVISIONS.includes(body.division) ? body.division : "general";
  const name = optional(body.name, 100);
  const email = optional(body.email, 254);
  // Trip and rental enquiries carry their details in dedicated fields, so a message is only
  // needed on the general contact form.
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 4000) : "";

  if (!name) {
    return NextResponse.json({ error: "Please enter your name so we know who to reply to." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a full email address, like name@example.com." }, { status: 400 });
  }
  if (division === "general" && !message) {
    return NextResponse.json({ error: "Please tell us what you'd like help with." }, { status: 400 });
  }

  const enquiry = {
    name,
    email,
    phone: optional(body.phone, 40),
    division,
    item: optional(body.item),
    experienceType: optional(body.experienceType),
    travelDate: optional(body.travelDate, 20),
    guests: optional(body.guests, 4),
    adults: optional(body.adults, 4),
    children: optional(body.children, 4),
    pickupLocation: optional(body.pickupLocation),
    serviceType: optional(body.serviceType),
    vehicleClass: optional(body.vehicleClass),
    pickupDate: optional(body.pickupDate, 20),
    returnDate: optional(body.returnDate, 20),
    crossBorder: optional(body.crossBorder),
    message,
  };

  try {
    const whatsapp = await sanityFetch<string>({ query: SITE_WHATSAPP_QUERY });
    const { sent } = await sendEnquiryEmail(enquiry, whatsapp);
    if (!sent) {
      console.error("[enquiry] Mailer not configured — enquiry was not delivered:", enquiry);
      return NextResponse.json({ error: "Failed to send enquiry. Please try again." }, { status: 502 });
    }
  } catch (error) {
    console.error("[enquiry] Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send enquiry. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
