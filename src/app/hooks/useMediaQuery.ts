"use client";
import { useState, useEffect } from "react";

/**
 * Хук для отслеживания media-query
 * @param query — строка media-query, например '(max-width: 640px)'
 * @returns true, если условие выполняется
 */
// export function useMediaQuery(query: string) {
//   const getInitial = () => {
//     if (typeof window === "undefined") return false;
//     return window.matchMedia(query).matches;
//   };

//   const [matches, setMatches] = useState<boolean>(getInitial);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const mq = window.matchMedia(query);

//     setMatches(mq.matches);

//     const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
//     if (typeof mq.addEventListener === "function") {
//       mq.addEventListener("change", handler);
//     } else {
//       mq.addListener(handler);
//     }

//     return () => {
//       if (typeof mq.removeEventListener === "function") {
//         mq.removeEventListener("change", handler);
//       } else {
//         mq.removeListener(handler);
//       }
//     };
//   }, [query]);

//   return matches;
// }

export function useMediaQuery(query: string): boolean {
  // Initial check to set the state based on the current window size
  // const getInitial = () => {
  //   if (window) {
  //     return window.matchMedia(query).matches;
  //   }
  //   return false;
  // };
  // const initialMatches = getInitial();

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    if (mql?.addEventListener) {
      mql.addEventListener("change", handler);
    } else {
      mql.addListener(handler);
    }

    return () => {
      if (mql?.removeEventListener) {
        mql.removeEventListener("change", handler);
      } else {
        mql.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}
