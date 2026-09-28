"use client";

type Props = { title: string; startISO: string; endISO: string; location: string; details: string };

const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export default function AddToCalendar({ title, startISO, endISO, location, details }: Props) {
  const google =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${stamp(startISO)}/${stamp(endISO)}` +
    `&location=${encodeURIComponent(location)}` +
    `&details=${encodeURIComponent(details)}`;

  function ics() {
    const esc = (s: string) => s.replace(/[,;\\]/g, (m) => "\\" + m);
    const body = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//TJ&France//Wedding//EN", "BEGIN:VEVENT",
      `UID:${stamp(startISO)}-tj-france@wedding`, `DTSTAMP:${stamp(new Date().toISOString())}`,
      `DTSTART:${stamp(startISO)}`, `DTEND:${stamp(endISO)}`,
      `SUMMARY:${esc(title)}`, `LOCATION:${esc(location)}`, `DESCRIPTION:${esc(details)}`,
      "BEGIN:VALARM", "TRIGGER:-P1D", "ACTION:DISPLAY", "DESCRIPTION:Wedding tomorrow!", "END:VALARM",
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([body], { type: "text/calendar" }));
    a.download = "TJ-and-France-Wedding.ics";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="cal-btns">
      <a className="btn btn-ghost" href={google} target="_blank" rel="noopener noreferrer">Google Calendar</a>
      <button className="btn btn-ghost" onClick={ics}>Apple / Outlook</button>
    </div>
  );
}
