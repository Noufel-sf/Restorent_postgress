
import { db } from "@/db/db";
import { foods } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';


// GET /api/foods - Get all foods
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    let result;
    
    if (categoryId) {
      result = await db
        .select()
        .from(foods)
        .where(eq(foods.categoryId, categoryId));
    } else {
      result = await db.select().from(foods);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching foods:', error);
    return NextResponse.json(
      { error: 'Failed to fetch foods' },
      { status: 500 }
    );
  }
}


export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string | null;
    const price = formData.get("price") as string;
    const weight = formData.get("weight") as string | null;
    const categoryId = formData.get("categoryId") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: "Name, price, and categoryId are required" },
        { status: 400 }
      );
    }

    let imageUrl = "";

    // Upload image if provided
    if (imageFile) {
      try {
        imageUrl = await uploadToCloudinary(imageFile);
      } catch (err) {
        console.error("Image upload failed:", err);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    } else {
      imageUrl = "/placeholder-food.png";
    }

    // Insert into Drizzle
    const result = await db
      .insert(foods)
      .values({
        name,
        description,
        price: parseFloat(price),
        weight,
        imageUrl,
        categoryId,
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating food:", error);
    return NextResponse.json(
      { error: "Failed to create food item" },
      { status: 500 }
    );
  }
}

// // DELETE /api/foods/[id] - Delete a food item
// export async function DELETE(
//   request: NextRequest,