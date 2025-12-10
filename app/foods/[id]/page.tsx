import Image from "next/image";
import Link from "next/link";
import FoodCard from "@/app/components/FoodCard";
import type { Food } from "@/app/Utils/Types";
import { getFood, getSuggestedFoods } from "../Actions";
import AddToCartButton from "@/app/components/AddToCartButton";
import type { Metadata } from "next";
import Spinner from "@/app/components/ui/Spinner";
export const dynamic = "force-dynamic";



type Props = {
  params: { id: string };
};




export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Product ${id} | My Store`,
    description: "Details for this product.",
  };
}
export default async function FoodDetailsPage({ params }: Props) {
  const { id } = await params;
  
  const food = await getFood(id);
   const suggestions = await getSuggestedFoods(food.categoryId, food.id);

  if (!food) {
    return <Spinner />;
  }

  if (!food) {
    return <p className="text-3xl text-center">Food not found...</p>;
  }

  return (
    <main className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        {/* Breadcrumb / back link */}
        <div className="mb-12 flex items-center justify-between text-sm text-gray-500">
          <div>
            <Link href="/foods" className="hover:text-primary">
              Foods
            </Link>{" "}
            / <span className="text-gray-800">{food.name}</span>
          </div>

          <Link href="/cart" className="capitalize hover:text-primary">
            go to cart
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] items-start">
          {/* Image */}
          <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-gray-50 md:h-96">
            <Image
              src={food.imageUrl}
              alt={food.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              {food.name}
            </h1>

            {/* {food.categoryId && (
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-primary">
                {food.categoryId}
              </p>
            )} */}

            <p className="mt-4 text-sm leading-relaxed text-gray-700 md:text-base">
              {food.description}
            </p>

            <div className="mt-6 flex items-center gap-6">
              <span className="text-2xl font-bold text-gray-900">
                ${food.price.toFixed(2)}
              </span>

              <AddToCartButton foodId={food.id} />
            </div>

            <div className="mt-8 grid gap-4 text-sm text-gray-700 md:grid-cols-2">
              <div>
                <h2 className="font-semibold text-gray-900">Ingredients</h2>
                <p className="mt-2">Fresh dough, tomato sauce, mozzarella...</p>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Serving Info</h2>
                <p className="mt-2">
                  Perfect for 1–2 people. Available for delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended foods */}
        <div className="flex flex-col gap-12 mt-22">
          <h1 className="text-4xl capitalize font-extrabold">
            some foods you might like
          </h1>
          <div className="grid gap-6 mx-auto max-w-6xl sm:grid-cols-2 lg:grid-cols-3">
            { !suggestions ? <Spinner /> :
            suggestions.map((f: Food) => (
              <FoodCard key={f.id} food={f} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
