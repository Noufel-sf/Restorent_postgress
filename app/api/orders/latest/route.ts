import { db } from "@/db/db";
import { foods, orders, orderItems, OrderInfo } from "@/db/schema";
import { NextResponse, NextRequest } from "next/server";
import { desc, eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const guestId = req.cookies.get("guestId")?.value;
  if (!guestId)
    return NextResponse.json({ error: "guestId required" }, { status: 400 });

  try {
    // 1. Get latest order
    const [latest] = await db
      .select()
      .from(orders)
      .where(eq(orders.guestId, guestId))
      .orderBy(desc(orders.createdAt))
      .limit(1);

    if (!latest) {
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }

    // 2. Get items with flattened structure
    const rawItems = await db
      .select()
      .from(orderItems)
      .leftJoin(foods, eq(orderItems.foodId, foods.id))
      .where(eq(orderItems.orderId, latest.id));

    const items = rawItems.map((row) => ({
      id: row.order_items.id,
      quantity: row.order_items.quantity,
      price: row.order_items.price,
      createdAt: row.order_items.createdAt,
      food: row.foods ? {
        id: row.foods.id,
        name: row.foods.name,
        imageUrl: row.foods.imageUrl,
        price: row.foods.price,
      } : null,
    }));

    const [info] = await db
      .select()
      .from(OrderInfo)
      .where(eq(OrderInfo.orderId, latest.id))
      .limit(1);

    return NextResponse.json({
      ...latest,
      items,
      info: info || null,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
