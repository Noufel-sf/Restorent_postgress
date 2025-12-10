"use client";

import React from "react";
import OrderItem from "../components/OrderItem";
import { useGetLatestOrder } from "../hooks/useGetLatestOrder";
import { OrderItemType } from "../Utils/Types";
import Spinner from "../components/ui/Spinner";

// export const metadata = {
//   title: "Checkout",
//   description: "Review your order before confirming.",
// };


export default function OrderDetailsPage() {
  const { data: order, isLoading } = useGetLatestOrder();
  console.log("the order : " ,order);
  

  if (isLoading) return <div className="w-full h-screen flex items-center justify-center"><Spinner /></div>;
  if (!order) return <div className="w-full h-screen flex items-center justify-center">No order found.</div>;

  const subtotal = order.items.reduce((acc: number, item: OrderItemType) => acc + item.price * item.quantity, 0);
  const shipping = 60; 
  const taxes = 80;    
  const discount = 10 ; 
  const total = subtotal + shipping + taxes - discount;

  return (
    <main className="bg-gray-50 py-10">
      <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Order</h1>
        <p className="mt-1 text-xs text-gray-500">Order ID: {order.id}</p>
        <p className="mt-1 text-xs text-gray-500">Thank you. Your order has been confirmed.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          
          <div className="space-y-4">
            {order.items.map((item: OrderItemType) => (
              <OrderItem key={item.id} item={item} />
            ))}

            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <h2 className="text-sm font-semibold text-gray-900">Order Summary</h2>
              <div className="mt-4 space-y-2 text-xs text-gray-600">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping Charge</span><span>${shipping.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Discount</span><span>${discount.toFixed(2)}</span></div>
                <div className="mt-3 border-t border-gray-100 pt-3 text-sm font-semibold text-gray-900">
                  <div className="flex justify-between"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
              </div>
            </div>

            <button className="w-full bg-primary text-white py-2 rounded-full capitalize cursor-pointer font-extrabold">
              Print Order
            </button>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">Customer</h2>
              </div>
              <p className="mt-3 font-semibold text-gray-900">{order.info?.fullName}</p>
              <p className="text-xs text-gray-500">1 Order</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">Customer Information</h2>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-600">
                <p>{order.info?.email}</p>
                <p>{order.info?.phoneNumber}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">Shipping Address</h2>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-600">
                <p>{order.info?.fullName}</p>
                <p>{order.info?.address}</p>
                <p>{order.info?.city}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">Billing Address</h2>
              </div>
              <p className="mt-3 text-xs text-gray-600">
                Same as shipping address.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
