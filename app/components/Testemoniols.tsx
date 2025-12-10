"use client";

// components/sections/Testimonials.tsx (continue)
import React, { useState } from "react";
import { testimonials } from "../Utils/data";


const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrent((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Here&apos;s What Our Foodies Are Raving About!
            </h2>
            <p className="mt-3 text-sm text-gray-600 md:text-base">
              We serve happiness, flavor, and unforgettable experiences.
              Here&apos;s what our customers say about their Pepper moments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* avatar placeholders */}
            <div className="flex -space-x-3">
              <div className="h-10 w-10 rounded-full border-2 border-white bg-pink-400" />
              <div className="h-10 w-10 rounded-full border-2 border-white bg-green-400" />
              <div className="h-10 w-10 rounded-full border-2 border-white bg-yellow-400" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              <span className="text-lg">12k+</span> Happy Customer
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="mt-10">
          <div className="relative">
            {/* Cards container */}
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t :any, index :number) => (
                <article
                  key={t.id}
                  className={`
                    rounded-3xl border border-gray-100 bg-white p-6 shadow-sm
                    transition-opacity duration-300
                    ${index === current ? "opacity-100" : "opacity-40 md:opacity-100"}
                  `}
                  data-aos="fade-up"
                >
                  <div className="text-4xl text-gray-900">“</div>
                  <p className="mt-4 text-sm leading-relaxed text-gray-800 md:text-base">
                    {t.quote}
                  </p>
                  <div className="mt-6 text-sm font-semibold text-gray-900">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </article>
              ))}
            </div>

            {/* Arrows (show on mobile / tablet mainly) */}
            <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm"
                aria-label="Previous testimonial"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm"
                aria-label="Next testimonial"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
