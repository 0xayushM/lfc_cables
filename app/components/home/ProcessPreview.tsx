import Link from "next/link";

const STEPS = [
  {
    n: "01",
    t: "Design",
    d: "Conceptualizing new cable types and configurations.",
  },
  {
    n: "02",
    t: "Drawing",
    d: "Synthetic diamond dies pull copper rods to spec.",
  },
  {
    n: "03",
    t: "Extrusion",
    d: "Insulating material applied for durability.",
  },
  {
    n: "04",
    t: "Testing",
    d: "Every reel validated to ISO and customer specs.",
  },
];

export function ProcessPreview() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-eyebrow mb-4">How we work</p>
            <h2 className="text-display text-4xl sm:text-6xl">
              From copper rod
              <br />
              to{" "}
              <span className="text-[var(--brand)]">finished assembly.</span>
            </h2>
          </div>
          <Link
            href="/manufacturing"
            className="inline-flex items-center gap-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
          >
            See full process
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STEPS.map((step) => (
            <article
              key={step.n}
              className="rounded-3xl border border-[var(--border)] p-6 hover-lift bg-[var(--background)]"
            >
              <span className="font-mono text-xs text-[var(--brand)]">
                {step.n}
              </span>
              <h3 className="mt-8 text-xl font-medium tracking-tight">
                {step.t}
              </h3>
              <p className="mt-2 text-sm text-[var(--foreground-muted)] leading-relaxed">
                {step.d}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
