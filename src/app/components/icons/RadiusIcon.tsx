type Props = {
  className?: string;
}

export function RadiusIcon({ className = "" }: Props) {
  return (
    <div className={className}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="5.9997"
          cy="5.73684"
          r="4.21053"
          stroke="white"
          strokeWidth="1.05263"
        />
        <path d="M1 11L11 1" stroke="white" strokeWidth="1.05263" />
      </svg>
    </div>
  );
}
