import React from "react";

interface ThumbnailProps {
  ref: React.RefObject<HTMLDivElement>;
  bgColor: string;
  ratio: string;
  children: React.ReactNode;
}

export default function Thumbnail({
  ref,
  bgColor,
  ratio,
  children,
}: ThumbnailProps) {
  if (ratio == "1/1") {
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
