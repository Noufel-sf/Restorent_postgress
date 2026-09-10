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

  const items = order.items || [];
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 3.99;
  const taxes = Number((subtotal * 0.08).toFixed(2));
  const total = subtotal + shipping + taxes;

  const fullName = order.info?.fullName || order.fullName || "Customer";
  const email = order.info?.email || order.email || "customer@example.com";
  const phone = order.info?.phoneNumber || order.phoneNumber || "+1 (555) 000-0000";
  const address = order.info?.address || order.address || "Delivery Address";
  const city = order.info?.city || order.city || "City";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">
                Order #{order.id}
              </h2>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary capitalize">
                {order.status}
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              <p className="font-semibold text-gray-800">{fullName} • {email} • {phone}</p>
              <p>{address}, {city}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-lg font-bold text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Order Items</h3>
            {items.map((item: OrderItemType) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>

          <div className="h-fit rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
            <h3 className="text-sm font-bold text-gray-900">
              Payment Summary
            </h3>
            <div className="mt-3 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (8%)</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="mt-3 border-t border-gray-200 pt-3 text-sm font-bold text-gray-900">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
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
