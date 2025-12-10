import { NextResponse } from "next/server";
import { db } from "../../../db/db";
import { categories } from "../../../db/schema";

export async function GET() {
  const data = await db.select().from(categories);
  return NextResponse.json(data);
}
