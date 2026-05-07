import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { CableBackground } from "../components/CableBackground";
import { ScrollReveal } from "../components/anim/ScrollReveal";
import { SplitLineReveal } from "../components/anim/SplitLineReveal";
import { TextHoverReveal } from "../components/anim/TextHoverReveal";

export const metadata: Metadata = {
  title: "Manufacturing — LFC Wires & Cables",
  description:
    "Eight rigorous steps from copper rod to finished assembly. ISO 9001 certified manufacturing facility in Delhi, India.",
};

const STEPS = [
  {
    n: "01",
    title: "Design and prototyping",
    body: "Conceptualising new cable types, materials and configurations that deliver enhanced performance, durability and efficiency.",
    image: "/images/products_bg/ribbon_cable.png",
  },
  {
    n: "02",
    title: "Wire drawing & annealing",
    body: "Synthetic diamond dies pull copper or aluminium rods to precise gauges, ensuring exceptional consistency in wire production.",
    image: "/images/products_bg/wire_cable.png",
  },
  {
    n: "03",
    title: "Twisting & bunching",
    body: "Wires of the same gauge are twisted or stranded together — enhancing flexibility, strength and overall performance.",
    image: "/images/products_bg/wire_harness.png",
  },
  {
    n: "04",
    title: "Extrusion & cabling",
    body: "Our extrusion lines apply insulating compound to the wire — adding the durability, dielectric strength and safety properties our customers depend on.",
    image: "/images/products_bg/power_cord.png",
  },
  {
    n: "05",
    title: "Cutting & stripping",
    body: "Before assembly, raw materials are prepared with the insulation partially or totally removed at specific points.",
    image: "/images/products_bg/usb_cable.png",
  },
  {
    n: "06",
    title: "Crimping & assembly",
    body: "Crucial for ensuring that every electrical connection is secure and reliable — using calibrated tooling and proven techniques.",
    image: "/images/products_bg/terminal_and_couplor.png",
  },
  {
    n: "07",
    title: "Plastic injection moulding",
    body: "In-house injection moulding produces housings, connectors and structural parts essential for finished cable assemblies.",
    image: "/images/products_bg/heat_sink.png",
  },
  {
    n: "08",
    title: "Testing & quality control",
    body: "Both are paramount in the wire and cable industry. Every reel is tested for safety, reliability and electrical performance before it ships.",
    image: "/images/products_bg/battery_cable.png",
  },
];

const CAPABILITIES = [
  { stat: "25 KM", label: "Daily wire output" },
  { stat: "30 M", label: "Components per year" },
  { stat: "8", label: "Manufacturing steps" },
  { stat: "100%", label: "In-house testing" },
];

export default function ManufacturingPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Home — Process"
        title={
          <>
            Check how we work
            <br />
            in <span className="text-[var(--brand)]">eight steps.</span>
          </>
        }
        description="From copper rod to finished assembly, we own every step of production — keeping quality, lead times and customisation under one roof in Delhi."
      />

      {/* ----------------- CAPABILITIES BAND ----------------- */}
      <section className="relative px-6 pb-12">
        <div className="max-w-7xl mx-auto rounded-3xl border border-[var(--border)] grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[var(--border)]">
          {CAPABILITIES.map((c) => (
            <div key={c.label} className="p-8">
              <p className="text-display text-4xl sm:text-5xl">{c.stat}</p>
              <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                {c.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------- STEPS ----------------- */}
      <section className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16 md:space-y-28">
            {STEPS.map((step, i) => {
              const reverse = i % 2 === 1;
              return (
                <article
                  key={step.n}
                  className={`grid lg:grid-cols-12 gap-8 items-center ${
                    reverse ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  <div
                    className={`lg:col-span-7 [direction:ltr] relative aspect-[16/10] rounded-3xl overflow-hidden border border-[var(--border)] group hover-lift`}
                  >
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-5 left-5 glass-pill rounded-full px-4 py-2 font-mono text-xs">
                      Step {step.n}
                    </div>
                  </div>

                  <div className="lg:col-span-5 [direction:ltr]">
                    <p className="text-eyebrow mb-4">Step {step.n}</p>
                    <h3 className="text-display text-3xl sm:text-5xl mb-5">
                      {step.title}
                    </h3>
                    <p className="text-base text-[var(--foreground-muted)] leading-relaxed max-w-md">
                      {step.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------- CTA ----------------- */}
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
          <p className="text-eyebrow mb-6">Visit the floor</p>
          <h2 className="text-display text-5xl sm:text-7xl">
            <SplitLineReveal mode="words" stagger={80}>
              See it in person.
            </SplitLineReveal>
          </h2>
          <ScrollReveal from="up" delay={150}>
            <p className="mt-6 text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
              Schedule a tour of our Narela, Delhi facility — we&apos;ll walk
              you through every machine, every test bench, every shipping dock.
            </p>
          </ScrollReveal>
          <ScrollReveal from="up" delay={250}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--brand)] hover:text-white transition-colors rounded-full px-7 py-3.5 text-sm font-medium"
              >
                <TextHoverReveal hoverColor="var(--background)">
                  Schedule a visit
                </TextHoverReveal>
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/certification"
                className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors rounded-full px-6 py-3.5 text-sm font-medium"
              >
                <TextHoverReveal>See certifications</TextHoverReveal>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
