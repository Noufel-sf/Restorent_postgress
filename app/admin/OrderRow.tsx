// components/admin/OrderRow.tsx
import React from "react";
import { FaTrash } from "react-icons/fa6";
import { OrderType } from "../Utils/Types";
// import { deleteOrder } from "./Action";
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
        >
          <FaTrash className="cursor-pointer text-red-500 hover:text-red-700 transition" />
        </button>
      </td>

      {/* Info */}
      <td className="px-6 py-3 font-medium">{order.info.fullName}</td>
      <td className="px-6 py-3">{order.info.city}</td>
      <td className="px-6 py-3 truncate max-w-[180px]">{order.info.address}</td>

      {/* Total */}
      <td className="px-6 py-3 font-semibold text-green">{order.total} DA</td>

      {/* Status */}
      <td className="px-6 py-3">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[order.status]}`}
        >
          {order.status}
        </span>
      </td>

      {/* Details Button */}
      <td className="px-4 py-3 text-right text-xs">
        <button
          className="rounded-full cursor-pointer border px-3 py-1 bg-primary hover:bg-accent text-white transition duration-300"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          See details
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
