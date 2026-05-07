import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = {
  title: "Gallery — LFC Wires & Cables",
  description:
    "An inside look at our manufacturing facility, products and processes.",
};

type Tile = {
  src: string;
  alt: string;
  span?: string;
  category: string;
  caption?: string;
};

const TILES: Tile[] = [
  {
    src: "/images/products/battery-cable.png",
    alt: "Battery cable",
    span: "lg:col-span-3 lg:row-span-2 aspect-square",
    category: "Product",
    caption: "Battery cabling, terminated and tested.",
  },
  {
    src: "/images/products/heat-sink.png",
    alt: "Wire drawing line",
    span: "lg:col-span-3 aspect-[4/3]",
    category: "Facility",
    caption: "Wire drawing line — Narela floor.",
  },
  {
    src: "/images/products/wire-harness.png",
    alt: "Wire harness",
    span: "lg:col-span-3 aspect-[4/3]",
    category: "Product",
    caption: "Multi-gauge harness assembly.",
  },
  {
    src: "/images/products/heat-sink.png",
    alt: "Spools of cable",
    span: "lg:col-span-2 aspect-[4/5]",
    category: "Process",
  },
  {
    src: "/images/products/ribbon-cable.png",
    alt: "Flat ribbon cable",
    span: "lg:col-span-2 aspect-[4/5]",
    category: "Product",
  },
  {
    src: "/images/products/usb-cable.png",
    alt: "USB cable",
    span: "lg:col-span-2 aspect-[4/5]",
    category: "Product",
  },
  {
    src: "/images/products/heat-sink.png",
    alt: "Crimping station",
    span: "lg:col-span-3 aspect-[16/10]",
    category: "Process",
    caption: "Calibrated crimping station.",
  },
  {
    src: "/images/products/terminal-and-coupler.png",
    alt: "Terminals and couplers",
    span: "lg:col-span-3 aspect-[16/10]",
    category: "Product",
    caption: "Brass and tin-plated connectors.",
  },
  {
    src: "/images/products/heatsink.png",
    alt: "Aluminium heatsink",
    span: "lg:col-span-2 aspect-[4/5]",
    category: "Product",
  },
  {
    src: "/images/products/heat-sink.png",
    alt: "Quality testing",
    span: "lg:col-span-4 aspect-[16/10]",
    category: "Quality",
    caption: "100% in-house electrical testing.",
  },
  {
    src: "/images/products/shielded-cable.png",
    alt: "Shielded cable",
    span: "lg:col-span-3 aspect-[4/3]",
    category: "Product",
    caption: "EMI/RFI shielded multi-core cable.",
  },
  {
    src: "/images/products/battery-coupler.png",
    alt: "Battery coupler clamps",
    span: "lg:col-span-3 aspect-[4/3]",
    category: "Product",
  },
  {
    src: "/images/products/power-cord.png",
    alt: "Braided power cord",
    span: "lg:col-span-3 aspect-[4/3]",
    category: "Product",
  },
];

export default function GalleryPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Home — Gallery"
        title={
          <>
            An inside look at
            <br />
            <span className="text-[var(--brand)]">how it's made.</span>
          </>
        }
        description="Step inside our Delhi facility — meet the machines, products and people behind every reel that ships out of Narela."
      />

      <section className="relative px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 auto-rows-min">
            {TILES.map((tile, i) => (
              <article
                key={tile.src + i}
                className={`group relative rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] hover-lift ${tile.span ?? "aspect-square"}`}
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className={`${tile.src.includes("/images/products") ? "object-contain p-4" : "object-cover"} group-hover:scale-105 transition-transform duration-700`}
                />
                {!tile.src.includes("/images/products") && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
                )}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-eyebrow glass-pill rounded-full px-3 py-1.5 text-[10px]">
                    {tile.category}
                  </span>
                </div>
                {tile.caption && (
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <p className="text-sm text-[var(--foreground)] glass-pill rounded-2xl px-4 py-3">
                      {tile.caption}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-32 bg-[var(--background-elevated)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-display text-5xl sm:text-7xl">
            Want a closer look?
          </h2>
          <p className="mt-6 text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
            Schedule a tour of our facility, or request samples for evaluation.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--brand)] hover:text-white transition-colors rounded-full px-7 py-3.5 text-sm font-medium"
            >
              Get in touch
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
