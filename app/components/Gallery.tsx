"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Masonry gallery with a full-screen lightbox (arrows, Esc, swipe). */
export default function Gallery({ photos }: { photos: string[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setIdx(null), []);
  const step = useCallback(
    (d: number) => setIdx((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [idx, close, step]);

  if (!photos.length) {
    return (
      <div className="gallery-empty">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={`ph ph-${i % 3}`}>
            <span className="script">T&amp;F</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="masonry">
        {photos.map((src, i) => (
          <button key={src} className="m-item" onClick={() => setIdx(i)} aria-label={`Open photo ${i + 1}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      {idx !== null && (
        <div
          className="lightbox"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={photos[idx]} src={photos[idx]} alt="" onClick={(e) => e.stopPropagation()} />
          <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">‹</button>
          <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">›</button>
          <button className="lb-btn lb-close" onClick={close} aria-label="Close">×</button>
          <span className="lb-count">{idx + 1} / {photos.length}</span>
        </div>
      )}
    </>
  );
}
