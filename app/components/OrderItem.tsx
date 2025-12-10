// components/order/OrderItem.tsx
import Image from "next/image";
import React from "react";
import { OrderItemType } from "@/app/Utils/Types";

const OrderItem: React.FC<{ item: OrderItemType }> = ({ item }) => {
  const total = item.price * item.quantity;

  return (
    <div className="flex items-center bg-white w-full gap-4 rounded-2xl border border-gray-100  px-4 py-4">
      <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={item.food.imageUrl || "/placeholder.png"}
          alt={item.food.name}
          width={100}
          height={100}
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 text-sm">
        <p className="font-semibold text-gray-900">{item.food.name}</p>
        <p className="text-xs text-gray-500">
          Qty: {item.quantity}
        </p>
      </div>
      <div className="text-right text-sm font-semibold text-gray-900">
        ${total.toFixed(2)}
      </div>
    </div>
  );
};

export default OrderItem;
