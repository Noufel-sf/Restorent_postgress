import { mockStore } from "@/lib/mockStore";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const guestId = req.cookies.get("guestId")?.value || "guest-default";
    const latest = mockStore.getLatestOrder(guestId);

    if (!latest) {
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }

    return NextResponse.json(latest);
  } catch (err) {
    console.error("Error getting latest order:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
