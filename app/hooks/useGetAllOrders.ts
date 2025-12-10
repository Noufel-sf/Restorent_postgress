import { useQuery } from "@tanstack/react-query";
import { RestaurantServices } from "../Services/RestorentServices";


export function useGetAllOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: RestaurantServices.getAllOrders,
  });
}
