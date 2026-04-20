import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCookieConfig } from "@/lib/auth";

/**
 * GET /api/unlock
 * "Restore access" utility for users who already subscribed on a different
 * device / browser. Sets the unlock cookie and redirects to /lesson-2.
 *
 * Note: there is no actual authentication — this is a low-friction convenience.
 * The right friction for a free course is the email entry, not a secure login.
 */
export async function GET() {
  const cookieConfig = getCookieConfig();
  cookies().set(cookieConfig.name, cookieConfig.value, {
    maxAge: cookieConfig.maxAge,
    path: cookieConfig.path,
    httpOnly: cookieConfig.httpOnly,
    secure: cookieConfig.secure,
    sameSite: cookieConfig.sameSite,
  });
  return NextResponse.redirect(new URL("/lesson-2", "https://revivery.co"));
}
