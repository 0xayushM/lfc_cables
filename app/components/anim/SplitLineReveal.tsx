"use client";

import {
  CSSProperties,
  ElementType,
  ReactNode,
  useMemo,
} from "react";
import { useInView } from "./useInView";

type Mode = "lines" | "words" | "chars";

interface Props {
  children: string;
  className?: string;
  /** "words" gives the GSAP-style mask reveal without lib weight. */
  mode?: Mode;
  /** Stagger between tokens, in ms. */
  stagger?: number;
  /** Duration of each token's translate, in ms. */
  duration?: number;
  /** Delay before the first token starts, in ms. */
  delay?: number;
  /** Re-trigger every time the element enters view. Default: false (once). */
  repeat?: boolean;
  /** Cubic-bezier or named easing. Default mirrors GSAP `power4.out`. */
  ease?: string;
  as?: ElementType;
}

/**
 * Mask-clipped reveal: each token sits inside a `overflow:hidden` row and
 * translates from `yPercent: 110` to `0` — same effect as the uploaded
 * SplitLineReveal but built with CSS only.
 */
export function SplitLineReveal({
  children,
  className = "",
  mode = "words",
  stagger = 60,
  duration = 800,
  delay = 0,
  repeat = false,
  ease = "cubic-bezier(0.2, 0.8, 0.2, 1)",
  as: Tag = "span",
}: Props) {
  const tokens = useMemo<ReactNode[]>(() => {
    if (mode === "chars") return Array.from(children);
    if (mode === "words") return children.split(/(\s+)/);
    // lines: the consumer is responsible for inserting <br/> markers; otherwise
    // we treat the entire string as one line.
    return children.split("\n");
  }, [children, mode]);

  const { ref, inView } = useInView<HTMLElement>({ once: !repeat });
  const Component = Tag as ElementType;

  return (
    <Component
      ref={ref as never}
      className={`split-reveal ${className}`}
      style={{
        ["--ease" as string]: ease,
      } as CSSProperties}
    >
      {tokens.map((token, i) => {
        if (typeof token === "string" && /^\s+$/.test(token)) {
          return (
            <span key={i} aria-hidden style={{ whiteSpace: "pre" }}>
              {token}
            </span>
          );
        }
        return (
          <span
            key={i}
            className="split-reveal__row"
            aria-hidden={mode === "chars" ? true : undefined}
          >
            <span
              className="split-reveal__inner"
              style={{
                transitionDuration: `${duration}ms`,
                transitionTimingFunction: ease,
                transitionDelay: `${delay + i * stagger}ms`,
                transform: inView ? "translateY(0)" : "translateY(110%)",
              }}
            >
              {token}
            </span>
          </span>
        );
      })}
    </Component>
  );
}
