"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const READY_EVENT = "lfc:ready";
const PAUSE_EVENT = "lfc:not-ready";
const SESSION_FLAG = "lfc:loader-played";

const Ready = createContext(false);

/**
 * Provider that holds back IntersectionObserver-driven reveals until the
 * intro loader (or the page-transition curtain) finishes clearing the
 * screen. Without this gate, reveals play to completion underneath the
 * curtain and the user sees a static page when it's revealed.
 *
 * - On first paint we start at `false`.
 * - The intro loader dispatches `lfc:ready` when it's done.
 * - PageTransition dispatches `lfc:not-ready` on route change and
 *   `lfc:ready` once its curtain has cleared.
 * - Reduced-motion users get `true` immediately so they aren't held back.
 */
export function ReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setReady(true);
      return;
    }

    if (sessionStorage.getItem(SESSION_FLAG) === "1") {
      setReady(true);
    }

    const onReady = () => setReady(true);
    const onPause = () => setReady(false);
    window.addEventListener(READY_EVENT, onReady);
    window.addEventListener(PAUSE_EVENT, onPause);

    // Hard fallback in case the loader never reports done — never leave the
    // page locked in its hidden state.
    const fallback = window.setTimeout(() => setReady(true), 5000);
    return () => {
      window.removeEventListener(READY_EVENT, onReady);
      window.removeEventListener(PAUSE_EVENT, onPause);
      window.clearTimeout(fallback);
    };
  }, []);

  return <Ready.Provider value={ready}>{children}</Ready.Provider>;
}

export function useReady() {
  return useContext(Ready);
}

export function dispatchReady() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(READY_EVENT));
}

export function dispatchNotReady() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PAUSE_EVENT));
}
