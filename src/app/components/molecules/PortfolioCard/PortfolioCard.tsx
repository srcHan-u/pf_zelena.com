"use client";

import Image from "next/image";
import { PortfolioCardT } from "./types";
import { RadiusIcon } from "@components/icons/RadiusIcon";
import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import InnerImageZoom from "react-inner-image-zoom";
import clsx from "clsx";

type Props = PortfolioCardT & {
  className?: string;
  alt: string;
};

function concatValues(values: number[], symbol: string = ""): string {
  const firstValue = values[0] !== undefined ? values[0] : "";
  const secondValue = values[1] !== undefined ? values[1] : "";
  return firstValue && secondValue
    ? `${firstValue}-${secondValue} ${symbol}`
    : firstValue
      ? `${firstValue} ${symbol}`
      : secondValue
        ? `${secondValue} ${symbol}`
        : "";
}

export function PortfolioCard({
  image,
  preferredSizeCmMin,
  preferredSizeInchMin,
  priceDollarMin,
  priceDollarMax,
  preferredSizeInchMax,
  preferredSizeCmMax,
  size,
  className = "",
  alt = "Portfolio image",
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const largeImageUrl = image[0]?.url;
  console.log("🚀 ~ largeImageUrl:", largeImageUrl)

  return (
    <>
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "relative w-full h-[200px] md:h-[429px] md:rounded-[20px] overflow-hidden no-select cursor-pointer",
          className
        )}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-black/20 w-full h-full top-0 left-0 z-1" />
        <Image
          src={largeImageUrl}
          alt={alt}
          className="object-cover"
          fill
          loading="lazy"
        />
        <div className="max-w-[90%] mx-auto absolute z-2 bottom-[14px] left-0 right-0 text-white font-work font-normal">
          <div className="text-base">{size}</div>
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-1">
              <RadiusIcon className="translate-y-1" />
              <div>
                <p className="text-[12px] flex items-center">
                  {concatValues([preferredSizeCmMin, preferredSizeCmMax], "cm")}
                </p>
                <p className="text-[12px]">
                  {concatValues(
                    [preferredSizeInchMin, preferredSizeInchMax],
                    "in"
                  )}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[12px]">
                $ {concatValues([priceDollarMin, priceDollarMax])}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      {isOpen && largeImageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full">
            <div
              className="w-full xl:w-1/2 h-full mx-auto overflow-hidden flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-4 -right-3 z-10 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-200 focus:outline-none"
                aria-label="Close"
              >
                <X size={24} color="black" />
              </button>
              <InnerImageZoom
                src={largeImageUrl}
                zoomSrc={largeImageUrl}
                zoomScale={0.7}
                zoomType="click"
                hideHint={false}
                imgAttributes={{
                  className: "object-cover",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
