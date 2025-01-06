import { contract } from "@/utils/contract";
import { useReadContract } from "@starknet-react/core";

export const useGetHash = (input: string) => {
  const { daoABI, daoAddress } = contract;

  const { data, isLoading } = useReadContract({
    address: daoAddress,
    functionName: "hash",
    abi: daoABI,
    args: [input],
    watch: false,
  });

  const hash = !isLoading && data ? String(data) : null;

  return { hash };
};
