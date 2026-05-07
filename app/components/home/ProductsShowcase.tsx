"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import productsData from "@/app/data/products.json";

type Spec = { icon: string; label: string; value: string };
type Product = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  video: string;
  image: string;
  specs: Spec[];
};

const PRODUCTS = productsData as Product[];

/* =========================================================
   DESKTOP — sticky scroll-jacked showcase
   ========================================================= */
function DesktopShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.min(Math.max(0, -rect.top), total);
      const progress = scrolled / total;
      const idx = Math.min(
        PRODUCTS.length - 1,
        Math.floor(progress * PRODUCTS.length),
      );
      setActive((prev) => (prev === idx ? prev : idx));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToProduct = (i: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + ((i + 0.5) / PRODUCTS.length) * total;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const activeProduct = PRODUCTS[active];

  return (
    <section
      ref={wrapperRef}
      className="relative hidden md:block"
      style={{ height: `${PRODUCTS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {PRODUCTS.map((p, i) => (
          <div
            key={p.id}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/70 to-transparent" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]/40" />
            {/* Blurred video — only rendered for the active product so we
                aren't playing every video at once. */}
            {/* Sharp product image on top of the blurred video */}
            <Image
              src={p.image}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover relative"
            />
          </div>
        ))}

        <div className="relative h-full max-w-7xl mx-auto px-6 grid grid-cols-12 items-center gap-6">
          <aside className="col-span-4 lg:col-start-8 lg:col-span-5 z-10 mt-16">
            <div className="glass-card backdrop-blur-lg bg-gray-50 rounded-3xl overflow-hidden">
              {PRODUCTS.map((p, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => scrollToProduct(i)}
                    className={`w-full text-left transition-colors ${
                      isActive
                        ? "bg-[var(--background)]/40"
                        : "hover:bg-[var(--background)]/20"
                    }`}
                  >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] last:border-b-0">
                      <span
                        className={`text-md md:text-lg font-medium tracking-tight transition-colors ${
                          isActive
                            ? "text-[var(--foreground)]"
                            : "text-[var(--foreground-muted)]"
                        }`}
                      >
                        {p.name}
                      </span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          isActive
                            ? "bg-[var(--brand)] brand-glow"
                            : "bg-[var(--foreground-subtle)]"
                        }`}
                      />
                    </div>
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5">
                          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden border border-[var(--border)]">
                            <video
                              key={p.video}
                              src={p.video}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                          <p className="mt-3 text-xs text-[var(--foreground-muted)] leading-relaxed">
                            {p.tagline}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="hidden lg:block lg:col-start-6 lg:col-span-4 relative h-full pointer-events-none">
            <svg
              viewBox="0 0 400 600"
              className="absolute inset-0 w-full h-full"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              aria-hidden
            >
              <circle cx="230" cy="320" r="38" className="text-[var(--foreground-muted)]/60" />
              <circle cx="230" cy="320" r="2.5" fill="currentColor" className="text-[var(--brand)]" />
              <path d="M195 320 L105 295" className="text-[var(--foreground-muted)]/60" />
              <circle cx="105" cy="295" r="3" fill="currentColor" className="text-[var(--brand)]" />
            </svg>
          </div>

          <div className="col-span-7 lg:col-start-1 lg:col-span-4 z-10 row-start-1">
            <article
              key={activeProduct.id}
              className="glass-card rounded-3xl p-7 md:p-8 animate-fade-up"
            >
              <p className="text-eyebrow mb-4">{activeProduct.category}</p>
              <h3 className="text-display text-3xl md:text-4xl lg:text-5xl">
                {activeProduct.name}
              </h3>
              <p className="mt-4 text-sm text-[var(--foreground-muted)] leading-relaxed">
                {activeProduct.description}
              </p>
              <div className="mt-7 space-y-4">
                {activeProduct.specs.map((s) => (
                  <div key={s.label}>
                    <p className="flex items-center gap-2 text-eyebrow text-[10px]">
                      <span className="text-[var(--brand)] not-italic">
                        {s.icon}
                      </span>
                      {s.label}
                    </p>
                    <p className="mt-1.5 text-sm text-[var(--foreground)]">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>

        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <button
            type="button"
            onClick={() => scrollToProduct((active + 1) % PRODUCTS.length)}
            className="glass-pill rounded-full pl-2 pr-5 py-2 flex items-center gap-3 text-sm hover:bg-[var(--background)]/60 transition-colors"
          >
            <span className="relative h-7 w-7 rounded-full overflow-hidden">
              <Image src={activeProduct.image} alt="" fill sizes="28px" className="object-cover" />
            </span>
            <span className="text-[var(--foreground-muted)]">
              More about{" "}
              <span className="text-[var(--foreground)]">
                {activeProduct.name}
              </span>
            </span>
          </button>
        </div> */}

        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Jump to product ${i + 1}`}
              onClick={() => scrollToProduct(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === active
                  ? "bg-[var(--brand)] brand-glow scale-110"
                  : "bg-[var(--foreground-subtle)] hover:bg-[var(--foreground-muted)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MOBILE — horizontal snap slider
   ========================================================= */
function MobileShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setActive((prev) =>
        prev === idx ? prev : Math.min(PRODUCTS.length - 1, Math.max(0, idx)),
      );
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToCard = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="relative md:hidden py-16">
      <div className="px-6 mb-8">
        <p className="text-eyebrow mb-3">Our product range</p>
        <h2 className="text-display text-3xl">
          Engineered for the{" "}
          <span className="text-[var(--brand)]">mobility of tomorrow.</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-4 px-6 pb-6"
      >
        {PRODUCTS.map((p, i) => (
          <article
            key={p.id}
            className="snap-center shrink-0 w-[85vw] max-w-md aspect-[3/5] relative rounded-3xl overflow-hidden border border-[var(--border)]"
          >
            {/* Blurred backdrop */}
            <Image
              src={p.image}
              alt=""
              fill
              sizes="85vw"
              priority={i === 0}
              aria-hidden
              className="object-cover scale-125 blur-[60px] saturate-150"
            />
            {/* Sharp product image floating on top */}
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="85vw"
              className="object-cover scale-100 relative"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />

            {/* top pill */}
            <div className="absolute top-4 left-4 right-4 flex items-center gap-3 glass-pill rounded-2xl p-2 pr-4">
              <div className="relative h-10 w-10 rounded-xl overflow-hidden shrink-0">
                {i === active ? (
                  <video
                    key={p.video}
                    src={p.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                )}
              </div>
              <span className="text-sm font-medium tracking-tight truncate">
                {p.name}
              </span>
            </div>

            {/* bottom spec card */}
            <div className="absolute left-4 right-4 bottom-4 glass-card rounded-2xl p-5">
              <p className="text-eyebrow text-[10px] mb-2">{p.category}</p>
              <h3 className="text-display text-2xl leading-tight">
                {p.name}
              </h3>
              <div className="mt-4 space-y-3">
                {p.specs.map((s) => (
                  <div key={s.label}>
                    <p className="flex items-center gap-2 text-eyebrow text-[10px]">
                      <span className="text-[var(--brand)] not-italic">
                        {s.icon}
                      </span>
                      {s.label}
                    </p>
                    <p className="mt-1 text-xs text-[var(--foreground)] leading-snug">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* dots */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show product ${i + 1}`}
            onClick={() => scrollToCard(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active
                ? "w-6 bg-[var(--brand)]"
                : "w-1.5 bg-[var(--foreground-subtle)]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   PUBLIC EXPORT
   ========================================================= */
export function ProductsShowcase() {
  return (
    <>
      <DesktopShowcase />
      <MobileShowcase />
    </>
  );
}
