import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { CableBackground } from "../components/CableBackground";
import { ScrollReveal } from "../components/anim/ScrollReveal";
import { SplitLineReveal } from "../components/anim/SplitLineReveal";
import { TextHoverReveal } from "../components/anim/TextHoverReveal";

export const metadata: Metadata = {
  title: "About — LFC Wires & Cables",
  description:
    "Founded in 1989 by Mr. LFC Bansal in Delhi, LFC manufactures wires, cables and electromechanical components for automotive, appliance and industrial use.",
};

const STATS = [
  { value: "1989", label: "Established" },
  { value: "150+", label: "Skilled employees" },
  { value: "50+", label: "Active customers" },
  { value: "1000+", label: "Component SKUs" },
];

const PILLARS = [
  {
    title: "Integrity",
    description: "We prioritise ethics and transparency, building trust.",
  },
  {
    title: "Innovation",
    description: "We embrace creativity to meet evolving needs.",
  },
  {
    title: "Commitment",
    description: "We're dedicated to delivering on our promises on time.",
  },
  {
    title: "Excellence",
    description: "We set high standards, consistently exceeding expectations.",
  },
];

const ASSETS = [
  {
    n: "01",
    title: "Design & Development",
    description:
      "Production drawings created in accordance with the client's specifications.",
  },
  {
    n: "02",
    title: "Prototyping",
    description: "A physical version of the finished output is created.",
  },
  {
    n: "03",
    title: "Production",
    description: "The wires are cut, stripped and crimped at scale.",
  },
  {
    n: "04",
    title: "Testing",
    description: "Final testing on every part by automated machines.",
  },
  {
    n: "05",
    title: "Packaging",
    description: "Goods are packaged securely for safe transportation.",
  },
];

const VALUES = [
  {
    title: "United",
    body: "We value collaboration and service. The strength of unity in diversity creates an inclusive environment where every voice is valued.",
  },
  {
    title: "Teamwork",
    body: "Great achievements are never the result of a single individual's effort. We actively promote teamwork — success is collective.",
  },
  {
    title: "Passionate",
    body: "Passion drives our commitment to excellence. We're proud of what we make and aware of the responsibility that comes with it.",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Home — About"
        title={
          <>
            Three decades of
            <br />
            <span className="text-[var(--brand)]">precision in connectivity.</span>
          </>
        }
        description="Founded in 1989 by Mr. LFC Bansal, LFC Wirecables is a privately-owned, professionally managed member of the LFC Group. We engineer electrical and electromechanical components — from copper rod to finished assembly — for the automotive, appliance, footwear and construction industries."
      />

      {/* ----------------- INTRO ----------------- */}
      <section className="relative px-6 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-10">
            <div>
              <p className="text-eyebrow mb-4">Our expertise</p>
              <p className="text-xl md:text-2xl text-[var(--foreground)] leading-relaxed">
                LFC specialises in the manufacture of electrical and mechanical
                components, plus rexine materials for seat covers — serving the
                footwear, automotive and construction industries with the same
                attention to detail.
              </p>
            </div>
            <div>
              <p className="text-eyebrow mb-4">Our product range</p>
              <p className="text-base text-[var(--foreground-muted)] leading-relaxed">
                A diverse range of high-quality products: electrical cables for
                the automotive industry, electrical appliances, flexible cables,
                household wirings, submersible cables, flat ribbon cables,
                housings, terminals, power cords and injection-moulded parts —
                catering to both automotive and non-automotive sectors.
              </p>
            </div>
            <div>
              <p className="text-eyebrow mb-4">Quality assurance</p>
              <p className="text-base text-[var(--foreground-muted)] leading-relaxed">
                As an ISO 9001 certified company, LFC prioritises quality
                control and assurance at every step of the manufacturing
                process. This commitment has earned us the trust of our clients
                and partners worldwide.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[var(--border)]">
              <Image
                src="/images/products_bg/wire_cable.png"
                alt="Manufacturing floor"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6 glass-pill rounded-2xl p-5">
                <p className="text-eyebrow mb-2">Integrated facility</p>
                <p className="text-sm text-[var(--foreground)]">
                  In-house testing facility ensures every batch meets our
                  regulated quality standards before it ships.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ----------------- VISION & MISSION ----------------- */}
      <section className="relative px-6 py-24 bg-[var(--background-elevated)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-3">
          <article className="glass-card rounded-3xl p-10 hover-lift">
            <p className="text-eyebrow mb-6">Our vision</p>
            <h3 className="text-display text-4xl mb-6">
              The most trusted name
              <br />
              in <span className="text-[var(--brand)]">connectivity.</span>
            </h3>
            <p className="text-[var(--foreground-muted)] leading-relaxed">
              To become the most trusted and preferred solution provider for
              electromechanical and electrical solutions and services — at the
              forefront of our industry, consistently delivering excellence to
              our valued clients.
            </p>
          </article>

          <article className="glass-card rounded-3xl p-10 hover-lift">
            <p className="text-eyebrow mb-6">Our mission</p>
            <h3 className="text-display text-4xl mb-6">
              Safe. Durable.
              <br />
              <span className="text-[var(--brand)]">Built to last.</span>
            </h3>
            <p className="text-[var(--foreground-muted)] leading-relaxed">
              Manufacture and supply safe, durable, environmentally friendly
              products of the highest quality — exceeding our clients'
              expectations through cost-effective solutions that stand the test
              of time.
            </p>
          </article>
        </div>
      </section>

      {/* ----------------- CORE VALUES ----------------- */}
      <section className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow mb-4">Core values</p>
            <h2 className="text-display text-4xl sm:text-6xl">
              How we work,
              <br />
              <span className="text-[var(--brand)]">together.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {VALUES.map((v, i) => (
              <article
                key={v.title}
                className="rounded-3xl border border-[var(--border)] p-8 hover-lift bg-[var(--background)]"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs text-[var(--foreground-subtle)]">
                    0{i + 1}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                </div>
                <h3 className="text-2xl font-medium tracking-tight mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {v.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- PILLARS ----------------- */}
      <section className="relative px-6 py-24 bg-[var(--background-elevated)]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow mb-4">Pillars</p>
            <h2 className="text-display text-4xl sm:text-6xl">
              The principles
              <br />
              <span className="text-[var(--brand)]">we don't cut.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] rounded-3xl overflow-hidden">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="bg-[var(--background-elevated)] p-8 hover:bg-[var(--background)] transition-colors"
              >
                <span className="font-mono text-xs text-[var(--brand)]">
                  P/0{i + 1}
                </span>
                <h3 className="mt-8 text-xl font-medium tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- KEY INDICATORS ----------------- */}
      <section className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-eyebrow mb-4">Key indicators</p>
            <h2 className="text-display text-4xl sm:text-6xl">
              Established in <span className="text-[var(--brand)]">1989.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-3xl border border-[var(--border)] p-8 hover-lift"
              >
                <p className="text-display text-5xl sm:text-6xl">{s.value}</p>
                <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- OUR ASSETS / PROCESS ----------------- */}
      <section className="relative px-6 py-24 bg-[var(--background-elevated)]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow mb-4">Our assets</p>
            <h2 className="text-display text-4xl sm:text-6xl">
              An end-to-end
              <br />
              <span className="text-[var(--brand)]">production line.</span>
            </h2>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {ASSETS.map((a) => (
              <li
                key={a.n}
                className="rounded-3xl border border-[var(--border)] bg-[var(--background)] p-6 hover-lift"
              >
                <span className="font-mono text-xs text-[var(--brand)]">
                  {a.n}
                </span>
                <h3 className="mt-8 text-lg font-medium tracking-tight">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {a.description}
                </p>
              </li>
            ))}
          </ol>
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
          <h2 className="text-display text-5xl sm:text-7xl">
            <SplitLineReveal mode="words" stagger={70}>
              Ready to work together?
            </SplitLineReveal>
          </h2>
          <ScrollReveal from="up" delay={150}>
            <p className="mt-6 text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
              Whether you need a single batch or a long-term manufacturing
              partner — we&apos;d love to hear what you&apos;re building.
            </p>
          </ScrollReveal>
          <ScrollReveal from="up" delay={250}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--brand)] hover:text-white transition-colors rounded-full px-7 py-3.5 text-sm font-medium"
            >
              <TextHoverReveal hoverColor="var(--background)">Get a quote</TextHoverReveal>
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/manufacturing"
              className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors rounded-full px-6 py-3.5 text-sm font-medium"
            >
              <TextHoverReveal>See our process</TextHoverReveal>
            </Link>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
