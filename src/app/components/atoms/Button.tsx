import clsx from "clsx";

type Props = {
  className?: string;
  text: string;
  type?: "contained" | "outlined";
  color?: "black" | "white";
  onClick?: () => void;
  disabled?: boolean;
  buttonType?: "button" | "submit" | "reset";
};

export function ButtonUI({
  className = "",
  text,
  type = "contained",
  color = "black",
  onClick,
  disabled = false,
  buttonType = "button",
}: Props) {
  const buttonStyles = {
    contained: {
      black: `outline outline-black bg-black text-white ${!disabled ? "hover:bg-white hover:text-black hover:outline-black" : ""
        }`,
      white: `bg-white text-black ${!disabled ? "hover:bg-black hover:text-white" : ""
        }`,
    },
    outlined: {
      black: `outline outline-black text-black bg-transparent ${!disabled ? "hover:text-white hover:bg-black" : ""
        }`,
      white: `outline outline-black text-black bg-transparent ${!disabled ? "hover:text-white hover:bg-black" : ""
        }`,
    },
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={buttonType}
      className={clsx(
        `
        flex items-center justify-center
        px-8 py-[12px] md:py-[16px] font-neue-met
        text-[14px] md:text-[18px] rounded-full`,
        buttonStyles[type][color],
        !disabled && "transition hover:scale-101 duration-200 ease-in-out",
        disabled && "cursor-not-allowed select-none opacity-50",
        className
      )}
    >
      {text}
    </button>
  );
}
