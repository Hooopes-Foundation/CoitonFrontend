import { contract } from "@/lib/contract";
import { byteArrayToString } from "@/lib/utils";
import { useWalletStore } from "@/store/wallet.store";
import { useReadContract } from "@starknet-react/core";

export const useCredential = () => {
  const { contractAbi, contractAddress } = contract;
  const walletAddress = useWalletStore((state) => state.walletAddress);

  const transaction = useReadContract({
    address: contractAddress,
    functionName: "get_user",
    abi: contractAbi,
    args: [walletAddress],
    watch: true,
  });

  const getUserDetails = () => {
    if (!walletAddress) return;
    const user = transaction?.data
      ? byteArrayToString(transaction?.data.split(","))
      : {};
    return user;
  };

  return { getUserDetails };
};
