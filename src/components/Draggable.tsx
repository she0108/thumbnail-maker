import React, { useState } from "react";

export default function Draggabble() {
  const [{ x, y }, setPosition] = useState({ x: 0, y: 0 });

  // add mousemove & mouseup event handler when mousedown event occurs
  // Q: React.MouseEvent와 MouseEvent의 차이?
  const handleMouseDown = (clickEvent: React.MouseEvent) => {
    const handleMouseMove = (moveEvent: MouseEvent) => {
      setPosition({
        x: x + moveEvent.clientX - clickEvent.clientX,
        y: y + moveEvent.clientY - clickEvent.clientY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp, { once: true });
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      className="absolute"
    >
      <div className="w-32 h-32 bg-white hover:cursor-pointer shadow-lg">
        <h1 className="text-black select-none text-center">
          x: {x}, y: {y}
        </h1>
      </div>
    </div>
  );
}
