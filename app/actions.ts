"use server";

import { db, ensureTable } from "@/lib/db";

export type RsvpState = { ok: true } | { ok: false; error: string } | null;

const clean = (value: FormDataEntryValue | null, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function submitRsvp(
  _prev: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  // Honeypot: real users never fill this in.
  if (clean(formData.get("website"), 100)) return { ok: true };

  const name = clean(formData.get("name"), 100);
  const email = clean(formData.get("email"), 200);
  const attendingRaw = clean(formData.get("attending"), 3);
  const attending = attendingRaw === "yes";

  if (!name) return { ok: false, error: "Vennligst skriv inn navnet ditt." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: "Vennligst skriv inn en gyldig e-postadresse." };
  if (attendingRaw !== "yes" && attendingRaw !== "no")
    return { ok: false, error: "Si fra om du kommer eller ikke." };

  const guests = attending
    ? Math.min(Math.max(parseInt(clean(formData.get("guests"), 2), 10) || 1, 1), 10)
    : 0;
  const guestNames = attending ? clean(formData.get("guestNames"), 500) : "";
  const dietary = attending ? clean(formData.get("dietary"), 500) : "";
  const message = clean(formData.get("message"), 1000);

  try {
    const sql = db();
    await ensureTable(sql);
    await sql`
      INSERT INTO rsvps (name, email, attending, guests, guest_names, dietary, message)
      VALUES (${name}, ${email}, ${attending}, ${guests}, ${guestNames}, ${dietary}, ${message})
    `;
  } catch (err) {
    console.error("RSVP insert failed", err);
    return { ok: false, error: "Noe gikk galt. Prøv igjen om litt." };
  }

  return { ok: true };
}
