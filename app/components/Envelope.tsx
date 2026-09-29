"use client";

import { useEffect, useState } from "react";

const SPARKS = [
  [12, 18], [24, 9], [37, 22], [58, 12], [71, 20], [86, 10], [18, 34], [80, 32], [9, 52],
  [90, 48], [22, 70], [76, 66], [40, 82], [62, 88], [14, 88], [88, 80], [50, 6], [32, 58],
];

type Props = { monogram: string; names: string; date: string };

/**
 * Full-screen embossed envelope. Tapping the seal pulls the four flaps apart,
 * then "You're cordially invited" appears on cream paper before the site shows.
 */
export default function Envelope({ monogram, names, date }: Props) {
  const [stage, setStage] = useState<"closed" | "opening" | "shown" | "leaving" | "gone">("closed");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("env-opened")) { setStage("gone"); return; }
    } catch {}
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = ""; };
  }, []);

  function open() {
    if (stage !== "closed") return;
    setStage("opening");
    window.dispatchEvent(new Event("wedding:open"));
    try { sessionStorage.setItem("env-opened", "1"); } catch {}
    setTimeout(() => setStage("shown"), 1500);
    setTimeout(() => setStage("leaving"), 6200);
    setTimeout(() => { document.documentElement.style.overflow = ""; setStage("gone"); }, 7400);
  }

  function skip() {
    if (stage === "shown") {
      setStage("leaving");
      setTimeout(() => { document.documentElement.style.overflow = ""; setStage("gone"); }, 1100);
    }
  }

  if (stage === "gone") return null;

  return (
    <div className={`env2 ${stage}`} role="dialog" aria-modal aria-label="Wedding invitation" onClick={skip}>
      {/* the card inside */}
      <div className="env2-card">
        <div className="env2-light" />
        <div className="env2-sparkles">
          {SPARKS.map(([x, y], i) => <i key={i} style={{ left: `${x}%`, top: `${y}%`, ["--i" as string]: i }} />)}
        </div>
        <div className="env2-text">
          <span className="env2-small">You&apos;re</span>
          <span className="env2-script">cordially</span>
          <span className="env2-small">Invited</span>
          <span className="env2-names">{names}</span>
          <span className="env2-date">{date}</span>
        </div>
        <svg className="env2-wheat" viewBox="0 0 120 260" aria-hidden>
          <path d="M60 258 C58 200 62 120 60 20" />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i} transform={`translate(60 ${40 + i * 22})`}>
              <path d="M0 0 C-14 -8 -22 -22 -20 -34 C-8 -26 -2 -14 0 0Z" />
              <path d="M0 0 C14 -8 22 -22 20 -34 C8 -26 2 -14 0 0Z" />
            </g>
          ))}
        </svg>
      </div>

      {/* four embossed flaps */}
      <div className="env2-flap f-bottom"><div /></div>
      <div className="env2-flap f-top"><div /></div>
      <div className="env2-flap f-left"><div /></div>
      <div className="env2-flap f-right"><div /></div>

      <button className="env2-seal" onClick={(e) => { e.stopPropagation(); open(); }} aria-label="Open invitation">
        <span>{monogram}</span>
      </button>
      <p className="env2-hint">Tap the seal to open</p>
    </div>
  );
}