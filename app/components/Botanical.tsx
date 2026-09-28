/** Hand-drawn style leafy branch in fine line art. Rotate/flip via className. */
export default function Botanical({ className = "" }: { className?: string }) {
  return (
    <svg className={`botanical ${className}`} viewBox="0 0 220 220" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path className="stem" d="M8 212 C 50 170, 80 130, 112 96 S 170 30, 212 8" />
        {[
          [34, 184, -40], [52, 164, 30], [70, 146, -38], [86, 128, 28],
          [104, 110, -34], [122, 92, 26], [142, 72, -30], [160, 54, 24], [180, 36, -26],
        ].map(([x, y, r], i) => (
          <path
            key={i}
            className="leaf"
            style={{ animationDelay: `${0.4 + i * 0.12}s` }}
            transform={`translate(${x} ${y}) rotate(${r})`}
            d="M0 0 C 8 -14, 26 -16, 34 -12 C 26 -4, 10 2, 0 0 Z M0 0 L 30 -11"
          />
        ))}
        <circle cx="196" cy="22" r="3" />
        <circle cx="204" cy="30" r="2" />
        <circle cx="120" cy="80" r="2.2" />
      </g>
    </svg>
  );
}
