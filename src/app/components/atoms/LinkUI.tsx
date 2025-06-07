import Link from "next/link";

type Props = {
  className?: string;
  text: string;
  type?: "contained" | "outlined";
  color?: "black" | "white";
  onClick?: () => void;
  href?: string;
};

export function LinkUI({
  className = "",
  text,
  type = "contained",
  color = "black",
  href = "/",
  onClick,
}: Props) {
  const linkStyles = {
    contained: {
      black: `bg-black text-white hover:bg-white hover:text-black border border-black`,
      white: `bg-white text-black hover:bg-black hover:text-white border border-white`,
    },
    outlined: {
      black: `outline outline-black text-black bg-transparent hover:text-white hover:bg-black`,
      white: `outline outline-white text-white bg-transparent hover:text-white hover:bg-black hover:outline-black`,
    },
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center justify-center
        px-8 py-[12px] md:py-[16px]
        font-neue-met text-[14px] md:text-[18px]
        rounded-full
        transition hover:scale-101 duration-200 ease-in-out
        ${linkStyles[type][color]}
        ${className}
        `}
    >
      {text}
    </Link>
  );
}
