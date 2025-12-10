// app/foods/page.tsx

import FoodCard from "../components/FoodCard";
import Animateimages from "../components/ui/Animateimages";
import Pagination from "../components/ui/Pagination";
import CategoryCard from "../admin/CategoryCard";
import { Categories } from "../Utils/data";
import type { Food } from "../Utils/Types";
import { getAllFoods } from "./Actions";
import FoodCardSkeleton from "../components/FoodCardSkelton";

export const dynamic = "force-dynamic";


export default async function FoodsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>; // you must await searchParams in next js 15+
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const category = params.category || "All";

  // Fetch paginated foods
  const {
    items: Foods,
    totalPages,
    currentPage,
  } = await getAllFoods(page, 6, category);

  return (
    <main className="bg-white relative py-16 md:py-20">
      <div className="mx-auto px-4 md:px-0">
        {/* Heading */}
        <div className="mb-22 p-22 w-full text-center bg-gray-50 relative overflow-hidden">
          <h1
            className="text-3xl font-extrabold capitalize tracking-tight text-gray-900 md:text-5xl"
            data-aos="fade-up"
          >
            Explore Our foods
          </h1>
          <p
            className="mt-3 text-sm text-gray-600 md:text-base"
            data-aos="fade-up"
          >
            Choose from our delicious selection of pizzas and sides.
          </p>

          <Animateimages />
        </div>

        {/* Foods Grid */}
        <div className="flex flex-col gap-12 items-center">
          <h1 className="text-4xl capitalize font-extrabold">our menu</h1>

          {/* Categories */}
          <ul className="flex items-center flex-wrap p-4 gap-4 justify-center">
            {Categories.map((cat, index) => (
              <CategoryCard
                key={index}
                category={cat}
                activeCategory={category}
              />
            ))}
          </ul>

          {/* Foods Grid */}
          <div className="grid gap-6 mx-auto max-w-6xl sm:grid-cols-2 lg:grid-cols-3">
            {!Foods
              ? Array.from({ length: 6 }).map((_, i) => (
                  <FoodCardSkeleton key={i} />
                ))
              : Foods.map((food: Food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          category={category}
        />
      </div>
    </main>
  );
}
