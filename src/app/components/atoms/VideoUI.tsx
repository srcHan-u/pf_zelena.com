import clsx from "clsx";
import { forwardRef, useEffect } from "react";
import { VideoHTMLAttributes } from "react";

export interface VideoUIProps extends VideoHTMLAttributes<HTMLVideoElement> {
  source: {
    src: string;
    type: string;
  }[];
  classNames?: {
    container?: string;
    video?: string;
  };
}

export const VideoUI = forwardRef<HTMLVideoElement, VideoUIProps>(
  ({ source, classNames, ...props }, ref) => {
    useEffect(() => {
      if (ref && typeof ref !== "function" && "current" in ref) {
        const videoElement = ref.current;
        if (videoElement) {
          videoElement.addEventListener("loadeddata", () => {
            videoElement.play().catch((error) => {
              console.error("Error playing video:", error);
            });
          });
        }
      }
    }, [ref]);
    return (
      <div className={clsx(classNames?.container)}>
        <video ref={ref} {...props} className={clsx(classNames?.video)}>
          {source.map((src, index) => (
            <source key={index} src={src.src} type={src.type} />
          ))}
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
);

VideoUI.displayName = "VideoUI";
