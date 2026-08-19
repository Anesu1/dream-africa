import { NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.name !== "string" || typeof body.email !== "string" || typeof body.message !== "string") {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!body.name.trim() || !body.email.trim() || !body.message.trim()) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const enquiry = {
    name: body.name,
    email: body.email,
    phone: body.phone || undefined,
    division: body.division ?? "unspecified",
    experienceType: body.experienceType || undefined,
    travelDate: body.travelDate || undefined,
    guests: body.guests || undefined,
    serviceType: body.serviceType || undefined,
    vehicleClass: body.vehicleClass || undefined,
    pickupDate: body.pickupDate || undefined,
    returnDate: body.returnDate || undefined,
    message: body.message,
  };

  try {
    const { sent } = await sendEnquiryEmail(enquiry);
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
