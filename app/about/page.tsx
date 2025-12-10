// app/about/page.tsx
import React from "react";
import Banner from "../components/Banner";
import Image from "next/image";
import Location from "../components/Location";
import TestimonialsSection from "../components/Testemoniols";

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero section */}

      <Banner />

      {/* Team highlight */}
      <section className="">
        <div className="mx-auto max-w-6xl  px-4 py-16 md:px-6 lg:px-8 lg:py-20">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
              Meet the people behind the pizzas
            </h2>
            <p className="mt-3 text-sm text-gray-600 md:text-base">
              Our team of chefs, servers, and hosts share one goal: make your
              visit the best part of your day.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
              <Image
                src="/chef1.png"
                alt="James Carter"
                width={15}
                height={15}
                className="mx-auto mb-3 h-16 w-16 rounded-full object-cover"
              />
              <p className="text-sm font-semibold text-gray-900">
                Alex Johnson
              </p>
              <p className="text-xs text-gray-500">Head Chef</p>
            </div>

            <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
              <Image
                src="/chef2.png"
                alt="James Carter"
                width={20}
                height={20}
                className="mx-auto mb-3 h-16 w-16 rounded-full object-cover"
              />
              <p className="text-sm font-semibold text-gray-900">Maria Lopez</p>
              <p className="text-xs text-gray-500">Restaurant Manager</p>
            </div>

            <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
              <Image
                src="/chef1.png"
                alt="James Carter"
                width={20}
                height={20}
                className="mx-auto mb-3 h-16 w-16 rounded-full object-cover"
              />
              <p className="text-sm font-semibold text-gray-900">
                James Carter
              </p>
              <p className="text-xs text-gray-500">Guest Experience</p>
            </div>
          </div>
          <TestimonialsSection />
          <Location />
        </div>
      </section>
    </main>
  );
}
