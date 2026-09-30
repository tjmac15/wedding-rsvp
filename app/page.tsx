import Image from "next/image";
import { wedding as w } from "@/lib/wedding";
import { getPhotos, hasMusic } from "@/lib/photos";
import Countdown from "./components/Countdown";
import Reveal from "./components/Reveal";
import RsvpForm from "./components/RsvpForm";
import Envelope from "./components/Envelope";
import Petals from "./components/Petals";
import Nav from "./components/Nav";
import MusicToggle from "./components/MusicToggle";
import Gallery from "./components/Gallery";
import AddToCalendar from "./components/AddToCalendar";
import { OliveBranch, Sprig, Divider, LeafCluster } from "./components/Ornaments";
import Botanical from "./components/Botanical";
import Marquee from "./components/Marquee";

function Title({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <Divider />
    </div>
  );
}

const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
  "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
function yearWords(y: number) {
  const r = y % 100;
  const rest = r < 20 ? ONES[r] : `${TENS[Math.floor(r / 10)]}${r % 10 ? " " + ONES[r % 10] : ""}`;
  return `two thousand${rest ? " " + rest : ""}`;
}

export default function Home() {
  const photos = getPhotos();
  const music = hasMusic(w.musicSrc);
  const d = new Date(w.dateISO);
  const month = d.toLocaleString("en-US", { month: "long", timeZone: "Asia/Manila" });
  const day = d.toLocaleString("en-US", { day: "numeric", timeZone: "Asia/Manila" });
  const weekday = d.toLocaleString("en-US", { weekday: "long", timeZone: "Asia/Manila" });
  const dayNum = d.toLocaleString("en-US", { day: "2-digit", timeZone: "Asia/Manila" });
  const year = Number(d.toLocaleString("en-US", { year: "numeric", timeZone: "Asia/Manila" }));
  const time = d.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Manila" }).replace(/\s?[AP]M/, "");
  const hour24 = Number(d.toLocaleString("en-US", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Manila" }));
  const partOfDay = hour24 < 12 ? "morning" : hour24 < 17 ? "afternoon" : "evening";
  const initialA = w.groomShort.charAt(0);
  const initialB = w.brideShort.charAt(0);
  const strip = w.coverPhoto ? `/photos/${w.coverPhoto}` : photos.hero ?? photos.gallery[0] ?? null;
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(w.venue.mapQuery)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(w.venue.mapQuery)}`;

  return (
    <main>
      <Envelope monogram={w.monogram} names={`${w.groomShort} & ${w.brideShort}`} date={w.dateShort} />
      <Petals />
      <Nav monogram={w.monogram} />
      {music && <MusicToggle src={w.musicSrc} />}

      {/* ── HERO: the invitation card ─────────── */}
      <header className={`inv ${strip ? "has-strip" : ""}`} id="top">
        <div className="inv-corner inv-corner-tl" aria-hidden />
        <div className="inv-corner inv-corner-br" aria-hidden />

        <div className="inv-stage">
          {strip && (
            <div className="inv-strip">
              <Image
                src={strip} alt={`${w.groomShort} and ${w.brideShort}`} fill priority quality={78}
                sizes="(max-width: 820px) 90vw, 480px"
                style={{ objectFit: "cover", objectPosition: w.coverFocus }}
              />
            </div>
          )}

          <div className="inv-card">
            <LeafCluster className="inv-leaves" />
            <div className="inv-mono hero-line l1">
              <Sprig />
              <p><span>{initialA}</span><i /><span>{initialB}</span></p>
            </div>

            <p className="inv-small hero-line l2">Together with their families</p>
            <h1 className="inv-names">
              <span className="hero-line l2">{w.groom}</span>
              <span className="inv-and hero-line l3"><i />and<i /></span>
              <span className="hero-line l3">{w.bride}</span>
            </h1>
            <p className="inv-small hero-line l4">
              Invites you to their intimate wedding celebration
            </p>

            <div className="inv-date hero-line l4">
              <span>{weekday}</span>
              <strong>{dayNum}</strong>
              <span>{month}</span>
            </div>
            <p className="inv-year hero-line l5">{year}</p>
            <p className="inv-script hero-line l5">at {time} in the {partOfDay}</p>
            <p className="inv-venue hero-line l5">{w.venue.name} &nbsp;·&nbsp; Santa Rosa, Laguna</p>

            <div className="hero-line l6"><Countdown dateISO={w.dateISO} /></div>
            <a className="btn hero-line l6" href="#rsvp">Kindly RSVP</a>
            <Divider className="inv-foot hero-line l6" />
          </div>

          <OliveBranch className="inv-olive" />
        </div>
        <a className="scroll-cue" href="#story" aria-label="Scroll down"><span /></a>
      </header>

      {/* ── WELCOME (editorial) ────────────────── */}
      <section className="welcome">
        <div className="welcome-grid">
          <Reveal from="left" className="welcome-date">
            <span className="big-num">08</span>
            <span className="roman">XII · MMXXVI</span>
            <span className="eyebrow">Santa Rosa, Laguna</span>
          </Reveal>
          <Reveal from="right" delay={120} className="welcome-copy">
            <p className="eyebrow">A celebration of love</p>
            <p className="quote-text">
              “So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate.”
            </p>
            <p className="eyebrow" style={{ marginTop: 14 }}>Matthew 19:6</p>
            <p className="welcome-body">
              Among the lakes, terraces and quiet greens of Sta. Elena, we&apos;ll begin our forever, and we
              can&apos;t imagine that day without you.
            </p>
          </Reveal>
        </div>
      </section>

      <Marquee items={["Celebrate", "Love", "Inspire", `${w.groomShort} & ${w.brideShort}`, "December 8, 2026"]} />

      {/* ── OUR STORY ─────────────────────────── */}
      <section className="block" id="story">
        <div className="wrap">
          <Reveal><Title eyebrow="How it all began" title="Our Story" /></Reveal>
          <div className="timeline">
            {w.story.map((s, i) => (
              <Reveal key={s.title} from={i % 2 ? "right" : "left"} delay={i * 80} className={`t-item ${i % 2 ? "right" : "left"}`}>
                <div className="t-dot" />
                <div className="t-card">
                  <p className="eyebrow">{s.year}</p>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATE BAND ─────────────────────────── */}
      <section className="date-band">
        <Reveal from="zoom">
          <div className="calendar">
            <p className="eyebrow">{month} 2026</p>
            <div className="cal-grid">
              {["S", "M", "T", "W", "T", "F", "S"].map((x, i) => <b key={i}>{x}</b>)}
              {(() => {
                const first = new Date(Date.UTC(2026, 11, 1)).getUTCDay();
                const cells = [];
                for (let i = 0; i < first; i++) cells.push(<span key={`e${i}`} />);
                for (let n = 1; n <= 31; n++)
                  cells.push(<span key={n} className={n === Number(day) ? "the-day" : ""}>{n}</span>);
                return cells;
              })()}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── ENTOURAGE ─────────────────────────── */}
      <section className="block" id="entourage">
        <div className="wrap">
          <Reveal><Title eyebrow="With the ones we love" title="The Entourage" /></Reveal>
          <div className="entg">
            <Reveal className="et et-full">
              <p className="et-role">Principal Sponsors</p>
              <ul className="et-sponsors">
                {w.entourage.sponsors.map(([a, b]) => (
                  <li key={a}>{a} <i>&amp;</i> {b}</li>
                ))}
              </ul>
            </Reveal>

            {w.entourage.honor.map((g, i) => (
              <Reveal key={g.role} delay={i * 80} className="et et-half">
                <p className="et-role">{g.role}</p>
                {g.names.map((n) => <p key={n} className="et-name">{n}</p>)}
              </Reveal>
            ))}

            {w.entourage.secondary.map((g, i) => (
              <Reveal key={g.role} delay={i * 80} className={`et et-third${i === 2 ? " et-last" : ""}`}>
                <p className="et-role">{g.role}</p>
                <p className="et-name">{g.names[0]}</p>
                <p className="et-amp">&amp;</p>
                <p className="et-name">{g.names[1]}</p>
              </Reveal>
            ))}

            {w.entourage.bearers.map((g, i) => (
              <Reveal key={g.role} delay={i * 80} className="et et-half">
                <p className="et-role">{g.role}</p>
                {g.names.map((n) => <p key={n} className="et-name">{n}</p>)}
              </Reveal>
            ))}

            <Reveal className="et et-full">
              <p className="et-role">Flower Girls</p>
              <ul className="et-girls">
                {w.entourage.flowerGirls.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── DETAILS ───────────────────────────── */}
      <section className="block alt" id="details">
        <div className="wrap">
          <Reveal><Title eyebrow="When & where" title="The Details" /></Reveal>

          <div className="schedule">
            {w.schedule.map((s, i) => (
              <Reveal key={s.title} delay={i * 110} className="sched-item">
                <span className="sched-time">{s.time}</span>
                <span className="sched-title">{s.title}</span>
                <span className="sched-note">{s.note}</span>
              </Reveal>
            ))}
          </div>

          <Reveal from="up">
            <div className="venue">
              <div className="venue-media">
                {photos.venue ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photos.venue} alt={w.venue.name} loading="lazy" />
                ) : (
                  <iframe
                    title={`Map to ${w.venue.name}`}
                    src={mapEmbed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
              </div>
              <div className="venue-body">
                <p className="eyebrow">Ceremony &amp; Reception</p>
                <h3 className="venue-name script">{w.venue.name}</h3>
                <p className="venue-sub">{w.venue.subtitle}</p>
                <p className="venue-desc">{w.venue.description}</p>
                <p className="venue-addr">{w.venue.address}</p>
                <div className="venue-actions">
                  <a className="btn" href={mapLink} target="_blank" rel="noopener noreferrer">Get directions</a>
                  <a className="link" href={w.venue.website} target="_blank" rel="noopener noreferrer">Venue website →</a>
                </div>
                <ul className="tips">
                  {w.venue.tips.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>

          {photos.venue && (
            <Reveal>
              <div className="map-frame">
                <iframe title={`Map to ${w.venue.name}`} src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </Reveal>
          )}

          <Reveal>
            <div style={{ textAlign: "center", marginTop: 44 }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>Save the date</p>
              <AddToCalendar
                title={`${w.groomShort} & ${w.brideShort}'s Wedding`}
                startISO={w.dateISO}
                endISO={w.endISO}
                location={`${w.venue.name}, ${w.venue.address}`}
                details={`We can't wait to celebrate with you! RSVP by ${w.rsvpDeadlineLabel}.`}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ATTIRE / GIFTS ────────────────────── */}
      <section className="block alt" id="attire">
        <div className="narrow center">
          <Reveal><Title eyebrow={w.dressCode.title} title="Dress Code" /></Reveal>
          <Reveal><p className="lead">{w.dressCode.text}</p></Reveal>

          <div className="dc-grid">
            {[
              { k: "entourage", d: w.dressCode.entourage },
              { k: "guests", d: w.dressCode.guests },
            ].map(({ k, d }, i) => (
              <Reveal key={k} delay={i * 120} className="dc-card">
                <p className="dc-label">{d.label}</p>
                <a className="dc-look" href={d.image} target="_blank" rel="noopener noreferrer" aria-label={`View ${d.label} lookbook`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.image} alt={`${d.label} outfit inspiration`} loading="lazy" />
                  <span>View lookbook</span>
                </a>
                {"rules" in d
                  ? (d as typeof w.dressCode.entourage).rules.map((r) => (
                      <div key={r.who} className="dc-rule">
                        <p className="dc-who">{r.who}</p>
                        <p>{r.text}</p>
                      </div>
                    ))
                  : (
                      <div className="dc-rule">
                        <p className="dc-who">{(d as typeof w.dressCode.guests).attire}</p>
                        <p>{(d as typeof w.dressCode.guests).text}</p>
                      </div>
                    )}
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="dc-note">
              <p className="dc-note-title">A little note from us</p>
              {w.dressCode.note.map((n) => <p key={n}>{n}</p>)}
              <p className="dc-note-line">{w.dressCode.noteLine}</p>
            </div>
          </Reveal>

          <div style={{ marginTop: 96 }}>
            <Reveal><Title eyebrow="Be a blessing" title="Gifts" /></Reveal>
            <Reveal><p className="lead">{w.gifts}</p></Reveal>
          </div>

        </div>
      </section>

      {/* ── GALLERY ───────────────────────────── */}
      <section className="block" id="gallery">
        <div className="wrap wide">
          <Reveal><Title eyebrow="Memories we share" title="Our Gallery" /></Reveal>
          <Reveal><Gallery photos={photos.gallery} /></Reveal>
        </div>
      </section>

      <Marquee dark items={["With love", "Save the date", "Rico's Cafe", "12 · 08 · 2026"]} />

      {/* ── RSVP ──────────────────────────────── */}
      <section className="block rsvp-section" id="rsvp">
        <div className="narrow">
          <Reveal><Title eyebrow="Kindly respond" title="RSVP" /></Reveal>
          <Reveal from="zoom" className="form-wrap">
            <Botanical className="bt-form-l" />
            <Botanical className="bt-form-r" />
            <RsvpForm
              maxGuests={w.maxGuestsPerRsvp}
              deadlineISO={w.rsvpDeadlineISO}
              deadlineLabel={w.rsvpDeadlineLabel}
            />
          </Reveal>
          <p className="deadline">Please reply on or before <strong>{w.rsvpDeadlineLabel}</strong>.</p>
        </div>
      </section>

      <footer>
        <Divider />
        <p className="script foot-names">{w.groomShort} &amp; {w.brideShort}</p>
        <p className="eyebrow">{w.dateLabel} · {w.venue.name}</p>
      </footer>
    </main>
  );
}