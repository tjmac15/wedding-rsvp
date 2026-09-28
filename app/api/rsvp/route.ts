import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { db, RSVP_COLLECTION } from "@/lib/firebaseAdmin";
import { wedding } from "@/lib/wedding";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  if (Date.now() > new Date(wedding.rsvpDeadlineISO).getTime()) {
    return NextResponse.json(
      { error: "RSVPs are closed. Please message the couple directly." },
      { status: 403 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot field — real guests never see or fill it
  if (clean(body.website, 100)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 150).toLowerCase();
  const phone = clean(body.phone, 30);
  const attending = body.attending === "yes" ? "yes" : body.attending === "no" ? "no" : "";
  const dietary = clean(body.dietary, 300);
  const message = clean(body.message, 1000);
  const plusOneName = clean(body.plusOneName, 100);
  let guests = Number(body.guests);

  if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  if (!attending)
    return NextResponse.json({ error: "Please let us know if you can attend." }, { status: 400 });

  if (attending === "no") guests = 0;
  else if (!Number.isInteger(guests) || guests < 1 || guests > wedding.maxGuestsPerRsvp) {
    return NextResponse.json(
      { error: `Number of guests must be between 1 and ${wedding.maxGuestsPerRsvp}.` },
      { status: 400 }
    );
  }

  // One RSVP per email — resubmitting updates the existing response
  const id = createHash("sha256").update(email).digest("hex").slice(0, 24);

  try {
    const ref = db().collection(RSVP_COLLECTION).doc(id);
    const existing = await ref.get();
    await ref.set(
      {
        name,
        email,
        phone,
        attending,
        guests,
        plusOneName: guests > 1 ? plusOneName : "",
        dietary,
        message,
        updatedAt: FieldValue.serverTimestamp(),
        ...(existing.exists ? {} : { createdAt: FieldValue.serverTimestamp() }),
      },
      { merge: true }
    );
    return NextResponse.json({ ok: true, updated: existing.exists });
  } catch (err) {
    console.error("RSVP save failed", err);
    return NextResponse.json(
      { error: "Something went wrong saving your RSVP. Please try again." },
      { status: 500 }
    );
  }
}
