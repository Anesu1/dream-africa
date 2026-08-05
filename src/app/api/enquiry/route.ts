import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.name !== "string" || typeof body.email !== "string" || typeof body.message !== "string") {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!body.name.trim() || !body.email.trim() || !body.message.trim()) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  // TODO: wire this up to a real destination (email via Resend/SendGrid, a CRM, or WhatsApp Business API).
  // For now the enquiry is only logged server-side so the form has somewhere real to submit to.
  console.log("[enquiry]", {
    name: body.name,
    email: body.email,
    phone: body.phone ?? "",
    division: body.division ?? "unspecified",
    experienceType: body.experienceType ?? undefined,
    travelDate: body.travelDate ?? undefined,
    guests: body.guests ?? undefined,
    serviceType: body.serviceType ?? undefined,
    vehicleClass: body.vehicleClass ?? undefined,
    pickupDate: body.pickupDate ?? undefined,
    returnDate: body.returnDate ?? undefined,
    message: body.message,
  });

  return NextResponse.json({ ok: true });
}
