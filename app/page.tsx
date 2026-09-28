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
import Parallax from "./components/Parallax";
import Botanical from "./components/Botanical";
import Marquee from "./components/Marquee";

function Title({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <Flourish />
    </div>
  );
}

function Flourish() {
  return (
    <svg className="flourish" viewBox="0 0 200 20" aria-hidden>
      <path d="M0 10 H80 M120 10 H200" stroke="currentColor" strokeWidth="0.8" />
      <path d="M100 2 C104 8 104 12 100 18 C96 12 96 8 100 2Z" fill="currentColor" />
      <circle cx="88" cy="10" r="1.6" fill="currentColor" />
      <circle cx="112" cy="10" r="1.6" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const photos = getPhotos();
  const music = hasMusic(w.musicSrc);
  const d = new Date(w.dateISO);
  const month = d.toLocaleString("en-US", { month: "long", timeZone: "Asia/Manila" });
  const day = d.toLocaleString("en-US", { day: "numeric", timeZone: "Asia/Manila" });
  const weekday = d.toLocaleString("en-US", { weekday: "long", timeZone: "Asia/Manila" });
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(w.venue.mapQuery)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(w.venue.mapQuery)}`;

  return (
    <main>
      <Envelope monogram={w.monogram} names={`${w.groomShort} & ${w.brideShort}`} date={w.dateShort} />
      <Petals />
      <Nav monogram={w.monogram} />
      {music && <MusicToggle src={w.musicSrc} />}

      {/* ── HERO ─────────────────────────────── */}
      <header className={`hero ${photos.hero ? "has-photo" : ""}`} id="top">
        <Parallax className="hero-bg" speed={0.3}>
          {photos.hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photos.hero} alt={`${w.groomShort} and ${w.brideShort}`} fetchPriority="high" />
          ) : (
            <div className="hero-fallback" />
          )}
        </Parallax>
        <div className="hero-veil" />
        <Botanical className="bt-tl" />
        <Botanical className="bt-br" />
        <div className="hero-frame" aria-hidden />

        <div className="hero-inner">
          <p className="eyebrow hero-line l1">Together with their families</p>
          <h1 className="names">
            <span className="n n1 script">{w.groomShort}</span>
            <span className="amp">&amp;</span>
            <span className="n n2 script">{w.brideShort}</span>
          </h1>
          <p className="fullnames hero-line l2">{w.groom} &nbsp;·&nbsp; {w.bride}</p>
          <p className="eyebrow hero-line l3" style={{ marginTop: 28 }}>are getting married</p>
          <div className="hero-date hero-line l4">
            <span>{weekday}</span>
            <strong>{month} {day}</strong>
            <span>2026</span>
          </div>
          <div className="hero-line l5"><Countdown dateISO={w.dateISO} /></div>
          <a className="btn btn-glow hero-line l6" href="#rsvp">Kindly RSVP</a>
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

      {/* ── GALLERY ───────────────────────────── */}
      <section className="block" id="gallery">
        <div className="wrap wide">
          <Reveal><Title eyebrow="Moments with you" title="Our Gallery" /></Reveal>
          <Reveal><Gallery photos={photos.gallery} /></Reveal>
        </div>
      </section>

      <Marquee dark items={["With love", "Save the date", "Rico's Cafe", "12 · 08 · 2026"]} />

      {/* ── ATTIRE / GIFTS ────────────────────── */}
      <section className="block alt" id="attire">
        <div className="narrow center">
          <Reveal><Title eyebrow={w.dressCode.title} title="Dress Code" /></Reveal>
          <Reveal><p className="lead">{w.dressCode.text}</p></Reveal>
          <div className="swatches">
            {w.dressCode.colors.map((c, i) => (
              <Reveal key={c.hex} from="zoom" delay={i * 90}>
                <div className="swatch">
                  <span style={{ background: c.hex }} />
                  <em>{c.name}</em>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 96 }}>
            <Reveal><Title eyebrow="A gentle note" title="Gifts" /></Reveal>
            <Reveal><p className="lead">{w.gifts}</p></Reveal>
          </div>

          <Reveal>
            <ul className="notes">
              {w.notes.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

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
        <Flourish />
        <p className="script foot-names">{w.groomShort} &amp; {w.brideShort}</p>
        <p className="eyebrow">{w.dateLabel} · {w.venue.name}</p>
      </footer>
    </main>
  );
}
