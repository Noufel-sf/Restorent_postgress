"use client";

import Link from "next/link";
import Button from "../components/ui/Button";
import CartItem from "../components/CartItem";
import { CartItemType } from "../Utils/Types";
import { useGetCart } from "@/app/hooks/useGetCart";
import { useCartMutations } from "@/app/hooks/useCartMutations";
import Spinner from "../components/ui/Spinner";

export default function CartPage() {
  const { data, isLoading } = useGetCart();
  const { updateQuantity, removeItem } = useCartMutations();

  const items = data?.items || [];

  const itemsCount = items.reduce(
    (sum: number, i: CartItemType) => sum + i.quantity,
    0
  );
  const subTotal = items.reduce(
    (sum: number, i: CartItemType) => sum + i.price * i.quantity,
    0
  );

  const shipping = items.length > 0 ? 3.99 : 0;
  const taxes = items.length > 0 ? Number((subTotal * 0.08).toFixed(2)) : 0;
  const total = subTotal + shipping + taxes;

  return (
    <main className="bg-gray-50 min-h-[85vh] py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        {/* BREADCRUMBS */}
        <div className="mb-8 flex items-center justify-between text-sm text-gray-500">
          <div>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>{" "}
            / <span className="font-semibold text-gray-900">Cart</span>
          </div>
          <Link href="/foods" className="text-primary hover:underline">
            ← Continue shopping
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* CART LIST */}
          <section className="rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">
            {isLoading ? (
              <div className="flex justify-center items-center p-16">
                <Spinner />
              </div>
            ) : items.length > 0 ? (
              items.map((item: CartItemType) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() =>
                    updateQuantity.mutate({
                      itemId: item.id,
                      quantity: item.quantity + 1,
                    })
                  }
                  onDecrease={() =>
                    updateQuantity.mutate({
                      itemId: item.id,
                      quantity: item.quantity - 1,
                    })
                  }
                  onRemove={() => removeItem.mutate(item.id)}
                />
              ))
            ) : (
              <div className="p-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-2xl text-gray-400">
                  🛒
                </div>
                <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Looks like you haven&apos;t added any delicious food yet.
                </p>
                <Link href="/foods" className="mt-6 inline-block">
                  <Button className="rounded-full px-6 py-2.5 text-xs font-bold">
                    Explore Menu
                  </Button>
                </Link>
              </div>
            )}
          </section>

          {/* SUMMARY */}
          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">
              Order Summary
            </h2>
            <div className="mt-5 space-y-3 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items ({itemsCount})</span>
                <span className="font-medium text-gray-900">${subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-medium text-gray-900">${taxes.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            {items.length > 0 ? (
              <Link href="/completeorder">
                <Button className="mt-6 w-full py-3 text-sm font-bold shadow-md">
                  Proceed to Checkout
                </Button>
              </Link>
            ) : (
              <button
                disabled
                className="mt-6 w-full rounded-full bg-gray-200 py-3 text-sm font-bold text-gray-400 cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
            )}

            <div className="mt-4 rounded-xl bg-gray-50 p-3 text-center text-[11px] text-gray-500">
              ⚡ Free delivery on orders over $50
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
