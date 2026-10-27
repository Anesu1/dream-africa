"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import Link from "next/link";
import { tripQuoteMessage, whatsappLink } from "@/lib/whatsapp";

type Status = "idle" | "submitting" | "success" | "error";
type Division = "safaris" | "rentals" | "activities" | "general";
type Errors = Partial<Record<string, string>>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CROSS_SELL: Record<Division, { text: string; href: string; cta: string }> = {
  safaris: {
    text: "Need a vehicle for the rest of your trip?",
    href: "/car-rental-victoria-falls",
    cta: "See the fleet",
  },
  rentals: {
    text: "Want to add a guided day to your trip?",
    href: "/safaris",
    cta: "Browse safaris",
  },
  activities: {
    text: "Need reliable 4x4 car rental or private airport transfers?",
    href: "/car-rental-victoria-falls",
    cta: "See our fleet",
  },
  general: {
    text: "Curious what we offer?",
    href: "/safaris",
    cta: "Browse safaris",
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FAILURE = "We couldn't send your enquiry just now. Your details are still in the form — please try again.";

// Today's date in the visitor's own timezone, as yyyy-mm-dd (the format date inputs use).
function localToday() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function wholeNumberBetween(value: string, min: number, max: number) {
  const n = Number(value);
  return Number.isInteger(n) && n >= min && n <= max;
}

function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col ${className ?? ""}`}>
      <label htmlFor={id} className="text-[10px] uppercase tracking-[0.16em] text-paper/60">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-gold">
              {" "}
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="m-0 mt-1.5 text-xs text-gold">
          {error}
        </p>
      )}
    </div>
  );
}

export default function BookingForm({
  division,
  item,
  vehicleOptions,
  messagePlaceholder,
  whatsapp,
  pageUrl,
}: {
  division: Division;
  /** The specific tour this form sits on — sent with the enquiry so it's never ambiguous. */
  item?: string;
  /** Real vehicle names from the fleet; falls back to generic classes when not provided. */
  vehicleOptions?: string[];
  messagePlaceholder?: string;
  /** When set (with pageUrl), the form offers WhatsApp as an alternative that carries the details entered. */
  whatsapp?: string;
  pageUrl?: string;
}) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const submittingRef = useRef(false);
  const successRef = useRef<HTMLParagraphElement>(null);

  // A tour page: ask for the details needed to quote that specific trip.
  const tripMode = division === "safaris" && Boolean(item);
  const canWhatsApp = tripMode && Boolean(whatsapp && pageUrl);
  const [waHref, setWaHref] = useState(() =>
    canWhatsApp ? whatsappLink(whatsapp!, tripQuoteMessage(item!, pageUrl!)) : "",
  );

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const id = (name: string) => `${uid}-${name}`;
  const a11y = (name: string) => ({
    id: id(name),
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id(name)}-error` : undefined,
  });

  function readField(form: HTMLFormElement, name: string) {
    const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
    return el?.value.trim() ?? "";
  }

  function validate(form: HTMLFormElement): Errors {
    const v = (name: string) => readField(form, name);
    const has = (name: string) => form.elements.namedItem(name) !== null;
    const today = localToday();
    const errs: Errors = {};

    if (!v("name")) errs.name = "Enter your name so we know who to reply to.";
    if (!v("email")) errs.email = "Enter your email address so we can reply with your quote.";
    else if (!EMAIL_RE.test(v("email"))) errs.email = "Enter a full email address, like name@example.com.";

    const phone = v("phone");
    if (phone && (!/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, "").length < 7)) {
      errs.phone = "Enter a phone number in digits, ideally with your country code (e.g. +44 7700 900123), or leave it blank.";
    }

    for (const name of ["travelDate", "pickupDate"]) {
      if (has(name) && v(name) && v(name) < today) errs[name] = "Choose a date from today onwards.";
    }
    if (has("returnDate") && v("returnDate") && v("pickupDate") && v("returnDate") < v("pickupDate")) {
      errs.returnDate = "Choose a return date on or after the pick-up date.";
    }

    if (has("adults") && v("adults") && !wholeNumberBetween(v("adults"), 1, 50)) {
      errs.adults = "Enter the number of adults as a whole number from 1 to 50.";
    }
    if (has("children") && v("children") && !wholeNumberBetween(v("children"), 0, 50)) {
      errs.children = "Enter the number of children as a whole number, or leave it blank.";
    }
    if (has("guests") && v("guests") && !wholeNumberBetween(v("guests"), 1, 99)) {
      errs.guests = "Enter the number of people as a whole number from 1 to 99.";
    }

    if (division === "general" && !v("message")) errs.message = "Tell us what you'd like help with.";
    return errs;
  }

  function handleChange(e: FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement;
    if (errors[target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[target.name];
        return next;
      });
    }
    if (canWhatsApp) {
      const form = e.currentTarget;
      const v = (name: string) => readField(form, name);
      setWaHref(
        whatsappLink(
          whatsapp!,
          tripQuoteMessage(item!, pageUrl!, [
            ["Preferred date", v("travelDate")],
            ["Adults", v("adults")],
            ["Children", v("children")],
            ["Pickup location", v("pickupLocation")],
          ]),
        ),
      );
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return; // blocks a double click before the button re-renders as disabled

    const form = e.currentTarget;
    const errs = validate(form);
    setErrors(errs);
    const firstInvalid = Object.keys(errs)[0];
    if (firstInvalid) {
      setStatus("idle");
      setFormError("Please check the highlighted fields.");
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");
    setFormError("");

    const field = (name: string) => readField(form, name);
    const base = {
      name: field("name"),
      email: field("email"),
      phone: field("phone"),
      message: field("message"),
      division,
      item: item ?? "",
    };

    const data = tripMode
      ? {
          ...base,
          travelDate: field("travelDate"),
          adults: field("adults"),
          children: field("children"),
          pickupLocation: field("pickupLocation"),
        }
      : division === "safaris" || division === "activities"
        ? {
            ...base,
            experienceType: field("experienceType"),
            travelDate: field("travelDate"),
            guests: field("guests"),
          }
        : division === "rentals"
          ? {
              ...base,
              serviceType: field("serviceType"),
              vehicleClass: field("vehicleClass"),
              pickupDate: field("pickupDate"),
              returnDate: field("returnDate"),
              guests: field("guests"),
              crossBorder: field("crossBorder"),
            }
          : base;

    let message = FAILURE;
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        // Only counted once the server has accepted the enquiry, so GA leads match real emails.
        // No names, contact details or message text go to analytics.
        window.gtag?.("event", "generate_lead", { form_division: division, form_item: item ?? "" });
        setStatus("success");
        return;
      }
      const body = await res.json().catch(() => null);
      if (res.status === 400 && typeof body?.error === "string") message = body.error;
    } catch {
      // Network failure — fall through to the generic message.
    } finally {
      submittingRef.current = false;
    }
    setStatus("error");
    setFormError(message);
  }

  if (status === "success") {
    const crossSell = CROSS_SELL[division];
    return (
      <div className="rounded-sm border border-paper/20 bg-paper/5 p-8" role="status">
        <p ref={successRef} tabIndex={-1} className="m-0 font-display text-2xl outline-none">
          Your enquiry has been received.
        </p>
        <p className="m-0 mt-2 text-sm text-paper/70">
          {item ? `Enquiry: ${item}. ` : ""}
          Availability and pricing will be confirmed separately; this does not confirm a booking. We&apos;ll reply to
          the email address you gave us.
        </p>
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

  const submitting = status === "submitting";
  const inputClass =
    "border-b border-paper/25 bg-transparent py-3 text-base text-paper outline-none placeholder:text-paper/40 focus:border-gold aria-[invalid=true]:border-gold";
  const selectClass = `${inputClass} [&>option]:bg-ink`;
  const vehicleChoices = vehicleOptions && vehicleOptions.length > 0 ? vehicleOptions : null;
  const today = localToday();

  return (
    <form onSubmit={handleSubmit} onChange={handleChange} noValidate aria-busy={submitting} className="flex flex-col gap-5">
      <p className="m-0 text-xs text-paper/60">
        Fields marked <span className="text-gold">*</span> are required.
      </p>

      {tripMode && (
        <p className="m-0 text-sm text-paper/70">
          Enquiring about: <span className="font-medium text-gold">{item}</span>
        </p>
      )}

      <Field id={id("name")} label="Full name" required error={errors.name}>
        <input {...a11y("name")} type="text" autoComplete="name" className={inputClass} />
      </Field>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id={id("email")} label="Email address" required error={errors.email}>
          <input {...a11y("email")} type="email" autoComplete="email" inputMode="email" className={inputClass} />
        </Field>
        <Field id={id("phone")} label="Phone / WhatsApp" error={errors.phone}>
          <input {...a11y("phone")} type="tel" autoComplete="tel" className={inputClass} />
        </Field>
      </div>

      {tripMode && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id={id("travelDate")} label="Preferred travel date" error={errors.travelDate}>
            <input {...a11y("travelDate")} type="date" min={today} className={inputClass} />
          </Field>
          <Field id={id("pickupLocation")} label="Pickup accommodation or location" error={errors.pickupLocation}>
            <input {...a11y("pickupLocation")} type="text" placeholder="e.g. your hotel or lodge" className={inputClass} />
          </Field>
          <Field id={id("adults")} label="Adults" error={errors.adults}>
            <input {...a11y("adults")} type="number" inputMode="numeric" min={1} max={50} className={inputClass} />
          </Field>
          <Field id={id("children")} label="Children (if any)" error={errors.children}>
            <input {...a11y("children")} type="number" inputMode="numeric" min={0} max={50} className={inputClass} />
          </Field>
        </div>
      )}

      {division === "safaris" && !tripMode && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Field id={id("experienceType")} label="Experience">
            <select {...a11y("experienceType")} defaultValue="" className={selectClass}>
              <option value="">Select…</option>
              <option value="Game drive">Game drive</option>
              <option value="Walking">Walking safari</option>
              <option value="River">River / canoe</option>
              <option value="Day trip">Day trip</option>
              <option value="Not sure">Not sure yet</option>
            </select>
          </Field>
          <Field id={id("travelDate")} label="Travel date" error={errors.travelDate}>
            <input {...a11y("travelDate")} type="date" min={today} className={inputClass} />
          </Field>
          <Field id={id("guests")} label="Number of guests" error={errors.guests}>
            <input {...a11y("guests")} type="number" inputMode="numeric" min={1} max={99} className={inputClass} />
          </Field>
        </div>
      )}

      {division === "activities" && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Field id={id("experienceType")} label="Activity / package">
            <select {...a11y("experienceType")} defaultValue="" className={selectClass}>
              <option value="">Select…</option>
              <option value="Activity Packages & Combos">Activity Packages & Combos</option>
              <option value="Victoria Falls Jet Boat">Victoria Falls Jet Boat (Batoka Rapids)</option>
              <option value="Helicopter Flight of Angels">Helicopter Flight of Angels / Zambezi Spectacular</option>
              <option value="White Water Rafting">White Water Rafting</option>
              <option value="Bungee Jump / Gorge Swing">Bungee Jump / Gorge Swing</option>
              <option value="Zambezi Sunset Cruise">Zambezi Sunset Dinner Cruise</option>
              <option value="Chobe Day Trip">Chobe Day Trip from Victoria Falls</option>
              <option value="Guided Tour of the Falls">Guided Tour of the Falls</option>
              <option value="Multiple Activities">Custom Multi-Activity Itinerary</option>
            </select>
          </Field>
          <Field id={id("travelDate")} label="Preferred date" error={errors.travelDate}>
            <input {...a11y("travelDate")} type="date" min={today} className={inputClass} />
          </Field>
          <Field id={id("guests")} label="Guests" error={errors.guests}>
            <input {...a11y("guests")} type="number" inputMode="numeric" min={1} max={99} className={inputClass} />
          </Field>
        </div>
      )}

      {division === "rentals" && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id={id("serviceType")} label="Service">
            <select {...a11y("serviceType")} defaultValue="" className={selectClass}>
              <option value="">Select…</option>
              <option value="Self-drive">Self-drive</option>
              <option value="Chauffeur">Chauffeur drive</option>
              <option value="Airport transfer">Airport transfer</option>
            </select>
          </Field>
          <Field id={id("vehicleClass")} label={vehicleChoices ? "Vehicle" : "Vehicle class"}>
            <select
              {...a11y("vehicleClass")}
              defaultValue={item && vehicleChoices?.includes(item) ? item : ""}
              className={selectClass}
            >
              <option value="">Select…</option>
              {(vehicleChoices ?? ["SUV", "4x4", "Executive"]).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
              <option value="Not sure">Not sure yet</option>
            </select>
          </Field>
          <Field id={id("pickupDate")} label="Pick-up date" error={errors.pickupDate}>
            <input {...a11y("pickupDate")} type="date" min={today} className={inputClass} />
          </Field>
          <Field id={id("returnDate")} label="Return date" error={errors.returnDate}>
            <input {...a11y("returnDate")} type="date" min={today} className={inputClass} />
          </Field>
          <Field id={id("guests")} label="Passengers" error={errors.guests}>
            <input {...a11y("guests")} type="number" inputMode="numeric" min={1} max={99} className={inputClass} />
          </Field>
          <Field id={id("crossBorder")} label="Leaving Zimbabwe?">
            <select {...a11y("crossBorder")} defaultValue="" className={selectClass}>
              <option value="">Select…</option>
              <option value="Zimbabwe only">Zimbabwe only</option>
              <option value="Crossing a border">Crossing a border (say where below)</option>
              <option value="Not sure">Not sure yet</option>
            </select>
          </Field>
        </div>
      )}

      <Field
        id={id("message")}
        label={division === "general" ? "Your message" : "Questions or requirements"}
        required={division === "general"}
        error={errors.message}
      >
        <textarea
          {...a11y("message")}
          rows={3}
          placeholder={
            messagePlaceholder ??
            (division === "general"
              ? "What can we help with?"
              : division === "rentals"
                ? "Pick-up location, drivers' ages, anything else we should know"
                : "Anything else we should know")
          }
          className={`resize-none ${inputClass}`}
        />
      </Field>

      <div aria-live="polite">
        {formError && (
          <p className="m-0 text-sm text-gold">
            {formError}
            {status === "error" && canWhatsApp && (
              <>
                {" "}
                You can also{" "}
                <a href={waHref} target="_blank" rel="noopener noreferrer" data-wa-location="enquiry_form_error" className="underline underline-offset-2">
                  send these details on WhatsApp
                </a>
                .
              </>
            )}
          </p>
        )}
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:opacity-50"
        >
          {submitting ? "Sending…" : "Send enquiry"}
        </button>
        {canWhatsApp && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            data-wa-location="enquiry_form"
            className="text-[11px] uppercase tracking-[0.16em] text-gold underline-offset-4 hover:underline"
          >
            Or send these details on WhatsApp
          </a>
        )}
      </div>
    </form>
  );
}
