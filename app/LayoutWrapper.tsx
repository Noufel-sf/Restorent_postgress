"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import "aos/dist/aos.css";
import AOS from 'aos';
import Navbarr from './components/Navbarr';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');


useEffect(() => {
  AOS.init({ duration: 1000 });
}, []);


  return (
    <>
      {!isAdmin && <Navbarr />}
      {children}
      {!isAdmin && <Footer />}
      <Toaster  position="top-center" reverseOrder={false} />
    </>
  );
}
