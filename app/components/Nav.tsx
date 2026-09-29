"use client";

import { useEffect, useState } from "react";

const LINKS = [
  ["story", "Our Story"],
  ["details", "Details"],
  ["entourage", "Entourage"],
  ["gallery", "Gallery"],
  ["attire", "Attire"],
  ["rsvp", "RSVP"],
] as const;

export default function Nav({ monogram }: { monogram: string }) {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShow(y > window.innerHeight * 0.7);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? y / max : 0);
      let cur = "";
      for (const [id] of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${show ? "show" : ""}`}>
      <a href="#top" className="nav-mono script">{monogram}</a>
      <div className="nav-links">
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>{label}</a>
        ))}
      </div>
      <span className="nav-progress" style={{ transform: `scaleX(${progress})` }} />
    </nav>
  );
}