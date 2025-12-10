import { db } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;   

    await db.delete(orders).where(eq(orders.id, id));

    return NextResponse.json({ message: "Order item deleted" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order item" },
      { status: 500 }
    );
  }
}
