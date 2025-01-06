import { RootState } from "@/store";
import { contract } from "@/utils/contract";
import { useReadContract } from "@starknet-react/core";
import { useSelector } from "react-redux";

export const useHasStaked = () => {
  const { daoABI, daoAddress } = contract;
  const walletState = useSelector((state: RootState) => state.wallet);

  const hasStakedTx = useReadContract({
    abi: daoABI,
    address: daoAddress,
    functionName: "has_staked",
    args: [walletState.walletAddress],
    watch: true,
  });

  return {
    hasStaked: hasStakedTx.data as boolean,
    isCheckingStakedStatus: hasStakedTx?.isLoading as boolean,
  };
};
