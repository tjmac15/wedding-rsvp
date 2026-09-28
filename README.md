# TJ & France — Wedding Invitation + RSVP

**December 8, 2026 · Rico's Cafe at Nena's Sanctuary, Sta. Elena, Santa Rosa, Laguna**

Next.js site with an envelope-opening intro, countdown, story timeline, venue + map, photo gallery with lightbox, dress code, and an RSVP form saved to **Firebase Firestore**. Guest list at `/admin` (password-protected, CSV export).

---

## 1. Edit the details
Everything (times, schedule, story, dress-code colors, notes, RSVP deadline, max guests) lives in **`lib/wedding.ts`**.
The Bible verse and welcome text are in `app/page.tsx` (search for "Matthew").

## 2. Add your photos
Put them in **`public/photos/`**:

| File | Used for |
|---|---|
| `hero.jpg` | Full-screen cover photo behind your names (landscape, ~2400px wide) |
| `venue.jpg` | *(optional)* Photo in the venue card; map moves below it |
| `01.jpg`, `02.jpg`, … | Gallery, in filename order (any mix of portrait/landscape) |

Compress them first (e.g. squoosh.app, ~300–500 KB each) so it loads fast on mobile data.
Optional music: add `public/music.mp3` and a play/pause button appears; it starts when the envelope is opened.

## 3. Set up Firebase (free Spark plan is plenty)
1. console.firebase.google.com → **Add project** (or reuse one).
2. **Build → Firestore Database → Create database** → production mode → region `asia-southeast1`.
3. **Rules** tab → paste `firestore.rules` → Publish.
4. **Project settings → Service accounts → Generate new private key** → download the JSON.
5. From the JSON copy `project_id`, `client_email`, `private_key`.

Local test: copy `.env.example` → `.env.local`, fill it in, then
```bash
npm install
npm run dev   # http://localhost:3000  and  /admin
```

## 4. Deploy on Vercel
1. Push this folder to a GitHub repo.
2. vercel.com → **Add New → Project** → import the repo (Next.js auto-detected).
3. **Environment Variables** → add `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (paste the whole key, with `\n`s), `ADMIN_PASSWORD`.
4. Deploy. Your guest list: `https://<your-site>.vercel.app/admin`.

## How RSVPs work
- One response per email — if a guest submits again, their RSVP is **updated**, not duplicated.
- The form closes automatically after `rsvpDeadlineISO`.
- Hidden spam trap + server-side validation; guests never touch the database directly.
- Firestore collection: `rsvps`.
