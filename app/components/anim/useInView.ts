"use client";

import { useEffect, useRef, useState } from "react";
import { useReady } from "./ReadyContext";

export function useInView<T extends Element = HTMLElement>(
  options: IntersectionObserverInit & { once?: boolean } = {},
) {
  const { once = true, root, rootMargin = "0px 0px -10% 0px", threshold = 0.1 } =
    options;
  const ref = useRef<T | null>(null);
  const [intersecting, setIntersecting] = useState(false);
  const ready = useReady();

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIntersecting(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIntersecting(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setIntersecting(false);
          }
        });
      },
      { root, rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, root, rootMargin, threshold]);

  // Hold the reveal until the intro loader has finished AND the element is
  // actually in view. This prevents reveals from "spending themselves" while
  // the curtain is covering them.
  return { ref, inView: ready && intersecting };
}
