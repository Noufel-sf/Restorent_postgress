// app/admin/foods/page.tsx
"use client";

import React, { useState, Suspense } from "react";
import FoodCardAdmin from "../FoodCardAdmin";
import Link from "next/link";
import { Categories } from "../../Utils/data";
import { useGetAllFoods } from "@/app/hooks/useGetAllFoods";
import { Food } from "@/app/Utils/Types";
import EditFoodModal from "../UpdateFoodModel";
import Spinner from "@/app/components/ui/Spinner";
import Image from "next/image";

function AdminFoodsContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: Foods = [], isLoading } = useGetAllFoods();
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleOpenEdit = (food: Food) => {
    setSelectedFood(food);
    setIsEditOpen(true);
  };

  const filteredFoods = Foods.filter((food: Food) => {
    const matchesCat =
      selectedCategory === "All" ||
      food.categoryId?.toLowerCase() === selectedCategory.toLowerCase() ||
      food.categoryName?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchTerm ||
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (food.description && food.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Foods &amp; Drinks
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Manage your menu items, pricing, and availability. ({Foods.length} items total)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search menu items..."
            className="w-56 rounded-full border border-gray-200 px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
          <Link href="/admin/new">
            <button className="cursor-pointer rounded-full bg-primary px-5 py-2 text-xs font-bold text-white shadow-sm transition hover:opacity-90">
              + Add New Food
            </button>
          </Link>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Filter by Category
          </h3>
          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Reset to All
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              selectedCategory === "All"
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Foods
          </button>
          {Categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? "bg-primary text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <div className="relative h-4 w-4">
                <Image src={cat.image} alt={cat.name} fill className="object-contain" />
              </div>
              <span className="capitalize">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Foods grid */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            Menu Items ({filteredFoods.length})
          </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <div className="flex justify-center items-center col-span-full py-16">
              <Spinner />
            </div>
          ) : filteredFoods.length > 0 ? (
            filteredFoods.map((food: Food) => (
              <FoodCardAdmin
                key={food.id}
                food={food}
                onEdit={handleOpenEdit}
              />
            ))
          ) : (
            <div className="py-16 text-center col-span-full">
              <p className="font-bold text-gray-900 text-lg">
                No foods found matching criteria.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Try searching for something else or reset category filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
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
