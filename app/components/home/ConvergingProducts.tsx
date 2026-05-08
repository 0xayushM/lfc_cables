"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "../anim/ScrollReveal";

type Side = "left" | "right";

interface Tile {
  src: string;
  name: string;
  spec: string;
  body: string;
  side: Side;
}

/**
 * Tiles converge from alternating sides as the user scrolls past them.
 * Order matters — odd indices come from the right, even from the left.
 *
 * Images live in /images/products/* and are pre-cropped to wide,
 * panoramic strips of a single cable on a near-white background, so we
 * paint a matching cream "studio" backdrop on the tile and use
 * object-contain to keep the full cable visible end-to-end.
 */
const TILES: Tile[] = [
  {
    src: "/images/products/battery-cable.png",
    name: "Battery cables",
    spec: "Up to 1,000 A · −40 to +125 °C",
    body: "Tin-plated stranded copper, crimped lugs, EMI sleeving — built for engine bays and EV packs.",
    side: "left",
  },
  {
    src: "/images/products/wire-harness.png",
    name: "Wire harnesses",
    spec: "Up to 64 cores · IS 9968",
    body: "Engineered to your drawing. Multi-gauge support, full continuity & hi-pot tested.",
    side: "right",
  },
  {
    src: "/images/products/ribbon-cable.png",
    name: "Flat ribbon cables",
    spec: "1.27 / 2.54 mm pitch",
    body: "Mass-termination IDC compatibility, predictable impedance, stripe-coded for pin one.",
    side: "left",
  },
  {
    src: "/images/products/shielded-cable.png",
    name: "Shielded cables",
    spec: "≥ 85% braid coverage",
    body: "Tinned-copper braid plus aluminium foil — quiet signal in noisy industrial environments.",
    side: "right",
  },
  {
    src: "/images/products/power-cord.png",
    name: "Power cords",
    spec: "BIS / VDE / UL approved",
    body: "Moulded mains-rated cords for global appliance manufacturers — NEMA, IEC and custom plugs.",
    side: "left",
  },
  {
    src: "/images/products/usb-cable.png",
    name: "USB & data cables",
    spec: "USB 2.0 / 3.2 / Type-C",
    body: "Custom-length USB assemblies with moulded strain reliefs and tinned-braid shielding.",
    side: "right",
  },
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function ConvergingTile({ tile, index }: { tile: Tile; index: number }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const initialX = tile.side === "left" ? -100 : 100;
  const [state, setState] = useState({ x: initialX, opacity: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const dir = tile.side === "left" ? -1 : 1;

    const compute = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const enter = vh;
      const lock = vh * 0.3;
      const range = enter - lock;
      const t = Math.max(0, Math.min(1, (enter - rect.top) / range));
      const eased = easeOutCubic(t);
      const x = (1 - eased) * 110 * dir;
      const opacity = Math.max(0, Math.min(1, eased * 1.4));
      setState({ x, opacity });
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [tile.side]);

  // Label sits opposite to the arrival side so the cable's connector end
  // (which lives on the left of every source image) reads as "delivered"
  // toward the label half.
  const labelOnRight = tile.side === "left";

  return (
    <li
      ref={ref}
      className="relative will-change-transform"
      style={{
        transform: `translate3d(${state.x}%, 0, 0)`,
        opacity: state.opacity,
      }}
    >
      <article
        className="relative rounded-[28px] overflow-hidden aspect-[16/4] md:aspect-[13/2]"
      >

        {/* The cable itself — object-contain so nothing crops */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src={tile.src}
              alt={tile.name}
              fill
              sizes="100vw"
              className="object-contain"
              loading={index < 3 ? "eager" : "lazy"}
              style={{
                filter: "drop-shadow(0 18px 30px rgba(40, 18, 0, 0.18))",
              }}
            />
          </div>
        </div>

        {/* Index chip — sits opposite the label half */}
        {/* <div
          className={`absolute top-5 ${
            labelOnRight ? "left-5" : "right-5"
          } inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] bg-black/75 text-white border border-black/40 backdrop-blur-md`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)] brand-glow" />
          {String(index + 1).padStart(2, "0")} / 06
        </div> */}

        {/* Label card — alternates left/right with the converge direction */}
        {/* <div
          className={`absolute bottom-5 sm:bottom-6 ${
            labelOnRight ? "right-5 sm:right-6" : "left-5 sm:left-6"
          } max-w-[20rem] sm:max-w-[26rem] rounded-2xl bg-[var(--background)]/90 text-[var(--foreground)] backdrop-blur-md border border-white/10 px-5 py-4 sm:px-6 sm:py-5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]`}
        >
          <p className="text-eyebrow !text-[10px] mb-1.5 text-[var(--brand)]">
            {tile.spec}
          </p>
          <h3 className="text-display text-2xl sm:text-3xl tracking-tight">
            {tile.name}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
            {tile.body}
          </p>
        </div> */}
      </article>
    </li>
  );
}

export function ConvergingProducts() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] rounded-full opacity-[0.05] blur-3xl"
        style={{ background: "var(--brand)" }}
      />

      <div className="w-full mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
          <div className="max-w-6xl mx-auto lg:col-span-7">
            <ScrollReveal from="up" duration={700}>
              <p className="text-eyebrow mb-4">Up close</p>
            </ScrollReveal>
            <ScrollReveal from="up" duration={900} delay={120}>
              <h2 className="text-display text-4xl sm:text-6xl">
                Closer than ever
                <br />
                to your{" "}
                <span className="text-[var(--brand)]">bill of materials.</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal
            from="up"
            duration={800}
            delay={260}
            className="lg:col-span-5 self-end"
          >
            <p className="text-base text-[var(--foreground-muted)] leading-relaxed max-w-md">
              Six families of cable, all built in the same Narela facility.
              Scroll to see them ship in from the line, into your assembly.
            </p>
          </ScrollReveal>
        </div>

        <ol className="space-y-0">
          {TILES.map((tile, i) => (
            <ConvergingTile key={tile.src} tile={tile} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
