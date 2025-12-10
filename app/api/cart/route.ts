// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { carts, cartItems, foods } from "@/db/schema";
import { eq, and } from "drizzle-orm";

//
// =====================
//        GET CART
// =====================
//

export async function GET(request: NextRequest) {
  try {
 // read guestId from cookie
    const guestId = request.cookies.get("guestId")?.value;

    if (!guestId)
      return NextResponse.json({ error: "guestId required" }, { status: 400 });

    // Find or create guest cart
    let cart = await db
      .select()
      .from(carts)
      .where(eq(carts.guestId, guestId))
      .limit(1);

    if (!cart[0]) {
      const newCart = await db
        .insert(carts)
        .values({ guestId })
        .returning();
      cart = newCart;
    }

    const cartId = cart[0].id;

    // Fetch items + food info
    const items = await db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        price: cartItems.price,
        createdAt: cartItems.createdAt,
        food: foods,
      })
      .from(cartItems)
      .leftJoin(foods, eq(cartItems.foodId, foods.id))
      .where(eq(cartItems.cartId, cartId));

    return NextResponse.json({ ...cart[0], items });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

//
// =====================
//     ADD ITEM TO CART
// =====================
//

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {  foodId, quantity = 1 } = body;

     // read guestId from cookie
    const guestId = request.cookies.get("guestId")?.value;

    if (!guestId || !foodId) {
      return NextResponse.json(
        { error: "guestId and foodId required" },
        { status: 400 }
      );
    }

    if (!guestId || !foodId)
      return NextResponse.json(
        { error: "guestId and foodId required" },
        { status: 400 }
      );

    // Find or create guest cart
    let cart = await db
      .select()
      .from(carts)
      .where(eq(carts.guestId, guestId))
      .limit(1);

    if (!cart[0]) {
      const newCart = await db
        .insert(carts)
        .values({ guestId })
        .returning();
      cart = newCart;
    }

    const cartId = cart[0].id;

    // Check if item already exists
    const existingItem = await db
      .select()
      .from(cartItems)
      .where(
        and(eq(cartItems.cartId, cartId), eq(cartItems.foodId, foodId))
      )
      .limit(1);

    if (existingItem[0]) {
      const updated = await db
        .update(cartItems)
        .set({ quantity: existingItem[0].quantity + quantity })
        .where(eq(cartItems.id, existingItem[0].id))
        .returning();

      return NextResponse.json(updated[0], { status: 200 });
    }

    // Food price lookup
    const food = await db
      .select()
      .from(foods)
      .where(eq(foods.id, foodId))
      .limit(1);

    if (!food[0])
      return NextResponse.json({ error: "Food not found" }, { status: 404 });

    // Insert new cart item
    const newItem = await db
      .insert(cartItems)
      .values({
        cartId,
        foodId,
        quantity,
        price: food[0].price,
      })
      .returning();

    return NextResponse.json(newItem[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

//
// =====================
//       CLEAR CART
// =====================
//

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const guestId = searchParams.get("guestId");

    if (!guestId)
      return NextResponse.json({ error: "guestId required" }, { status: 400 });

    const cart = await db
      .select()
      .from(carts)
      .where(eq(carts.guestId, guestId))
      .limit(1);

    if (cart[0]) {
      await db.delete(cartItems).where(eq(cartItems.cartId, cart[0].id));
    }

    return NextResponse.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
