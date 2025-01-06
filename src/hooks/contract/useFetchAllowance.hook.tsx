import { RootState } from "@/store";
import { contract } from "@/utils/contract";
import { useReadContract } from "@starknet-react/core";
import { useSelector } from "react-redux";
import { uint256 } from "starknet";

export const useFetchAllowanceHook = () => {
  const { erc20ABI, erc20Address, daoAddress } = contract;
  const walletState = useSelector((state: RootState) => state.wallet);

  const transaction = useReadContract({
    address: erc20Address,
    functionName: "allowance",
    abi: erc20ABI,
    args: [walletState.walletAddress, daoAddress],
    watch: true,
  });

  const allowance = transaction?.data
    ? uint256.uint256ToBN(transaction?.data)
    : null;

  return { allowance };
};
