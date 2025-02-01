import { contract } from "@/utils/contract";
import { useContract, useAccount } from "@starknet-react/core";
import { useCallback } from "react";
import { toast } from "sonner";
import { AccountInterface, Contract } from "starknet";

export const useContractInstance = () => {
  const { daoAddress, daoABI, erc20ABI, erc20Address } = contract;
  const getContractInstance = useCallback(() => {

    if (!window.Wallet?.Account || !window.Wallet?.IsConnected) {
      toast.error("Wallet not connected!");
      return;
    }

    const contract = new Contract(
      daoABI,
      daoAddress,
      window.Wallet.Account as unknown as AccountInterface
    );



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
