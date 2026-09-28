"use client";

import { useEffect, useState } from "react";

type Props = { monogram: string; names: string; date: string };

/** Full-screen sealed envelope. Tapping the wax seal opens it and reveals the site. */
export default function Envelope({ monogram, names, date }: Props) {
  const [stage, setStage] = useState<"closed" | "opening" | "gone">("closed");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("env-opened")) {
        setStage("gone");
        return;
      }
    } catch {}
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  function open() {
    if (stage !== "closed") return;
    setStage("opening");
    window.dispatchEvent(new Event("wedding:open"));
    try { sessionStorage.setItem("env-opened", "1"); } catch {}
    setTimeout(() => {
      document.documentElement.style.overflow = "";
      setStage("gone");
    }, 2600);
  }

  if (stage === "gone") return null;

  return (
    <div className={`env-screen ${stage}`} aria-modal role="dialog" aria-label="Wedding invitation">
      <p className="env-to eyebrow">You are cordially invited</p>
      <div className="envelope" onClick={open}>
        <div className="env-back" />
        <div className="env-letter">
          <span className="script">{names}</span>
          <span className="eyebrow">{date}</span>
        </div>
        <div className="env-front" />
        <div className="env-flap" />
        <button className="seal" onClick={open} aria-label="Open invitation">
          <span>{monogram}</span>
        </button>
      </div>
      <p className="env-hint">Tap the seal to open</p>
    </div>
  );
}
