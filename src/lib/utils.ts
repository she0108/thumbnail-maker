import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ratioToSize(ratio: string) {
  switch (ratio) {
    case "1/1":
      return { width: 1080, height: 1080 };
    case "16/9":
    default:
      return { window: 1980, height: 1080 };
  }
}
