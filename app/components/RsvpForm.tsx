"use client";

import { useEffect, useRef, useState } from "react";

// maxGuests is kept for compatibility with page.tsx but no longer used: 1 seat per invited name.
type Props = { maxGuests?: number; deadlineISO: string; deadlineLabel: string };

export default function RsvpForm({ deadlineISO, deadlineLabel }: Props) {
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [attending, setAttending] = useState<"" | "yes" | "no">("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closed = Date.now() > new Date(deadlineISO).getTime();

  useEffect(() => {
    if (picked && query === picked) return;
    setPicked("");
    if (timer.current) clearTimeout(timer.current);
    if (query.trim().length < 2) { setMatches([]); setSearching(false); return; }
    setSearching(true);
    timer.current = setTimeout(async () => {
      try {
        const r = await fetch(`/api/guests?q=${encodeURIComponent(query)}`);
        const d = await r.json();
        setMatches(d.matches ?? []);
      } catch { setMatches([]); }
      setSearching(false);
      setOpen(true);
    }, 220);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function choose(name: string) {
    setPicked(name);
    setQuery(name);
    setOpen(false);
    setError("");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!picked) { setError("Please find and select your name from the guest list."); return; }
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, FormDataEntryValue> = { ...Object.fromEntries(fd.entries()), name: picked };
    if (!payload.attending) { setError("Please let us know if you can attend."); return; }

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

  const firstName = picked.split(" ")[0];

  if (status === "done") {
    return (
      <div className="form thanks" role="status">
        <span className="heart" aria-hidden>{attending === "yes" ? "♥" : "✉"}</span>
        <div className="script">{attending === "yes" ? "See you there!" : "We'll miss you"}</div>
        <p>
          {attending === "yes"
            ? `Thank you, ${firstName}! Your seat is reserved. We can't wait to celebrate with you.`
            : `Thank you for letting us know, ${firstName}. You'll be in our hearts on our day.`}
        </p>
        {updated && <p>Your previous response has been updated.</p>}
        <button className="btn btn-ghost" onClick={() => setStatus("idle")}>Edit response</button>
      </div>
    );
  }

  const noMatch = !searching && query.trim().length >= 2 && !picked && matches.length === 0;

  return (
    <form className="form" onSubmit={onSubmit}>
      <p className="rsvp-intro">
        We have reserved <strong>one seat</strong> in your honour. Kindly find your name below.
      </p>

      {error && <div className="error" role="alert">{error}</div>}

      <div className="field guest-find">
        <label htmlFor="guestName">Find your name</label>
        <input
          id="guestName" autoComplete="off" placeholder="Start typing your first or last name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => matches.length && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          aria-autocomplete="list" aria-expanded={open} aria-controls="guest-list"
          className={picked ? "is-picked" : ""}
        />
        {picked && <span className="guest-check" aria-hidden>✓</span>}
        {open && matches.length > 0 && !picked && (
          <ul className="guest-list" id="guest-list" role="listbox">
            {matches.map((m) => (
              <li key={m} role="option" aria-selected={false} onMouseDown={() => choose(m)}>{m}</li>
            ))}
          </ul>
        )}
        {searching && <p className="guest-hint">Searching…</p>}
        {noMatch && (
          <p className="guest-hint">
            We couldn&apos;t find that name. Try your first or last name only, or message us if you think we missed you.
          </p>
        )}
      </div>

      {picked && (
        <div className="expand">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required maxLength={150} autoComplete="email" />
          </div>

          <div className="field">
            <span className="legend">Will you celebrate with us?</span>
            <div className="choice" role="radiogroup">
              <div>
                <input type="radio" id="yes" name="attending" value="yes"
                  checked={attending === "yes"} onChange={() => setAttending("yes")} />
                <label htmlFor="yes">Joyfully accepts</label>
              </div>
              <div>
                <input type="radio" id="no" name="attending" value="no"
                  checked={attending === "no"} onChange={() => setAttending("no")} />
                <label htmlFor="no">Regretfully declines</label>
              </div>
            </div>
          </div>

          {attending === "yes" && (
            <div className="field expand">
              <label htmlFor="dietary">Dietary needs (optional)</label>
              <input id="dietary" name="dietary" maxLength={300} placeholder="e.g. vegetarian, no seafood" />
            </div>
          )}

          <div className="field">
            <label htmlFor="message">A note for the couple (optional)</label>
            <textarea id="message" name="message" maxLength={1000} />
          </div>

          <div className="hp" aria-hidden>
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div style={{ textAlign: "center" }}>
            <button className="btn" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send RSVP"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
