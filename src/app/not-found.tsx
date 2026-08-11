import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-paper">
      <span className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold">Africa Dream Adventures</span>
      <h1
        className="m-0 mb-6 font-display font-semibold uppercase leading-[1.05] tracking-tight"
        style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
      >
        404
      </h1>
      <p className="m-0 mb-10 max-w-md text-lg leading-relaxed text-paper/70">
        This trail doesn&apos;t lead anywhere. The page you&apos;re looking for has moved or never existed.
      </p>
      <Link
        href="/"
        className="rounded-full bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-paper"
      >
        Back to home
      </Link>
    </div>
  );
}
