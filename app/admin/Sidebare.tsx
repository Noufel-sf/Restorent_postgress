// components/admin/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/foods", label: "Foods" },
  { href: "/admin/new", label: "Add Food" },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-gray-100 bg-white">
      <div className="px-6 py-5 text-xl font-extrabold text-primary">
        GoMeal.
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center rounded-xl px-3 py-2 text-sm font-medium ${
                active
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="m-4 rounded-2xl bg-secondary p-4 text-xs text-gray-900">
        <p className="font-semibold">Upgrade your account</p>
        <p className="mt-1">to get more benefits.</p>
        <button className="mt-3 w-full rounded-full bg-primary px-3 py-2 text-xs font-semibold text-white">
          Upgrade
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
