import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/db/db";
import { foods } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Food } from '@/app/Utils/Types';



export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // MUST await in App Router

    const body = await request.json();
    const { name, description, price, weight, imageUrl, categoryId } = body;

    // 🟦 Build update object (ignore undefined fields)
    const updateData: Food = {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(weight && { weight }),
      ...(imageUrl && { imageUrl }),
      ...(categoryId && { categoryId }),
      updatedAt: new Date(), // optional
    };

    
    const updated = await db
      .update(foods)
      .set(updateData)
      .where(eq(foods.id, id))
      .returning(); // same as Prisma include but for the table only

    return NextResponse.json(updated[0]);
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
    const { id } = await context.params;   // you must await context.params to get the id

    await db.delete(foods).where(eq(foods.id, id));

    return NextResponse.json({ message: "Food item deleted" });
  } catch (error) {
    console.error("Error deleting food:", error);
    return NextResponse.json(
      { error: "Failed to delete food item" },
      { status: 500 }
    );
  }
}
