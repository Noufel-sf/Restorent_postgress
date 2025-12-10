// app/admin/orders/page.tsx
"use client";

import React, { useState } from "react";
import OrderRow from "../OrderRow";
import { useGetAllOrders } from "@/app/hooks/useGetAllOrders";
import OrderDetailsModal from "../OrderModel";
import Spinner from "@/app/components/ui/Spinner";
import { OrderType } from "@/app/Utils/Types";



export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(
    null
  );

  const{ data: Orders , isLoading }  = useGetAllOrders()  ; 
  console.log("orders" , Orders);
  
  return (
    <div className="space-y-6">
      {/* header ... */}
        <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 capitalize">your orders</h2>
          <p className="mt-1 text-xs text-gray-500">
            Manage your orders here .
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-40 rounded-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          />
      
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        {/* search ... */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>{/* headers */}</thead>
            <tbody className="divide-y divide-gray-100">
              { isLoading ? (
               <tr><td><Spinner /></td></tr>
              ) : (
                Orders.length > 0 ? ( 

              Orders.map((order : OrderType) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onClickDetails={() => setSelectedOrder(order)}
                />
              ))
              ) : (
                <tr><td>No orders found.</td></tr>
              ))}
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
