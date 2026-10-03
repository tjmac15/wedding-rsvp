// ─────────────────────────────────────────────────────────────
//  Guest list — only these names can RSVP (1 seat per name).
//  Add, remove or fix names here, then push.
// ─────────────────────────────────────────────────────────────

export const GUESTS: string[] = [
  "Ellen Rendon",
  "Ronald Rendon",
  "Christian Adam Rendon",
  "Vianjen Marie Rendon",
  "Jonelle Marie Rendon",
  "Rose Manguerra",
  "Ray Manguerra",
  "Rio Zarina Requina",
  "Mabini Requina",
  "Enzo Requina",
  "Philo Requina",
  "Carlo Manuel Manguerra",
  "Brian Manguerra",
  "Leigh Manguerra",
  "Janjan Manguerra",
  "Christine Manguerra",
  "Jun Manuevo",
  "Naneth Manuevo",
  "Junica Manuevo",
  "Jomar Gozum",
  "Gianna Ysabelle Gozum",
  "Gaela Ylisse Gozum",
  "Verna Montealto",
  "Ariel Montealto",
  "Ron Mandigma",
  "Nancy Mandigma",
  "Bert Delos Reyes",
  "Aloy Luna",
  "Leonardo Bathan",
  "Michelle Bathan",
  "Francine Atawa",
  "Banel Atawa",
  "Leomhil Bathan",
  "Janine Bathan",
  "Toto Bathan",
  "Mary Josephine Cabinian",
  "Jorge Jesse Cabinian",
  "Victoriano Jesus Cabinian",
  "Angelica Tuquero",
  "Jorge Jesse Cabinian Jr",
  "Manuel Macaraeg",
  "Cecilia Macaraeg",
  "Mark Joseph Macaraeg",
  "Shayne Macaraeg",
  "Princess Katelyn Macaraeg",
  "Catherine Alzona",
  "Ian Alzona",
  "Athena Louise Alzona",
  "Christiana Monica Macaraeg",
  "Biwie Parrotina",
  "Joyce Pineda",
  "Teofilo Macaraeg Jr",
  "Vander Macaraeg",
  "Vito Pineda",
  "Vincent Macaraeg",
  "Danilo Macaraeg",
  "Anette Macaraeg",
  "Jazzen Joy Macaraeg",
  "Jammer Macaraeg",
  "Haelyn Macaraeg",
  "Zia Macaraeg",
  "Joseph Macaraeg",
  "Anna Macaraeg",
  "Yohann Macaraeg",
  "Narcisa Macaraeg",
  "Cecilla Javier",
  "Francisco Javier",
  "Robert Macaraeg",
  "Arnold Ferrrer",
  "Aaron Ferrer",
  "Arlene Moulic",
  "Arnel Ferrer",
  "Alvin Fidel",
  "Leo Sunep",
  "Princess Nicole Ferrer",
  "Ia Shekina Mojado",
  "Bianca Marie Apacible",
  "Gabrielle Lladoc",
  "Jeffson Mercado",
  "Kevin Manuel",
  "John Eric Sorita",
  "Jerica Sorita",
  "Ervin Quizon",
  "Rachel Ann Quizon",
  "Richard Joseph Abad",
  "Cory Abad",
  "Miguel Abad",
  "Maverick Abad",
];

/** lower-case, no accents/punctuation, single spaces */
export const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

const BY_KEY = new Map(GUESTS.map((g) => [norm(g), g]));

/** Exact guest-list name for a submitted name, or null if not invited. */
export function findGuest(name: string): string | null {
  return BY_KEY.get(norm(name)) ?? null;
}

/** Names containing every typed word (min. 2 letters typed). */
export function searchGuests(q: string, limit = 6): string[] {
  const words = norm(q).split(" ").filter(Boolean);
  if (!words.length || norm(q).length < 2) return [];
  return GUESTS.filter((g) => {
    const n = norm(g);
    return words.every((w) => n.split(" ").some((part) => part.startsWith(w)) || n.includes(w));
  }).slice(0, limit);
}
