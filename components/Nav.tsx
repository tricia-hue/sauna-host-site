"use client";

import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/config";

/**
 * Smooth-scroll to the hero's email input and focus it.
 * Used by the nav "Start free" CTA so the click always produces a visible,
 * obvious outcome — even when the user is already near the top of the page.
 */
function focusEmailInput(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const el = document.getElementById("email-input") as HTMLInputElement | null;
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  // Wait for scroll to settle before focusing (prevents iOS jump-and-snap)
  window.setTimeout(() => el.focus({ preventScroll: true }), 450);
}

/**
 * Nav — Revivery brand note (digital adaptation):
 * The Revivery Brand Manual (§1) specifies the Primary Logo must be center- or right-justified.
 * On web, left-justified logos are the dominant UX convention — users expect the brand mark
 * at the top-left as the "home" affordance. We preserve web convention here with the
 * canonical Peach logo on Blue Black (the manual's preferred on-brand color pairing).
 */
export default function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="container-sauna flex items-center justify-between py-8">
        <Link
          href="/"
          className="flex items-center gap-4 group"
          aria-label="The Sauna Host — a free mini course from Revivery"
        >
          <Image
            src="/brand/logo-primary-peach.png"
            alt="Revivery"
            width={120}
            height={28}
            priority
            className="h-6 md:h-7 w-auto opacity-95 group-hover:opacity-100 transition-opacity"
          />
          <span className="hidden sm:inline-block w-px h-4 bg-peach/30" aria-hidden />
          <span className="font-display text-xs uppercase tracking-display text-peach/80 group-hover:text-gold transition-colors">
            The Sauna Host
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/#curriculum"
            className="font-display text-xs uppercase tracking-heading text-peach/70 hover:text-peach transition-colors"
          >
            Curriculum
          </Link>
          <Link
            href="/#themes"
            className="font-display text-xs uppercase tracking-heading text-peach/70 hover:text-peach transition-colors"
          >
            Themes
          </Link>
          <Link
            href="/#faq"
            className="font-display text-xs uppercase tracking-heading text-peach/70 hover:text-peach transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/#start"
            onClick={focusEmailInput}
            className="font-display text-xs uppercase tracking-heading text-gold hover:text-peach transition-colors"
          >
            Start free →
          </Link>
        </nav>
      </div>
    </header>
  );
}
