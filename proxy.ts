import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "crypto";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const guestId = request.cookies.get("guestId")?.value;

  if (!guestId) {
    const newGuestId = crypto.randomUUID();

    response.cookies.set("guestId", newGuestId, {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    console.log("Created guestId:", newGuestId);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
