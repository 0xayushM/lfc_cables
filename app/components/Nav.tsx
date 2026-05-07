"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/manufacturing", label: "Process" },
  { href: "/gallery", label: "Gallery" },
  { href: "/certification", label: "Certification" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex justify-center px-4 transition-all duration-500 ${
        scrolled ? "pt-3" : "pt-6"
      }`}
    >
      <nav
        className={`glass-pill flex items-center gap-1 rounded-full pl-5 pr-1.5 py-1.5 text-sm transition-all duration-500 ${
          scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.4)]" : ""
        }`}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex items-center pr-3 mr-1 border-r border-[var(--border)]"
        >
          <Logo />
        </Link>

        <ul className="hidden lg:flex items-center">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3.5 py-2 rounded-full transition-colors ${
                    active
                      ? "text-[var(--foreground)]"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="hidden sm:inline-flex items-center gap-1.5 ml-1 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--brand)] hover:text-[var(--foreground)] transition-colors rounded-full px-4 py-2 font-medium"
        >
          Get a quote
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden absolute top-full mt-3 left-4 right-4 glass-pill rounded-3xl p-3 animate-fade-up">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm ${
                      active
                        ? "bg-[var(--surface)] text-[var(--foreground)]"
                        : "text-[var(--foreground-muted)]"
                    }`}
                  >
                    {link.label}
                    <span className="text-[var(--foreground-subtle)]">→</span>
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 pt-2 border-t border-[var(--border)]">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-[var(--brand)] text-white px-4 py-3 rounded-2xl font-medium"
              >
                Get a quote →
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
