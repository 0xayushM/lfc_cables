import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = {
  title: "Certification — LFC Wires & Cables",
  description:
    "ISO 9001:2015 quality management, RoHS, REACH and industry certifications that make LFC products compliant worldwide.",
};

const CERTS = [
  {
    badge: "ISO 9001:2015",
    title: "Quality Management Systems",
    body: "Our quality management system is independently audited every year against ISO 9001:2015 — the international benchmark for consistent, customer-focused operations.",
    issued: "TÜV / DAkkS",
  },
  {
    badge: "RoHS",
    title: "Restriction of Hazardous Substances",
    body: "All LFC products are manufactured in compliance with RoHS 3 (EU 2015/863) — no lead, mercury, cadmium or restricted substances above threshold limits.",
    issued: "EU Directive",
  },
  {
    badge: "REACH",
    title: "Chemical Safety Compliance",
    body: "Registration, Evaluation, Authorisation and Restriction of Chemicals — full disclosure of substances of very high concern (SVHCs) in every BOM.",
    issued: "EU Regulation",
  },
  {
    badge: "BIS",
    title: "Bureau of Indian Standards",
    body: "Power cords and household cables certified to IS 694 / IS 9968. Mandatory for sale into the Indian appliance and construction markets.",
    issued: "Government of India",
  },
  {
    badge: "UL / VDE",
    title: "Voluntary Safety Listings",
    body: "Selected SKUs carry UL (USA) and VDE (Germany) approvals — qualifying our cables for safety-critical applications worldwide.",
    issued: "UL LLC / VDE",
  },
  {
    badge: "ASTM",
    title: "Material Performance Standards",
    body: "Tensile, elongation, abrasion and dielectric properties tested to applicable ASTM methods — full reports available on request.",
    issued: "ASTM International",
  },
];

const STANDARDS = [
  "IS 694 — PVC insulated cables",
  "IS 9968 — Elastomer insulated cables",
  "ISO 6722-1 — Road vehicles — single-core cables",
  "IEC 60227 — General-purpose PVC cables",
  "IEC 60332 — Flame propagation",
  "UL 758 — Appliance wiring material",
];

const QC_STEPS = [
  {
    n: "QC/01",
    title: "Incoming material",
    body: "Copper, PVC, plastics — every lot tested before it enters the floor.",
  },
  {
    n: "QC/02",
    title: "In-process audits",
    body: "Inline measurements at draw, twist, extrusion and assembly.",
  },
  {
    n: "QC/03",
    title: "Final electrical test",
    body: "Hi-pot, continuity, conductor resistance and dimensional checks.",
  },
  {
    n: "QC/04",
    title: "Pre-shipment review",
    body: "Visual, packaging and labelling check before the truck leaves.",
  },
];

export default function CertificationPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Home — Certification"
        title={
          <>
            Certified at every
            <br />
            <span className="text-[var(--brand)]">step of the way.</span>
          </>
        }
        description="Quality is not an accident. It's a process — audited, documented and renewed annually. These are the standards we hold ourselves to."
      />

      {/* ----------------- CERT GRID ----------------- */}
      <section className="relative px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CERTS.map((c) => (
              <article
                key={c.badge}
                className="rounded-3xl border border-[var(--border)] p-7 bg-[var(--surface)] hover-lift"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-sm text-[var(--brand)] font-medium">
                    {c.badge}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)] brand-glow" />
                </div>
                <h3 className="text-xl font-medium tracking-tight mb-3">
                  {c.title}
                </h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-6">
                  {c.body}
                </p>
                <p className="text-xs text-[var(--foreground-subtle)] uppercase tracking-wider">
                  Issued by · {c.issued}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- STANDARDS ----------------- */}
      <section className="relative px-6 py-24 bg-[var(--background-elevated)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="text-eyebrow mb-4">Standards we test against</p>
            <h2 className="text-display text-4xl sm:text-5xl">
              The codebook
              <br />
              <span className="text-[var(--brand)]">we live by.</span>
            </h2>
            <p className="mt-6 text-[var(--foreground-muted)] leading-relaxed max-w-md">
              Selected international and Indian standards routinely used as
              the design and acceptance criteria across our product lines.
            </p>
          </div>
          <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-[var(--border)] rounded-3xl overflow-hidden">
            {STANDARDS.map((s, i) => (
              <li
                key={s}
                className="bg-[var(--background-elevated)] p-6 hover:bg-[var(--background)] transition-colors"
              >
                <span className="font-mono text-xs text-[var(--brand)]">
                  S/0{i + 1}
                </span>
                <p className="mt-4 text-sm text-[var(--foreground)]">{s}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------- QC PROCESS ----------------- */}
      <section className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow mb-4">Quality control</p>
            <h2 className="text-display text-4xl sm:text-6xl">
              Four checkpoints.{" "}
              <span className="text-[var(--brand)]">Zero exceptions.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {QC_STEPS.map((q) => (
              <article
                key={q.n}
                className="rounded-3xl border border-[var(--border)] p-7 hover-lift"
              >
                <span className="font-mono text-xs text-[var(--brand)]">
                  {q.n}
                </span>
                <h3 className="mt-8 text-lg font-medium tracking-tight">
                  {q.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {q.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SUSTAINABILITY ----------------- */}
      <section className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <article className="relative rounded-[32px] overflow-hidden border border-[var(--border)] grid lg:grid-cols-2 gap-0 bg-[var(--surface)]">
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <span className="self-start glass-pill rounded-full px-3 py-1.5 text-[10px] text-eyebrow mb-6">
                Coming soon
              </span>
              <h3 className="text-display text-4xl sm:text-5xl mb-5">
                Sustainability commitment.
              </h3>
              <p className="text-base text-[var(--foreground-muted)] leading-relaxed max-w-md">
                A new in-house certification covering recycled content,
                circular packaging and carbon-tracked production — rolling out
                across the LFC catalogue from 2027.
              </p>
            </div>
            <div
              className="aspect-[4/3] lg:aspect-auto"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,107,26,0.18), transparent), url(/images/products/heat-sink.png') center/cover",
              }}
            />
          </article>
        </div>
      </section>

      {/* ----------------- CTA ----------------- */}
      <section className="relative px-6 py-32 bg-[var(--background-elevated)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-display text-5xl sm:text-7xl">
            Need our certificates?
          </h2>
          <p className="mt-6 text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
            Test reports, declarations of conformity and material data sheets —
            ask, and we'll send the latest versions.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--brand)] hover:text-white transition-colors rounded-full px-7 py-3.5 text-sm font-medium"
            >
              Request documents
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
