// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { useAuth } from "@/lib/authContext";
import { useGetCart } from "@/app/hooks/useGetCart";
import { CartItemType } from "../Utils/Types";

const Navbar: React.FC = () => {
  const { user, isAdmin, logout, loginAs } = useAuth();
  const { data: cartData } = useGetCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const cartItemCount =
    cartData?.items?.reduce((acc: number, item: CartItemType) => acc + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-sans font-extrabold tracking-tight text-primary">
            Pepper<span className="text-gray-900">.</span>
          </Link>
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 text-sm font-medium text-gray-700 md:flex">
          <Link href="/" className="transition hover:text-primary">
            Home
          </Link>
          <Link href="/foods" className="transition hover:text-primary">
            Foods
          </Link>
          <Link href="/about" className="transition hover:text-primary">
            About
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 border border-gray-200 transition hover:bg-primary hover:text-white hover:border-primary"
          >
            Admin Panel
            {isAdmin && (
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            )}
          </Link>
        </div>

        {/* Right Action Icons: Cart & Auth */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-gray-800 transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            aria-label="View Shopping Cart"
          >
            <CiShoppingCart className="text-2xl" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User Auth Info */}
          {user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1 pr-3 text-left transition hover:border-gray-300 hover:shadow-sm"
              >
                <div className="relative h-7 w-7 overflow-hidden rounded-full border border-gray-100">
                  <Image
                    src={user.avatar || "/chef1.png"}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-900 leading-tight">
                    {user.name.split(" ")[0]}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-primary tracking-wide">
                    {user.role}
                  </span>
                </div>
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="border-b border-gray-100 px-3 py-2">
                    <p className="text-xs font-semibold text-gray-900">{user.name}</p>
                    <p className="text-[11px] text-gray-500">{user.email}</p>
                  </div>

                  <div className="py-1">
                    {isAdmin ? (
                      <Link
                        href="/admin"
                        className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-primary/10 hover:text-primary"
                      >
                        Dashboard &amp; Foods
                      </Link>
                    ) : (
                      <button
                        onClick={() => loginAs("admin")}
                        className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-primary hover:bg-primary/10"
                      >
                        Switch to Admin Demo
                      </button>
                    )}

                    {isAdmin ? (
                      <button
                        onClick={() => loginAs("customer")}
                        className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                      >
                        Switch to Customer Demo
                      </button>
                    ) : null}

                    <Link
                      href="/cart"
                      className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                    >
                      My Cart ({cartItemCount})
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={logout}
                      className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex rounded-full bg-primary px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:opacity-90 active:scale-95"
            >
              Sign In
            </Link>
          )}

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Open main menu</span>
            <div className="flex flex-col gap-1 w-5">
              <span className="block h-0.5 w-full bg-gray-800" />
              <span className="block h-0.5 w-full bg-gray-800" />
              <span className="block h-0.5 w-full bg-gray-800" />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-gray-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-3 text-sm font-medium text-gray-700">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/foods"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary"
            >
              Foods
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary"
            >
              Admin Panel
            </Link>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              {user ? (
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs text-gray-600">
                    Logged as <strong className="text-primary">{user.name}</strong>
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-semibold text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-full bg-primary py-2 text-xs font-bold text-white"
                >
                  Sign In (Demo)
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
