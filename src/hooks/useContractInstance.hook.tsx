import { contract } from "@/utils/contract";
import { useContract } from "@starknet-react/core";
import { useCallback } from "react";

export const useContractInstance = () => {
  const { daoAddress, daoABI, erc20ABI, erc20Address } = contract;

  const getContractInstance = useCallback(() => {
    const { contract } = useContract({
      abi: daoABI,
      address: daoAddress,
    });
    return contract;
  }, [daoAddress, daoABI]);

  const getErc20Instance = useCallback(() => {
    const { contract } = useContract({
      abi: erc20ABI,
      address: erc20Address,
    });
    return contract;
  }, [erc20ABI, erc20Address]);

  return { getContractInstance, getErc20Instance };
};
