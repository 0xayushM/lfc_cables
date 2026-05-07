"use client";

import { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "./useInView";

interface Props {
  children: ReactNode;
  className?: string;
  /** Direction the element travels in from. */
  from?: "up" | "down" | "left" | "right" | "fade";
  /** Travel distance, in px. */
  distance?: number;
  /** Delay before play starts, in ms. */
  delay?: number;
  /** Animation duration, in ms. */
  duration?: number;
  /** Replay every time the element re-enters view. */
  repeat?: boolean;
  as?: ElementType;
}

/**
 * Generic IntersectionObserver-driven reveal — fade plus optional translate.
 * Use this on cards, list items, and any non-text block that should pop in
 * on scroll.
 */
export function ScrollReveal({
  children,
  className = "",
  from = "up",
  distance = 24,
  delay = 0,
  duration = 700,
  repeat = false,
  as: Tag = "div",
}: Props) {
  const { ref, inView } = useInView<HTMLElement>({ once: !repeat });
  const Component = Tag as ElementType;

  const offset =
    from === "up"
      ? `translate3d(0, ${distance}px, 0)`
      : from === "down"
        ? `translate3d(0, -${distance}px, 0)`
        : from === "left"
          ? `translate3d(${distance}px, 0, 0)`
          : from === "right"
            ? `translate3d(-${distance}px, 0, 0)`
            : "translate3d(0, 0, 0)";

  const style: CSSProperties = {
    transition: `opacity ${duration}ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translate3d(0,0,0)" : offset,
    willChange: "opacity, transform",
  };

  return (
    <Component
      ref={ref as never}
      className={className}
      style={style}
      suppressHydrationWarning
    >
      {children}
    </Component>
  );
}
