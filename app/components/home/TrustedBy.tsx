import { LogoCarousel, type Logo } from "./LogoCarousel";

const PARTNERS: Logo[] = [
  { name: "Motherson", src: "/images/companies/motherson.png" },
  { name: "Groupe SEB", src: "/images/companies/seb.png" },
  { name: "Elentec", src: "/images/companies/elentec.png" },
  { name: "Syska", src: "/images/companies/syska.png" },
  { name: "Lumax", src: "/images/companies/lumax.png" },
  { name: "Fiem", src: "/images/companies/fiem.png" },
];

export function TrustedBy() {
  return (
    <section className="relative py-12 px-6 border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <p className="text-eyebrow whitespace-nowrap shrink-0">
          Trusted by industry leaders
        </p>
        <div className="flex-1 w-full">
          <LogoCarousel logos={PARTNERS} cycleInterval={2200} />
        </div>
      </div>
    </section>
  );
}
