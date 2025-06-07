"use client";

import { ReactNode } from "react";
import { DisclosureButton, DisclosurePanel } from "@headlessui/react";
import clsx from "clsx";

type Props = {
  stepN: number;
  title: string;
  description: ReactNode;
  isOpen: boolean;
};

export function AppointmentCard({ stepN, title, description, isOpen }: Props) {
  return (
    <div className="w-full">
      <DisclosureButton
        className={clsx(
          "w-full text-center",
          "font-neue-met uppercase text-base md:text-[18px] leading-none",
          "flex flex-col items-start md:items-center justify-center",
          isOpen ? "text-black" : "text-gray-700"
        )}
      >
        <div className="text-sm tracking-wide text-gray-400 font-normal">
          Step {stepN}
        </div>
        <div className="mt-1 font-bold">{title}</div>
      </DisclosureButton>

      {isOpen && (
        <DisclosurePanel className="mt-4 mb-6 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </DisclosurePanel>
      )}
    </div>
  );
}
