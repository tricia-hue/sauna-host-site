import { cookies } from "next/headers";
import { site } from "./config";

/**
 * Lightweight "gating" via an HTTP-only cookie set when the user opts in.
 * Not security — just friction. That's the right bar for a free course:
 * the friction is typing your email, not locking out determined readers.
 */

export function isUnlocked(): boolean {
  try {
    const store = cookies();
    return store.get(site.cookieName)?.value === "1";
  } catch {
    // Called from a client context — default to locked; client-side check will re-check
    return false;
  }
}

export function getCookieConfig() {
  return {
    name: site.cookieName,
    value: "1",
    maxAge: 60 * 60 * 24 * site.cookieDays,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
  };
}
