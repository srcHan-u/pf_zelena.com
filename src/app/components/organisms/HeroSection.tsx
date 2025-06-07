"use client";

import { motion } from "framer-motion";
import { useModal } from "@/app/context/ModalContext";
import { ButtonUI } from "@components/atoms/Button";
import { LinkUI } from "@components/atoms/LinkUI";
import { MoveDown } from "lucide-react";
import { Marquee } from "../molecules/Marquee";

function formatEvents(events: { location: string; date: string }[]) {
  return events.map((event) => `${event.location} – ${event.date}`).join(" | ");
}

export function HeroSection({
  events = [],
}: {
  events?: { location: string; date: string }[];
}) {
  const { open } = useModal();

  return (
    <section id="hero" className="relative w-full h-screen bg-white">
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center bg-white">
        <div className="relative w-full h-screen bg-black">
          <video
            src="/videos/video_web.mp4"
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover block"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-black/50" />
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative z-10 container mx-auto flex flex-col items-center text-center  px-3 sm:px-4">
          <motion.h1
            className="text-white font-neue-met font-bold uppercase leading-tight text-[40px] sm:text-[60px] md:text-[80px]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hello, I&apos;m Anna
          </motion.h1>
          <motion.p
            className="mt-4 md:mt-[50px] text-white text-base md:text-2xl font-work"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Ukrainian tattoo artist who specialized on color micro tattoos.
          </motion.p>
          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <ButtonUI
              text="Get a consultation"
              onClick={open}
              type="contained"
              color="white"
              className="hover:bg-transparent hover:text-white outline outline-white"
            />
            <LinkUI
              href="#portfolio"
              text="View Portfolio"
              type="outlined"
              color="white"
              className="hover:bg-white hover:!text-black outline outline-white"
            />
          </motion.div>
          <div className="mt-[127px] overflow-hidden max-w-xl w-full">
            <span className="text-[10px] sm:text-[12px] md:text-[14px] text-white/30 uppercase font-work">
              Bookings / events
            </span>

            <Marquee speed={40}>
              <span className="text-white text-xs uppercase space-x-4 flex gap-2 items-center mt-2 font-work text-[10px] sm:text-[12px] md:text-[14px]">
                {formatEvents(events)}
              </span>
            </Marquee>
          </div>
        </div>
        <motion.button
          className="text-white mt-18"
          onClick={() => {
            const nextSection = document.getElementById("about");
            if (nextSection) {
              nextSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <MoveDown size={32} className="animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
