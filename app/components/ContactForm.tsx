"use client";

import { useState } from "react";

const TOPICS = [
  "Quote",
  "Samples",
  "Custom build",
  "Facility tour",
  "Documentation",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Your name *"
          name="name"
          type="text"
          placeholder="Jane Doe"
          required
        />
        <Field
          label="Company"
          name="company"
          type="text"
          placeholder="Acme Industries"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Email *"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          placeholder="+91 12345 67890"
        />
      </div>
      <div>
        <span className="text-eyebrow mb-3 block">What can we help with?</span>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((opt) => (
            <label
              key={opt}
              className="cursor-pointer glass-pill rounded-full px-4 py-2 text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--brand)] transition-colors has-[:checked]:bg-[var(--brand)] has-[:checked]:text-white has-[:checked]:border-[var(--brand)]"
            >
              <input
                type="checkbox"
                name="topic"
                value={opt}
                className="sr-only"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="text-eyebrow mb-3 block">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Tell us about your project, volumes, target lead time…"
          className="w-full rounded-2xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--brand)] outline-none text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] p-4 transition-colors resize-y"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={submitted}
          className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--brand)] hover:text-white transition-colors rounded-full px-7 py-3.5 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitted ? "Message sent — thank you!" : "Send message"}
          {!submitted && <span aria-hidden>→</span>}
        </button>
        <p className="text-xs text-[var(--foreground-subtle)]">
          By submitting, you agree to our use of your information to respond.
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: "text" | "email" | "tel";
  placeholder?: string;
  required?: boolean;
};

function Field({ label, name, type, placeholder, required }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="text-eyebrow mb-3 block">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--brand)] outline-none text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] px-4 py-3.5 transition-colors"
      />
    </div>
  );
}
