"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { dispatchNotReady, dispatchReady } from "./anim/ReadyContext";

type Phase = "idle" | "leaving" | "entering";

const ENTER_MS = 550;
const HOLD_MS = 80;

/**
 * Barba-style curtain. We can't intercept Next's app-router navigation, so
 * instead we react to pathname changes: as soon as the path changes, we slide
 * the curtain UP from the bottom, hold briefly, then drop the panel off the
 * top to reveal the new page that has already mounted underneath.
 *
 * Also wires anchor `data-prefetch` clicks on internal Links so the leaving
 * curtain hits BEFORE the route swaps when the user clicks something.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const lastPath = useRef(pathname);

  // When pathname actually changes, run the entering→idle sequence.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    // Hide reveals while the curtain covers the screen.
    dispatchNotReady();
    setPhase("entering");
    // Curtain settles, then we slide it back out of view.
    const t1 = window.setTimeout(() => {
      setPhase("leaving");
    }, ENTER_MS + HOLD_MS);
    const t2 = window.setTimeout(
      () => {
        setPhase("idle");
        // Curtain has cleared — let reveals play.
        dispatchReady();
      },
      ENTER_MS + HOLD_MS + ENTER_MS,
    );
    // Reset window scroll so the new page starts at the top once curtain hides.
    window.scrollTo({ top: 0 });
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  return (
    <>
      {children}
      <div
        aria-hidden
        className={`page-curtain ${
          phase === "entering" ? "is-entering" : ""
        } ${phase === "leaving" ? "is-leaving" : ""}`}
      >
        <div className="page-curtain__panel" />
      </div>
    </>
  );
}
