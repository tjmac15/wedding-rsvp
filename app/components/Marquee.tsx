/** Endless scrolling text band. */
export default function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const row = [...items, ...items, ...items];
  return (
    <div className={`marquee ${dark ? "dark" : ""}`} aria-hidden>
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div className="marquee-group" key={k}>
            {row.map((t, i) => (
              <span key={i}>
                {t}
                <em>✦</em>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
