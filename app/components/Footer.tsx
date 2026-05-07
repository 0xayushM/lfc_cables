import Link from "next/link";
import { Logo } from "./Logo";
import { SubscribeForm } from "./SubscribeForm";

const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/about", label: "About" },
      { href: "/products", label: "Products" },
      { href: "/manufacturing", label: "Process" },
      { href: "/gallery", label: "Gallery" },
      { href: "/certification", label: "Certification" },
    ],
  },
  {
    title: "Industries",
    links: [
      { href: "/products#automotive", label: "Automotive" },
      { href: "/products#appliances", label: "Appliances" },
      { href: "/products#footwear", label: "Footwear" },
      { href: "/products#construction", label: "Construction" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/contact#help", label: "Help" },
      { href: "/certification", label: "Quality policy" },
      { href: "/contact#faq", label: "FAQ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[var(--border)]">
      {/* Subscribe band */}
      <section className="px-6 pt-20 pb-16 max-w-7xl mx-auto">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-eyebrow mb-4">Stay connected</p>
            <h2 className="text-display text-4xl sm:text-5xl">
              Bridging the gap{" "}
              <span className="text-[var(--brand)]">of connectivity.</span>
            </h2>
            <p className="mt-5 text-[var(--foreground-muted)] text-base max-w-md">
              News, product launches and certifications &mdash; delivered
              quarterly. No noise.
            </p>
          </div>

          <SubscribeForm />
        </div>
      </section>

      <div className="divider-soft mx-6" />

      {/* Main footer */}
      <section className="px-6 py-16 max-w-7xl mx-auto grid gap-12 grid-cols-2 md:grid-cols-5">
        <div className="col-span-2">
          <Logo variant="footer" />
          <p className="mt-5 text-sm text-[var(--foreground-muted)] max-w-sm leading-relaxed">
            Manufacturing precision wires, cables, and connector systems for
            automotive, appliance, and industrial applications since 1989.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <p className="text-[var(--foreground-muted)]">
              <span className="text-[var(--foreground-subtle)] mr-2">M</span>
              <a
                href="mailto:info@lfcpowercab.com"
                className="hover:text-[var(--brand)] transition-colors"
              >
                info@lfcpowercab.com
              </a>
            </p>
            <p className="text-[var(--foreground-muted)]">
              <span className="text-[var(--foreground-subtle)] mr-2">T</span>
              <a
                href="tel:+911145141615"
                className="hover:text-[var(--brand)] transition-colors"
              >
                +91 11 4514 1615
              </a>
            </p>
            <p className="text-[var(--foreground-muted)]">
              <span className="text-[var(--foreground-subtle)] mr-2">A</span>
              E-689, DSIIDC Narela, Delhi-110040
            </p>
          </div>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-eyebrow mb-5">{col.title}</h4>
            <ul className="space-y-3 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="divider-soft mx-6" />

      <section className="px-6 py-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--foreground-subtle)]">
        <div className="flex items-center gap-6">
          <span>LFC&nbsp;©&nbsp;{new Date().getFullYear()}</span>
          <span>ISO 9001:2015 certified</span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="#"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Facebook
          </a>
          <a
            href="#"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Twitter
          </a>
        </div>
      </section>
    </footer>
  );
}
