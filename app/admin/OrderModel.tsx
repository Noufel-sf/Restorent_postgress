// components/admin/OrderDetailsModal.tsx
"use client";

import React from "react";
import { OrderItemType } from "../Utils/Types";
import { OrderType } from "../Utils/Types";
import OrderItem from "../components/OrderItem";

type Props = {
  open: boolean;
  onClose: () => void;
  order: OrderType | null;
};

const OrderDetailsModal: React.FC<Props> = ({ open, onClose, order }) => {
  if (!open || !order) return null;

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 4;
  const taxes = 2;
  const discount = 0;
  const total = subtotal + shipping + taxes - discount;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between ">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Order #{order.id}
              </h2>
              <button
                onClick={onClose}
                className="text-sm cursor-pointer text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-1 items-start">
              <div className="flex flex-col text-xs text-gray-500">
                <p>{order.info.fullName}</p>
                <p>{order.info.email}</p>
                <p>{order.info.phoneNumber}</p>
                <p>
                  {order.info.address}, {order.info.city}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="flex flex-col items-center gap-3 w-1/2">
            {order.items.map((item: OrderItemType) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>

          <div className="rounded-2xl border w-1/2 border-gray-100 bg-white p-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Order Summary
            </h3>
            <div className="mt-3 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>${discount.toFixed(2)}</span>
              </div>
              <div className="mt-3 border-t border-gray-100 pt-3 text-sm font-semibold text-gray-900">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
