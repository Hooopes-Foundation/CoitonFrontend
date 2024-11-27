import { contract } from "@/lib/contract";
import { useReadContract } from "@starknet-react/core";
import { useEffect, useState } from "react";

export const useGetHash = (input: string) => {
  const { contractAbi, contractAddress } = contract;

  const [hash, setHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data,
    isLoading: isTransactionLoading,
    error: transactionError,
  } = useReadContract({
    address: contractAddress,
    functionName: "hash",
    abi: contractAbi,
    args: [input],
    watch: false,
  });

  useEffect(() => {
    setIsLoading(isTransactionLoading);

    if (data) {
      try {
        setHash(String(data));
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error("[Hash Processing Error]", err);
      }
    }

    if (transactionError) {
      setError(transactionError.message);
      console.error("[Transaction Error]", transactionError);
    }
  }, [data, isTransactionLoading, transactionError]);

  return { hash, isLoading, error };
};
