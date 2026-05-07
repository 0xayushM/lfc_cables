"use client";

export function SubscribeForm() {
  return (
    <form
      className="flex w-full lg:w-auto items-center gap-2 glass-card rounded-full p-1.5 pl-5 max-w-md"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        required
        placeholder="you@company.com"
        aria-label="Email address"
        className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] outline-none py-2"
      />
      <button
        type="submit"
        className="brand-gradient text-white text-sm font-medium px-5 py-2.5 rounded-full hover:brightness-110 transition-all"
      >
        Subscribe
      </button>
    </form>
  );
}
