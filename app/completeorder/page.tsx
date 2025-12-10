// app/checkout/page.tsx
"use client";

import React, { useState } from "react";
import Button from "@/app/components/ui/Button";
import { useGetCart } from "../hooks/useGetCart";
import Image from "next/image";
import { useMakeOrder } from "../hooks/useMakeOrder";
import { CartItemType } from "../Utils/Types";

export default function CheckoutPage() {
  const { data: cartData } = useGetCart();
  const makeOrderMutation = useMakeOrder();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");

  const Clearfields = () => {
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setAddress("");
    setCity("");
    setNotes("");
  }

  const itemsTotal =
    cartData?.items.reduce(
      (sum :number, item : CartItemType) => sum + item.price * item.quantity,
      0
    ) || 0;

  const deliveryFee = 4;
  const total = itemsTotal + deliveryFee;

  return (
    <main className="bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Complete your order
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Add your contact and delivery details to finalize the order.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Left: checkout form */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <form className="space-y-6">
              {/* Contact info */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Contact information
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700">
                      Full name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery address */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Delivery address
                </h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Notes for the rider (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Ring the doorbell, leave at door..."
                      className="mt-1 w-full  rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full py-3 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    makeOrderMutation.mutate({
                      fullName,
                      phoneNumber,  
                      email,
                      address,
                      city, 
                      notes,
                    });
                    Clearfields();
                  }}

                >
                  Place Order
                </Button>
              </div>
            </form>
          </section>

          {/* Right: order summary */}
          <aside className="space-y-4">
            {/* Cart items */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900">
                Your order
              </h2>
              <div className="mt-4 space-y-3">
                {cartData?.items.map((item: CartItemType) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={item.food.imageUrl || ''}
                          width={80}
                          height={80}
                          alt={item.food.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">{item.quantity}x</span>
                        <span className="text-gray-900">{item.food.name}</span>
                      </div>
                    </div>

                    <span className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${itemsTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-3 text-sm font-semibold text-gray-900">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment info */}
            <div className="rounded-2xl bg-gray-50 p-4 text-xs text-gray-600">
              <p className="font-semibold text-gray-900">Payment on delivery</p>
              <p className="mt-2">
                You can pay with cash or card when your order arrives.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
