// components/admin/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useAuth } from "@/lib/authContext";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/foods", label: "Foods" },
  { href: "/admin/new", label: "Add Food" },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="flex w-64 flex-col border-r border-gray-100 bg-white">
      <div className="px-6 py-5 text-2xl font-extrabold text-primary tracking-tight">
        Pepper<span className="text-gray-900">.</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="m-4 space-y-2 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs text-gray-800">
        <p className="font-bold text-gray-900">Restaurant Demo</p>
        <p className="text-[11px] text-gray-500">
          Running in mock mode for instant Vercel deployment.
        </p>
        <Link
          href="/"
          className="block w-full text-center rounded-full bg-primary px-3 py-2 text-xs font-bold text-white transition hover:opacity-90"
        >
          Return to Customer Store
        </Link>
        <button
          onClick={logout}
          className="w-full text-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
