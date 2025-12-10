// app/admin/layout.tsx
import React from "react";
import Sidebar from "./Sidebare";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <button className="h-9 w-9 rounded-full bg-gray-100" />
            <div className="h-9 w-9 rounded-full bg-gray-300" />
          </div>
        </header>
        <main className="px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
