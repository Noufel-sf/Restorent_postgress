// components/sections/Hero.tsx
"use client";
import Image from "next/image";
import React from "react";
import Button from "./ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";

// adjust paths/imports to your image files

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center md:px-6 lg:px-8 lg:py-24">
        {/* Floating ingredients */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <motion.div
            animate={{
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-24 top-25 hidden md:block"
          >
            <Image
              src={"/richa.png"}
              alt="Basil leaf"
              width={120}
              height={120}
              className="h-24 w-auto"
            />
          </motion.div>
          <motion.div
            animate={{
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-18 bottom-12 hidden md:block h-28 w-auto md:left-26 md:bottom-16"
          >
            <Image
              src={"/t2.png"}
              alt="Basil leaf"
              width={120}
              height={120}
              className="h-24 w-auto"
            />
          </motion.div>
          <motion.div
            animate={{
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-30 bottom-24 hidden md:block h-20 w-auto"
          >
            <Image
              src={"/f.png"}
              alt="Basil leaf"
              width={120}
              height={120}
              className="h-24 w-auto"
            />
          </motion.div>
          <motion.div
            animate={{
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-30 top-22 hidden md:block h-20 w-auto"
          >
            <Image
              src={"/t.png"}
              alt="Basil leaf"
              width={120}
              height={120}
              className="h-24 w-auto"
            />
          </motion.div>
          <motion.div
            animate={{
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-50 top-62 hidden md:block h-20 w-auto"
          >
            <Image
              src={"/z.png"}
              alt="Basil leaf"
              width={120}
              height={120}
              className="h-24 w-auto"
            />
          </motion.div>
          <motion.div
            animate={{
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-50 top-62 hidden md:block h-20 w-auto"
          >
            <Image
              src={"/ch4.png"}
              alt="Basil leaf"
              width={120}
              height={120}
              className="h-24 w-auto"
            />
          </motion.div>
        </div>

        {/* Text content */}
        <div className="max-w-5xl relative z-10">
          <h1
            className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-8xl"
            data-aos="fade-up"
          >
            Your Pizza Party
            <br />
            Starts Here!
          </h1>

          <p
            className="mt-6 text-base text-gray-700 sm:text-lg"
            data-aos="fade-up"
          >
            Gather your friends and family and enjoy the best pizza in town.
            <br className="hidden sm:inline" />
            Freshly made and delivered hot!
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="/foods"
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-primary px-10 py-4 text-base font-semibold text-white shadow-md transition-colors hover:bg-primary/90"
            >
              View Our Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
