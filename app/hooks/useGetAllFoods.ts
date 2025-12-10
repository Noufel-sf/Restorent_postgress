import { useQuery } from "@tanstack/react-query";
import { RestaurantServices } from "../Services/RestorentServices";


export function useGetAllFoods() {
  return useQuery({
    queryKey: ["foods"],
    queryFn: RestaurantServices.getAllFoods,
  });
}
