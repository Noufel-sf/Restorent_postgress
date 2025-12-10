// components/sections/ProductsGrid.tsx
import React from "react";
import type { Food } from "../Utils/Types";
import FoodCard from "./FoodCard";
import { getHomeFoods } from "../foods/Actions";


const FoodsGrid: React.FC = async () => {

  const HomeFoods = await getHomeFoods();

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Our Menu
          </h2>
          <p className="mt-3 text-sm text-gray-600 md:text-base">
            Choose from our most popular pizzas and sides.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HomeFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodsGrid;
