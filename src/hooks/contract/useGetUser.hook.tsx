import { byteArrayToString } from "@/lib/starknet/utils";
import { AppDispatch, RootState } from "@/store";
import { setCredential } from "@/store/slice/credential.slice";
import { contract } from "@/utils/contract";
import { useReadContract } from "@starknet-react/core";
import { useDispatch, useSelector } from "react-redux";

export const useGetUserHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { daoABI, daoAddress } = contract;
  const walletAddress = useSelector(
    (state: RootState) => state.wallet.walletAddress,
  );

  const getUserTx = useReadContract({
    abi: daoABI,
    address: daoAddress,
    functionName: "get_user",
    args: walletAddress ? [walletAddress] : undefined,
    watch: false,
  });

  const currentUser =
    (getUserTx?.data && {
      ...getUserTx.data,
      details: byteArrayToString(getUserTx.data?.details),
    }) ||
    null;

  if (currentUser) {
    dispatch(setCredential(currentUser));
  }

  return {
    currentUser,
    isFetchingUser: getUserTx.isLoading,
  };
};
