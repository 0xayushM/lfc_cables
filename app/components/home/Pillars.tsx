const PILLARS = [
  {
    title: "Integrity",
    description:
      "Ethics and transparency baked into every contract, every shipment.",
  },
  {
    title: "Innovation",
    description:
      "Continuous R&D in materials, tooling and process to stay ahead.",
  },
  {
    title: "Commitment",
    description:
      "Promises kept. On-time delivery rate of 99.4% across our top accounts.",
  },
  {
    title: "Excellence",
    description:
      "Set the bar high — exceed it. ISO 9001 is our floor, not our ceiling.",
  },
];

export function Pillars() {
  return (
    <section className="relative py-24 px-6 bg-[var(--background-elevated)]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="text-eyebrow mb-4">Our pillars</p>
          <h2 className="text-display text-4xl sm:text-5xl">
            Four values.
            <br />
            <span className="text-[var(--brand)]">Zero compromises.</span>
          </h2>
          <p className="mt-6 text-[var(--foreground-muted)] leading-relaxed">
            The principles that guide everything &mdash; from the way we
            source copper to how we answer the phone.
          </p>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-3">
          {PILLARS.map((pillar, i) => (
            <article
              key={pillar.title}
              className="glass-card rounded-3xl p-7 hover-lift"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-[var(--foreground-subtle)]">
                  0{i + 1}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
              </div>
              <h3 className="text-xl font-medium tracking-tight mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
