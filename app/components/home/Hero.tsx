import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-32 pb-20 overflow-hidden">
      <video
        src="/videos/hero_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--background)]/60 via-[var(--background)]/40 to-[var(--background)]" />
      <div
        className="pointer-events-none absolute -top-1/4 -right-1/4 w-[80vw] h-[80vw] rounded-full opacity-[0.10] blur-3xl"
        style={{ background: "var(--brand)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "var(--brand-deep)" }}
      />
      <div className="relative max-w-7xl mx-auto px-6 w-full grain z-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)] brand-glow" />
          <p className="text-eyebrow">Est. 1989 — Delhi, India</p>
        </div>

        <h1 className="text-display text-[clamp(2.75rem,9vw,9rem)]">
          Bridging the gap
          <br />
          <span className="brand-gradient bg-clip-text text-transparent">
            of connectivity.
          </span>
        </h1>

        <div className="mt-12 grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-5 text-lg text-[var(--foreground-muted)] leading-relaxed max-w-xl">
            For three decades, LFC has engineered wires, cables and connector
            systems trusted by automotive OEMs, appliance giants and
            industrial leaders. Built in Delhi. Specified worldwide.
          </p>

          <div className="lg:col-span-4 flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--brand)] hover:text-white transition-colors rounded-full px-6 py-3 text-sm font-medium"
            >
              Browse catalog
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors rounded-full px-5 py-3 text-sm font-medium"
            >
              Request information
              <span className="text-[var(--brand)]" aria-hidden>
                →
              </span>
            </Link>
          </div>

          <div className="lg:col-span-3 flex items-center gap-2 lg:justify-end">
            <div className="relative h-12 w-12 rounded-full glass-card flex items-center justify-center">
              <span className="text-[var(--brand)] text-xs font-mono">
                ISO
              </span>
            </div>
            <div className="text-xs text-[var(--foreground-muted)]">
              <p className="text-[var(--foreground)] font-medium">
                ISO 9001:2015
              </p>
              <p>Quality management certified</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
