import React, { useEffect, useState } from "react";

interface DraggabbleProps {
  image: File;
  onDelete: () => void;
}

export default function Draggabble({ image, onDelete }: DraggabbleProps) {
  const [{ x, y }, setPosition] = useState({ x: 0, y: 0 });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image]);

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
      {imageUrl && (
        <img
          src={imageUrl}
          alt="image"
          draggable="false"
          className="w-full h-full object-cover select-none hover:cursor-pointer"
        />
      )}
      <button onClick={onDelete}>X</button>
    </div>
  );
}
