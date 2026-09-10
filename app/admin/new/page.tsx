"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAddFood } from "@/app/hooks/useAddFood";
import { useCategories } from "@/app/hooks/useCategories";
import { CategoryType } from "@/app/Utils/Types";

export default function AddFoodPage() {
  const addFood = useAddFood();
  const { data: categories } = useCategories();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (categories && categories.length > 0 && !categoryId) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId]);

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();

    const finalCatId = categoryId || (categories && categories[0]?.id) || "burger";
    if (!name || !price || !description) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("categoryId", finalCatId);
    formData.append("weight", weight || "300 g");
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    addFood.mutate(formData, {
      onSuccess: () => {
        Clearfields();
      },
    });
  };

  const Clearfields = () => {
    setName("");
    setPrice("");
    setWeight("");
    setDescription("");
    setImagePreview(null);
    setImageFile(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Add New Food</h2>
          <p className="mt-1 text-xs text-gray-500">
            Create a new menu item for your restaurant.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <form onSubmit={handleAddFood} className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Truffle Bacon Burger"
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary capitalize"
              >
                {categories?.map((cat: CategoryType) => (
                  <option key={cat.id} value={cat.id} className="capitalize">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Price ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder="14.99"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Weight (g)
                </label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 320 g"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                required
                placeholder="Write a mouth-watering description..."
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Food image
              </label>

              <div className="mt-2 flex items-center justify-center overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 h-52 w-full">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-xs text-gray-400 flex flex-col items-center gap-1">
                    <span className="text-2xl">📸</span>
                    <span>No image selected</span>
                    <span className="text-[10px] text-gray-300">Default fallback image will be used</span>
                  </div>
                )}
              </div>

              <label className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }}
                />
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={Clearfields}
                className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={addFood.isPending}
                className="rounded-full cursor-pointer bg-primary px-6 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                {addFood.isPending ? "Adding..." : "Add Food"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
