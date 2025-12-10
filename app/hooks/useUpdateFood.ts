import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RestaurantServices } from "../Services/RestorentServices";
import { Food } from "../Utils/Types";



export function useUpdateFood() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Food }) =>
      RestaurantServices.updateFood(id, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["foods"] });
    },
});
}
