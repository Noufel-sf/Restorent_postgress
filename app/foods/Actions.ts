"use server";

import { mockStore } from "@/lib/mockStore";
import { Food } from "@/app/Utils/Types";
import { cache } from "react";

export const getFood = cache(async (id: string) => {
  const item = mockStore.getFoodById(id);
  if (!item) return undefined;
  return {
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  } as Food;
});

export async function getAllFoods(page = 1, limit = 6, categoryName?: string) {
  const result = mockStore.getAllFoods(page, limit, categoryName);
  const items = result.items.map((f) => ({
    ...f,
    createdAt: new Date(f.createdAt),
    updatedAt: new Date(f.updatedAt),
  })) as Food[];

  return {
    items,
    totalPages: result.totalPages,
    currentPage: result.currentPage,
    totalItems: result.totalItems,
  };
}

export const getHomeFoods = cache(async () => {
  const result = mockStore.getHomeFoods(3);
  return result.map((f) => ({
    ...f,
    createdAt: new Date(f.createdAt),
    updatedAt: new Date(f.updatedAt),
  })) as Food[];
});

export const getSuggestedFoods = cache(
  async (categoryId: string, currentId: string) => {
    const result = mockStore.getSuggestedFoods(categoryId, currentId, 6);
    return result.map((f) => ({
      ...f,
      createdAt: new Date(f.createdAt),
      updatedAt: new Date(f.updatedAt),
    })) as Food[];
  }
);

export async function createFood(data: Omit<Food, "id" | "createdAt" | "updatedAt">) {
  const created = mockStore.addFood({
    name: data.name,
    description: data.description || "",
    price: data.price,
    weight: data.weight || "300 g",
    imageUrl: data.imageUrl || "/pizza1.jpg",
    categoryId: data.categoryId,
  });
  return created;
}

export async function updateFood(id: string, data: Food) {
  return mockStore.updateFood(id, {
    name: data.name,
    description: data.description || undefined,
    price: data.price,
    weight: data.weight || undefined,
    imageUrl: data.imageUrl,
    categoryId: data.categoryId,
  });
}

export async function deleteFood(id: string) {
  return mockStore.deleteFood(id);
}
