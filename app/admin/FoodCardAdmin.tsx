// components/admin/FoodCardAdmin.tsx
import Image from "next/image";
import React from "react";
import { useDeleteFood } from "@/app/hooks/useDeleteFood";
import { FaTrashCan } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";
// import Link from "next/link";
// import { AdminFood } from "@/app/Utils/Types";
import { Food } from "../Utils/Types";


const FoodCardAdmin: React.FC<{ food: Food , onEdit: (food: Food) => void }> = ({ food, onEdit  }) => {
  const { mutate: deleteFood } = useDeleteFood();


  return (
    // <Link href={`/foods/${food.id}`}>
    <article
      className="flex flex-col items-center relative rounded-3xl bg-white p-4 shadow-sm
     transition duration-300 group hover:-translate-y-1 hover:bg-primary hover:shadow-md cursor-pointer
    "
    >
      <div className="relative mb-3 h-20 w-20">
        <Image
          src={food.imageUrl || ""}
          alt={food.name}
          fill
          className="object-contain"
        />
      </div>
      <FaTrashCan className="text-primary absolute top-4 left-2 group-hover:text-white cursor-pointer" 
        onClick={() => food.id && deleteFood(food.id)}
      />
      <TbEdit className="text-primary absolute top-4 right-2 group-hover:text-white cursor-pointer" 
        onClick={() => onEdit(food)}
      />
      <h3
        className="text-sm font-semibold text-gray-900
       group-hover:text-white
      "
      >
        {food.name}
      </h3>
      {food.weight && (
        <p
          className="mt-1 text-xs text-gray-500
         group-hover:text-white
        "
        >
          {food.weight}
        </p>
      )}
      <p className="mt-2 text-sm group-hover:text-white font-bold text-primary">
        ${food.price.toFixed(2)}
      </p>
    </article>
    // </Link>
  );
};

export default FoodCardAdmin;
