type Props = {
  className?: string;
}

export function ArrowIcon({ className = "" }: Props) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="55"
        height="8"
        viewBox="0 0 55 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M54.3536 4.35355C54.5488 4.15829 54.5488 3.84171 54.3536 3.64645L51.1716 0.464466C50.9763 0.269204 50.6597 0.269204 50.4645 0.464466C50.2692 0.659728 50.2692 0.976311 50.4645 1.17157L53.2929 4L50.4645 6.82843C50.2692 7.02369 50.2692 7.34027 50.4645 7.53553C50.6597 7.7308 50.9763 7.7308 51.1716 7.53553L54.3536 4.35355ZM0 4V4.5H54V4V3.5H0V4Z"
          fill="#CCCCCC"
        />
      </svg>
    </div>
  );
}
