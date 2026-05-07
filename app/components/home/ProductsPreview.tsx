import Image from "next/image";
import Link from "next/link";

const PRODUCTS = [
  {
    title: "Power cords",
    spec: "BIS / VDE / UL",
    image: "/images/products/power-cord.png",
    bg: "from-orange-500/15 to-transparent",
  },
  {
    title: "Wire harnesses",
    spec: "Custom builds",
    image: "/images/products/wire-harness.png",
    bg: "from-amber-500/15 to-transparent",
  },
  {
    title: "Flat ribbon cables",
    spec: "1.27mm pitch",
    image: "/images/products/ribbon-cable.png",
    bg: "from-rose-500/15 to-transparent",
  },
  {
    title: "Connectors & terminals",
    spec: "Brass / tin-plated",
    image: "/images/products/terminal-and-coupler.png",
    bg: "from-yellow-500/15 to-transparent",
  },
];

export function ProductsPreview() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-eyebrow mb-4">Our product range</p>
            <h2 className="text-display text-4xl sm:text-6xl">
              Engineered for the{" "}
              <span className="text-[var(--brand)]">
                mobility of tomorrow.
              </span>
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
          >
            View full catalog
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.map((p) => (
            <article
              key={p.title}
              className="group hover-lift relative rounded-3xl overflow-hidden bg-[var(--surface)] aspect-[3/4] border border-[var(--border)]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.bg}`}
              />
              <div className="absolute inset-0 p-6 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="absolute inset-0 p-5 flex flex-col justify-between pointer-events-none">
                <span className="text-eyebrow self-start glass-pill rounded-full px-3 py-1.5 text-[10px]">
                  {p.spec}
                </span>
                <div>
                  <h3 className="text-xl font-medium tracking-tight">
                    {p.title}
                  </h3>
                  <span className="mt-2 text-xs text-[var(--brand)] inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Know more →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
