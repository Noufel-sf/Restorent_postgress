import { NextRequest, NextResponse } from "next/server";
import { mockStore } from "@/lib/mockStore";

function getOrGenerateGuestId(request: NextRequest): { guestId: string; isNew: boolean } {
  const existing = request.cookies.get("guestId")?.value;
  if (existing) {
    return { guestId: existing, isNew: false };
  }
  const newGuestId = `guest-${Math.random().toString(36).slice(2, 10)}`;
  return { guestId: newGuestId, isNew: true };
}

// GET /api/cart
export async function GET(request: NextRequest) {
  try {
    const { guestId, isNew } = getOrGenerateGuestId(request);
    const cart = mockStore.getCart(guestId);

    const response = NextResponse.json(cart);
    if (isNew) {
      response.cookies.set("guestId", guestId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
      });
    }
    return response;
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

// POST /api/cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { foodId, quantity = 1 } = body;

    const { guestId, isNew } = getOrGenerateGuestId(request);

    if (!foodId) {
      return NextResponse.json({ error: "foodId is required" }, { status: 400 });
    }

    const item = mockStore.addToCart(guestId, foodId, Number(quantity) || 1);
    if (!item) {
      return NextResponse.json({ error: "Food item not found" }, { status: 404 });
    }

    const response = NextResponse.json(item, { status: 201 });
    if (isNew) {
      response.cookies.set("guestId", guestId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
      });
    }
    return response;
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 });
  }
}

// DELETE /api/cart
export async function DELETE(request: NextRequest) {
  try {
    const { guestId } = getOrGenerateGuestId(request);
    mockStore.clearCart(guestId);
    return NextResponse.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
  }
}
