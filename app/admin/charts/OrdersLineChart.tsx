// components/admin/charts/OrdersLineChart.tsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React from "react";

const data = [
  { day: "Mon", orders: 20 },
  { day: "Tue", orders: 32 },
  { day: "Wed", orders: 28 },
  { day: "Thu", orders: 40 },
  { day: "Fri", orders: 36 },
  { day: "Sat", orders: 48 },
  { day: "Sun", orders: 30 },
];

const OrdersLineChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="day" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#f97316" // primary color
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersLineChart;
