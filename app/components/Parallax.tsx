"use client";

import { useEffect, useRef } from "react";

/** Moves its child slower than the page for a gentle parallax effect. */
export default function Parallax({ children, speed = 0.35, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.parentElement!.getBoundingClientRect();
        el.style.transform = `translate3d(0, ${-rect.top * speed}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, [speed]);

  return <div ref={ref} className={className}>{children}</div>;
}
