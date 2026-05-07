"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

interface AnimatedLetterProps {
  children: string;
  delay?: number;
  inView?: boolean;
}

export function AnimatedLetter({
  children,
  delay = 0,
  inView = false,
}: AnimatedLetterProps) {
  const [phase, setPhase] = useState<"initial" | "brand" | "fg">("initial");

  useEffect(() => {
    if (!inView) {
      setPhase("initial");
      return;
    }
    const t1 = setTimeout(() => setPhase("brand"), delay);
    const t2 = setTimeout(() => setPhase("fg"), delay + 380);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [delay, inView]);

  const color =
    phase === "initial"
      ? "var(--foreground-subtle)"
      : phase === "brand"
        ? "var(--brand)"
        : "var(--foreground)";

  return (
    <span
      className="inline-block"
      style={{ color, transition: "color 240ms ease-in-out" }}
    >
      {children}
    </span>
  );
}

interface AnimatedWordProps {
  children: string;
  className?: string;
  /** Delay before the first letter colours, in ms. */
  delay?: number;
  /** Per-letter stagger, in ms. */
  stagger?: number;
}

/**
 * Three-phase letter colour sweep — initial gray → brand orange → foreground.
 * Mirrors the uploaded AnimatedLetter / AnimatedWord pair.
 */
export function AnimatedWord({
  children,
  className = "",
  delay = 0,
  stagger = 70,
}: AnimatedWordProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const letters = Array.from(children);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {letters.map((letter, i) => (
        <AnimatedLetter key={i} delay={delay + i * stagger} inView={inView}>
          {letter === " " ? " " : letter}
        </AnimatedLetter>
      ))}
    </span>
  );
}
