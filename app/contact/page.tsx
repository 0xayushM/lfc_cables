import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { ContactForm } from "../components/ContactForm";
import { CableBackground } from "../components/CableBackground";
import { ScrollReveal } from "../components/anim/ScrollReveal";
import { SplitLineReveal } from "../components/anim/SplitLineReveal";
import { TextHoverReveal } from "../components/anim/TextHoverReveal";

export const metadata: Metadata = {
  title: "Contact — LFC Wires & Cables",
  description:
    "Get in touch with LFC Wires & Cables — request a quote, schedule a tour, or ask for samples and documentation.",
};

const CHANNELS = [
  {
    label: "General",
    title: "info@lfcpowercab.com",
    href: "mailto:info@lfcpowercab.com",
    sub: "Replies within 1 business day",
  },
  {
    label: "Help & support",
    title: "help@lfcpowercab.com",
    href: "mailto:help@lfcpowercab.com",
    sub: "Existing-customer support",
  },
  {
    label: "Phone",
    title: "+91 11 4514 1615",
    href: "tel:+911145141615",
    sub: "Mon–Sat · 9:30 to 18:30 IST",
  },
];

const FAQS = [
  {
    q: "Do you produce custom assemblies?",
    a: "Yes. Our entire portfolio is design-to-print or design-for-manufacture — send a drawing, BOM, or even a sample, and we'll quote it.",
  },
  {
    q: "What's your typical lead time?",
    a: "Stock SKUs ship in 5–7 business days. Custom assemblies vary by tooling and volume — typical first-article in 4–6 weeks.",
  },
  {
    q: "Can I tour your facility?",
    a: "Absolutely. Schedule a visit to our Narela, Delhi facility — we'll walk you through every machine and test bench.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes — we ship to clients across Asia, Europe and the Americas. Incoterms by negotiation.",
  },
];

export default function ContactPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Home — Contact"
        title={
          <>
            Ready to{" "}
            <span className="text-[var(--brand)]">get started?</span>
          </>
        }
        description="Tell us what you need to build. Send a spec, a drawing, or just a question — we'll be in touch within one business day."
      />

      {/* ----------------- FORM + LOCATION ----------------- */}
      <section className="relative px-6 pb-24" id="form">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6">
          {/* FORM */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12">
              <p className="text-eyebrow mb-3">Send a message</p>
              <h2 className="text-display text-3xl sm:text-4xl mb-2">
                Let&apos;s talk specs.
              </h2>
              <p className="text-sm text-[var(--foreground-muted)] mb-10">
                Required fields are marked *. Your email address is never
                published.
              </p>

              <ContactForm />
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-5 space-y-3">
            <div className="rounded-3xl border border-[var(--border)] p-8">
              <p className="text-eyebrow mb-2">Our address</p>
              <p className="text-base text-[var(--foreground)] leading-relaxed">
                E-689, DSIIDC Industrial Area
                <br />
                Narela, Delhi 110040
                <br />
                India
              </p>
              <a
                href="https://maps.google.com/?q=E-689+DSIIDC+Narela+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--brand)] hover:underline"
              >
                Open in Google Maps
                <span aria-hidden>→</span>
              </a>
            </div>

            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="block rounded-3xl border border-[var(--border)] p-7 hover-lift bg-[var(--background-elevated)]"
              >
                <p className="text-eyebrow mb-2">{c.label}</p>
                <p className="text-lg text-[var(--foreground)] font-medium tracking-tight">
                  {c.title}
                </p>
                <p className="mt-1 text-xs text-[var(--foreground-muted)]">
                  {c.sub}
                </p>
              </a>
            ))}

            <div className="rounded-3xl border border-[var(--border)] p-8">
              <p className="text-eyebrow mb-3">Office hours</p>
              <ul className="text-sm text-[var(--foreground-muted)] space-y-1.5">
                <li className="flex justify-between">
                  <span>Mon — Fri</span>
                  <span>09:30 — 18:30</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>09:30 — 14:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ----------------- MAP ----------------- */}
      <section className="relative px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
            <iframe
              title="LFC Powercab location"
              src="https://www.google.com/maps?q=E-689+DSIIDC+Narela+Delhi+110040&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale-[0.4] contrast-110"
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ----------------- FAQ ----------------- */}
      <section
        className="relative px-6 py-24 bg-[var(--background-elevated)]"
        id="faq"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-eyebrow mb-4">FAQ</p>
            <h2 className="text-display text-4xl sm:text-5xl">
              Common
              <br />
              <span className="text-[var(--brand)]">questions.</span>
            </h2>
            <p className="mt-6 text-[var(--foreground-muted)] leading-relaxed max-w-md">
              Quick answers to the questions we hear most. Don&apos;t see yours?
              Drop us a note above.
            </p>
          </div>
          <div className="lg:col-span-8 divide-y divide-[var(--border)] border border-[var(--border)] rounded-3xl overflow-hidden">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group bg-[var(--background)] hover:bg-[var(--background-elevated)] transition-colors"
              >
                <summary className="cursor-pointer list-none p-7 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-medium tracking-tight">{f.q}</h3>
                  <span className="text-[var(--brand)] text-2xl leading-none transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-7 pb-7 text-sm text-[var(--foreground-muted)] leading-relaxed -mt-2">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- HELP CTA ----------------- */}
      <section
        className="relative px-6 py-32 overflow-hidden isolate"
        id="help"
      >
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
            <SplitLineReveal mode="words" stagger={80}>
              Prefer to talk?
            </SplitLineReveal>
          </h2>
          <ScrollReveal from="up" delay={150}>
            <p className="mt-6 text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
              Sometimes a 15-minute call beats a hundred emails. Pick a slot
              that works for you and we&apos;ll be on the line.
            </p>
          </ScrollReveal>
          <ScrollReveal from="up" delay={250}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="tel:+911145141615"
                className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--brand)] hover:text-white transition-colors rounded-full px-7 py-3.5 text-sm font-medium"
              >
                <TextHoverReveal hoverColor="var(--background)">
                  +91 11 4514 1615
                </TextHoverReveal>
              </a>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors rounded-full px-6 py-3.5 text-sm font-medium"
              >
                <TextHoverReveal>Browse the catalog</TextHoverReveal>
                <span className="text-[var(--brand)]" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
