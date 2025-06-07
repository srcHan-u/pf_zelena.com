"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  speed?: number;
}

export function Marquee({ children, speed = 50 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (contentRef.current) {
      setWidth(contentRef.current.scrollWidth);
    }
  }, [children]);

  const duration = width > 0 ? width / speed : 0;

  return (
    <div ref={containerRef} className="overflow-hidden whitespace-nowrap flex">
      <motion.div
        className="flex items-center justify-start gap-4"
        style={{ x: 0 }}
        animate={{ x: -width }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
        }}
      >
        <div ref={contentRef} className="flex-shrink-0">
          {children}
        </div>
        <div className="flex-shrink-0">{children}</div>
      </motion.div>
    </div>
  );
}
