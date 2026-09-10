// app/completeorder/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Button from "@/app/components/ui/Button";
import { useGetCart } from "../hooks/useGetCart";
import Image from "next/image";
import { useMakeOrder } from "../hooks/useMakeOrder";
import { CartItemType } from "../Utils/Types";
import { useAuth } from "@/lib/authContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { data: cartData } = useGetCart();
  const makeOrderMutation = useMakeOrder();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");

  // Pre-fill if logged in user has details
  useEffect(() => {
    if (user) {
      setFullName((prev) => prev || user.name);
      setEmail((prev) => prev || user.email);
      if (user.phoneNumber) {
        const phone = user.phoneNumber;
        setPhoneNumber((prev) => prev || phone);
      }
      if (user.address) {
        const addr = user.address;
        setAddress((prev) => prev || addr);
      }
      if (user.city) {
        const c = user.city;
        setCity((prev) => prev || c);
      }
    }
  }, [user]);

  const fillDemoData = () => {
    setFullName("Alex Johnson");
    setPhoneNumber("+1 (555) 234-5678");
    setEmail("alex@example.com");
    setAddress("742 Evergreen Terrace, Apt 4B");
    setCity("Springfield");
    setNotes("Ring the doorbell twice, please leave by front door.");
  };

  const Clearfields = () => {
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setAddress("");
    setCity("");
    setNotes("");
  };

  const itemsTotal =
    cartData?.items.reduce(
      (sum: number, item: CartItemType) => sum + item.price * item.quantity,
      0
    ) || 0;

  const deliveryFee = itemsTotal > 0 ? 3.99 : 0;
  const tax = Number((itemsTotal * 0.08).toFixed(2));
  const total = itemsTotal + deliveryFee + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !address || !city) return;

    makeOrderMutation.mutate({
      fullName,
      phoneNumber,
      email,
      address,
      city,
      notes,
    });
    Clearfields();
  };

  return (
    <main className="bg-gray-50 min-h-[85vh] py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Complete your order
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Add your contact and delivery details to finalize the order.
            </p>
          </div>

          <button
            type="button"
            onClick={fillDemoData}
            className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            ⚡ Auto-fill Demo Details
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Left: checkout form */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact info */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Contact information
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700">
                      Full name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Johnson"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Phone number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="customer@example.com"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
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
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Springfield"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Delivery instructions (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Ring the doorbell, leave at door..."
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={makeOrderMutation.isPending}
                  className="w-full py-3.5 text-sm font-bold shadow-md transition hover:opacity-90"
                >
                  {makeOrderMutation.isPending ? "Placing Order..." : "Place Order ($" + total.toFixed(2) + ")"}
                </Button>
              </div>
            </form>
          </section>

          {/* Right: order summary */}
          <aside className="space-y-4">
            {/* Cart items */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-900">
                  Your order
                </h2>
                <Link href="/cart" className="text-xs font-semibold text-primary hover:underline">
                  Edit Cart
                </Link>
              </div>

              <div className="mt-4 divide-y divide-gray-100">
                {cartData?.items && cartData.items.length > 0 ? (
                  cartData.items.map((item: CartItemType) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-3 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-gray-50">
                          <Image
                            src={item.food.imageUrl || "/pizza1.jpg"}
                            fill
                            alt={item.food.name}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-xs">{item.food.name}</p>
                          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        </div>
                      </div>

                      <span className="font-semibold text-gray-900 text-xs">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="py-4 text-xs text-gray-500">No items currently in cart.</p>
                )}
              </div>

              <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${itemsTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-gray-900">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-3 text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment info */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 text-xs text-gray-600 shadow-sm">
              <div className="flex items-center gap-2 font-semibold text-gray-900">
                <span>💵</span>
                <span>Payment Method</span>
              </div>
              <p className="mt-2 leading-relaxed">
                Cash or Card on Delivery. You can pay securely with your driver when your order arrives.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
