import React, { forwardRef } from "react";

interface ThumbnailProps {
  bgColor: string;
  ratio: string;
  children: React.ReactNode;
}

const Thumbnail = forwardRef<HTMLDivElement, ThumbnailProps>(
  ({ bgColor, ratio, children }, ref) => {
    if (ratio === "1/1") {
      return (
        <div
          ref={ref}
          className="col-span-2 h-5/6 m-auto flex flex-col justify-center items-center overflow-hidden relative"
          style={{ backgroundColor: bgColor, aspectRatio: 1 }}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="col-span-2 w-11/12 m-auto flex flex-col justify-center items-center overflow-hidden relative"
        style={{ backgroundColor: bgColor, aspectRatio: 16 / 9 }}
      >
        {children}
      </div>
    );
  }
);

export default Thumbnail;
