import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RestaurantServices } from "../Services/RestorentServices";
import toast from "react-hot-toast";

export function useCartMutations() {
  const qc = useQueryClient();

  const updateQuantity = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      RestaurantServices.updateCartItem(itemId, quantity),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Failed to update cart");
    },
  });

  const removeItem = useMutation({
    mutationFn: (itemId: string) => RestaurantServices.removeCartItem(itemId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed from cart");
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  return { updateQuantity, removeItem };
}
