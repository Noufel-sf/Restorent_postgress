import React from "react";
import { Offer } from "../Utils/Types";
import OfferCard from "./OfferCard";

const offers: Offer[] = [
  {
    id: "margherita",
    name: "Margherita Party Box",
    description: "2 Large Margherita pizzas + 1L drink.",
    price: "$19",
    image: "/p3.png",
    bgColor: "bg-accent",
  },
  {
    id: "pepperoni",
    name: "Pepperoni Night",
    description: "3 Pepperoni pizzas + garlic bread.",
    price: "$29",
    image: "/m.png",
    bgColor: "bg-primary",
  },
  {
    id: "family",
    name: "Family Feast",
    description: "4 mixed pizzas + sides for everyone.",
    price: "$39",
    image: "/p.png",
    bgColor: "bg-black",
  },
  {
    id: "familyt",
    name: "Family Feast",
    description: "4 mixed pizzas + sides for everyone.",
    price: "$39",
    image: "/p.png",
    bgColor: "bg-secondary",
  },
  {
    id: "family4t",
    name: "Family Feast",
    description: "4 mixed pizzas + sides for everyone.",
    price: "$39",
    image: "/p.png",
    bgColor: "bg-green",
  },
];

const Offers: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Today&apos;s Offers
          </h2>
          <p className="mt-3 text-sm text-gray-600 md:text-base">
            Special pizza deals for your perfect party.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {offers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
