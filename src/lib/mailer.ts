import nodemailer from "nodemailer";

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

function isConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && process.env.ENQUIRY_TO_EMAIL);
}

function buildHtml(data: EnquiryEmailData) {
  const rows = Object.entries(data)
    .filter(([, value]) => value)
    .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;font-size:13px;text-transform:capitalize">${key}</td><td style="padding:4px 0;font-size:14px">${value}</td></tr>`)
    .join("");
  return `<table style="font-family:sans-serif;border-collapse:collapse">${rows}</table>`;
}

export async function sendEnquiryEmail(data: EnquiryEmailData): Promise<{ sent: boolean }> {
  if (!isConfigured()) {
    console.log("[enquiry] Gmail credentials not configured — not sending, logging only.", data);
    return { sent: false };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Africa Dream Adventures Website" <${process.env.GMAIL_USER}>`,
    to: process.env.ENQUIRY_TO_EMAIL,
    replyTo: data.email,
    subject: `New ${data.division} enquiry from ${data.name}`,
    html: buildHtml(data),
  });

  return { sent: true };
}
