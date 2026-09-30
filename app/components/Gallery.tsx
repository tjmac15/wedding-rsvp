"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

/** Masonry gallery with a full-screen lightbox (arrows, Esc, swipe). */
export default function Gallery({ photos }: { photos: string[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  const [all, setAll] = useState(false);
  const LIMIT = 9;
  const shown = all ? photos : photos.slice(0, LIMIT);
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
      <div className="masonry mosaic">
        {shown.map((src, i) => {
          const isMore = !all && i === LIMIT - 1 && photos.length > LIMIT;
          const big = i % 6 === 0 ? (Math.floor(i / 6) % 2 ? " big right" : " big") : "";
          return (
            <button
              key={src}
              className={`m-item${big}`}
              onClick={() => (isMore ? setAll(true) : setIdx(i))}
              aria-label={isMore ? `Show all ${photos.length} photos` : `Open photo ${i + 1}`}
            >
              <Image
                src={src} alt="" width={1400} height={2010} quality={72}
                sizes={big ? "(max-width: 600px) 66vw, 500px" : "(max-width: 600px) 33vw, 260px"}
                style={{ width: "100%", height: "auto" }}
              />
              {isMore && (
                <span className="m-more">
                  <b>+{photos.length - LIMIT}</b>
                  <small>more photos</small>
                </span>
              )}
            </button>
          );
        })}
      </div>
      {all && photos.length > LIMIT && (
        <p className="m-less">
          <button onClick={() => setAll(false)}>Show fewer photos</button>
        </p>
      )}

      {idx !== null && createPortal(
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
          <Image
            key={photos[idx]} src={photos[idx]} alt="" width={1400} height={2010} quality={80} sizes="92vw"
            style={{ width: "auto", height: "auto", maxWidth: "92vw", maxHeight: "86vh" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">‹</button>
          <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">›</button>
          <button className="lb-btn lb-close" onClick={close} aria-label="Close">×</button>
          <span className="lb-count">{idx + 1} / {photos.length}</span>
        </div>,
        document.body
      )}
    </>
  );
}