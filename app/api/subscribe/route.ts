import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { subscribeToEmailList } from "@/lib/email";
import { getCookieConfig } from "@/lib/auth";

/**
 * POST /api/subscribe
 * Body: { email: string, firstName?: string, theme?: string, source?: string }
 *
 * 1. Adds the email to the ESP (Brevo by default; see lib/email.ts)
 * 2. Sets the unlock cookie so Lessons 2–5 and the workbook become accessible
 * 3. Returns { ok: true } on success — the client then redirects to /welcome
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      email?: string;
      firstName?: string;
      theme?: string;
      source?: string;
    };

    if (!body.email || !isValidEmail(body.email)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const result = await subscribeToEmailList({
      email: body.email.trim().toLowerCase(),
      firstName: body.firstName?.trim() || undefined,
      theme: body.theme,
      source: body.source || "direct",
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, message: result.message || "Subscription failed." },
        { status: 502 },
      );
    }

    // Set the unlock cookie
    const cookieConfig = getCookieConfig();
    cookies().set(cookieConfig.name, cookieConfig.value, {
      maxAge: cookieConfig.maxAge,
      path: cookieConfig.path,
      httpOnly: cookieConfig.httpOnly,
      secure: cookieConfig.secure,
      sameSite: cookieConfig.sameSite,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/subscribe] error:", err);
    return NextResponse.json(
      { ok: false, message: "Server error. Please try again." },
      { status: 500 },
    );
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
