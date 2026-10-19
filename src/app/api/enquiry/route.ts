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

  if (!body || typeof body.name !== "string" || typeof body.email !== "string" || typeof body.message !== "string") {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const name = optional(body.name, 100);
  const email = optional(body.email, 254);
  const message = body.message.trim().slice(0, 4000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const enquiry = {
    name,
    email,
    phone: optional(body.phone, 40),
    division: DIVISIONS.includes(body.division) ? body.division : "general",
    item: optional(body.item),
    experienceType: optional(body.experienceType),
    travelDate: optional(body.travelDate, 20),
    guests: optional(body.guests, 4),
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
