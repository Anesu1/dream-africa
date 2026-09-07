import { Resend } from "resend";

export type EnquiryEmailData = {
  name: string;
  email: string;
  phone?: string;
  division: string;
  experienceType?: string;
  travelDate?: string;
  guests?: string;
  serviceType?: string;
  vehicleClass?: string;
  pickupDate?: string;
  returnDate?: string;
  message: string;
};

const BRAND = {
  ink: "#0b0b0b",
  gold: "#c8a14a",
  paper: "#faf9f6",
  white: "#ffffff",
  muted: "#6b6b66",
  line: "#e7e2d8",
  logo: "https://cdn.sanity.io/images/7zk2mk45/production/d1ead7fbdd42f09280aa5b1cadd1c242896fa7a9-1080x1080.jpg",
  address: "21 Livingstone Way, Victoria Falls, Zimbabwe",
  whatsapp: "263716337133",
  siteUrl: "https://africadreamadventures.co.zw",
  fromAddress: "Africa Dream Adventures <info@africadreamadventures.co.zw>",
  // Email clients can't load Google Fonts (Playfair/Cinzel/Jakarta) — these are
  // the closest email-safe stand-ins that render everywhere.
  fontDisplay: "Georgia, 'Times New Roman', serif",
  fontBody: "Arial, Helvetica, sans-serif",
};

function isConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL);
}

function fieldLabel(key: string) {
  const labels: Record<string, string> = {
    experienceType: "Experience",
    travelDate: "Travel date",
    guests: "Guests",
    serviceType: "Service",
    vehicleClass: "Vehicle class",
    pickupDate: "Pickup date",
    returnDate: "Return date",
    phone: "Phone",
  };
  return labels[key] ?? key;
}

function emailShell(bodyHtml: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${BRAND.paper};font-family:${BRAND.fontBody};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.paper};padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:${BRAND.white};border-radius:4px;overflow:hidden;">
            <tr>
              <td align="center" style="background:${BRAND.ink};padding:32px;">
                <img src="${BRAND.logo}" width="56" height="56" alt="Africa Dream Adventures" style="border-radius:8px;display:block;margin:0 auto 12px;" />
                <div style="color:${BRAND.gold};font-family:${BRAND.fontBody};font-size:12px;letter-spacing:2px;text-transform:uppercase;">Africa Dream Adventures</div>
              </td>
            </tr>
            <tr>
              <td style="padding:40px 32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background:${BRAND.ink};padding:24px 32px;">
                <div style="color:rgba(255,255,255,0.55);font-family:${BRAND.fontBody};font-size:12px;line-height:1.6;">
                  ${BRAND.address}<br />
                  <a href="${BRAND.siteUrl}" style="color:${BRAND.gold};text-decoration:none;">${BRAND.siteUrl.replace("https://", "")}</a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function confirmationHtml(data: EnquiryEmailData) {
  const whatsappHref = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi, I just sent an enquiry (${data.division}) — following up here.`)}`;
  return emailShell(`
    <div style="color:${BRAND.gold};font-family:${BRAND.fontBody};font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;">Message received</div>
    <h1 style="margin:0 0 16px;color:${BRAND.ink};font-family:${BRAND.fontDisplay};font-size:26px;font-weight:600;line-height:1.25;">Thanks for reaching out, ${data.name}.</h1>
    <p style="margin:0 0 24px;color:${BRAND.muted};font-family:${BRAND.fontBody};font-size:15px;line-height:1.6;">
      We've received your ${data.division} enquiry and typically reply within the hour during Victoria Falls business hours. If it's urgent, message us directly on WhatsApp below.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.paper};border:1px solid ${BRAND.line};border-radius:4px;margin-bottom:28px;">
      <tr>
        <td style="padding:18px 20px;">
          <div style="color:${BRAND.muted};font-family:${BRAND.fontBody};font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">Your message</div>
          <div style="color:${BRAND.ink};font-family:${BRAND.fontBody};font-size:14px;line-height:1.6;font-style:italic;">"${data.message}"</div>
        </td>
      </tr>
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:${BRAND.gold};border-radius:100px;">
          <a href="${whatsappHref}" style="display:inline-block;padding:14px 28px;color:${BRAND.ink};font-family:${BRAND.fontBody};font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;text-decoration:none;">Message us on WhatsApp</a>
        </td>
      </tr>
    </table>
  `);
}

function notificationHtml(data: EnquiryEmailData) {
  const rows = Object.entries(data)
    .filter(([key, value]) => value && key !== "message")
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:${BRAND.muted};font-family:${BRAND.fontBody};font-size:13px;white-space:nowrap;">${fieldLabel(key)}</td><td style="padding:8px 0;color:${BRAND.ink};font-family:${BRAND.fontBody};font-size:14px;">${value}</td></tr>`,
    )
    .join("");

  return emailShell(`
    <div style="color:${BRAND.gold};font-family:${BRAND.fontBody};font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;">New enquiry</div>
    <h1 style="margin:0 0 24px;color:${BRAND.ink};font-family:${BRAND.fontDisplay};font-size:24px;font-weight:600;">${data.division} enquiry from ${data.name}</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border-top:1px solid ${BRAND.line};">
      ${rows}
    </table>
    <div style="color:${BRAND.muted};font-family:${BRAND.fontBody};font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">Message</div>
    <p style="margin:0;color:${BRAND.ink};font-family:${BRAND.fontBody};font-size:15px;line-height:1.6;">${data.message}</p>
  `);
}

export async function sendEnquiryEmail(data: EnquiryEmailData): Promise<{ sent: boolean }> {
  if (!isConfigured()) {
    console.log("[enquiry] Resend not configured (RESEND_API_KEY / ENQUIRY_TO_EMAIL) — not sending, logging only.", data);
    return { sent: false };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const [notification, confirmation] = await Promise.allSettled([
    resend.emails.send({
      from: BRAND.fromAddress,
      to: process.env.ENQUIRY_TO_EMAIL!,
      replyTo: data.email,
      subject: `New ${data.division} enquiry from ${data.name}`,
      html: notificationHtml(data),
    }),
    resend.emails.send({
      from: BRAND.fromAddress,
      to: data.email,
      subject: "We've received your message — Africa Dream Adventures",
      html: confirmationHtml(data),
    }),
  ]);

  if (notification.status === "rejected") {
    console.error("[enquiry] Failed to send business notification:", notification.reason);
  }
  if (confirmation.status === "rejected") {
    console.error("[enquiry] Failed to send customer confirmation:", confirmation.reason);
  }

  // The business notification is the one that actually matters for the lead —
  // treat that as the source of truth for whether this "sent" successfully.
  return { sent: notification.status === "fulfilled" };
}
