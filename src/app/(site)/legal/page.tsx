import type { Metadata } from "next";
import Reveal from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Privacy & Terms",
  description: "How Africa Dream Adventures handles the information you share through this site.",
  alternates: { canonical: "/legal" },
  robots: { index: false, follow: true },
};

export default function LegalPage() {
  return (
    <article className="mx-auto max-w-[820px] px-6 py-28 sm:px-10 sm:py-40">
      <Reveal className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">Legal</Reveal>
      <Reveal>
        <h1
          className="m-0 mb-10 font-display font-semibold uppercase leading-[1.15] tracking-tight"
          style={{ fontSize: "clamp(26px, 4vw, 46px)" }}
        >
          Privacy &amp; Terms
        </h1>
      </Reveal>

      <Reveal>
        <div className="max-w-2xl text-lg leading-relaxed text-muted text-pretty [&_h2]:font-subheading [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-ink [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:mb-6">
          <p>
            This page explains what happens to the information you share when you use this site — through the
            enquiry form or by messaging us on WhatsApp. It&apos;s written in plain terms because that&apos;s how
            we&apos;d want it explained to us.
          </p>

          <h2>What we collect</h2>
          <p>
            The enquiry form on the Safaris and Car Rental pages asks for your name, email address, and optionally
            your phone number, along with trip details relevant to what you&apos;re booking (travel dates, guest
            count, vehicle preference, and so on) and any message you write. We only collect what&apos;s shown on
            the form — nothing is gathered silently in the background.
          </p>

          <h2>What we do with it</h2>
          <p>
            Submitting the form sends that information directly to our team by email, solely to respond to your
            enquiry and arrange your booking. We don&apos;t sell, rent, or share it with third parties for
            marketing, and we don&apos;t add you to a mailing list unless you separately ask us to.
          </p>

          <h2>WhatsApp</h2>
          <p>
            Buttons labelled &ldquo;Plan Your Journey,&rdquo; &ldquo;Reserve,&rdquo; or similar open a chat with us
            on WhatsApp. That conversation happens on WhatsApp&apos;s own platform and is subject to{" "}
            <a
              href="https://www.whatsapp.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline"
            >
              WhatsApp&apos;s privacy policy
            </a>
            , not ours — we don&apos;t control how WhatsApp itself handles that data.
          </p>

          <h2>Cookies &amp; tracking</h2>
          <p>
            This site does not use analytics or advertising cookies. Some photography is served from Unsplash&apos;s
            servers, which may log standard request data (like your IP address) the same way any image host does.
          </p>

          <h2>Questions</h2>
          <p>
            If you have questions about how your information is handled, message us on WhatsApp using any of the
            contact buttons on this site and we&apos;ll answer directly.
          </p>
        </div>
      </Reveal>
    </article>
  );
}
