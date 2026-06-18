"use client";

import { useEffect, useState } from "react";

/**
 * Persistent bottom bar shown on Lesson 1 (the ungated tripwire page).
 *
 * Pinterest / cold traffic lands mid-page and skims. The single action we want
 * — unlock Lessons 2–5 by email — otherwise only appears at the very bottom.
 * This keeps that one ask visible while they read, then gets out of the way:
 * it hides itself once the opt-in form (#unlock) scrolls into view so the two
 * never compete on screen.
 */
export default function StickyUnlockBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("unlock");
    let formInView = false;

    const update = () => {
      if (formInView) {
        setVisible(false);
        return;
      }
      // Reveal once they've started reading, not on the very first screen.
      setVisible(window.scrollY > 320);
    };

    const observer =
      target && "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              formInView = entry.isIntersecting;
              update();
            },
            { threshold: 0.2 }
          )
        : null;
    if (target && observer) observer.observe(target);

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      observer?.disconnect();
    };
  }, []);

  const goToUnlock = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById("unlock");
    const email = document.getElementById(
      "email-input"
    ) as HTMLInputElement | null;
    (section ?? email)?.scrollIntoView({ behavior: "smooth", block: "center" });
    // Let the smooth scroll settle before focusing (prevents iOS jump-and-snap).
    window.setTimeout(() => email?.focus({ preventScroll: true }), 500);
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-blue-black/95 border-t border-gold/30 backdrop-blur-sm">
        <div className="container-sauna flex items-center justify-between gap-4 py-4">
          <p className="text-sm leading-snug text-peach/75">
            <span className="font-display uppercase tracking-heading text-xs text-peach">
              You're reading 1 of 5
            </span>
            <span className="hidden sm:inline">
              {" "}
              — the next four lessons + the workbook unlock by email.
            </span>
          </p>
          <a
            href="#unlock"
            onClick={goToUnlock}
            className="btn-primary whitespace-nowrap"
          >
            Unlock Lessons 2–5 →
          </a>
        </div>
      </div>
    </div>
  );
}
