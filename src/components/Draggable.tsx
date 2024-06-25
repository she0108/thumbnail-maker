import React, { useEffect, useState } from "react";

interface DraggabbleProps {
  image: File;
  onDelete: () => void;
}

export default function Draggabble({ image, onDelete }: DraggabbleProps) {
  const [{ x, y }, setPosition] = useState({ x: 0, y: 0 });
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImageUrl(url);

      const img = new Image();
      img.src = url;
      img.onload = () => {
        setSize({ width: img.naturalWidth, height: img.naturalHeight });
      };

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image]);

  const handleResize = (clickEvent: React.MouseEvent) => {
    const handleMouseMove = (moveEvent: MouseEvent) => {
      setSize((size) => {
        if (
          moveEvent.movementX / moveEvent.movementY >
          size.width / size.height
        ) {
          return {
            width: size.width + moveEvent.movementX * 2,
            height:
              size.height +
              moveEvent.movementX * 2 * (size.height / size.width),
          };
        } else {
          return {
            width:
              size.width + moveEvent.movementY * 2 * (size.width / size.height),
            height: size.height + moveEvent.movementY * 2,
          };
        }
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp, { once: true });
  };

  const handleDrag = (clickEvent: React.MouseEvent) => {
    clickEvent.stopPropagation();

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
      onMouseDown={handleResize}
      draggable="false"
      className="p-2 absolute hover:cursor-ew-resize border"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div
        onMouseDown={handleDrag}
        draggable="false"
        className="relative w-full h-full"
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt="image"
            draggable="false"
            className="w-full h-full object-fill select-none hover:cursor-pointer hover:outline-dashed hover:outline-2 hover:outline-neutral-300"
          />
        )}
        <button onClick={onDelete} className="absolute top-0 right-0">
          X
        </button>
      </div>
    </div>
  );
}
