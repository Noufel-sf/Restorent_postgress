// components/cart/CartItem.tsx
"use client";

import Image from "next/image";
import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { CartItemType } from "../Utils/Types";



type Props = {
  item: CartItemType;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
};

const CartItem: React.FC<Props> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const subtotal = item.price * item.quantity;

  return (
    <div className="flex items-center gap-4 border-b border-gray-100 px-8 py-8 last:border-b-0">
      {/* remove */}
      <button
        onClick={onRemove}
        className="text-xs text-gray-400 hover:text-primary transition-colors"
        aria-label="Remove item"
      >
        <FaTrashCan className="text-primary cursor-pointer" />
      </button>

      {/* image */}
      <div className="relative h-14 w-14 overflow-hidden rounded-xl">
        <Image
          src={item.food.imageUrl || ""}
          alt={item.food.name}
          width={120}
          height={120}
          className="object-cover"
        />
      </div>

      {/* details */}
      <div className="flex flex-1 flex-col gap-1 text-sm">
        <p className="font-semibold text-gray-900">{item.food.name}</p>
     
      </div>

      {/* price */}
      <div className="hidden w-24 text-sm text-gray-900 sm:block">
        ${item.price.toFixed(2)}
      </div>

      {/* quantity controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onDecrease}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
        >
          -
        </button>
        <span className="w-6 text-center text-sm text-gray-900">
          {item.quantity}
        </span>
        <button
          onClick={onIncrease}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
        >
          +
        </button>
      </div>

      {/* subtotal */}
      <div className="hidden w-24 text-right text-sm font-semibold text-gray-900 sm:block">
        ${subtotal.toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
