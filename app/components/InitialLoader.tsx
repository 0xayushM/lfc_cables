"use client";

import { useEffect, useState } from "react";
import { dispatchReady } from "./anim/ReadyContext";

type Phase = "count" | "drop" | "done";

const COUNT_DURATION = 3000; // ms — 0 → 100
const HOLD_AFTER_FULL = 250; // ms — pause once we hit 100
const DROP_DURATION = 950; // ms — curtain slide-down

/**
 * Initial-load counter overlay.
 *
 * Only plays on a full page load (first visit or hard refresh) — the
 * component lives in the root layout, so client-side route changes do not
 * remount it and therefore do not retrigger the animation.
 *
 * Sequence:
 *   1. Counter ticks from 0% to 100% over `COUNT_DURATION` ms.
 *   2. Brief pause at 100%.
 *   3. The black overlay slides down past the viewport and unmounts.
 *
 * Skipped entirely if the user prefers reduced motion.
 */
export function InitialLoader() {
  const [phase, setPhase] = useState<Phase>("count");
  const [percent, setPercent] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setPhase("done");
      dispatchReady();
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_DURATION);
      // ease-out cubic — feels less linear/robotic
      const eased = 1 - Math.pow(1 - t, 3);
      setPercent(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    const dropTimer = window.setTimeout(
      () => setPhase("drop"),
      COUNT_DURATION + HOLD_AFTER_FULL,
    );
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      document.documentElement.style.overflow = "";
      dispatchReady();
    }, COUNT_DURATION + HOLD_AFTER_FULL + DROP_DURATION);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(dropTimer);
      window.clearTimeout(doneTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (mounted && phase === "done") return null;

  const dropping = phase === "drop";
  const display = String(percent).padStart(3, "0");

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] bg-[var(--background)] overflow-hidden"
      style={{
        animation: dropping
          ? `loader-curtain-down ${DROP_DURATION}ms cubic-bezier(0.7, 0, 0.3, 1) forwards`
          : undefined,
      }}
    >
      {/* Soft brand glow that pulses in the centre */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmin] h-[60vmin] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "var(--brand)", opacity: 0.25 }}
      />

      {/* Counter — bottom-right of the viewport */}
      <div className="absolute bottom-10 right-10 md:bottom-16 md:right-16 flex items-baseline gap-1 tabular-nums">
        <span
          className="text-display leading-none text-[clamp(5rem,18vw,16rem)] tracking-tight"
          style={{
            background:
              "linear-gradient(180deg, var(--foreground) 0%, var(--foreground-muted) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {display}
        </span>
        <span
          className="text-display leading-none text-[clamp(2rem,6vw,5rem)] text-[var(--brand)]"
          aria-hidden
        >
          %
        </span>
      </div>

      {/* Tagline at the bottom-left */}
      <div className="absolute bottom-12 left-10 md:bottom-20 md:left-16">
        <p className="text-eyebrow opacity-60">
          Bridging the gap of connectivity
        </p>
      </div>

      {/* Progress bar across the top */}
      <div className="absolute top-0 inset-x-0 h-px bg-[var(--border)]/40 overflow-hidden">
        <div
          className="h-full bg-[var(--brand)] brand-glow"
          style={{
            width: `${percent}%`,
            transition: "width 80ms linear",
          }}
        />
      </div>
    </div>
  );
}
