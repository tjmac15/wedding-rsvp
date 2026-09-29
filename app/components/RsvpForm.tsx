"use client";

import { useState } from "react";

type Props = { maxGuests: number; deadlineISO: string; deadlineLabel: string };

export default function RsvpForm({ maxGuests, deadlineISO, deadlineLabel }: Props) {
  const [attending, setAttending] = useState<"" | "yes" | "no">("");
  const [guests, setGuests] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);
  const [firstName, setFirstName] = useState("");

  const closed = Date.now() > new Date(deadlineISO).getTime();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    if (!payload.attending) {
      setError("Please let us know if you can attend.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setUpdated(Boolean(data.updated));
      setFirstName(String(payload.name || "").split(" ")[0]);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  if (closed) {
    return (
      <div className="form thanks">
        <div className="script">RSVPs are closed</div>
        <p>We stopped taking responses on {deadlineLabel}. If you still need to reach us, please message us directly.</p>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="form thanks" role="status">
        <span className="heart" aria-hidden>{attending === "yes" ? "♥" : "✉"}</span>
        <div className="script">{attending === "yes" ? "See you there!" : "We'll miss you"}</div>
        <p>
          {attending === "yes"
            ? `Thank you${firstName ? `, ${firstName}` : ""}! We can't wait to celebrate with you.`
            : `Thank you for letting us know${firstName ? `, ${firstName}` : ""}. You'll be in our hearts on our day.`}
        </p>
        {updated && <p>Your previous response has been updated.</p>}
        <button className="btn btn-ghost" onClick={() => setStatus("idle")}>
          Edit response
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      {error && <div className="error" role="alert">{error}</div>}

      <div className="field">
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" required maxLength={100} autoComplete="name" />
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required maxLength={150} autoComplete="email" />
        </div>
      </div>

      <div className="field">
        <span className="legend">Will you celebrate with us?</span>
        <div className="choice" role="radiogroup">
          <div>
            <input
              type="radio" id="yes" name="attending" value="yes"
              checked={attending === "yes"} onChange={() => setAttending("yes")}
            />
            <label htmlFor="yes">Joyfully accepts</label>
          </div>
          <div>
            <input
              type="radio" id="no" name="attending" value="no"
              checked={attending === "no"} onChange={() => setAttending("no")}
            />
            <label htmlFor="no">Regretfully declines</label>
          </div>
        </div>
      </div>

      {attending === "yes" && (
        <div className="expand">
          <div className="field">
            <label htmlFor="guests">Number of guests (including you)</label>
            <select
              id="guests" name="guests" value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          {guests > 1 && (
            <div className="field">
              <label htmlFor="plusOneName">Your guest&apos;s name</label>
              <input id="plusOneName" name="plusOneName" maxLength={100} />
            </div>
          )}
          <div className="field">
            <label htmlFor="dietary">Dietary needs (optional)</label>
            <input id="dietary" name="dietary" maxLength={300} placeholder="e.g. vegetarian, no seafood" />
          </div>
        </div>
      )}

      <div className="field">
        <label htmlFor="message">A note for the couple (optional)</label>
        <textarea id="message" name="message" maxLength={1000} />
      </div>

      {/* Spam trap: hidden from people, bots fill it */}
      <div className="hp" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div style={{ textAlign: "center" }}>
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send RSVP"}
        </button>
      </div>
    </form>
  );
}
