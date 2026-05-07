"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export type Logo = {
  name: string;
  src: string;
};

type Props = {
  logos: Logo[];
  cycleInterval?: number;
  className?: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function useGrid(): { cols: number; rows: number } {
  const [grid, setGrid] = useState({ cols: 3, rows: 2 });
  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const update = () =>
      setGrid(md.matches ? { cols: 3, rows: 2 } : { cols: 2, rows: 3 });
    update();
    md.addEventListener("change", update);
    return () => md.removeEventListener("change", update);
  }, []);
  return grid;
}

const ENTER_DELAY = 120;
const EXIT_DURATION = 1000;

function LogoCell({
  logos,
  offset,
  tick,
  stagger,
}: {
  logos: Logo[];
  offset: number;
  tick: number;
  stagger: number;
}) {
  const n = logos.length;
  const current = (offset + tick) % n;
  const previous = (offset + tick - 1 + n) % n;

  const [showPrev, setShowPrev] = useState(false);
  useEffect(() => {
    if (tick === 0) return;
    setShowPrev(true);
    const t = setTimeout(
      () => setShowPrev(false),
      stagger + EXIT_DURATION + 120,
    );
    return () => clearTimeout(t);
  }, [tick, stagger]);

  const Curr = logos[current];
  const Prev = logos[previous];

  return (
    <div className="relative h-16 md:h-20 lg:h-24 w-full overflow-hidden">
      {showPrev && (
        <div
          key={`p-${tick}`}
          className="absolute inset-0 flex items-center justify-center animate-logo-out"
          style={{ animationDelay: `${stagger}ms` }}
        >
          <div className="relative h-full w-full">
            <Image
              src={Prev.src}
              alt={Prev.name}
              fill
              sizes="240px"
              className="object-contain object-center brightness-100"
            />
          </div>
        </div>
      )}
      <div
        key={`c-${tick}`}
        className="absolute inset-0 flex items-center justify-center animate-logo-in"
        style={{ animationDelay: `${stagger + ENTER_DELAY}ms` }}
      >
        <div className="relative h-full w-full">
          <Image
            src={Curr.src}
            alt={Curr.name}
            fill
            sizes="240px"
            className="object-contain object-center brightness-100"
          />
        </div>
      </div>
    </div>
  );
}

export function LogoCarousel({
  logos,
  cycleInterval = 3000,
  className,
}: Props) {
  const { cols, rows } = useGrid();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const ordered = useMemo(
    () => (mounted ? shuffle(logos) : logos),
    [logos, mounted],
  );

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), cycleInterval);
    return () => clearInterval(id);
  }, [cycleInterval]);

  // Cap total cells to logos.length so the grid never duplicates a logo.
  const totalCells = Math.min(cols * rows, ordered.length);

  return (
    <div
      className={`grid w-full gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8 ${className ?? ""}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: totalCells }).map((_, i) => (
        <LogoCell
          key={i}
          logos={ordered}
          offset={i}
          tick={tick}
          stagger={(i % cols) * 240 + Math.floor(i / cols) * 120}
        />
      ))}
    </div>
  );
}
