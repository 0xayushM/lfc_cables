"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SplitLineReveal } from "../anim/SplitLineReveal";
import { TextHoverReveal } from "../anim/TextHoverReveal";

/* ── static data ──────────────────────────────────────────────────────── */

const HERO_STATS = [
  { value: "34+", label: "Years engineering cables" },
  { value: "1000+", label: "SKUs in active production" },
  { value: "25 KM", label: "Wire output every day" },
  { value: "50+", label: "OEM & Tier-1 partners" },
];

const SPEC_CHIPS = ["ISO 9001:2015", "RoHS · REACH", "BIS · UL · VDE"];

/* ── grid geometry ────────────────────────────────────────────────────── */

type Cell = { left: number; top: number; width: number; height: number };

/**
 * Final grid layout: 3 columns × 2 rows (each cell = 33.3% × 50%).
 * Cell 0 is the hero video, placed top-centre.
 */
const FINAL: Cell[] = [
  { left: 33.333, top: 0, width: 33.333, height: 50 }, // 0 hero  — top-centre
  { left: 0, top: 0, width: 33.333, height: 50 }, //      1       — top-left
  { left: 66.666, top: 0, width: 33.333, height: 50 }, // 2       — top-right
  { left: 0, top: 50, width: 33.333, height: 50 }, //     3       — btm-left
  { left: 33.333, top: 50, width: 33.333, height: 50 }, // 4      — btm-centre
  { left: 66.666, top: 50, width: 33.333, height: 50 }, // 5      — btm-right
];

/**
 * Where each tile begins at progress = 0.
 * Hero (cell 0) starts full-bleed; the rest start off-screen on the side
 * closest to their final position.
 */
const START: Cell[] = [
  { left: 0, top: 0, width: 100, height: 100 }, //       0 — full screen
  { left: -120, top: 0, width: 33.333, height: 50 }, //  1 — from left
  { left: 120, top: 0, width: 33.333, height: 50 }, //   2 — from right
  { left: -120, top: 50, width: 33.333, height: 50 }, // 3 — from left
  { left: 33.333, top: 130, width: 33.333, height: 50 }, // 4 — from below
  { left: 120, top: 50, width: 33.333, height: 50 }, //  5 — from right
];

const VIDEOS = [
  "/videos/hero_video.mp4",
  "/videos/power_cord.mp4",
  "/videos/wire_harness.mp4",
  "/videos/battery_cable.mp4",
  "/videos/ribbon_cable.mp4",
  "/videos/usb_cable.mp4",
];

const CELL_LABELS = [
  null, // hero cell — no label, text overlay used instead
  "Power cords",
  "Wire harnesses",
  "Battery cables",
  "Ribbon cables",
  "USB cables",
];

/* ── helpers ──────────────────────────────────────────────────────────── */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* ── component ────────────────────────────────────────────────────────── */

export function Hero() {
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

  /* derived values */
  const eased = easeInOutCubic(Math.min(1, progress));

  // Text fades out over the first 40% of scroll
  const textOpacity = Math.max(0, 1 - progress / 0.4);
  const textY = (1 - textOpacity) * -48;

  // Gap & border-radius between cells (appears once the grid starts forming)
  const gap = eased > 0.04 ? "5px" : "0";
  const radius = lerp(0, 20, eased);

  // Labels on surrounding cells fade in once grid is 70% formed
  const labelOpacity = Math.max(0, (progress - 0.7) / 0.3);

  return (
    /**
     * Outer section is TALL (270 vh) — this is what the browser scrolls.
     * Inner sticky div stays pinned to the top while the user scrolls through
     * all 270 vh, giving us the full scroll range to drive the animation.
     */
    <section ref={wrapperRef} style={{ height: "270vh" }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--background)]">

        {/* ── Video grid tiles ───────────────────────────────────────── */}
        {VIDEOS.map((src, i) => {
          const s = START[i];
          const f = FINAL[i];
          const cell: Cell = {
            left: lerp(s.left, f.left, eased),
            top: lerp(s.top, f.top, eased),
            width: lerp(s.width, f.width, eased),
            height: lerp(s.height, f.height, eased),
          };
          return (
            <div
              key={src}
              className="absolute"
              style={{
                left: `${cell.left}%`,
                top: `${cell.top}%`,
                width: `${cell.width}%`,
                height: `${cell.height}%`,
                padding: gap,
                willChange: "left, top, width, height",
              }}
            >
              <div
                className="relative w-full h-full overflow-hidden"
                style={{ borderRadius: `${radius}px` }}
              >
                <video
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-hidden
                  preload={i === 0 ? "auto" : "metadata"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* bottom gradient so cell labels + hero text stay readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* per-cell label (fades in once grid is mostly formed) */}
                {i > 0 && CELL_LABELS[i] && (
                  <div
                    className="absolute bottom-4 left-4"
                    style={{ opacity: labelOpacity }}
                  >
                    <span className="text-eyebrow !text-[10px] text-white glass-pill rounded-full px-3 py-1.5">
                      {CELL_LABELS[i]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* ── Hero text overlay (fades as grid forms) ────────────────── */}
        <div
          className="absolute inset-0 z-10 flex flex-col justify-center pointer-events-none"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          <div className="relative max-w-7xl mx-auto px-6 w-full pointer-events-auto">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

              {/* LEFT — content stack */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 glass-pill rounded-full pl-2 pr-4 py-1.5 mb-7">
                  <span className="h-2 w-2 rounded-full bg-[var(--brand)] brand-glow" />
                  <p className="text-eyebrow !text-[10px]">
                    Est. 1989 · Delhi, India · ISO 9001 certified
                  </p>
                </div>

                <h1 className="text-display text-4xl lg:text-[5rem] leading-[2.1]">
                  Bridging the gap
                  <br />
                  <span className="brand-gradient bg-clip-text text-transparent">
                    of connectivity.
                  </span>
                </h1>

                <p className="mt-7 text-lg text-[var(--foreground-muted)] leading-relaxed max-w-xl">
                  Wires, cables and connector systems engineered in Delhi —
                  trusted by automotive OEMs, appliance giants and industrial
                  leaders for over three decades.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--brand)] hover:text-white transition-colors rounded-full px-6 py-3.5 text-sm font-medium"
                  >
                    <TextHoverReveal hoverColor="var(--background)">
                      Browse catalog
                    </TextHoverReveal>
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors rounded-full px-5 py-3.5 text-sm font-medium"
                  >
                    <TextHoverReveal>Request a sample</TextHoverReveal>
                    <span className="text-[var(--brand)]" aria-hidden>→</span>
                  </Link>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-2">
                  {SPEC_CHIPS.map((c) => (
                    <span
                      key={c}
                      className="text-eyebrow !text-[10px] glass-pill rounded-full px-3 py-1.5"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll hint (visible only while grid is forming) ─────────── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{ opacity: Math.min(1, (1 - progress / 0.15)) * 0.7 }}
        >
          <p className="text-eyebrow !text-[10px]">Scroll to explore</p>
          <div className="h-8 w-px bg-[var(--foreground-subtle)] animate-pulse" />
        </div>

      </div>
    </section>
  );
}
