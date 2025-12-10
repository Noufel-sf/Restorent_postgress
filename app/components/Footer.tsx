// components/layout/Footer.tsx
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        {/* Top grid */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand + contact */}
          <div className="space-y-4">
            <div className="text-3xl font-extrabold tracking-tight">
              Pepper
            </div>

            <div className="space-y-1 text-sm leading-relaxed">
              <p>123 Pizza St.</p>
              <p>Manhattan, New York, NY 10001</p>
              <p>United States</p>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <p>contact@pepper.pizza</p>
              <p>delivery@pepper.pizza</p>
            </div>

            <div className="mt-4 space-y-1 text-sm">
              <p>
                <span className="font-semibold">Monday – Friday:</span> 9 AM – 10 PM
              </p>
              <p>
                <span className="font-semibold">Saturday:</span> 10 AM – 11 PM
              </p>
              <p>
                <span className="font-semibold">Sunday:</span> 10 AM – 8 PM
              </p>
            </div>
          </div>

          {/* Menu links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em]">
              Menu
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:underline">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em]">
              Useful
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
              <li>Terms &amp; Conditions</li>
              <li>Refunds &amp; Cancellation</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em]">
              Social
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>Instagram</li>
              <li>Trip Advisor</li>
              <li>Youtube</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/20 pt-4 text-xs text-white/80 md:flex md items-center md:justify-between">
          <p>© 2025 Pepper. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            made by <span className="font-semibold">Ulhub.design</span> with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
