import { RouterProvider } from "react-router-dom";
import { Toaster as SonnerToast } from "./components/ui/sonner";
import { Toaster as NoticeToast } from "./components/ui/toaster";
import { routes } from "./routes";
import { Fragment } from "react/jsx-runtime";
import { contract } from "./utils/contract";
import { useReadContract } from "@starknet-react/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useEffect } from "react";
import { setHasRegistered } from "./store/slice/wallet.slice";
import { WalletAccount } from "starknet";

interface Wallet {
  IsConnected: boolean;
  Account:  WalletAccount | typeof undefined;
}

declare global {
  interface Window {
    Wallet: Wallet;
  }
}

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const wallet = useSelector((state: RootState) => state.wallet);

  const { daoAddress, daoABI } = contract;

  const hasRegistered = useReadContract({
    address: daoAddress,
    functionName: "is_user_registered",
    abi: daoABI,
    args: [wallet.walletAddress!],
    watch: true,
  });

  const isLoading =
    hasRegistered?.isFetching ||
    hasRegistered?.isLoading ||
    hasRegistered?.isPending;

  useEffect(() => {
    if (!isLoading) {
      dispatch(setHasRegistered(hasRegistered?.data!));
    }
  }, [isLoading]);

  return (
    <Fragment>
      {/* {isLoading && (
        <div className="fixed top-0 left-0 z-50 backdrop-blur-sm bg-black/30 size-full pointer-events-auto select-none overflow-hidden flex items-center justify-center">
          <Loader className="animate-spin size-8 text-white" />
        </div>
      )} */}
      <SonnerToast richColors theme="light" />
      <NoticeToast />
      <RouterProvider router={routes} />
    </Fragment>
  );
}
