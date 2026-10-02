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
  dateISO: "2026-12-08T15:30:00+08:00",
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
      "Allow about 1–1.5 hours from Metro Manila via SLEX (Cabuyao exit).",
    ],
  },

  // Order of the day — edit times to match your program
  schedule: [
    { time: "3:30 PM", title: "Guest Arrival", note: "Welcome drinks in the garden" },
    { time: "4:00 PM", title: "Ceremony", note: "Please be seated by 4:00 PM" },
    { time: "5:30 PM", title: "Photo taking", note: "Golden hour by the lake" },
    { time: "6:00 PM", title: "Reception", note: "Dinner, toasts & dancing" },
  ],

  // Our story — edit or remove milestones
  story: [
    { year: "The Beginning", title: "How we met", text: "One little swipe brought us together, and somehow everything just clicked." },
    { year: "The Adventure", title: "Falling in love", text: "Somewhere between new places, good food, quiet nights and growing side by side, we became home to each other." },
    { year: "The Question", title: "The proposal", text: "With God at the heart of our story, we chose forever - and beneath of a worhsip song, she said YES." },
  ],

  dressCode: {
    title: "Forest Formal",
    text: "We invite everyone to dress in earthy, elegant tones of greens and browns.",
    colors: [
      { hex: "#80856D", name: "Oil Green" },
      { hex: "#5A4A42", name: "Hot Fudge" },
      { hex: "#EDE3D2", name: "Antique White" },
    ],
    entourage: {
      label: "Overall Entourage, Principal & Secondary Sponsors",
      image: "/dresscode/entourage.webp",
      // shades: ["#3F4A2A", "#5B6B3A", "#7A8450", "#9AA57A", "#4E5A36"],
      rules: [
        { who: "Women", text: "Long dresses in shades of forest green: moss, olive, sage, deep green, or any earthy, foresty shade of green." },
        { who: "Men", text: "Formal attire in brown: a brown coat and tie, or a brown long-sleeve polo paired with formal trousers." },
      ],
    },
    guests: {
      label: "Guests",
      image: "/dresscode/guests.webp",
      // shades: ["#3B2A22", "#5A3D2E", "#7B5238", "#A0714F", "#C9A27E"],
      attire: "Semi-Formal · Shades of Brown",
      text: "Any shade of brown, from deep chocolate and espresso to warm caramel, tan and other earthy brown tones.",
    },
    note: [
      "We'd love for everyone to look and feel their best, but we also want to keep things practical and comfortable.",
      "If you're planning to buy something new for the occasion, we hope you'll choose a piece you can wear and enjoy again long after our celebration. There's no need for anything grand or extravagant.",
    ],
    noteLine: "Bring your best look and celebrate with us.",
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
      ["Mr. Teofilo Macaraeg Jr.", "Mrs. Jenny Baron"],
      ["Mr. Leo Sunep", "Mrs. Anette Macaraeg"],
      ["Mr. Joseph Macaraeg", "Mrs. Anna Macaraeg"],
      ["Mr. Alvin Fidel", "Mrs. Rose Manguerra"],
      ["Mr. Leonardo Bathan", "Mrs. Naneth Manuevo"],
    ],
    honor: [
      { role: "Maid of Honor", names: ["Ms. Ia Shekina Mojado"] },
      { role: "Best Man", names: ["Mr. John Eric Sorita"] },
    ],
    secondary: [
      { role: "Candles", names: ["Mr. JR Cabinian", "Ms. Jonelle Rendon"] },
      { role: "Veil", names: ["Mr. VJ Cabinian", "Ms. Vianjen Rendon"] },
      { role: "Cord", names: ["Mr. Christian Rendon", "Ms. Princess Nicole Ferrer"] },
    ],
    bearers: [
      { role: "Bible Bearer", names: ["Vander Louise Macaraeg"] },
      { role: "Ring Bearer", names: ["Philo Requina"] },
    ],
    flowerGirls: ["Gaela Ylisse Gozum", "Princess Katelyn Macaraeg", "Athena Louise Alzona", "Zia Macaraeg"],
  },
  
  // Optional background music: put an mp3 at /public/music.mp3
  musicSrc: "/music.mp3",
};

export type Wedding = typeof wedding;