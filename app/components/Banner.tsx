// components/sections/Banner.tsx
import React from "react";
import Button from "../components/ui/Button";

const Banner: React.FC = () => {
  return (
    <section
      style={{ backgroundImage: "url(/banner.png)" }}
      className="mt-20 bg-cover p-18 mx-auto relative bg-center  overflow-hidden bg-white bg-no-repeat rounded-lg  text-white  text-center"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center md:px-6 lg:px-8 lg:py-24">
        <h1 className="text-6xl capitalize font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
         data-aos="fade-up"
        >
          <span className="">Best food for</span>
          <br />
          <span className="">your taste</span>
        </h1>

        <p className="mt-6 max-w-xl text-sm text-gray-700 sm:text-base"
          data-aos="fade-up"
        >
         We believe great food doesn&apos;t need to be complicated:
                just fresh ingredients, simple recipes, and a lot of care in
                every step—from the dough we knead to the toppings we prepare
                in‑house daily.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          {/* Primary CTA */}
          <Button className="px-10 py-4 text-sm sm:text-base">
            Book A Table
          </Button>

          {/* Secondary CTA (outline style) */}
          <button
            className="
              inline-flex items-center justify-center rounded-full border border-gray-900
              px-10 py-4 text-sm font-semibold text-gray-900
              bg-white/90 backdrop-blur
              hover:bg-gray-900 hover:text-white transition-colors
            "
          >
            Explore Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
