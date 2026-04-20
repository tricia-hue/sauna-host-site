"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type OptInFormProps = {
  variant?: "hero" | "inline" | "mid";
  ctaLabel?: string;
  microcopy?: string;
  redirectTo?: string;
  source?: string;
};

/**
 * Primary email-capture form.
 * POSTs to /api/subscribe which sets the unlock cookie and fires the ESP.
 */
export default function OptInForm({
  variant = "hero",
  ctaLabel = "Start the course — free",
  microcopy = "Day 1 arrives the moment you sign up. Unsubscribe any time.",
  redirectTo = "/welcome",
  source = "landing",
}: OptInFormProps) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, source }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Something went wrong");
      }

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={onSubmit}
      className={`w-full ${isHero ? "max-w-xl" : "max-w-lg"}`}
      aria-label="Start the course"
    >
      <div
        className={`flex flex-col ${
          isHero ? "sm:flex-row" : "sm:flex-row"
        } gap-3`}
      >
        {isHero && (
          <input
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="flex-1 min-w-0 bg-transparent border border-peach/30 text-peach placeholder:text-peach/40 px-4 py-3 font-sans focus:outline-none focus:border-gold transition-colors"
          />
        )}
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 min-w-0 bg-transparent border border-peach/30 text-peach placeholder:text-peach/40 px-4 py-3 font-sans focus:outline-none focus:border-gold transition-colors"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary disabled:opacity-60 disabled:cursor-wait whitespace-nowrap"
        >
          {status === "submitting" ? "Just a second…" : ctaLabel}
        </button>
      </div>

      {microcopy && (
        <p className="text-peach/50 text-xs mt-4">{microcopy}</p>
      )}

      {status === "error" && error && (
        <p className="text-gold-light text-sm mt-3" role="alert">
          {error} — try again, or email us at learn@revivery.co.
        </p>
      )}
    </form>
  );
}
