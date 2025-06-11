//
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  ReactNode,
} from "react";
import { motion, useAnimation, AnimationControls } from "framer-motion";
import clsx from "clsx";

interface MarqueeProps {
  list: ReactNode[];
  time?: number;
  toRight?: boolean;
  classNames?: {
    container?: string;
    item?: string;
  };
}

export function Marquee({
  list,
  time = 10,
  toRight = false,
  classNames,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const singleRef = useRef<HTMLDivElement>(null);
  const controls: AnimationControls = useAnimation();

  const [containerWidth, setContainerWidth] = useState(0);
  const [singleWidth, setSingleWidth] = useState(0);
  const [items, setItems] = useState<ReactNode[]>([]);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const c = containerRef.current;
    const s = singleRef.current;
    if (!c || !s) return;

    const measure = () => {
      setContainerWidth(c.offsetWidth);
      setSingleWidth(s.scrollWidth);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [list]);

  useEffect(() => {
    if (!containerWidth || !singleWidth) return;

    const baseCopies = Math.ceil(
      containerWidth < singleWidth ? 2 : containerWidth / singleWidth
    );

    const copies = baseCopies + 1;

    setItems(
      Array.from({ length: copies })
        .map(() => list)
        .flat()
    );

    setDistance(singleWidth);
  }, [containerWidth, singleWidth, list]);

  useEffect(() => {
    if (!distance || !containerWidth) return;

    const duration = (distance * time) / containerWidth;

    controls.set({ x: toRight ? -distance : 0 });

    controls.start({
      x: toRight ? 0 : -distance,
      transition: { duration, ease: "linear", repeat: Infinity },
    });
  }, [distance, containerWidth, time, toRight, controls]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative overflow-hidden mx-auto",
        classNames?.container
      )}
    >
      <div
        ref={singleRef}
        className="inline-block whitespace-nowrap opacity-0 pointer-events-none absolute"
      >
        {list.map((item, i) => (
          <span key={i} className={clsx("inline-block mr-8", classNames?.item)}>
            {item}
          </span>
        ))}
      </div>

      <motion.div className="inline-block whitespace-nowrap" animate={controls}>
        {items.map((item, i) => (
          <span key={i} className={clsx("inline-block mr-8", classNames?.item)}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
