// app/admin/foods/page.tsx
"use client";

import React, { useState, Suspense } from "react";
import FoodCardAdmin from "../FoodCardAdmin";
import Link from "next/link";
import CategoryCard from "../CategoryCard";
import { Categories } from "../../Utils/data";
import { useGetAllFoods } from "@/app/hooks/useGetAllFoods";
import { Food } from "@/app/Utils/Types";
import EditFoodModal from "../UpdateFoodModel";
import Spinner from "@/app/components/ui/Spinner";

function AdminFoodsContent() {
  const [activeCategory] = useState<string>("All");
  const { data: Foods = [], isLoading } = useGetAllFoods();
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  // console.log("foods" , Foods);

  const handleOpenEdit = (food: Food) => {
    setSelectedFood(food);
    setIsEditOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Foods &amp; Drinks
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Manage your menu items and categories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-40 rounded-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Link href="/admin/new">
            <button className="cursor-pointer rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white">
              Add New Food
            </button>
          </Link>
        </div>
      </div>

      <div className="rounded-2xl bg-gray-50 p-4 shadow-sm">
        <h3 className="mb-4 text-2xl font-extrabold text-gray-900 capitalize">
          categories
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              activeCategory={activeCategory}
            />
          ))}
        </div>
      </div>

      {/* Foods grid */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-2xl font-extrabold text-gray-900">Foods</h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <div className="flex justify-center items-center w-full p-12">
              <Spinner />
            </div>
          ) : Foods.length > 0 ? (
            Foods.map((food: Food) => (
              <FoodCardAdmin
                key={food.id}
                food={food}
                onEdit={handleOpenEdit}
              />
            ))
          ) : (
            <div className="p-22 grid col-span-full">
              <p className="text-center font-extrabold text-3xl col-span-full">
                No foods available.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal - moved outside grid */}
      <EditFoodModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        food={selectedFood}
      />
    </div>
  );
}

export default function AdminFoodsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center p-12"><Spinner /></div>}>
      <AdminFoodsContent />
    </Suspense>
  );
}
