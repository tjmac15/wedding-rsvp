import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { db, RSVP_COLLECTION } from "@/lib/firebaseAdmin";
import { wedding } from "@/lib/wedding";
import { findGuest, norm } from "@/lib/guests";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  if (Date.now() > new Date(wedding.rsvpDeadlineISO).getTime()) {
    return NextResponse.json({ error: "RSVPs are closed. Please message the couple directly." }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(body.website, 100)) return NextResponse.json({ ok: true }); // honeypot

  const guest = findGuest(clean(body.name, 100));
  const email = clean(body.email, 150).toLowerCase();
  const attending = body.attending === "yes" ? "yes" : body.attending === "no" ? "no" : "";
  const dietary = attending === "yes" ? clean(body.dietary, 300) : "";
  const message = clean(body.message, 1000);

  if (!guest)
    return NextResponse.json(
      { error: "We couldn't find that name on our guest list. Please pick your name from the suggestions, or message us directly." },
      { status: 400 }
    );
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  if (!attending)
    return NextResponse.json({ error: "Please let us know if you can attend." }, { status: 400 });

  // One RSVP per invited name (1 seat) — resubmitting updates it
  const id = createHash("sha256").update(norm(guest)).digest("hex").slice(0, 24);

  try {
    const ref = db().collection(RSVP_COLLECTION).doc(id);
    const existing = await ref.get();
    await ref.set(
      {
        name: guest,
        email,
        attending,
        guests: attending === "yes" ? 1 : 0,
        plusOneName: "",
        phone: "",
        dietary,
        message,
        updatedAt: FieldValue.serverTimestamp(),
        ...(existing.exists ? {} : { createdAt: FieldValue.serverTimestamp() }),
      },
      { merge: true }
    );
    return NextResponse.json({ ok: true, updated: existing.exists, name: guest });
  } catch (err) {
    console.error("RSVP save failed", err);
    return NextResponse.json({ error: "Something went wrong saving your RSVP. Please try again." }, { status: 500 });
  }
}
