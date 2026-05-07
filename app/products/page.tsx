import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = {
  title: "Products — LFC Wires & Cables",
  description:
    "High-quality wires, cables, terminals and connector systems manufactured in state-of-the-art facilities to stringent quality standards.",
};

const FEATURED = {
  title: "Battery cables",
  spec: "Up to 1,000 A · -40°C to +125°C",
  body: "High-current battery cabling for hybrid and electric mobility — flexible PVC sleeving, copper conductors and a tin-plated lug terminated to your spec.",
  image: "/images/products/battery-cable.png",
};

const CATEGORIES = [
  {
    id: "power-cords",
    title: "Power cords",
    spec: "BIS / VDE / UL approved",
    description:
      "Branded power cords for global appliance manufacturers. NEMA, IEC and custom moulded plug options.",
    image: "/images/products/power-cord.png",
    bg: "from-orange-500/15",
  },
  {
    id: "wire-harnesses",
    title: "Wire harnesses",
    spec: "Custom assemblies",
    description:
      "Engineered to-print or design-for-manufacture. Multiple gauge support, colour coding, and full electrical testing.",
    image: "/images/products/wire-harness.png",
    bg: "from-amber-500/15",
  },
  {
    id: "ribbon-cables",
    title: "Flat ribbon cables",
    spec: "1.27 mm pitch / RJ-terminated",
    description:
      "Multi-conductor ribbon cables for board-to-board, board-to-panel and IDC applications.",
    image: "/images/products/ribbon-cable.png",
    bg: "from-rose-500/15",
  },
  {
    id: "terminals",
    title: "Terminals & couplers",
    spec: "Brass / tin-plated",
    description:
      "Male, female, ring and spade terminals — molex-compatible housings and OEM-specific designs.",
    image: "/images/products/terminal-and-coupler.png",
    bg: "from-yellow-500/15",
  },
  {
    id: "battery-couplers",
    title: "Battery couplers",
    spec: "12V / 24V / 48V",
    description:
      "Heavy-duty jumper cables and battery clamps — copper jaws, insulated grips, made for the road.",
    image: "/images/products/battery-coupler.png",
    bg: "from-red-500/15",
  },
  {
    id: "shielded",
    title: "Shielded cables",
    spec: "EMI / RFI protection",
    description:
      "Braided shielding over multi-core cables for high-noise environments — automotive, industrial and white-goods.",
    image: "/images/products/shielded-cable.png",
    bg: "from-zinc-500/15",
  },
  {
    id: "usb",
    title: "USB & data cables",
    spec: "USB 2.0 / 3.0 / Type-C",
    description:
      "High-speed data and charging cables with braided sleeving and reinforced strain reliefs.",
    image: "/images/products/usb-cable.png",
    bg: "from-blue-500/15",
  },
  {
    id: "thermal",
    title: "Thermal management",
    spec: "Aluminium / Copper",
    description:
      "Extruded aluminium heatsinks for power electronics, lighting and industrial enclosures.",
    image: "/images/products/heatsink.png",
    bg: "from-slate-500/15",
  },
];

const SPEC_TAGS = [
  "ISO 9001:2015",
  "RoHS compliant",
  "REACH conformant",
  "ASTM tested",
  "Custom moulding",
  "OEM private label",
];

export default function ProductsPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Home — Product"
        title={
          <>
            Our product
            <br />
            <span className="text-[var(--brand)]">range.</span>
          </>
        }
        description="A diverse array of high-quality wires and cables, meticulously manufactured in state-of-the-art facilities, adhering to stringent quality control standards."
      />

      {/* ----------------- FEATURED ----------------- */}
      <section className="relative px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <article className="relative rounded-[32px] overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(900px 400px at 25% 50%, rgba(255,107,26,0.18), transparent 70%), radial-gradient(700px 300px at 80% 80%, rgba(217,77,0,0.12), transparent 70%)",
              }}
            />
            <div className="relative grid lg:grid-cols-2 gap-6 p-8 md:p-14 items-center">
              <div>
                <p className="text-eyebrow mb-4">Featured</p>
                <h2 className="text-display text-4xl sm:text-6xl mb-4">
                  {FEATURED.title}
                </h2>
                <p className="text-sm font-mono text-[var(--brand)] mb-5">
                  {FEATURED.spec}
                </p>
                <p className="text-base text-[var(--foreground-muted)] leading-relaxed max-w-md">
                  {FEATURED.body}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {SPEC_TAGS.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="glass-pill rounded-full px-3 py-1.5 text-xs text-[var(--foreground-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square">
                <Image
                  src={FEATURED.image}
                  alt={FEATURED.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ----------------- ALL PRODUCTS ----------------- */}
      <section className="relative px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="text-eyebrow mb-4">All categories</p>
              <h2 className="text-display text-4xl sm:text-5xl">
                Eight families.{" "}
                <span className="text-[var(--brand)]">One philosophy.</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {SPEC_TAGS.map((t) => (
                <span
                  key={t}
                  className="glass-pill rounded-full px-3 py-1.5 text-xs text-[var(--foreground-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CATEGORIES.map((c) => (
              <article
                key={c.id}
                id={c.id}
                className="group hover-lift relative rounded-3xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] flex flex-col"
              >
                <div
                  className={`relative aspect-square bg-gradient-to-br ${c.bg} to-transparent overflow-hidden`}
                >
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 border-t border-[var(--border)]">
                  <p className="text-[10px] font-mono text-[var(--brand)] mb-2 uppercase tracking-wider">
                    {c.spec}
                  </p>
                  <h3 className="text-xl font-medium tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--foreground-muted)] leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- INDUSTRIES ----------------- */}
      <section className="relative px-6 py-24 bg-[var(--background-elevated)]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow mb-4">Industries we power</p>
            <h2 className="text-display text-4xl sm:text-6xl">
              From your factory floor
              <br />
              to <span className="text-[var(--brand)]">the customer's home.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                k: "Automotive",
                v: "Wire harnesses, terminals and battery sleeving for OEMs and Tier-1 suppliers.",
              },
              {
                k: "Appliances",
                v: "Power cords, ribbon cables and injection-moulded parts for white-goods.",
              },
              {
                k: "Construction",
                v: "Submersible and household cables built to withstand demanding sites.",
              },
              {
                k: "Footwear",
                v: "Rexine and synthetic materials for lining, uppers and heel counters.",
              },
            ].map((i) => (
              <article
                key={i.k}
                className="rounded-3xl border border-[var(--border)] p-7 bg-[var(--background)] hover-lift"
              >
                <h3 className="text-lg font-medium tracking-tight mb-3">
                  {i.k}
                </h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {i.v}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- CTA ----------------- */}
      <section className="relative px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-display text-5xl sm:text-7xl">
            Don't see what you need?
          </h2>
          <p className="mt-6 text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
            We build custom — sample, prototype or full production runs. Send
            your spec sheet and we'll respond with a quote within 24 hours.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--brand)] hover:text-white transition-colors rounded-full px-7 py-3.5 text-sm font-medium"
            >
              Request a custom quote
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
