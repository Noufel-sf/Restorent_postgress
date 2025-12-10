// components/admin/EditFoodModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Food } from "@/app/Utils/Types";
import { useUpdateFood } from "@/app/hooks/useUpdateFood";
import toast from "react-hot-toast";
import { useCategories } from "@/app/hooks/useCategories";



type Props = {
  open: boolean;
  onClose: () => void;
  food: Food | null;
};

const EditFoodModal: React.FC<Props> = ({ open, onClose, food }) => {
  const { data: categories } = useCategories();
  const updateFood  = useUpdateFood();
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);


  useEffect(() => {
    if (!food) return;
    setName(food.name);
    setPrice(food.price.toString());
    setCategoryId(food.categoryId);
    setWeight(food.weight ?? "");
    setDescription(food.description ?? "");
    setImagePreview(food.imageUrl ?? null);
  }, [food]);


  if (!open || !food) return null;

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !categoryId || !food.id) return;

    updateFood.mutate(
      {
        id: food.id,
        data: {
          name,
          price: parseFloat(price),
          categoryId,
          weight: weight || null,
          description: description || null,
        },
      },
      {
        onSuccess: () => {
          toast.success("Food updated");
          onClose();
        },
        onError: () => {
          toast.error("Failed to update food");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Edit food
          </h2>
          <button
            onClick={onClose}
            className="text-lg text-gray-400 cursor-pointer  hover:text-primary"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-12 md:grid-cols-2"
        >
          {/* Left column */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              >
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
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
                rows={5}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Current image
              </label>
              <div className="mt-2 flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl bg-gray-50">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt={food.name}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">
                    No image
                  </span>
                )}
              </div>
          
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full cursor-pointer border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateFood.isPending}
                className="rounded-full bg-primary cursor-pointer px-6 py-2 text-xs font-semibold text-white disabled:opacity-60"
              >
                {updateFood.isPending ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFoodModal;
