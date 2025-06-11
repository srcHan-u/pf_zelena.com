import type { Metadata } from "next";
import { ModalHost, ModalProvider } from "./context/ModalContext";
import "./globals.css";
import "react-day-picker/dist/style.css";
import "react-inner-image-zoom/lib/styles.min.css";
import "keen-slider/keen-slider.min.css";

export const metadata: Metadata = {
  title:
    "Anna Zelenska | Tattoo artist in Calgary | Portfolio, Pricing & Booking",
  description:
    "Explore my portfolio, learn about my tattooing approach, and find all the important details about the process, pricing, design preparation, and how to book your session.",
  openGraph: {
    title:
      "Anna Zelenska | Tattoo artist in Calgary | Portfolio, Pricing & Booking",
    description:
      "Explore my portfolio, learn about my tattooing approach, and find all the important details about the process, pricing, design preparation, and how to book your session.",
    url: "https://pf-zelena-com.vercel.app",
    siteName: "Anna Zelenska Tattoo",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#fff] text-black dark:bg-black dark:text-white">
        <ModalProvider>
          {children}
          <ModalHost />
        </ModalProvider>
      </body>
    </html>
  );
}
