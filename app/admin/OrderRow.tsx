// components/admin/OrderRow.tsx
import React from "react";
import { FaTrash } from "react-icons/fa6";
import { OrderType } from "../Utils/Types";
import { useDeleteOrder } from "@/app/hooks/useDeleteOrder";

const statusClasses: Record<OrderType["status"], string> = {
  Completed: "bg-green-100 text-green-700 border border-green-300",
  pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  Canceled: "bg-red-100 text-red-700 border border-red-300",
};

type Props = {
  order: OrderType;
  onClickDetails?: (orderId: string) => void;
};

const OrderRow: React.FC<Props> = ({ order, onClickDetails }) => {
  const { mutate: deleteOrder } = useDeleteOrder();
  const handleClick = () => onClickDetails?.(order.id);

  const fullName = order.info?.fullName || order.fullName || "Guest Customer";
  const city = order.info?.city || order.city || "N/A";
  const address = order.info?.address || order.address || "N/A";

  return (
    <tr
      className="cursor-pointer text-sm text-gray-700 hover:bg-gray-50 transition"
      onClick={handleClick}
    >
      <td className="px-4 py-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteOrder(order.id);
          }}
          title="Delete Order"
        >
          <FaTrash className="cursor-pointer text-red-400 hover:text-red-600 transition" />
        </button>
      </td>

      {/* Info */}
      <td className="px-6 py-3 font-semibold text-gray-900">{fullName}</td>
      <td className="px-6 py-3 text-gray-600">{city}</td>
      <td className="px-6 py-3 truncate max-w-[200px] text-gray-500">{address}</td>

      {/* Total */}
      <td className="px-6 py-3 font-bold text-gray-900">
        ${Number(order.total).toFixed(2)}
      </td>

      {/* Status */}
      <td className="px-6 py-3">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            statusClasses[order.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {order.status}
        </span>
      </td>

      {/* Details Button */}
      <td className="px-4 py-3 text-right text-xs">
        <button
          className="rounded-full cursor-pointer px-3.5 py-1.5 bg-primary hover:opacity-90 text-white font-semibold shadow-sm transition"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Details
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
