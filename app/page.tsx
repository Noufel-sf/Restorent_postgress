import Hero from "./components/Hero";
import Offers from "./components/Offers";
import TestimonialsSection from "./components/Testemoniols";
import Location from "./components/Location";
import Banner from "./components/Banner";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Spinner from "./components/ui/Spinner";

export default function HomePage() {

  const LazyLoadedHomeFoods = dynamic(  
    () => import("./components/HomeFoods"),
  );

  return (
    <main className="min-h-screen bg-white">
    <Hero />
    <Suspense fallback={<Spinner />}>
      <LazyLoadedHomeFoods />
    </Suspense>
      <Offers />
      <TestimonialsSection />
      <Banner />
      <Location />
    </main>
  );
}
