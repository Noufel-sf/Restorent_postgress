"use server";

import { foods ,categories} from "@/db/schema"
import { db } from "@/db/db";
import { eq, ne, and } from "drizzle-orm";
import { Food } from "@/app/Utils/Types";
import { cache } from "react";


export const  getFood = cache(async (id: string) => {
  const result = await db.select().from(foods).where(eq(foods.id, id));
  return result[0];
} 
);

export async function getAllFoods(page = 1, limit = 6, categoryName?: string) {
  const offset = (page - 1) * limit;

  // If category name provided, find its ID
  let categoryId: string | undefined;
  if (categoryName && categoryName !== "All") {
    const result = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.name, categoryName))
      .limit(1);

    categoryId = result[0]?.id;
  }

  // Build query with optional filter
  const baseQuery = categoryId
    ? db.select().from(foods).where(eq(foods.categoryId, categoryId))
    : db.select().from(foods);

  // TOTAL ITEMS (after filtering)
  const allItems = await baseQuery;
  const totalItems = allItems.length;
  const totalPages = Math.ceil(totalItems / limit);

  // PAGINATED ITEMS
  const items = categoryId
    ? await db.select().from(foods).where(eq(foods.categoryId, categoryId)).limit(limit).offset(offset)
    : await db.select().from(foods).limit(limit).offset(offset);

  return {
    items,
    totalPages,
    currentPage: page,
  };
}

export const getHomeFoods = cache(async () => {
  const result = await db.select().from(foods).limit(3);
  return result;
}
);


export const getSuggestedFoods = cache(async (categoryId: string, currentId: string) => {
  const result = await db
    .select()
    .from(foods)
    .where(and(eq(foods.categoryId, categoryId), ne(foods.id, currentId)))
    .limit(6);

  return result;
});


export async function createFood(data: Omit<Food, 'id' | 'createdAt' | 'updatedAt'>) {
  await db.insert(foods).values({
    name: data.name,
    description: data.description,
    price: data.price,
    weight: data.weight,
    imageUrl: data.imageUrl || '',
    categoryId: data.categoryId,
  });
}

export async function updateFood(id: string, data: Food) {
  await db.update(foods).set(data).where(eq(foods.id, id));
}

export async function deleteFood(id: string) {
  await db.delete(foods).where(eq(foods.id, id));
}
