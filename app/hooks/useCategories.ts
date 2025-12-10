import { useQuery } from "@tanstack/react-query";

type Category = {
  id: string;
  name: string;
};

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      return res.json();
    }
  });
}
