"use client";

import { Heading } from "@components/atoms/Heading";
import { PortfolioCard } from "@components/molecules/PortfolioCard/PortfolioCard";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { PortfolioCardT } from "@components/molecules/PortfolioCard/types";
import clsx from "clsx";

type Props = {
  items: PortfolioCardT[];
};

const MAX_ITEMS = 8;

export function PortfolioSection({ items = [] }: Props) {
  const isDesktop = useMediaQuery("(min-width: 1020px)");

  return (
    <section className="pt-[77px] pb-[139px] px-[28px]">
      <div className="w-full max-w-[1377px] mx-auto">
        <Heading text="Portfolio & Prices" />
        <p className="font-neu-mont mt-[20px] sm:mt-[25px] md:mt-[37px] text-center text-[14px] sm:text-base">
          Below you can find an approximate pricing for 2025{" "}
        </p>

        <div
          id="portfolio"
          className="justify-center md:grid md:grid-cols-3 lg:grid-cols-4 gap-[35px] md:gap-[15px] mt-10 xl:mt-15"
        >
          {items.slice(0, MAX_ITEMS).map((image, index) => (
            <PortfolioCard
              key={index}
              alt={`Portfolio image ${index + 1}`}
              className={clsx(
                isDesktop && index % 2 === 0 && "translate-y-[30px]"
              )}
              {...image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
