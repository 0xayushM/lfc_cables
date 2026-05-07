const STATS = [
  { value: "34", label: "Years of expertise", suffix: "+" },
  { value: "25", label: "Wire capacity", suffix: " KM" },
  { value: "30", label: "Parts produced", suffix: "M" },
  { value: "1000", label: "Active SKUs", suffix: "+" },
];

export function KeyIndicators() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 w-[40vw] h-[40vw] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "var(--brand)" }}
      />
      <div className="max-w-7xl mx-auto relative">
        <div className="max-w-3xl mb-16">
          <p className="text-eyebrow mb-4">Key indicators</p>
          <h2 className="text-display text-4xl sm:text-6xl">
            Numbers that tell{" "}
            <span className="text-[var(--brand)]">a story.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)]">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-[var(--background)] p-8 lg:p-10 hover-lift"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-display text-5xl sm:text-7xl text-[var(--foreground)]">
                  {stat.value}
                </span>
                <span className="text-2xl text-[var(--brand)] font-medium">
                  {stat.suffix}
                </span>
              </div>
              <p className="mt-3 text-sm text-[var(--foreground-muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
