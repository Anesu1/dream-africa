import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import SchemaOrgGraph from "@/components/seo/JsonLd";

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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://africadreamadventures.co.zw";
const DEFAULT_TITLE = "Africa Dream Adventures | Luxury Safaris & Victoria Falls Car Rental";
const DEFAULT_DESCRIPTION =
  "Experience Victoria Falls with Africa Dream Adventures & Eden Car Rental. Book luxury safaris, helicopter flights & 4x4 self-drive hire.";
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
    "Victoria Falls car rental",
    "Eden Car Rental",
    "Africa Dream Adventures",
    "4x4 car rental Victoria Falls self drive",
    "Car hire Victoria Falls airport VFA",
    "Hwange safari tours from Victoria Falls",
    "Victoria Falls helicopter flight of angels",
    "Zambezi luxury sunset dinner cruise",
    "Chobe day trip from Victoria Falls",
    "Cross border car rental Victoria Falls to Botswana",
    "Batoka gorge white water rafting",
    "Hwange self drive 4x4 rental with camping gear",
    "Affordable car hire Victoria Falls Zimbabwe",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    siteName: "Africa Dream Adventures & Eden Car Rental",
    locale: "en_ZW",
    type: "website",
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "Africa Dream Adventures and Eden Car Rental in Victoria Falls",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A1A1A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${jakarta.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <SchemaOrgGraph />
      </head>
      <body className="bg-paper text-ink antialiased selection:bg-gold selection:text-ink">
        {children}
      </body>
    </html>
  );
}
