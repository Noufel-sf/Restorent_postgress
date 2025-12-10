"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Spinner from "../components/ui/Spinner";


const RevenueBarChart = dynamic(
  () => import("./charts/RevenueChart"),
  { ssr: false }
);

// or use it in a server component with suspense


const OrdersLineChart = dynamic(
  () => import("./charts/OrdersLineChart"),
  { ssr: false }
);


export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="mt-1 text-xs text-gray-500">
            Overview of your restaurant performance.
          </p>
        </div>

        <button className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white">
          Export Report
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-3 ">
        <div className="rounded-2xl bg-accent p-4 shadow-sm">
          <p className="text-xs text-white">Total Orders</p>
          <p className="mt-2 text-2xl font-bold text-white">1,248</p>
          <p className="mt-1 text-xs ">+12% this week</p>
        </div>

        <div className="rounded-2xl bg-green p-4 shadow-sm">
          <p className="text-xs text-white">Revenue</p>
          <p className="mt-2 text-2xl font-bold text-white">$12,540</p>
          <p className="mt-1 text-xs text-white">+8% this week</p>
        </div>

        <div className="rounded-2xl bg-secondary p-4 shadow-sm">
          <p className="text-xs text-white">Active Customers</p>
          <p className="mt-2 text-2xl font-bold text-white">3,420</p>
          <p className="mt-1 text-xs text-white">Last 30 days</p>
        </div>
        <div className="rounded-2xl bg-primary p-4 shadow-sm">
          <p className="text-xs text-white">Today Orders</p>
          <p className="mt-2 text-2xl font-bold text-white">86</p>
          <p className="mt-1 text-xs text-white">+5 compared to yesterday</p>
        </div>

        {/* Average order value */}
      </div>

      <div className="space-y-8">
      {/* ...top of dashboard as before... */}

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Orders this week
            </h3>
          </div>
          
           <Suspense fallback={<Spinner />}>
            <OrdersLineChart />
          </Suspense>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Monthly revenue
            </h3>
          </div>
          <Suspense fallback={<Spinner />}>
            <RevenueBarChart />
          </Suspense>
        </div>
      </div>

      {/* keep your other sections below if you want */}
    </div>

    
    </div>
  );
}
