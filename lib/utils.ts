import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateAddress = (str: string, n: number = 6) => {
  return str?.length > n
    ? str.slice(0, n) + "..." + str.slice(str.length - 4, str.length)
    : str;
};

export const generateUUID = (length: number): number => {
  const upperLimit = Math.pow(10, length) - 1;
  const lowerLimit = Math.pow(10, length - 1);

  return Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
};
