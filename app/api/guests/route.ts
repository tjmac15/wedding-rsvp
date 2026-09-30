import { NextResponse } from "next/server";
import { searchGuests } from "@/lib/guests";

export const dynamic = "force-dynamic";

// Returns only a few matches for what's typed, so the full list is never exposed.
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  return NextResponse.json({ matches: searchGuests(q.slice(0, 60)) });
}
