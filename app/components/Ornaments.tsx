/* Decorative SVGs for the invitation look: olive branch, monogram sprig, dividers. */

type P = { className?: string };

/** Realistic dark olive branch with filled leaves and olives. */
export function OliveBranch({ className = "" }: P) {
  // points along a gentle curve from bottom (stem base) to top (tip)
  const pt = (t: number) => {
    const x = (1 - t) ** 2 * 60 + 2 * (1 - t) * t * 20 + t * t * 150;
    const y = (1 - t) ** 2 * 640 + 2 * (1 - t) * t * 300 + t * t * 20;
    return [x, y];
  };
  const angle = (t: number) => {
    const [x1, y1] = pt(Math.max(0, t - 0.01));
    const [x2, y2] = pt(Math.min(1, t + 0.01));
    return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  };
  const leaves = Array.from({ length: 17 }, (_, i) => {
    const t = 0.08 + i * 0.054;
    const [x, y] = pt(t);
    const side = i % 2 ? 1 : -1;
    const len = 1 - t * 0.35;
    return { x, y, rot: angle(t) + side * (38 + (i % 3) * 6), s: len, i };
  });
  const olives = [0.22, 0.41, 0.63, 0.8].map((t, i) => {
    const [x, y] = pt(t);
    return { x: x + (i % 2 ? 18 : -18), y: y + 6, r: 6.5 - i * 0.6 };
  });
  const [tx, ty] = pt(1);

  return (
    <svg className={`olive ${className}`} viewBox="0 0 220 660" aria-hidden>
      <defs>
        <linearGradient id="leafG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#33362a" />
          <stop offset="0.55" stopColor="#474b33" />
          <stop offset="1" stopColor="#5c6045" />
        </linearGradient>
        <radialGradient id="oliveG" cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#9c9772" />
          <stop offset="0.6" stopColor="#6d684a" />
          <stop offset="1" stopColor="#555137" />
        </radialGradient>
      </defs>
      <path
        d={`M60 640 Q20 300 ${tx} ${ty}`}
        fill="none" stroke="#6d684a" strokeWidth="2.2" strokeLinecap="round"
      />
      {leaves.map((l) => (
        <g key={l.i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(${l.s})`}>
          <path d="M0 0 C14 -11 52 -13 78 0 C52 12 14 11 0 0Z" fill="url(#leafG)" />
          <path d="M2 0 L72 0" stroke="#8c8866" strokeWidth="0.7" opacity="0.7" />
        </g>
      ))}
      {olives.map((o, i) => (
        <g key={i}>
          <path d={`M${o.x} ${o.y - o.r} l${i % 2 ? -10 : 10} -8`} stroke="#6d684a" strokeWidth="1.2" />
          <ellipse cx={o.x} cy={o.y} rx={o.r} ry={o.r * 1.3} fill="url(#oliveG)" />
        </g>
      ))}
    </svg>
  );
}

/** Fine line sprig that arches over the monogram. */
export function Sprig({ className = "" }: P) {
  const leaf = (x: number, y: number, r: number, k: number) => (
    <path key={k} transform={`translate(${x} ${y}) rotate(${r})`} d="M0 0 C4 -5 13 -6 18 0 C13 5 4 5 0 0Z" />
  );
  return (
    <svg className={`sprig ${className}`} viewBox="0 0 160 70" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M80 66 C62 50 42 30 14 22" />
        <path d="M80 66 C98 50 118 30 146 22" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="0.9">
        {[
          [64, 52, -150], [60, 50, -60], [48, 40, -160], [44, 38, -70], [32, 31, -165], [28, 29, -80], [18, 24, -170],
        ].map(([x, y, r], i) => leaf(x, y, r, i))}
        {[
          [96, 52, -30], [100, 50, -120], [112, 40, -20], [116, 38, -110], [128, 31, -15], [132, 29, -100], [142, 24, -10],
        ].map(([x, y, r], i) => leaf(x, y, r, i + 10))}
      </g>
    </svg>
  );
}

/** Thin rule with a small ornament in the middle. */
export function Divider({ className = "" }: P) {
  return (
    <svg className={`divider-orn ${className}`} viewBox="0 0 240 16" aria-hidden>
      <g stroke="currentColor" fill="none" strokeWidth="0.8">
        <path d="M0 8 H96" />
        <path d="M144 8 H240" />
        <path d="M104 8 C108 2 114 2 120 8 C126 14 132 14 136 8" />
        <path d="M104 8 C108 14 114 14 120 8 C126 2 132 2 136 8" />
      </g>
      <circle cx="100" cy="8" r="1.6" fill="currentColor" />
      <circle cx="140" cy="8" r="1.6" fill="currentColor" />
      <circle cx="120" cy="8" r="2.2" fill="currentColor" />
    </svg>
  );
}

/** Wax seal with a laurel wreath and split monogram (decorative). */
export function WaxSeal({ a, b, className = "" }: { a: string; b: string } & P) {
  return (
    <div className={`wax ${className}`} aria-hidden>
      <svg viewBox="0 0 100 100">
        <g fill="none" stroke="rgba(255,244,214,0.55)" strokeWidth="1.1" strokeLinecap="round">
          <path d="M30 78 C18 66 16 46 26 30" />
          <path d="M70 78 C82 66 84 46 74 30" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <path d={`M${27 - i * 0.5} ${72 - i * 10} q-7 -2 -9 -9`} />
              <path d={`M${73 + i * 0.5} ${72 - i * 10} q7 -2 9 -9`} />
            </g>
          ))}
        </g>
      </svg>
      <span>{a}</span>
      <i />
      <span>{b}</span>
    </div>
  );
}
/** Short olive sprig — leaves along a curved stem, with two olives. */
export function LeafCluster({ className = "" }: P) {
  const pt = (t: number) => [
    (1 - t) ** 2 * 12 + 2 * (1 - t) * t * 80 + t * t * 208,
    (1 - t) ** 2 * 118 + 2 * (1 - t) * t * 40 + t * t * 34,
  ];
  const ang = (t: number) => {
    const [a, b] = pt(Math.max(0, t - 0.01)), [c, d] = pt(Math.min(1, t + 0.01));
    return (Math.atan2(d - b, c - a) * 180) / Math.PI;
  };
  const leaves = Array.from({ length: 9 }, (_, i) => {
    const t = 0.12 + i * 0.1;
    const [x, y] = pt(t);
    const side = i % 2 ? 1 : -1;
    return { x, y, r: ang(t) + side * 42, s: 0.95 - i * 0.05, i };
  });
  const [tx, ty] = pt(1);
  const [o1x, o1y] = pt(0.3), [o2x, o2y] = pt(0.55);
  return (
    <svg className={`leaf-cluster ${className}`} viewBox="0 0 220 140" aria-hidden>
      <defs>
        <linearGradient id="lcG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#33362a" />
          <stop offset="0.55" stopColor="#474b33" />
          <stop offset="1" stopColor="#5c6045" />
        </linearGradient>
        <radialGradient id="lcO" cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#9c9772" />
          <stop offset="0.6" stopColor="#6d684a" />
          <stop offset="1" stopColor="#555137" />
        </radialGradient>
      </defs>
      <path d={`M12 118 Q80 40 ${tx} ${ty}`} stroke="#6d684a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {leaves.map((l) => (
        <g key={l.i} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}>
          <path d="M0 0 C10 -8 36 -9 54 0 C36 8 10 8 0 0Z" fill="url(#lcG)" />
          <path d="M3 0 L50 0" stroke="#8c8866" strokeWidth="0.6" opacity="0.7" />
        </g>
      ))}
      <path d={`M${o1x} ${o1y} l6 10`} stroke="#6d684a" strokeWidth="1.1" />
      <ellipse cx={o1x + 7} cy={o1y + 16} rx="5.4" ry="6.8" fill="url(#lcO)" />
      <path d={`M${o2x} ${o2y} l-4 11`} stroke="#6d684a" strokeWidth="1.1" />
      <ellipse cx={o2x - 5} cy={o2y + 17} rx="5" ry="6.4" fill="url(#lcO)" />
    </svg>
  );
}