'use client';

import React from 'react'
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/dist/client/components/navigation';



function CategoryCard({ category, activeCategory } : { category: { id: string; name: string; image: string }, activeCategory: string }) {


  const router = useRouter();
  const params = useSearchParams();

  const handleClick = () => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("category", category.name);
    newParams.set("page", "1"); // reset pagination when category changes

    router.push(`/foods?${newParams.toString()}`);
  };

  return (
        <article onClick={handleClick} className="flex justify-center items-center gap-4 rounded-3xl bg-white p-2 px-5
         transition duration-300 group hover:-translate-y-1 hover:bg-primary hover:shadow-md cursor-pointer
        ">
          <div className="relative mb-3 h-10 w-10">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-contain"
            />
          </div>
          <h3 className={`text-sm font-semibold text-gray-900
           group-hover:text-white
            ${activeCategory === category.name ? 'text-white' : 'text-gray-900'}
          `}>{category.name}</h3>
        
        </article>
  )
}

export default CategoryCard