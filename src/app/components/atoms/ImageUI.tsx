import React, { forwardRef } from "react";
import Image, { ImageProps } from "next/image";

export interface ImageUIProps extends ImageProps {
  alt: string;
  lastModified?: string;
  classNames?: {
    container?: string;
    image?: string;
  };
}

export const ImageUI = forwardRef<HTMLImageElement, ImageUIProps>(
  ({ classNames, lastModified, ...props }, ref) => {
    const versionParam = encodeURIComponent(
      new Date(lastModified || "1970-01-01T00:00:00Z").getTime().toString()
    );

    const imageUrl = `${props.src}?v=${versionParam}`;

    return (
      <div className={classNames?.container}>
        <Image
          {...props}
          ref={ref}
          alt={props.alt}
          className={classNames?.image}
          src={imageUrl}
        />
      </div>
    );
  }
);

ImageUI.displayName = "ImageUI";
