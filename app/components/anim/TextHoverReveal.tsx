"use client";

import { ReactNode } from "react";

interface Props {
  children: string;
  className?: string;
  hoverColor?: string;
  /** Stagger between letters, in ms. */
  stagger?: number;
  /** Per-letter duration, in ms. */
  duration?: number;
}

/**
 * Two layers of the same text — the original sits in place, a duplicate
 * letter-by-letter slides up into view from below on hover. The trailing
 * mask sits in `overflow:hidden` so the slide reads as a clean swap.
 */
export function TextHoverReveal({
  children,
  className = "",
  hoverColor = "var(--brand)",
  stagger = 25,
  duration = 380,
}: Props) {
  const letters = Array.from(children);

  const renderLayer = (target: "top" | "bottom"): ReactNode =>
    letters.map((letter, i) => (
      <span
        key={`${target}-${i}`}
        className="text-hover-reveal__letter"
        style={{
          transitionDelay: `${i * stagger}ms`,
          transitionDuration: `${duration}ms`,
        }}
      >
        {letter === " " ? " " : letter}
      </span>
    ));

  return (
    <span
      className={`text-hover-reveal ${className}`}
      style={
        { ["--hover-color" as string]: hoverColor } as React.CSSProperties
      }
      data-text={children}
    >
      <span className="text-hover-reveal__row text-hover-reveal__row--top">
        {renderLayer("top")}
      </span>
      <span
        aria-hidden
        className="text-hover-reveal__row text-hover-reveal__row--bottom"
      >
        {renderLayer("bottom")}
      </span>
    </span>
  );
}
