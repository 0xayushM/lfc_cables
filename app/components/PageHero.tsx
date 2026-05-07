import Link from "next/link";
import type { ReactNode } from "react";
import { ScrollReveal } from "./anim/ScrollReveal";
import { TextHoverReveal } from "./anim/TextHoverReveal";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function PageHero({
  eyebrow,
  title,
  description,
  cta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Backdrop glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "var(--brand)" }}
      />
      <div className="relative max-w-7xl mx-auto px-6 grain">
        <ScrollReveal from="up" duration={600} delay={50}>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)] brand-glow" />
            <p className="text-eyebrow">{eyebrow}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal from="up" duration={900} delay={120}>
          <h1 className="text-display text-5xl sm:text-7xl md:text-[88px] max-w-4xl">
            {title}
          </h1>
        </ScrollReveal>
        {description && (
          <ScrollReveal from="up" duration={800} delay={260}>
            <p className="mt-8 max-w-2xl text-lg text-[var(--foreground-muted)] leading-relaxed">
              {description}
            </p>
          </ScrollReveal>
        )}
        {(cta || secondaryCta) && (
          <ScrollReveal from="up" duration={800} delay={380}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {cta && (
                <Link
                  href={cta.href}
                  className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--brand)] hover:text-white transition-colors rounded-full px-6 py-3 text-sm font-medium"
                >
                  <TextHoverReveal hoverColor="var(--background)">
                    {cta.label}
                  </TextHoverReveal>
                  <span aria-hidden>→</span>
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors rounded-full px-5 py-3 text-sm font-medium"
                >
                  <TextHoverReveal>{secondaryCta.label}</TextHoverReveal>
                  <span className="text-[var(--brand)]" aria-hidden>
                    →
                  </span>
                </Link>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
