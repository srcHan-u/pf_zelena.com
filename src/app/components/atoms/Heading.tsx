"use client";

type Props = {
  className?: string;
  text: React.ReactNode;
};

export function Heading({ className = "", text }: Props) {
  return (
    <h2
      className={`text-[32px] sm:text-[48px] md:text-[58px] font-neue-met font-bold uppercase text-center ${className}`}
    >
      {text}
    </h2>
  );
}
