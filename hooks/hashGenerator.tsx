import { ctxConfig } from "@/lib/blockchain";
import { useContract, useSendTransaction } from "@starknet-react/core";
import { useMemo } from "react";

export const useGenerateHash = () => {
  const generateRandomHash = (details: unknown) => {
    const { contract } = useContract({
      abi: ctxConfig.CONTRACT_ABI,
      address: ctxConfig.CONTRACT_ADDR,
    });

    const calls = useMemo(() => {
      if (!contract || !details) return undefined;

      return [contract?.populate("hash", [details])];
    }, [contract, details]);

    const tx = useSendTransaction({
      calls,
    });

    return { tx, calls };
  };

  return { generateRandomHash };
};
