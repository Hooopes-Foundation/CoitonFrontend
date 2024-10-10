import { feltToString, stringToFelt } from "@/lib/utils";
import { useMemo } from "react";

export function useFeltConversion(
  inputString: string
): INTERFACE_FELT_CONVERSION_RESULT {
  return useMemo(() => {
    const felt = stringToFelt(inputString);
    const feltHex = felt.toString(16);
    const backToString = feltToString(feltHex);

    return {
      original: inputString,
      felt: feltHex,
      converted: backToString,
      matches: inputString === backToString,
    };
  }, [inputString]);
}
