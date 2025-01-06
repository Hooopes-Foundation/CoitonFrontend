import { useAccount, useBalance } from "@starknet-react/core";
import { variables } from "@/utils/variables";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const useFetchWalletBalanceHook = () => {
  const walletState = useSelector((state: RootState) => state.wallet);
  const { walletAddress } = walletState;
  const { address } = useAccount();

  const {
    data: walletBalance,
    isLoading: isLoadingBalance,
    isFetching: isFetchingBalance,
  } = useBalance({
    address: (walletAddress as `0x${string}`) || address,
    token:
      walletState.selectedToken === "coiton"
        ? variables.erc20Address
        : variables.starknetTokenAddress,
    watch: true,
  });

  const isLoading = isLoadingBalance || isFetchingBalance;

  return { walletBalance, isLoading };
};
