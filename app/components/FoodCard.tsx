"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import type { Food } from "../Utils/Types";
import AddToCartButton from "./AddToCartButton";

type Props = {
  food: Food;
};

const FoodCard: React.FC<Props> = ({ food }) => {

  return (
    <Link href={`/foods/${food.id}`} prefetch={false}>
      <article
        className="
        group flex flex-col rounded-3xl bg-white w-[330px]  p-4 shadow-sm ring-1 ring-gray-100
        transition duration-500  hover:bg-primary hover:shadow-md cursor-pointer
      "
      >
        {/* Image */}
        <div className="relative mb-4 h-40 w-full overflow-hidden rounded-2xl bg-gray-50">
          <Image
            src={food.imageUrl || ""}
            alt={food.name}
            fill
            className="object-cover"
          />
      
        </div>

        {/* Text */}
        <div className="flex flex-1 flex-col">
          <h3 className="text-base font-semibold text-gray-900 md:text-lg transition-colors group-hover:text-white">
            {food.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600 transition-colors group-hover:text-white">
            {food.description}
          </p>

          {/* Price + CTA */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900 transition-colors group-hover:text-white">
              ${food.price.toFixed(2)}
            </span>

          {food.id && <AddToCartButton foodId={food.id} />}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default FoodCard;
