import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RestaurantServices } from "../Services/RestorentServices";
import toast from "react-hot-toast";


export function useDeleteFood() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (foodId: string) => {
      const res = await RestaurantServices.deleteFood(foodId);
      return res;
    },


    onSuccess: () => {
      toast.success("Food deleted successfully");
      qc.invalidateQueries({ queryKey: ["foods"] });
    },
    onError: () => {
      toast.error("Failed to delete food");
    }
  });
}
