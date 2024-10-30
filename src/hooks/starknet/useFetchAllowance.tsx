import { contract } from "@/lib/contract";
import { feltToShortString } from "@/lib/utils";
import { useWalletStore } from "@/store/wallet.store";
import { useReadContract } from "@starknet-react/core";

export const useFetchAllowance = () => {
  const { erc20Abi, erc20Address, contractAddress } = contract;

  const walletAddress = useWalletStore((state) => state.walletAddress);

  // Call useReadContract at the top level
  const transaction = useReadContract({
    address: erc20Address,
    functionName: "allowance",
    abi: erc20Abi,
    args: [walletAddress, contractAddress],
    watch: true, // Set to true if you want to fetch the allowance on updates
  });

  // Compute allowance from the transaction data
  const allowance = transaction?.data
    ? Number(feltToShortString(String(transaction?.data)).output)
    : null;

  // Return the allowance value
  return { allowance };
};
