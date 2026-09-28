// ─────────────────────────────────────────────────────────────
//  Edit this file to change every detail shown on the invitation.
//  Photos: drop them into /public/photos (see README).
// ─────────────────────────────────────────────────────────────

export const wedding = {
  groom: "TJ Macaraeg",
  bride: "France Marriela Rendon",
  groomShort: "TJ",
  brideShort: "France",
  monogram: "T&F",
  hashtag: "#TJandFranceForever",

  // Wedding day — ISO with Philippine time offset (+08:00)
  dateISO: "2026-12-08T15:00:00+08:00",
  endISO: "2026-12-08T22:00:00+08:00",
  dateLabel: "Tuesday, December 8, 2026",
  dateShort: "12 · 08 · 2026",

  // Last day guests can RSVP (the form closes after this)
  rsvpDeadlineISO: "2026-11-08T23:59:59+08:00",
  rsvpDeadlineLabel: "November 8, 2026",
  maxGuestsPerRsvp: 2,

  venue: {
    name: "Rico's Cafe",
    subtitle: "at Nena's Sanctuary",
    address: "Sta. Elena Golf and Country Club, Txokolate Road, Brgy. Malitlit, Santa Rosa, Laguna 4026",
    description:
      "A garden sanctuary in the rolling greens of Sta. Elena, where Filipino flavors meet French technique — and where we'll say “I do.”",
    mapQuery: "Rico's Cafe Nena's Sanctuary Sta. Elena Santa Rosa Laguna",
    website: "https://nenasanctuary.com/ricoscafe/",
    tips: [
      "Sta. Elena is a gated estate — tell the guard you're a wedding guest at Rico's Cafe.",
      "Parking is available on site.",
      "Allow about 1–1.5 hours from Metro Manila via SLEX (Sta. Rosa exit).",
    ],
  },

  // Order of the day — edit times to match your program
  schedule: [
    { time: "2:30 PM", title: "Guest Arrival", note: "Welcome drinks in the garden" },
    { time: "3:00 PM", title: "Ceremony", note: "Please be seated by 2:50 PM" },
    { time: "4:00 PM", title: "Cocktails & Photos", note: "Golden hour on the roof deck" },
    { time: "5:30 PM", title: "Reception", note: "Dinner, toasts & dancing" },
  ],

  // Our story — edit or remove milestones
  story: [
    { year: "The Beginning", title: "How we met", text: "Write a line or two about the day your paths first crossed." },
    { year: "The Adventure", title: "Falling in love", text: "The trips, the late-night talks, the little moments that made it real." },
    { year: "The Question", title: "The proposal", text: "Where, when, and how — and of course, she said yes." },
  ],

  dressCode: {
    title: "Garden Formal",
    text: "We'd love to see you in soft, romantic tones. Kindly avoid white and ivory — those are reserved for the bride.",
    colors: [
      { hex: "#A3B18A", name: "Sage" },
      { hex: "#E9DCC0", name: "Champagne" },
      { hex: "#D9A9A0", name: "Dusty Rose" },
      { hex: "#B7A28A", name: "Taupe" },
      { hex: "#6B7A5A", name: "Olive" },
    ],
  },

  gifts:
    "Your presence is the greatest gift of all. Should you wish to bless us further, a monetary gift toward our new home would be warmly appreciated.",

  notes: [
    "We love your little ones, but this is an adults-only celebration.",
    "Kindly RSVP only for the number of seats reserved for you.",
    "Unplugged ceremony — please keep phones away while we say our vows.",
  ],

  // Optional background music: put an mp3 at /public/music.mp3
  musicSrc: "/music.mp3",
};

export type Wedding = typeof wedding;
