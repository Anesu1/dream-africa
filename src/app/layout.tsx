import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/providers/smooth-scroll";
import Cursor from "@/components/providers/cursor";
import LoadingScreen from "@/components/providers/loading-screen";
import PageTransition from "@/components/providers/page-transition";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/seo/json-ld";

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

export const metadata: Metadata = {
  title: {
    default: "Victoria Falls Safaris & Car Rental | Dream Africa",
    template: "%s | Dream Africa",
  },
  description:
    "Luxury Victoria Falls safaris, Zambezi cruises and Chobe day trips, plus premium self-drive and chauffeured car rental across Zimbabwe — one trusted company for your whole trip.",
  keywords: [
    "Victoria Falls safaris",
    "Zimbabwe safari packages",
    "Zambezi river cruise",
    "Chobe day trip",
    "car rental Victoria Falls",
    "car hire Zimbabwe",
    "4x4 rental Zimbabwe",
    "Hwange National Park tours",
  ],
  openGraph: {
    title: "Victoria Falls Safaris & Car Rental | Dream Africa",
    description:
      "Luxury Victoria Falls safaris, Zambezi cruises and Chobe day trips, plus premium car rental across Zimbabwe.",
    type: "website",
    locale: "en_ZW",
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
      <body className="bg-paper text-ink">
        <OrganizationJsonLd />
        <LoadingScreen />
        <Cursor />
        <SmoothScroll>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
