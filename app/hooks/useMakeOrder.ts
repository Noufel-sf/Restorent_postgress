import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RestaurantServices } from "../Services/RestorentServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { OrderInfoInput } from "../Utils/Types";

export function useMakeOrder() {
  const router = useRouter();

  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: OrderInfoInput) => RestaurantServices.MakeOrder(data),

    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order added successfully!");
      router.push(`/ordercheckout?orderId=${data.orderId}`);
    },

    onError: () => {
      toast.error("Failed to add order. Please try again.");
    },
  });
}
