// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import {
  orders,
  orderItems,
  carts,
  cartItems,
  OrderInfo,
  foods,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const guestId = req.cookies.get("guestId")?.value;
    const { fullName, phoneNumber, email, address, city, notes } = body;

    if (!guestId)
      return NextResponse.json(
        { error: "guestId is required" },
        { status: 400 }
      );
    if (!fullName || !phoneNumber || !address || !city)
      return NextResponse.json(
        { error: "All address fields are required" },
        { status: 400 }
      );

    // Fetch user's cart
    const cart = await db
      .select()
      .from(carts)
      .where(eq(carts.guestId, guestId))
      .limit(1)
      .execute();
    if (!cart[0])
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });

    const cartId = cart[0].id;

    const items = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.cartId, cartId))
      .execute();
    if (!items.length)
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });

    // Calculate total
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create order
    const [newOrder] = await db
      .insert(orders)
      .values({
        guestId,
        total,
        status: "pending",
      })
      .returning()
      .execute();

    // Insert order items
    await Promise.all(
      items.map((item) =>
        db
          .insert(orderItems)
          .values({
            orderId: newOrder.id,
            foodId: item.foodId,
            quantity: item.quantity,
            price: item.price,
          })
          .execute()
      )
    );

    // Insert order info (address, contact)
    await db
      .insert(OrderInfo)
      .values({
        orderId: newOrder.id,
        fullName,
        phoneNumber,
        email,
        address,
        city,
        notes,
      })
      .execute();

    // Clear cart
    await db.delete(cartItems).where(eq(cartItems.cartId, cartId)).execute();

    return NextResponse.json({ orderId: newOrder.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const ordersData = await db.select().from(orders);

    const ordersWithDetails = await Promise.all(
      ordersData.map(async (order) => {
        const items = await db
          .select({
            id: orderItems.id,
            quantity: orderItems.quantity,
            price: orderItems.price,
            createdAt: orderItems.createdAt,
            food: {
              id: foods.id,
              name: foods.name,
              imageUrl: foods.imageUrl,
              price: foods.price,
            },
          })
          .from(orderItems)
          .leftJoin(foods, eq(orderItems.foodId, foods.id))
          .where(eq(orderItems.orderId, order.id));

        const info = await db
          .select()
          .from(OrderInfo)
          .where(eq(OrderInfo.orderId, order.id))
          .limit(1);

        return { ...order, items, info: info[0] || null };
      })
    );

    return NextResponse.json(ordersWithDetails);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
