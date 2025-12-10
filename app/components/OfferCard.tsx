"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Offer } from "../Utils/Types";
import { motion, useScroll, useTransform } from "framer-motion";

function OfferCard({ offer, index }: { offer: Offer; index: number }) {
  const cardRef = useRef(null);

  // Scroll tracking for this card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Scroll → rotation mapping
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <article
      ref={cardRef}
      className={`
        ${offer.bgColor}
        relative overflow-hidden rounded-3xl shadow-sm
        transition-transform hover:-translate-y-1 hover:shadow-md
        ${index === 2 ? "md:col-span-2" : ""}
      `}
    >
      {/* TEXT CONTENT */}
      <div className="relative z-10 flex flex-col justify-between px-6 pt-8 pb-4 md:px-10 md:pt-10 md:pb-6">

        {/* Top content row (text + price) */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              {offer.name}
            </h3>

            <ul className="mt-4 space-y-2 text-base text-white md:text-lg">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-white" />
                <span>1 Medium Mediterranean Marvel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-white" />
                <span>1 Medium Garlic Supreme</span>
              </li>
            </ul>

            <button className="mt-6 inline-flex items-center rounded-full hover:bg-primary hover:text-white cursor-pointer transition duration-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm">
              Order Now
            </button>
          </div>

          <div className="mt-2 text-right md:mt-0 md:self-center">
            <span className="text-2xl font-extrabold text-white">
              {offer.price}
            </span>
            <span className="ml-2 text-lg font-medium text-white/90">
              – Save $4
            </span>
          </div>
        </div>

      </div>

      {/* ROTATING PIZZAS */}
      <div className="pointer-events-none relative mt-4 h-56 w-full md:h-72">

        {/* Left pizza */}
        <motion.div
          style={{ rotate }}
          className={`absolute -bottom-32 left-[-52px] 
            ${index === 2 ? "left-[72px] -bottom-52" : ""}`}
        >
          <Image
            src={offer.image}
            alt={offer.name}
            width={index === 2 ? 600 : 400}
            height={index === 2 ? 300 : 300}
            className="object-contain"
          />
        </motion.div>

        {/* Right pizza */}
        <motion.div
          style={{ rotate }}
          className={`absolute -bottom-32 right-[-52px] 
            ${index === 2 ? "right-[72px] -bottom-52" : ""}`}
        >
          <Image
            src={offer.image}
            alt={offer.name}
            width={index === 2 ? 600 : 400}
            height={index === 2 ? 300 : 300}
            className="object-contain"
          />
        </motion.div>

      </div>
    </article>
  );
}

export default OfferCard;
