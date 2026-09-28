"use client";

import { useEffect, useState } from "react";

type P = { left: number; delay: number; dur: number; size: number; drift: number; hue: string; rot: number };
const HUES = ["#f3d5cf", "#ecc2ba", "#f7e6df", "#e9d8b9", "#dfe6d3"];

/** Soft petals drifting down behind the content. Disabled for reduced-motion users. */
export default function Petals({ count = 18 }: { count?: number }) {
  const [petals, setPetals] = useState<P[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const n = window.innerWidth < 640 ? Math.round(count * 0.6) : count;
    setPetals(
      Array.from({ length: n }, () => ({
        left: Math.random() * 100,
        delay: -Math.random() * 20,
        dur: 14 + Math.random() * 14,
        size: 9 + Math.random() * 12,
        drift: (Math.random() - 0.5) * 220,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        rot: Math.random() * 360,
      }))
    );
  }, [count]);

  return (
    <div className="petals" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.8,
            background: p.hue,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
            ["--rot" as string]: `${p.rot}deg`,
          }}
        />
      ))}
    </div>
  );
}
