import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// No production domain has been confirmed yet — set NEXT_PUBLIC_SITE_URL once the
// real domain is live. Falls back to a placeholder so this doesn't silently resolve
// canonical/OG URLs against the wrong host.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const DEFAULT_TITLE = "Victoria Falls Car Rental, Tours & Safaris | Africa Dream Adventures";
const DEFAULT_DESCRIPTION =
  "Luxury Victoria Falls safaris, Zambezi cruises and Chobe day trips, plus premium self-drive and chauffeured car rental across Zimbabwe — one trusted company for your whole trip.";
const SOCIAL_IMAGE = "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=630&q=80&auto=format&fit=crop";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Africa Dream Adventures",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Victoria Falls luxury safaris",
    "private Hwange safari tours",
    "Zambezi sunset dinner cruise",
    "Victoria Falls helicopter flight of angels",
    "Chobe day trip from Victoria Falls",
    "car hire Victoria Falls airport",
    "4x4 self drive Victoria Falls",
    "cross border car rental Victoria Falls Botswana",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: DEFAULT_TITLE,
    description:
      "Luxury Victoria Falls safaris, Zambezi cruises and Chobe day trips, plus premium car rental across Zimbabwe.",
    type: "website",
    locale: "en_ZW",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: DEFAULT_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${playfair.variable} ${jakarta.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-paper text-ink">{children}</body>
    </html>
  );
}
