import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/db';
import { cartItems, foods } from '@/db/schema';
import { eq } from 'drizzle-orm';

// PUT /api/cart/[itemId] - Update cart item quantity
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await params;
    const body = await request.json();
    const { quantity } = body;

    if (!quantity || quantity < 0) {
      return NextResponse.json(
        { error: 'Valid quantity is required' },
        { status: 400 }
      );
    }

    const [updatedItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, itemId))
      .returning();

    if (!updatedItem) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    // Get the food details
    const [food] = await db
      .select()
      .from(foods)
      .where(eq(foods.id, updatedItem.foodId));

    return NextResponse.json({ ...updatedItem, food });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/[itemId] - Remove item from cart
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await params;

    await db.delete(cartItems).where(eq(cartItems.id, itemId));

    return NextResponse.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      { error: 'Failed to remove cart item' },
      { status: 500 }
    );
  }
}
