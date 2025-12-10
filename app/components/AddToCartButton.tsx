"use client";

import Button from "./ui/Button";
import { useAddToCart } from "@/app/hooks/useAddToCart";


type Props = {
  foodId: string;
};

export default function AddToCartButton({ foodId  }: Props) {
  const addToCart = useAddToCart();

  return (
    <Button
      onClick={() =>
        addToCart.mutate({ foodId, quantity: 1})
      }
      className="bg-primary px-4 py-2 text-black hover:bg-white hover:text-primary"
    >
      Add to cart
    </Button>
  );
}
