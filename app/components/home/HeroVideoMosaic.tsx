"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-driven transition between the hero video and the next section.
 *
 * Visual sequence (driven by `progress` 0 → 1):
 *   1.  progress 0.0 → 0.6 — the hero video occupies the full viewport.
 *       Five other product videos slide in from outside the viewport and
 *       converge to form a 3 × 2 grid, with the hero video shrinking into
 *       the top-centre cell.
 *   2.  progress 0.6 → 0.9 — short hold so the grid is fully visible.
 *   3.  progress 0.9 → 1.0 — the entire grid scales down and fades, letting
 *       the section that follows scroll into view.
 *
 * The wrapper is `2 × 100vh` tall so the user gets a comfortable amount of
 * scroll distance to drive the animation; the inner stage is sticky and
 * `h-screen`, so visually nothing happens until they reach this section.
 */

type Cell = { left: number; top: number; width: number; height: number };

// 3 columns × 2 rows. Order: hero (top-centre) first, then the rest.
const FINAL_CELLS: Cell[] = [
  { left: 33.333, top: 0, width: 33.333, height: 50 }, // 0 — hero (top-centre)
  { left: 0, top: 0, width: 33.333, height: 50 }, // 1 — top-left
  { left: 66.666, top: 0, width: 33.333, height: 50 }, // 2 — top-right
  { left: 0, top: 50, width: 33.333, height: 50 }, // 3 — bottom-left
  { left: 33.333, top: 50, width: 33.333, height: 50 }, // 4 — bottom-centre
  { left: 66.666, top: 50, width: 33.333, height: 50 }, // 5 — bottom-right
];

// Where each tile sits at progress = 0. Hero starts full-bleed; the rest start
// off-screen on the side closest to their final cell so they slide in cleanly.
const START_CELLS: Cell[] = [
  { left: 0, top: 0, width: 100, height: 100 }, // 0 — full screen
  { left: -120, top: 0, width: 33.333, height: 50 }, // 1 — from left
  { left: 120, top: 0, width: 33.333, height: 50 }, // 2 — from right
  { left: -120, top: 50, width: 33.333, height: 50 }, // 3 — from left
  { left: 33.333, top: 130, width: 33.333, height: 50 }, // 4 — from below
  { left: 120, top: 50, width: 33.333, height: 50 }, // 5 — from right
];

const VIDEOS = [
  "/videos/hero_video.mp4",
  "/videos/power_cord.mp4",
  "/videos/wire_harness.mp4",
  "/videos/battery_cable.mp4",
  "/videos/ribbon_cable.mp4",
  "/videos/usb_cable.mp4",
];

const LABELS = [
  "Engineered for mobility",
  "Power cords",
  "Wire harnesses",
  "Battery cables",
  "Ribbon cables",
  "USB cables",
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function HeroVideoMosaic() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.min(Math.max(0, -rect.top), total);
      setProgress(scrolled / total);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // -------- derive sub-progress for each phase --------
  // Phase A: 0 → 0.6  — tiles converge into grid
  // Phase B: 0.6 → 0.9 — hold (no movement)
  // Phase C: 0.9 → 1.0 — grid scales out + fades
  const phaseA = Math.min(1, progress / 0.6);
  const aEased = easeInOutCubic(phaseA);
  const phaseC = Math.min(1, Math.max(0, (progress - 0.9) / 0.1));
  const cEased = easeOutCubic(phaseC);

  // Wrapper-level transform applied during phase C
  const wrapperScale = lerp(1, 0.6, cEased);
  const wrapperOpacity = lerp(1, 0, cEased);

  // Centre-cell label only really makes sense while the hero is dominant
  const heroLabelOpacity = Math.max(0, 1 - phaseA * 1.4);
  const otherLabelOpacity = Math.max(0, (phaseA - 0.6) / 0.4);

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{ height: "200vh" }}
      aria-label="Product video mosaic"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--background)]">
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${wrapperScale})`,
            opacity: wrapperOpacity,
            transformOrigin: "50% 50%",
            transition: "none",
            willChange: "transform, opacity",
          }}
        >
          {VIDEOS.map((src, i) => {
            const start = START_CELLS[i];
            const end = FINAL_CELLS[i];
            const cell: Cell = {
              left: lerp(start.left, end.left, aEased),
              top: lerp(start.top, end.top, aEased),
              width: lerp(start.width, end.width, aEased),
              height: lerp(start.height, end.height, aEased),
            };
            const isHero = i === 0;
            return (
              <div
                key={src}
                className="absolute"
                style={{
                  left: `${cell.left}%`,
                  top: `${cell.top}%`,
                  width: `${cell.width}%`,
                  height: `${cell.height}%`,
                  padding: phaseA > 0.05 ? "6px" : "0",
                  transition: "padding 200ms ease-out",
                  willChange: "left, top, width, height",
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-3xl">
                  <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden
                    preload={isHero ? "auto" : "metadata"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div
                    className="absolute bottom-4 left-4 right-4"
                    style={{
                      opacity: isHero ? heroLabelOpacity : otherLabelOpacity,
                      transform: `translateY(${
                        isHero
                          ? (1 - heroLabelOpacity) * 12
                          : (1 - otherLabelOpacity) * 12
                      }px)`,
                      transition: "opacity 200ms linear",
                    }}
                  >
                    <p
                      className={
                        isHero
                          ? "text-display text-white text-3xl md:text-5xl lg:text-6xl text-center mx-auto max-w-3xl"
                          : "text-eyebrow !text-[10px] text-white/85 glass-pill rounded-full px-3 py-1.5 inline-block"
                      }
                    >
                      {LABELS[i]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status pill — shows what's happening at the current scroll point */}
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 glass-pill rounded-full px-4 py-2 text-eyebrow !text-[10px] flex items-center gap-2"
          style={{
            opacity: 1 - cEased,
            transition: "opacity 200ms ease-out",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)] brand-glow" />
          {phaseA < 1 ? "Scroll · Watch the grid form" : "Our product range"}
        </div>
      </div>
    </section>
  );
}
