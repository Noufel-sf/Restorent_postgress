// app/admin/layout.tsx
"use client";

import React from "react";
import Sidebar from "./Sidebare";
import { useAuth } from "@/lib/authContext";
import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin, loginAs } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Demo banner if not admin */}
        {!isAdmin && (
          <div className="flex items-center justify-between border-b border-amber-200 bg-amber-50 px-6 py-2.5 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <span className="font-bold">⚡ Demo Notice:</span>
              <span>You are currently viewing in preview mode.</span>
            </div>
            <button
              onClick={() => loginAs("admin")}
              className="rounded-full bg-amber-600 px-3 py-1 font-bold text-white shadow-sm transition hover:bg-amber-700"
            >
              Switch to Admin Mode
            </button>
          </div>
        )}

        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Restaurant Admin Panel</h1>
            <p className="text-xs text-gray-400">Manage orders, foods, and metrics</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              View Live Store ↗
            </Link>

            <div className="flex items-center gap-2">
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                <Image
                  src={user?.avatar || "/chef1.png"}
                  alt={user?.name || "Admin"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-gray-900 leading-tight">
                  {user?.name || "Chef Mario"}
                </p>
                <span className="text-[10px] font-bold uppercase text-primary">
                  {user?.role || "Admin"}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
