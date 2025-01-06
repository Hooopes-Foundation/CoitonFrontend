import { RootState } from "@/store";
import { contract } from "@/utils/contract";
import { useReadContract } from "@starknet-react/core";
import { useSelector } from "react-redux";

export const useRegistrationStatusHook = () => {
  const { daoAddress, daoABI } = contract;
  const walletState = useSelector((state: RootState) => state.wallet);

  const isUserRegistered = useReadContract({
    address: daoAddress,
    abi: daoABI,
    args: [walletState?.walletAddress],
    functionName: "is_user_registered",
    watch: true,
  });

  return {
    hasRegistered: isUserRegistered.data,
    isCheckingRegStatus: isUserRegistered.isLoading,
  };
};
