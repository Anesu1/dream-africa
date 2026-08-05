"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

type Status = "idle" | "submitting" | "success" | "error";
type Division = "safaris" | "rentals";

const CROSS_SELL: Record<Division, { text: string; href: string; cta: string }> = {
  safaris: {
    text: "Need a vehicle for the rest of your trip?",
    href: "/rentals",
    cta: "See the fleet",
  },
  rentals: {
    text: "Want to add a guided day to your trip?",
    href: "/safaris",
    cta: "Browse safaris",
  },
};

export default function BookingForm({ division }: { division: Division }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const field = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null)?.value ?? "";

    const data =
      division === "safaris"
        ? {
            name: field("name"),
            email: field("email"),
            phone: field("phone"),
            experienceType: field("experienceType"),
            travelDate: field("travelDate"),
            guests: field("guests"),
            message: field("message"),
            division,
          }
        : {
            name: field("name"),
            email: field("email"),
            phone: field("phone"),
            serviceType: field("serviceType"),
            vehicleClass: field("vehicleClass"),
            pickupDate: field("pickupDate"),
            returnDate: field("returnDate"),
            message: field("message"),
            division,
          };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong sending that — please try again.");
    }
  }

  if (status === "success") {
    const crossSell = CROSS_SELL[division];
    return (
      <div className="rounded-sm border border-paper/20 bg-paper/5 p-8">
        <p className="m-0 font-display text-2xl">Message sent.</p>
        <p className="m-0 mt-2 text-sm text-paper/70">We reply within the hour — check your inbox.</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6">
          <p className="m-0 text-sm text-paper/70">{crossSell.text}</p>
          <Link
            href={crossSell.href}
            className="shrink-0 rounded-full border border-gold px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            {crossSell.cta}
          </Link>
        </div>
      </div>
    );
  }

  const inputClass =
    "border-b border-paper/25 bg-transparent py-3 text-base text-paper outline-none placeholder:text-paper/45";
  const selectClass = `${inputClass} [&>option]:bg-ink`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="name" type="text" required placeholder="Full name" className={inputClass} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input name="email" type="email" required placeholder="Email address" className={inputClass} />
        <input name="phone" type="tel" placeholder="Phone / WhatsApp" className={inputClass} />
      </div>

      {division === "safaris" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <select name="experienceType" defaultValue="" className={selectClass}>
            <option value="" disabled>
              Experience
            </option>
            <option value="Game drive">Game drive</option>
            <option value="Walking">Walking safari</option>
            <option value="River">River / canoe</option>
            <option value="Day trip">Day trip</option>
            <option value="Not sure">Not sure yet</option>
          </select>
          <input name="travelDate" type="date" aria-label="Travel date" className={inputClass} />
          <input name="guests" type="number" min={1} placeholder="Guests" className={inputClass} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <select name="serviceType" defaultValue="" className={selectClass}>
            <option value="" disabled>
              Service
            </option>
            <option value="Self-drive">Self-drive</option>
            <option value="Chauffeur">Chauffeur drive</option>
            <option value="Airport transfer">Airport transfer</option>
          </select>
          <select name="vehicleClass" defaultValue="" className={selectClass}>
            <option value="" disabled>
              Vehicle class
            </option>
            <option value="SUV">SUV</option>
            <option value="4x4">4x4</option>
            <option value="Executive">Executive</option>
            <option value="Not sure">Not sure yet</option>
          </select>
          <input name="pickupDate" type="date" aria-label="Pick-up date" className={inputClass} />
          <input name="returnDate" type="date" aria-label="Return date" className={inputClass} />
        </div>
      )}

      <textarea
        name="message"
        required
        rows={3}
        placeholder={division === "safaris" ? "Anything else we should know" : "Anything else we should know"}
        className={`resize-none ${inputClass}`}
      />

      {error && <p className="m-0 text-sm text-gold">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 self-start rounded-full bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
