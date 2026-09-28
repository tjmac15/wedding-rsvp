"use client";

import { useEffect, useRef, useState } from "react";

/** Floating play/pause button. Starts playing when the envelope is opened. */
export default function MusicToggle({ src }: { src: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const start = () => {
      audio.current!.volume = 0.5;
      audio.current?.play().then(() => setPlaying(true)).catch(() => {});
    };
    window.addEventListener("wedding:open", start);
    return () => window.removeEventListener("wedding:open", start);
  }, []);

  function toggle() {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else { a.pause(); setPlaying(false); }
  }

  return (
    <>
      <audio ref={audio} src={src} loop preload="none" />
      <button className={`music ${playing ? "on" : ""}`} onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>
        <span className="bars"><i /><i /><i /><i /></span>
      </button>
    </>
  );
}
