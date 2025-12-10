import React from "react";
import Image from "next/image";

function Animateimages() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Image
        src={"/f.png"}
        alt="Basil leaf"
        width={120}
        height={120}
        className="absolute left-4 top-25 hidden md:block h-24 w-auto md:left-62 md:top-50"
      />

      <Image
        src={"/f2.png"}
        alt="Tomato"
        width={120}
        height={120}
        className="absolute left-8 top-17 hidden md:block h-28 w-auto md:left-26 md:bottom-16"
      />

      <Image
        src={"/t2.png"}
        alt="Olive"
        width={120}
        height={120}
        className="absolute right-32 top-15 hidden md:block h-16 w-auto"
      />
      <Image
        src={"/z.png"}
        alt="Garlic"
        width={120}
        height={120}
        className="absolute right-40 top-52 hidden md:block h-20 w-auto"
      />
    </div>
  );
}

export default Animateimages;
