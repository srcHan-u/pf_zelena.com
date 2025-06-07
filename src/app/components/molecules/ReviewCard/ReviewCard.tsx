import { ReviewCardT } from "./types";

type Props = ReviewCardT & {
  className?: string;
};
export function ReviewCard({
  description,
  name,
  avatar,
  location,
  className = "",
}: Props) {
  return (
    <div
      className={`flex flex-col items-start justify-between max-w-[636px] min-w-[370px] h-[460px] w-full bg-[#E4E4E4] rounded-[20px] p-[40px] ${className}`}
    >
      <p>{description}</p>
      <div className="">
        <div className="flex items-center justify-center font-neue-met uppercase text-[24px] w-20 h-20 rounded-full bg-black text-white">
          {avatar}
        </div>
        <div className="font-neue-met">{name}</div>
        <div className="font-work font-[400]">
          ({location.city},{location.country})
        </div>
      </div>
    </div>
  );
}
