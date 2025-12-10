import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RestaurantServices } from "../Services/RestorentServices";
import toast from "react-hot-toast";


export function useDeleteOrder() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      const res = await RestaurantServices.deleteOrder(orderId);
      return res;
    },


    onSuccess: () => {
      toast.success("Order deleted successfully");
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error("Failed to delete order");
    }
  });
}
