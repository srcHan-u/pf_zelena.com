import "./globals.css";
import "react-day-picker/dist/style.css";
import "react-inner-image-zoom/lib/styles.min.css";
import "keen-slider/keen-slider.min.css";
import type { Metadata } from "next";
import { ModalHost, ModalProvider } from "./context/ModalContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FacebookPixel } from "./components/atoms/FacebookPixel";

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
    url: "https://annazelenska.com/",
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
          <SpeedInsights />
          <FacebookPixel pixelId={"1639692620050648"} />
        </ModalProvider>
      </body>
    </html>
  );
}
