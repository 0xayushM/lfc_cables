import Link from "next/link";
import { CableBackground } from "../CableBackground";
import { SplitLineReveal } from "../anim/SplitLineReveal";
import { TextHoverReveal } from "../anim/TextHoverReveal";

export function HomeCTA() {
  return (
    <section className="relative py-32 px-6 overflow-hidden isolate">
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
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-display text-5xl sm:text-7xl md:text-8xl">
            <SplitLineReveal mode="words" stagger={80}>
              Join the ride.
            </SplitLineReveal>
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
              <TextHoverReveal hoverColor="var(--background)">
                Browse catalog
              </TextHoverReveal>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors rounded-full px-6 py-3.5 text-sm font-medium"
            >
              <TextHoverReveal>Request information</TextHoverReveal>
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
