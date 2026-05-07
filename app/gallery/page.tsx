import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { CableBackground } from "../components/CableBackground";
import { ScrollReveal } from "../components/anim/ScrollReveal";
import { SplitLineReveal } from "../components/anim/SplitLineReveal";
import { TextHoverReveal } from "../components/anim/TextHoverReveal";

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
    src: "/images/products_bg/battery_cable.png",
    alt: "Battery cable",
    span: "lg:col-span-3 lg:row-span-2 aspect-square",
    category: "Product",
    caption: "Battery cabling, terminated and tested.",
  },
  {
    src: "/images/products_bg/wire_cable.png",
    alt: "Industrial wiring panel",
    span: "lg:col-span-3 aspect-[4/3]",
    category: "Facility",
    caption: "Multi-core control wiring on a panel.",
  },
  {
    src: "/images/products_bg/wire_harness.png",
    alt: "Wire harness",
    span: "lg:col-span-3 aspect-[4/3]",
    category: "Product",
    caption: "Multi-gauge harness assembly.",
  },
  {
    src: "/images/products_bg/heat_sink.png",
    alt: "Aluminium heat sink",
    span: "lg:col-span-2 aspect-[4/5]",
    category: "Product",
  },
  {
    src: "/images/products_bg/ribbon_cable.png",
    alt: "Flat ribbon cable",
    span: "lg:col-span-2 aspect-[4/5]",
    category: "Product",
  },
  {
    src: "/images/products_bg/usb_cable.png",
    alt: "USB cable",
    span: "lg:col-span-2 aspect-[4/5]",
    category: "Product",
  },
  {
    src: "/images/products_bg/power_cord.png",
    alt: "Braided power cord",
    span: "lg:col-span-3 aspect-[16/10]",
    category: "Product",
    caption: "Premium braided power cord.",
  },
  {
    src: "/images/products_bg/terminal_and_couplor.png",
    alt: "Terminals and couplers",
    span: "lg:col-span-3 aspect-[16/10]",
    category: "Product",
    caption: "Brass and tin-plated connectors.",
  },
  {
    src: "/images/products/heatsink.png",
    alt: "Aluminium heatsink studio shot",
    span: "lg:col-span-2 aspect-[4/5]",
    category: "Studio",
  },
  {
    src: "/images/products_bg/battery_cable.png",
    alt: "Battery clamp connection",
    span: "lg:col-span-4 aspect-[16/10]",
    category: "Process",
    caption: "Engine-bay battery interconnect.",
  },
  {
    src: "/images/products/shielded-cable.png",
    alt: "Shielded cable",
    span: "lg:col-span-3 aspect-[4/3]",
    category: "Studio",
    caption: "EMI/RFI shielded multi-core cable.",
  },
  {
    src: "/images/products/battery-coupler.png",
    alt: "Battery coupler clamps",
    span: "lg:col-span-3 aspect-[4/3]",
    category: "Studio",
  },
  {
    src: "/images/products/wire-harness.png",
    alt: "Studio harness shot",
    span: "lg:col-span-3 aspect-[4/3]",
    category: "Studio",
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
            <span className="text-[var(--brand)]">how it&apos;s made.</span>
          </>
        }
        description="Step inside our Delhi facility — meet the machines, products and people behind every reel that ships out of Narela."
      />

      <section className="relative px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 auto-rows-min">
            {TILES.map((tile, i) => {
              const isStudio = tile.category === "Studio";
              return (
                <article
                  key={tile.src + i}
                  className={`group relative rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] hover-lift ${tile.span ?? "aspect-square"}`}
                >
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className={`${isStudio ? "object-contain p-6" : "object-cover"} group-hover:scale-105 transition-transform duration-700`}
                  />
                  {!isStudio && (
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
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-32 overflow-hidden isolate">
        <div className="absolute inset-0 -z-10">
          <CableBackground intensity="rich" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(900px 360px at 50% 50%, transparent, var(--background) 75%)",
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-display text-5xl sm:text-7xl">
            <SplitLineReveal mode="words" stagger={70}>
              Want a closer look?
            </SplitLineReveal>
          </h2>
          <ScrollReveal from="up" delay={150}>
            <p className="mt-6 text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
              Schedule a tour of our facility, or request samples for evaluation.
            </p>
          </ScrollReveal>
          <ScrollReveal from="up" delay={250}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--brand)] hover:text-white transition-colors rounded-full px-7 py-3.5 text-sm font-medium"
              >
                <TextHoverReveal hoverColor="var(--background)">
                  Get in touch
                </TextHoverReveal>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
