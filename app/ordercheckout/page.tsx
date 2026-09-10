"use client";

import React, { Suspense } from "react";
import OrderItem from "../components/OrderItem";
import { useGetLatestOrder } from "../hooks/useGetLatestOrder";
import { OrderItemType } from "../Utils/Types";
import Spinner from "../components/ui/Spinner";
import Link from "next/link";

function OrderDetailsContent() {
  const { data: order, isLoading } = useGetLatestOrder();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="w-full py-24 text-center">
        <h2 className="text-xl font-bold text-gray-900">No recent order found</h2>
        <p className="mt-1 text-sm text-gray-500">Place an order to see confirmation details.</p>
        <Link href="/foods" className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-sm">
          Browse Foods
        </Link>
      </div>
    );
  }

  const items = order.items || [];
  const subtotal = items.reduce(
    (acc: number, item: OrderItemType) => acc + item.price * item.quantity,
    0
  );
  const shipping = 3.99;
  const taxes = Number((subtotal * 0.08).toFixed(2));
  const total = subtotal + shipping + taxes;

  const customerName = order.info?.fullName || order.fullName || "Guest Customer";
  const customerEmail = order.info?.email || order.email || "customer@example.com";
  const customerPhone = order.info?.phoneNumber || order.phoneNumber || "+1 (555) 000-0000";
  const customerAddress = order.info?.address || order.address || "Street Address";
  const customerCity = order.info?.city || order.city || "City";

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
      {/* Success banner */}
      <div className="mb-8 rounded-2xl border border-green-200 bg-green-50/60 p-5 text-green-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white font-bold text-lg">
            ✓
          </div>
          <div>
            <h1 className="text-xl font-extrabold">Order Confirmed!</h1>
            <p className="text-xs text-green-800">
              Order ID: <span className="font-mono font-bold">{order.id}</span> • Status: <span className="font-bold capitalize">{order.status}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          {items.map((item: OrderItemType) => (
            <OrderItem key={item.id} item={item} />
          ))}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900">Order Summary</h2>
            <div className="mt-4 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="mt-3 border-t border-gray-100 pt-3 text-sm font-bold text-gray-900">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 rounded-full border border-gray-200 bg-white py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm"
            >
              Print Receipt
            </button>
            <Link
              href="/foods"
              className="flex-1 text-center rounded-full bg-primary py-2.5 text-xs font-bold text-white hover:opacity-90 shadow-sm"
            >
              Order More Food
            </Link>
          </div>
        </div>

        {/* Right Column: Customer Info */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 text-sm shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Customer</h2>
            <p className="mt-2 font-bold text-gray-900">{customerName}</p>
            <p className="text-xs text-gray-500">Pepper Verified Guest</p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 text-sm shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Contact Details</h2>
            <div className="mt-2 space-y-1 text-xs text-gray-600">
              <p>{customerEmail}</p>
              <p>{customerPhone}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 text-sm shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Delivery Address</h2>
            <div className="mt-2 space-y-1 text-xs text-gray-600">
              <p className="font-semibold text-gray-900">{customerName}</p>
              <p>{customerAddress}</p>
              <p>{customerCity}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 text-sm shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Payment Method</h2>
            <p className="mt-2 text-xs text-gray-600 font-medium">
              💵 Cash or Card upon delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderDetailsPage() {
  return (
    <main className="bg-gray-50 min-h-[85vh] py-10">
      <Suspense fallback={<div className="w-full h-96 flex items-center justify-center"><Spinner /></div>}>
        <OrderDetailsContent />
      </Suspense>
    </main>
  );
}
