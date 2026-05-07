import Link from "next/link";

export function HomeCTA() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div
          className="absolute inset-0 -z-10 rounded-[40px] opacity-90"
          style={{
            background:
              "radial-gradient(800px 300px at 30% 50%, var(--brand-glow), transparent 70%), radial-gradient(600px 250px at 80% 20%, rgba(255,140,74,0.12), transparent 70%)",
          }}
        />
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-display text-5xl sm:text-7xl md:text-8xl">
            Join the ride.
          </h2>
          <p className="mt-6 text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
            Tell us what you need to build. Our team replies within one
            business day with samples, specs, or a custom quote.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--brand)] hover:text-white transition-colors rounded-full px-7 py-3.5 text-sm font-medium"
            >
              Browse catalog
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors rounded-full px-6 py-3.5 text-sm font-medium"
            >
              Request information
              <span className="text-[var(--brand)]" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
