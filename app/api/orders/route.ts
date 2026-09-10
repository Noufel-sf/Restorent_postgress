import { NextRequest, NextResponse } from "next/server";
import { mockStore } from "@/lib/mockStore";

export async function GET() {
  try {
    const allOrders = mockStore.getAllOrders();
    return NextResponse.json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const guestId = req.cookies.get("guestId")?.value || "guest-default";
    const { fullName, phoneNumber, email, address, city, notes } = body;

    if (!fullName || !phoneNumber || !address || !city) {
      return NextResponse.json(
        { error: "All required address fields must be provided" },
        { status: 400 }
      );
    }

    const newOrder = mockStore.createOrder({
      guestId,
      fullName,
      phoneNumber,
      email: email || "customer@example.com",
      address,
      city,
      notes,
    });

    return NextResponse.json({ orderId: newOrder.id, ...newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
