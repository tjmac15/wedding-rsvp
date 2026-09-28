import fs from "fs";
import path from "path";

const IMG = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Reads /public/photos at build time.
 *  - hero.(jpg|png|webp)  → full-screen cover photo
 *  - venue.(jpg|…)        → photo shown in the venue section
 *  - everything else      → gallery, sorted by file name (01.jpg, 02.jpg, …)
 */
export function getPhotos() {
  const dir = path.join(process.cwd(), "public", "photos");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => IMG.test(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    /* folder missing — site still renders with elegant placeholders */
  }
  const find = (base: string) => files.find((f) => f.toLowerCase().startsWith(base + "."));
  const hero = find("hero");
  const venue = find("venue");
  const gallery = files.filter((f) => f !== hero && f !== venue);
  const url = (f?: string) => (f ? `/photos/${encodeURIComponent(f)}` : null);
  return { hero: url(hero), venue: url(venue), gallery: gallery.map((f) => `/photos/${encodeURIComponent(f)}`) };
}

export function hasMusic(src: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
  } catch {
    return false;
  }
}
