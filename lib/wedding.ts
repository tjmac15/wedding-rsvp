// ─────────────────────────────────────────────────────────────
//  Edit this file to change every detail shown on the invitation.
//  Photos: drop them into /public/photos (see README).
// ─────────────────────────────────────────────────────────────

export const wedding = {
  groom: "TJ Macaraeg",
  bride: "France Marriela Rendon",
  groomShort: "TJ",
  brideShort: "Mariel",
  monogram: "T&M",
  coverPhoto: "15.JPG",
 coverFocus: "center 70%",
  

  // Wedding day — ISO with Philippine time offset (+08:00)
  dateISO: "2026-12-08T16:30:00+08:00",
  endISO: "2026-12-08T23:00:00+08:00",
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
    { time: "3:30 PM", title: "Guest Arrival", note: "Welcome drinks in the garden" },
    { time: "4:30 PM", title: "Ceremony", note: "Please be seated by 4:30 PM" },
    { time: "6:00 PM", title: "Cocktails & Photos", note: "Golden hour on the roof deck" },
    { time: "6:30 PM", title: "Reception", note: "Dinner, toasts & dancing" },
  ],

  // Our story — edit or remove milestones
  story: [
    { year: "The Beginning", title: "How we met", text: "One little swipe brought us together, and somehow everything just clicked." },
    { year: "The Adventure", title: "Falling in love", text: "Somewhere between new places, good food, quiet nights and growing side by side, we became home to each other." },
    { year: "The Question", title: "The proposal", text: "With God at the heart of our story, we chose forever - and beneath of a worhsip song, she said YES." },
  ],

  dressCode: {
    title: "Forest Formal",
    text: "Our palette is inspired by the forest: earthy greens and rich browns. Kindly avoid pure white — that's reserved for the bride.",
    colors: [
      { hex: "#80856D", name: "Oil Green" },
      { hex: "#5A4A42", name: "Hot Fudge" },
      { hex: "#EDE3D2", name: "Antique White" },
    ],
  },

  gifts:
    "Your presence is the greatest gift of all. Should you wish to bless us further, a monetary gift toward our new future together would be warmly appreciated.",

  notes: [
    "We'd love everyone to look their best and make the photos extra beautiful, so please come dressed according to the dress code and bring your best look.",
    "This is an intimate family celebration, and having you there to witness this special chapter, means more to us, than we can say.",
    "Kindly RSVP only for the number of seats reserved for you.",
    "Unplugged ceremony — please keep phones away while we say our vows.",
  ],

    // The Entourage
  entourage: {
    sponsors: [
      ["Mr. Francisco Javier", "Mrs. Cecilia Javier"],
      ["Mr. Manuel Macaraeg", "Mrs. Ma. Cecilia Macaraeg"],
      ["Mr. Arnel Ferrer", "Mrs. Arlene Moulic"],
      ["Mr. Aaron Ferrer", "Mrs. Marilou Juarez"],
      ["Mr. Alvin Fidel", "Mrs. Jenny Baron"],
      ["Mr. Leo Sunep", "Mrs. Anette Macaraeg"],
      ["Mr. Joseph Macaraeg", "Mrs. Anna Macaraeg"],
      ["Mr. Ray Manguerra", "Mrs. Rose Manguerra"],
      ["Mr. Jun Manuevo", "Mrs. Naneth Manuevo"],
    ],
    honor: [
      { role: "Maid of Honor", names: ["Ms. Shekina Mojado"] },
      { role: "Best Man", names: ["Mr. John Eric Sorita"] },
    ],
    secondary: [
      { role: "Candles", names: ["Mr. JR Cabinian", "Ms. Jonelle Rendon"] },
      { role: "Veil", names: ["Mr. VJ Cabinian", "Ms. Vianjen Rendon"] },
      { role: "Cord", names: ["Mr. Christian Rendon", "Ms. Jazzen Macaraeg"] },
    ],
    flowerGirls: ["Gaela Ylisse Gozum", "Princess Katelyn Macaraeg", "Athena Louise Alzona", "Zia Macaraeg"],
  },
  
  // Optional background music: put an mp3 at /public/music.mp3
  musicSrc: "/music.mp3",
};

export type Wedding = typeof wedding;
