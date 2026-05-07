import Image from "next/image";

const INDUSTRIES = [
  {
    name: "Automotive",
    description:
      "Wire harnesses, terminals and battery sleeving for OEMs and Tier-1 suppliers.",
    image: "/images/products/power-cord.png",
  },
  {
    name: "Appliances",
    description:
      "Power cords, ribbon cables and injection-moulded parts for global brands.",
    image: "/images/products/power-cord.png",
  },
  {
    name: "Construction",
    description:
      "Submersible and household cables built to withstand demanding sites.",
    image: "/images/products/power-cord.png",
  },
  {
    name: "Footwear",
    description:
      "Rexine and synthetic materials for lining, uppers and heel counters.",
    image: "/images/products/power-cord.png",
  },
];

export function IndustriesServed() {
  return (
    <section className="relative py-24 px-6 bg-[var(--background-elevated)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-eyebrow mb-4">Industries we serve</p>
            <h2 className="text-display text-4xl sm:text-6xl">
              Your 360° partner in
              <br />
              <span className="text-[var(--brand)]">
                electromechanical solutions.
              </span>
            </h2>
          </div>
          <p className="text-[var(--foreground-muted)] max-w-md text-base">
            From a single connector to a fully assembled harness, we cover
            every step of the value chain — design, prototyping, production,
            testing and packaging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INDUSTRIES.map((ind) => (
            <article
              key={ind.name}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] hover-lift"
            >
              <Image
                src={ind.image}
                alt={ind.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <p className="text-eyebrow text-[var(--foreground-muted)] mb-3">
                  Industry
                </p>
                <h3 className="text-3xl font-medium tracking-tight mb-3">
                  {ind.name}
                </h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {ind.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
