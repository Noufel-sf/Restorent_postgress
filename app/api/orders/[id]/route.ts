import { NextRequest, NextResponse } from "next/server";
import { mockStore } from "@/lib/mockStore";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    mockStore.deleteOrder(id);
    return NextResponse.json({ message: "Order item deleted" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order item" },
      { status: 500 }
    );
  }
}
