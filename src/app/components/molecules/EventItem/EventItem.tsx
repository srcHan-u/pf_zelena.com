"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import { EventT } from "./types";
import { ButtonUI } from "../../atoms/Button";
import { useModal } from "@/app/context/ModalContext";

function truncateDate(date: string): string {
  const item = date.split("-");
  const day = item[1];
  const month = item[2];

  return day && month ? `${day}/${month}` : date;
}
export function EventItem({
  image,
  openFor,
  openDateFrom,
  openDateTo,
  location,
  studio,
}: EventT) {
  const { open } = useModal();
  const status =
    openFor === "Closed" ? "closed" : openFor === "Soon" ? "soon" : "open";
  return (
    <motion.div
      className={clsx(
        "group",
        "overflow-hidden",
        "md:rounded-[20px]",
        "w-full md:w-[333px] h-[200px] md:h-[429px]",
        "flex flex-col justify-between p-[19px] relative shadow-2xl"
      )}
      whileHover={{ height: 429 }}
      whileTap={{ height: 429 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="absolute h-[39px] md:h-[87px] top-0 left-0 w-full bg-gradient-to-b from-black/100 to-transparent opacity-30" />
      <div className="absolute h-[39px] md:h-[87px] bottom-0 left-0 w-full bg-gradient-to-t from-black/100 to-transparent opacity-30" />
      <Image
        src={image[0].url}
        alt="Flash design"
        fill
        className="absolute inset-0 object-cover z-[-1]"
        priority
      />

      <div className="flex flex-col space-y-1 text-white">
        <span className="font-neue-mon font-medium text-xl">
          {truncateDate(openDateFrom)} - {truncateDate(openDateTo)}{" "}
        </span>
        <span className="font-neue-met font-bold text-[28px]">{location}</span>
        <span className="font-neue-mon font-medium text-xl">{studio}</span>
      </div>
      <ButtonUI
        onClick={open}
        className={clsx(
          "font-neue-mon font-bold text-lg uppercase py-[15px] leading-5 z-10",
          status === "open" ? "opacity-100" : "opacity-40"
        )}
        disabled={status !== "open"}
        type="contained"
        color="white"
        text={status === "open" ? `open for ${openFor}` : openFor}
      />
    </motion.div>
  );
}
