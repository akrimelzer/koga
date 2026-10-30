"use client";

import { useActionState, useState } from "react";
import { submitRsvp, type RsvpState } from "../actions";

export default function RsvpForm() {
  const [state, action, pending] = useActionState<RsvpState, FormData>(submitRsvp, null);
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);

  if (state?.ok) {
    return (
      <div className="thanks">
        <p className="thanks-title">Tusen takk!</p>
        <p>Vi har mottatt svaret ditt.</p>
      </div>
    );
  }

  return (
    <form action={action} className="form">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />

      <label className="field">
        <span>Navn</span>
        <input type="text" name="name" required maxLength={100} autoComplete="name" />
      </label>

      <label className="field">
        <span>E-post</span>
        <input type="email" name="email" required maxLength={200} autoComplete="email" />
      </label>

      <fieldset className="choice">
        <legend>Kommer du?</legend>
        <label>
          <input type="radio" name="attending" value="yes" required onChange={() => setAttending("yes")} />
          <span>Ja, jeg kommer</span>
        </label>
        <label>
          <input type="radio" name="attending" value="no" onChange={() => setAttending("no")} />
          <span>Nei, dessverre</span>
        </label>
      </fieldset>

      {attending === "yes" && (
        <>
          <label className="field">
            <span>Antall gjester (inkludert deg)</span>
            <input type="number" name="guests" min={1} max={10} defaultValue={1} />
          </label>

          <label className="field">
            <span>Navn på de som følger med</span>
            <input type="text" name="guestNames" maxLength={500} />
          </label>

          <label className="field">
            <span>Allergier og matpreferanser</span>
            <textarea name="dietary" rows={3} maxLength={500} />
          </label>
        </>
      )}

      <label className="field">
        <span>Hilsen til brudeparet (valgfritt)</span>
        <textarea name="message" rows={3} maxLength={1000} />
      </label>

      {state && !state.ok && <p className="error">{state.error}</p>}

      <button type="submit" disabled={pending}>
        {pending ? "Sender…" : "Send svar"}
      </button>
    </form>
  );
}
