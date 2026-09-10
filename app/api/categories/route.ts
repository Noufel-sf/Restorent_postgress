import { NextResponse } from "next/server";
import { mockStore } from "@/lib/mockStore";

export async function GET() {
  const data = mockStore.getCategories();
  return NextResponse.json(data);
}
