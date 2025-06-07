import clsx from "clsx";

type Props = {
  className?: string;
};

export function LoaderUI({ className }: Props) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center h-full w-full",
        className
      )}
    >
      <svg
        className="animate-spin h-8 w-8 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"

        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.93A8.003 8.003 0 014 12H0c0 5.523 4.477 10 10 10v-4a6.002 6.002 0 01-3.07-1.07zM20.07 17.07A8.003 8.003 0 0120 12h4c0 5.523-4.477 10-10 10v-4a6.002 6.002 0 003.07-1.07zM12 4a8.003 8.003 0 018 8h4c0-5.523-4.477-10-10-10V4z"
        ></path>
      </svg>
    </div>
  );
}
