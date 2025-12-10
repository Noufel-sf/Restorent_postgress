import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";
import QueryProvider from "./Utils/QueryProvider";
import LayoutWrapper from "./LayoutWrapper";



const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
});



export const metadata = {
  title: "My Website Title",
  description: "This is my amazing website description.",
  keywords: ["food", "delivery", "your brand", "ecommerce"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "My Website Title",
    description: "A powerful eCommerce experience.",
    url: "https://yourwebsite.com",
    siteName: "Your Website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Website preview",
      },
    ],
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
        <LayoutWrapper>
          <QueryProvider>
            {/* <Suspense fallback={<Spinner  />}> */}
              {children}
            {/* </Suspense> */}
          </QueryProvider>
        </LayoutWrapper>
      </body>
    </html>
  );
}
