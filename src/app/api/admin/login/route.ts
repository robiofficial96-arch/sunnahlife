import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import {
  checkRateLimit,
  recordFailedAttempt,
  clearAttempts,
  createSessionToken,
  verifyAdminPasscode,
  SESSION_COOKIE_NAME,
} from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown-ip";

    // 1. Rate limiting check (defense against brute-force attacks by bots/AI)
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `নিরাপত্তাজনিত কারণে সাময়িকভাবে প্রবেশ বন্ধ রাখা হয়েছে। অনুগ্রহ করে ${rateCheck.waitMinutes || 10} মিনিট পর আবার চেষ্টা করুন।`,
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const passcode = typeof body.passcode === "string" ? body.passcode.trim() : "";

    if (!passcode) {
      return NextResponse.json(
        { success: false, error: "পিন কোড প্রদান করুন।" },
        { status: 400 }
      );
    }

    // 2. Validate passcode securely on server (never exposed to client bundle)
    const isValid = verifyAdminPasscode(passcode);

    if (!isValid) {
      recordFailedAttempt(ip);
      // Small artificial delay to slow down automated scripts
      await new Promise((r) => setTimeout(r, 600));
      return NextResponse.json(
        { success: false, error: "ভুল পিন কোড! অনুগ্রহ করে সঠিক অ্যাডমিন পিন দিন।" },
        { status: 401 }
      );
    }

    // 3. Clear failed attempts on success
    clearAttempts(ip);

    // 4. Create signed session token and set httpOnly cookie
    const token = createSessionToken();
    const cookieStore = await cookies();
    cookieStore.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "সার্ভারে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
