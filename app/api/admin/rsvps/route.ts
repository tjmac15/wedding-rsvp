import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { db, RSVP_COLLECTION } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  const given = req.headers.get("x-admin-password") ?? "";
  if (!expected) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  let snap;
  try {
    snap = await db().collection(RSVP_COLLECTION).orderBy("updatedAt", "desc").get();
  } catch (err) {
    console.error("Loading RSVPs failed", err);
    return NextResponse.json({ error: "Could not load RSVPs — check Firebase settings." }, { status: 500 });
  }
  const rsvps = snap.docs.map((d) => {
    const x = d.data();
    return {
      id: d.id,
      name: x.name ?? "",
      email: x.email ?? "",
      phone: x.phone ?? "",
      attending: x.attending ?? "",
      guests: x.guests ?? 0,
      plusOneName: x.plusOneName ?? "",
      dietary: x.dietary ?? "",
      message: x.message ?? "",
      updatedAt: x.updatedAt?.toDate?.().toISOString() ?? null,
    };
  });

  return NextResponse.json({ rsvps });
}
