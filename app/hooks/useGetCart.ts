import { useQuery } from "@tanstack/react-query";
import { RestaurantServices } from "../Services/RestorentServices";


export function useGetCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: RestaurantServices.getCart,
  });


}
