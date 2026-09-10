import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";
import QueryProvider from "./Utils/QueryProvider";
import LayoutWrapper from "./LayoutWrapper";
import { AuthProvider } from "@/lib/authContext";

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pepper Restaurant | Gourmet Food & Fast Delivery",
  description: "Experience the finest artisan pizzas, burgers, chicken wings, and ramen delivered hot to your door.",
  keywords: ["restaurant", "food delivery", "pizza", "burger", "ramen", "gourmet"],
  openGraph: {
    title: "Pepper Restaurant | Gourmet Food & Fast Delivery",
    description: "Experience the finest artisan pizzas, burgers, chicken wings, and ramen delivered hot to your door.",
    images: ["/pizza1.jpg"],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${gabarito.variable}`}>
        <QueryProvider>
          <AuthProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
