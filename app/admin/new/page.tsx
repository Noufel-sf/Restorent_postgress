"use client";

import React, { useState } from "react";
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


  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !description || !categoryId) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("weight", weight);
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
    setCategoryId("");
    setImagePreview(null);
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
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              {categories?.map((cat:CategoryType) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

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
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
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
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
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
                rows={7}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Food image
              </label>

              <div className="mt-2 flex items-center justify-center overflow-hidden rounded-2xl bg-gray-50">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={196}
                    height={196}
                    className="object-cover"
                  />
                ) : (
                  <div className="text-xs text-gray-400 h-48 w-48 flex items-center justify-center">
                    No image
                  </div>
                )}
              </div>

              <label className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50">
                Choose image
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

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={Clearfields}
                className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded-full cursor-pointer bg-primary px-6 py-2 text-xs font-semibold text-white"
              >
                Add Food
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
