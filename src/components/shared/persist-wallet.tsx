import { memo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useAccount, useConnect } from "@starknet-react/core";
import { setWalletAddress } from "@/store/slice/wallet.slice";
import { useWalletHook } from "@/hooks/useWallet.hook";

const PersistWallet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const walletState = useSelector((state: RootState) => state.wallet);
  const { address, status } = useAccount();
  const { connectors } = useConnect();

  const { handleConnectWallet } = useWalletHook();

  useEffect(() => {
    if (address) {
      dispatch(setWalletAddress(address));
    }
  }, [address]);

  useEffect(() => {
    if (status === "disconnected") {
      const storedConnector = walletState?.currentConnector
        ? walletState?.currentConnector?.id
        : null;

      if (storedConnector) {
        const matchingConnector = connectors.find(
          (connector) => connector.id === storedConnector,
        );
        if (matchingConnector) {
          handleConnectWallet(matchingConnector);
        }
      }
    }
  }, []);

  return null;
};

export default memo(PersistWallet);
