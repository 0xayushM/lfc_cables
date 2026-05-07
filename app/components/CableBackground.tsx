"use client";

import { useId } from "react";

interface Props {
  /** Vertical density. */
  intensity?: "subtle" | "rich";
  className?: string;
}

/**
 * Looping cable-flow SVG. Several bezier strands run end-to-end with a
 * `stroke-dasharray` that's animated to give the appearance of current
 * pulsing along the wires. A handful of glow nodes pulse on the line.
 *
 * Renders behind a CTA section to add motion without weighing the page down.
 */
export function CableBackground({
  intensity = "rich",
  className = "",
}: Props) {
  const id = useId().replace(/:/g, "");
  const strands = intensity === "rich" ? 7 : 4;

  // Pre-baked bezier paths — varied amplitudes so the lines feel hand-drawn.
  const paths = [
    "M -100 460 C 220 200, 480 720, 760 380 S 1200 60, 1500 540",
    "M -100 580 C 280 360, 540 820, 820 500 S 1240 220, 1500 660",
    "M -100 320 C 200 80, 520 540, 800 240 S 1180 -40, 1500 380",
    "M -100 700 C 240 540, 600 940, 900 660 S 1280 420, 1500 800",
    "M -100 200 C 260 -40, 580 420, 880 120 S 1260 -120, 1500 260",
    "M -100 880 C 320 720, 660 1040, 980 820 S 1320 580, 1500 940",
    "M -100 520 C 200 320, 520 700, 800 460 S 1200 240, 1500 600",
  ].slice(0, strands);

  return (
    <svg
      aria-hidden
      viewBox="0 0 1400 1000"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    >
      <defs>
        <linearGradient id={`g-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,107,26,0)" />
          <stop offset="20%" stopColor="rgba(255,107,26,0.55)" />
          <stop offset="60%" stopColor="rgba(255,140,74,0.4)" />
          <stop offset="100%" stopColor="rgba(217,77,0,0)" />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,140,74,0.9)" />
          <stop offset="60%" stopColor="rgba(255,107,26,0.35)" />
          <stop offset="100%" stopColor="rgba(255,107,26,0)" />
        </radialGradient>
        <filter id={`blur-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Soft radial glow base */}
      <rect
        width="1400"
        height="1000"
        fill={`url(#glow-${id})`}
        opacity="0.25"
      />

      {/* Bottom shadow strokes (the "cables"), wider and dimmer */}
      {paths.map((d, i) => (
        <path
          key={`base-${i}`}
          d={d}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={20 - i}
          fill="none"
          strokeLinecap="round"
        />
      ))}

      {/* Glow strokes — bigger blur, low opacity */}
      {paths.map((d, i) => (
        <path
          key={`glow-${i}`}
          d={d}
          stroke="rgba(255,107,26,0.45)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          filter={`url(#blur-${id})`}
          style={{
            animation: `cable-pulse ${5 + i * 0.7}s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}

      {/* Bright orange flowing strokes with dashes that travel */}
      {paths.map((d, i) => (
        <path
          key={`flow-${i}`}
          d={d}
          stroke={`url(#g-${id})`}
          strokeWidth={1.4 + (i % 3) * 0.6}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${30 + i * 8} ${120 + i * 16}`}
          style={{
            animation: `cable-flow ${10 + i * 2}s linear ${i * 0.4}s infinite`,
          }}
        />
      ))}

      {/* Pulsing nodes scattered along the wires */}
      {paths.map((_, i) => {
        const cx = 200 + ((i * 187) % 1100);
        const cy = 240 + ((i * 113) % 520);
        return (
          <g key={`node-${i}`}>
            <circle
              cx={cx}
              cy={cy}
              r={26}
              fill="rgba(255,107,26,0.22)"
              filter={`url(#blur-${id})`}
              style={{
                animation: `cable-pulse ${3.5 + (i % 4) * 0.5}s ease-in-out ${i * 0.6}s infinite`,
              }}
            />
            <circle
              cx={cx}
              cy={cy}
              r={2}
              fill="var(--brand-soft)"
              style={{
                animation: `cable-pulse ${2.5 + (i % 3) * 0.4}s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}
