import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/great-vibes/400.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import { wedding } from "@/lib/wedding";
import "./globals.css";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${wedding.groomShort} & ${wedding.brideShort} · ${wedding.dateLabel}`,
  description: `You're invited to the wedding of ${wedding.groom} and ${wedding.bride} at ${wedding.venue.name}. Kindly RSVP by ${wedding.rsvpDeadlineLabel}.`,
  openGraph: {
    title: `${wedding.groomShort} & ${wedding.brideShort} are getting married`,
    description: `${wedding.dateLabel} · ${wedding.venue.name} · RSVP by ${wedding.rsvpDeadlineLabel}`,
    type: "website",
    images: ["/photos/hero.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#fbf8f2" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
