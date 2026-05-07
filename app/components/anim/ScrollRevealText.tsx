"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  className?: string;
  /** Number of trailing chars that stay in the brand colour before darkening. */
  tail?: number;
}

/**
 * Sweeps a brand-coloured highlight across the text as the line moves from
 * 80% viewport-down to 50%. After the sweep crosses each char, the char
 * settles to the foreground colour. Modeled on the uploaded ScrollRevealText
 * but uses its own scroll listener so it works with Lenis.
 */
export function ScrollRevealText({ text, className = "", tail = 8 }: Props) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const top = r.top;
      if (top > vh * 0.85 || r.bottom < vh * 0.15) {
        setProgress(0);
        return;
      }
      const enter = vh * 0.85;
      const center = vh * 0.45;
      const p = Math.max(0, Math.min(1, (enter - top) / (enter - center)));
      setProgress(p);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const chars = Array.from(text);
  // Sweep advances at 2x progress so the brand wave fully crosses by p=0.5
  const sweep = progress * chars.length * 2;

  return (
    <span ref={ref} className={className}>
      {chars.map((c, i) => {
        let color = "var(--foreground-subtle)";
        if (i < sweep - tail) color = "var(--foreground)";
        else if (i < sweep) color = "var(--brand)";
        return (
          <span
            key={i}
            style={{ color, transition: "color 160ms ease-in-out" }}
          >
            {c === " " ? " " : c}
          </span>
        );
      })}
    </span>
  );
}
