import { NextRequest, NextResponse } from "next/server";
import { mockStore } from "@/lib/mockStore";
import { uploadToCloudinary } from "@/lib/cloudinary";

// GET /api/foods - Get all foods
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const result = mockStore.getAllFoods(1, 100, categoryId || undefined);
    return NextResponse.json(result.items);
  } catch (error) {
    console.error("Error fetching foods:", error);
    return NextResponse.json(
      { error: "Failed to fetch foods" },
      { status: 500 }
    );
  }
}

// POST /api/foods - Create new food
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = (formData.get("description") as string) || "";
    const price = formData.get("price") as string;
    const weight = (formData.get("weight") as string) || "300 g";
    const categoryId = formData.get("categoryId") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: "Name, price, and categoryId are required" },
        { status: 400 }
      );
    }

    let imageUrl = "/pizza1.jpg";

    if (imageFile && imageFile.size > 0) {
      try {
        imageUrl = await uploadToCloudinary(imageFile);
      } catch (err) {
        console.warn("Using fallback image due to upload error:", err);
      }
    }

    const created = mockStore.addFood({
      name,
      description,
      price: parseFloat(price),
      weight,
      imageUrl,
      categoryId,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating food:", error);
    return NextResponse.json(
      { error: "Failed to create food item" },
      { status: 500 }
    );
  }
}