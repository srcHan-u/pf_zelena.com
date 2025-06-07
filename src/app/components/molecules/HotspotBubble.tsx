import {
  Popover,
  Transition,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { motion } from "framer-motion";
import clsx from "clsx";

export type Hotspot = {
  id: string;
  x: number;
  y: number;
  title: string;
  content: React.ReactNode;
  classNamePanel?: string;
};

export function HotspotBubble({ data }: { data: Hotspot }) {
  return (
    <Popover
      className="absolute"
      style={{ left: `${data.x}%`, top: `${data.y}%` }}
    >
      {({ open }) => (
        <div>
          <div className="w-6 h-6 relative">
            <PopoverButton
              as={motion.button}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              className="relative z-10 w-full h-full bg-white rounded-full shadow-lg focus:outline-none"
            >
              <div
                className={clsx(
                  "absolute inset-0 z-10 rounded-full bg-white opacity-50",
                  "animate-ping transition-opacity duration-300 ease-in-out"
                )}
              />
            </PopoverButton>
          </div>

          <Transition
            show={open}
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <PopoverPanel
              static
              className={`absolute z-50 w-80 sm:w-128 p-4 bg-white rounded-lg shadow-xl overflow-y-auto max-h-60 no-scrollbar ${data.classNamePanel}`}
              style={{ marginTop: "0.5rem" }}
            >
              <h4 className="font-bold mb-2">{data.title}</h4>
              <div className="text-sm text-gray-700">{data.content}</div>
            </PopoverPanel>
          </Transition>
        </div>
      )}
    </Popover>
  );
}
