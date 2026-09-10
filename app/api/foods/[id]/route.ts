import { NextRequest, NextResponse } from "next/server";
import { mockStore } from "@/lib/mockStore";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, description, price, weight, imageUrl, categoryId } = body;

    const updated = mockStore.updateFood(id, {
      ...(name && { name }),
      ...(description !== undefined && { description }),
      ...(price !== undefined && { price: parseFloat(price) }),
      ...(weight && { weight }),
      ...(imageUrl && { imageUrl }),
      ...(categoryId && { categoryId }),
    });

    if (!updated) {
      return NextResponse.json({ error: "Food item not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating food:", error);
    return NextResponse.json(
      { error: "Failed to update food item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    mockStore.deleteFood(id);
    return NextResponse.json({ message: "Food item deleted" });
  } catch (error) {
    console.error("Error deleting food:", error);
    return NextResponse.json(
      { error: "Failed to delete food item" },
      { status: 500 }
    );
  }
}
