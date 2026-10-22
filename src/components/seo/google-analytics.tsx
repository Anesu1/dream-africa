import Script from "next/script";

export const GA_MEASUREMENT_ID = "G-5XS1YNLT7Q";

export default function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
document.addEventListener('click', function (e) {
  var link = e.target instanceof Element ? e.target.closest('a[href*="wa.me/"]') : null;
  if (!link) return;
  gtag('event', 'whatsapp_click', {
    link_location: link.getAttribute('data-wa-location') || 'other',
    page_path: location.pathname
  });
});`}
      </Script>
    </>
  );
}
