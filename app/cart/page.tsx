"use client";

import Link from "next/link";
import Button from "../components/ui/Button";
import CartItem from "../components/CartItem";
import { CartItemType } from "../Utils/Types";
import { useGetCart } from "@/app/hooks/useGetCart";
import Spinner from "../components/ui/Spinner";

export default function CartPage() {
  const { data, isLoading } = useGetCart();

  const items = data?.items || [];

  const itemsCount = items.reduce(
    (sum: number, i: CartItemType) => sum + i.quantity,
    0
  );
  const subTotal = items.reduce(
    (sum: number, i: CartItemType) => sum + i.price * i.quantity,
    0
  );

  const shipping = 90;
  const taxes = 50;
  const discount = 100;
  const total = subTotal + shipping + taxes - discount;

  return (
    <main className="bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        {/* BREADCRUMBS */}
        <div className="mb-12 flex items-center justify-between text-sm text-gray-500">
          <div>
            <Link href="/">home</Link> / <span>cart</span>
          </div>
          <Link href="/" className="hover:text-primary">
            go back
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* CART LIST */}
          <section className="rounded-2xl bg-white shadow-sm">
            {isLoading ? (
              <div className="p-12">
                <Spinner />
              </div>
            ) : items.length > 0 ? (
              items.map((item: CartItemType) => (
                <CartItem key={item.id} item={item} />
              ))
            ) : (
              <p className="p-10 text-center">Your cart is empty.</p>
            )}
          </section>

          {/* SUMMARY */}
          <aside className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900">
              Order Summary
            </h2>
            <div className="mt-4 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{itemsCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Coupon Discount</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>
              <div className="mt-3 border-t pt-3 flex justify-between text-sm font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/completeorder">
              <Button className="mt-6 w-full py-3 text-sm">
                Proceed to Checkout
              </Button>
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
