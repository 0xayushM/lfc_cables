"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Mounts a single Lenis instance on the window. Plays nicely with
 * IntersectionObserver-based reveals because Lenis dispatches a real
 * `scroll` event on the window after each tick.
 *
 * Honours `prefers-reduced-motion: reduce` and disables on touch devices
 * smaller than tablet to avoid hijacking native momentum scrolling.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCoarseSmall =
      window.matchMedia("(pointer: coarse)").matches &&
      window.innerWidth < 768;

    if (reduce || isCoarseSmall) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      // Touch scrolling left at native — too jittery on iOS otherwise.
      touchMultiplier: 1,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Expose the instance for ad-hoc scrollTo() calls
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
