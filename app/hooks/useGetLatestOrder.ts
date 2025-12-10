import { RestaurantServices } from "../Services/RestorentServices";
import { useQuery } from "@tanstack/react-query";


export function useGetLatestOrder() {
  return useQuery({
    queryKey: ["latest-order"],
    enabled: true,
    queryFn: () => RestaurantServices.getLatestOrder(),
  });
}