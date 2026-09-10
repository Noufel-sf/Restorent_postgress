// app/admin/orders/page.tsx
"use client";

import React, { useState } from "react";
import OrderRow from "../OrderRow";
import { useGetAllOrders } from "@/app/hooks/useGetAllOrders";
import OrderDetailsModal from "../OrderModel";
import Spinner from "@/app/components/ui/Spinner";
import { OrderType } from "@/app/Utils/Types";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: Orders = [], isLoading } = useGetAllOrders();

  const filteredOrders = Orders.filter((order: OrderType) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const name = (order.info?.fullName || order.fullName || "").toLowerCase();
    const city = (order.info?.city || order.city || "").toLowerCase();
    const id = (order.id || "").toLowerCase();
    return name.includes(term) || city.includes(term) || id.includes(term);
  });

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 capitalize">Manage Orders</h2>
          <p className="mt-1 text-xs text-gray-500">
            Real-time view of customer orders and deliveries ({Orders.length} total).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer, city, ID..."
            className="w-64 rounded-full border border-gray-200 px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                <th className="px-4 py-3 w-10">Action</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">City</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-4 py-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <Spinner />
                  </td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order: OrderType) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    onClickDetails={() => setSelectedOrder(order)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-gray-500">
                    No matching orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <OrderDetailsModal
        open={selectedOrder !== null}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
