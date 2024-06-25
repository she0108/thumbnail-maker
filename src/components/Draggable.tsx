import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MoveDiagonal2, X } from "lucide-react";

interface DraggabbleProps {
  image: File;
  onDelete: () => void;
}

export default function Draggabble({ image, onDelete }: DraggabbleProps) {
  const [{ x, y }, setPosition] = useState({ x: 0, y: 0 });
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

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
    clickEvent.stopPropagation();

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

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      draggable="false"
      className="absolute"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
            className="w-full h-full object-fill select-none hover:cursor-pointer hover:outline-dashed hover:outline-2 hover:outline-blue-200"
          />
        )}
        {hovered && (
          <Button
            onClick={onDelete}
            variant="secondary"
            className="absolute text-neutral-500 -top-1.5 -right-1.5 p-0 w-3 h-3 hover:w-3.5 hover:h-3.5 hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
        {hovered && (
          <Button
            onMouseDown={handleResize}
            variant="secondary"
            className="hover:cursor-nwse-resize absolute text-neutral-500 -bottom-1.5 -right-1.5 p-0 w-3 h-3 hover:w-3.5 hover:h-3.5 hover:bg-blue-500 hover:text-white"
          >
            <MoveDiagonal2 className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  );
}
