// components/FoodCardSkeleton.tsx
import React from "react";

const FoodCardSkeleton: React.FC = () => {
  return (
    <article className="flex animate-pulse flex-col rounded-3xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
      {/* image */}
      <div className="mb-4 h-40 w-full rounded-2xl bg-gray-100" />

      {/* title */}
      <div className="h-4 w-3/5 rounded-full bg-gray-100" />

      {/* category */}
      <div className="mt-3 h-3 w-1/3 rounded-full bg-gray-100" />

      {/* description lines */}
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded-full bg-gray-100" />
        <div className="h-3 w-4/5 rounded-full bg-gray-100" />
      </div>

      {/* price + button */}
      <div className="mt-6 flex items-center justify-between">
        <div className="h-4 w-16 rounded-full bg-gray-100" />
        <div className="h-9 w-24 rounded-full bg-gray-100" />
      </div>
    </article>
  );
};

export default FoodCardSkeleton;
