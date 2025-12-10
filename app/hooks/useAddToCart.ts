import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../Utils/api";
import toast from "react-hot-toast";

type AddToCartInput = {
  foodId: string;
  quantity: number;
};

export function useAddToCart() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (formData: AddToCartInput) => {
      const res = await api.post("/cart", formData);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Item added to cart");
      qc.invalidateQueries({ queryKey: ["cart"] }); 
    },
    onError: () => {
      toast.error("Failed to add item to cart");
    }
  });
}
