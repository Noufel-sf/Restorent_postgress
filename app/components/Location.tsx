// components/sections/Location.tsx
import React from "react";

const LocationSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Visit Us &amp; Book a Table
          </h2>
        </div>

        {/* Map + info card */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.5fr)] items-stretch">
          {/* Map */}
          <div className="overflow-hidden rounded-3xl shadow-sm">
            <iframe
              title="Restaurant location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.707620044967!2d-73.992!3d40.7445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDzM5LjIiTiA3M8KwNTknMTcuMiJX!5e0!3m2!1sen!2sus!4v0000000000000"
              width="100%"
              height="380"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>

          {/* Info card */}
          <div className="flex flex-col mt-15 justify-center rounded-3xl bg-primary px-6 py-8 shadow-sm md:px-10 md:py-10">
            {/* Logo / name */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary text-lg font-bold">
                P
              </div>
              <span className="text-lg font-semibold text-white">
                Pepper Haven
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white md:text-3xl">
              Welcome to enjoy happiness
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-white md:text-base">
              At Pepper Haven, our story began with a simple love for great
              pizza, created in 2020 by friends and food enthusiasts. Our
              mission is to serve delicious, high-quality pizzas made with
              fresh, locally sourced ingredients.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white md:text-base">
              Join us at Pepper Haven and taste the difference passion and
              quality make. Whether you&apos;re dining in or booking a table
              for a special occasion, we&apos;ve got the perfect slice for you.
            </p>

            {/* Address / CTA row */}
            <div className="mt-6 flex flex-col gap-4 text-sm text-white md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold">123 Pizza St, Manhattan</p>
                <p>New York, NY 10001, USA</p>
              </div>
              <button className="inline-flex cursor-pointer items-center rounded-full bg-white px-6 py-3 text-xs font-semibold text-primary md:text-sm">
                Book a Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
