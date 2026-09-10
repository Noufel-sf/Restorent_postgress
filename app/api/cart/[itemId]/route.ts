import { NextRequest, NextResponse } from "next/server";
import { mockStore } from "@/lib/mockStore";

// PUT /api/cart/[itemId] - Update cart item quantity
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await context.params;
    const body = await request.json();
    const { quantity } = body;

    const guestId = request.cookies.get("guestId")?.value || "guest-default";

    if (quantity === undefined) {
      return NextResponse.json(
        { error: "Valid quantity is required" },
        { status: 400 }
      );
    }

    const updated = mockStore.updateCartItem(guestId, itemId, Number(quantity));
    return NextResponse.json(updated || { message: "Item removed" });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/[itemId] - Remove item from cart
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await context.params;
    const guestId = request.cookies.get("guestId")?.value || "guest-default";

    mockStore.removeCartItem(guestId, itemId);
    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing cart item:", error);
    return NextResponse.json(
      { error: "Failed to remove cart item" },
      { status: 500 }
    );
  }
}
