import { useMemo } from "react";

export const useTruncAddr = (str: string, n: number = 6) =>
  useMemo(() => {
    if (!str) return "";
    return str?.length > n
      ? str.slice(0, n) + "..." + str.slice(str.length - 4)
      : str;
  }, [str, n]);
