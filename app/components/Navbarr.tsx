// components/layout/Navbar.tsx

import Link from "next/link";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import Button from "./ui/Button";

const Navbar: React.FC = () => {
  return (
    <header className="w-full border-b border-gray-100">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* If you have an SVG/logo image, replace this text with <Image /> */}
          <span className="text-2xl font-sans tracking-tight text-primary">
            Pepper
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 text-sm font-medium text-gray-800 md:flex">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <Link href="/foods" className="hover:text-gray-900">
            Foods   
          </Link>
          <Link href="/about" className="hover:text-gray-900">
            About
          </Link>
          <Link href="/admin" className="hover:text-gray-900">
            Admin
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href="/cart" className="relative inline-block">
          <CiShoppingCart className="cursor-pointer text-xl" />
          </Link>
        </div>

        {/* Mobile menu placeholder (simple for now) */}
        <button
          className="inline-flex items-center rounded-md p-2 text-gray-800 md:hidden"
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-5 bg-gray-900" />
          <span className="mt-1 block h-0.5 w-5 bg-gray-900" />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
