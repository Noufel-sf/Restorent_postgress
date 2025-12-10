import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RestaurantServices } from "../Services/RestorentServices";
import toast from "react-hot-toast";

export function useAddFood() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => RestaurantServices.AddFood(formData),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["foods"] });
      toast.success("Food added successfully!");
    },

    onError: () => {
      toast.error("Failed to add food. Please try again.");
    },
  });
}
