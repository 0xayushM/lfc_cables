import Image from "next/image";

type LogoProps = {
  className?: string;
  /** "nav" = compact for header, "footer" = larger */
  variant?: "nav" | "footer";
};

export function Logo({ className = "", variant = "nav" }: LogoProps) {
  const dims =
    variant === "nav"
      ? { w: 78, h: 26, cls: "h-[22px] w-auto" }
      : { w: 132, h: 44, cls: "h-9 w-auto" };

  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/images/logo.png"
        alt="LFC Wire & Cables"
        width={dims.w * 4}
        height={dims.h * 4}
        priority
        className={`${dims.cls} object-contain`}
      />
    </span>
  );
}
