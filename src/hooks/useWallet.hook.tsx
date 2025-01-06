import { AppDispatch } from "@/store";
import {
  resetWallet,
  setCurrentConnector,
  setIsWalletConnected,
  setWalletAddress,
} from "@/store/slice/wallet.slice";
import { availableConnectors } from "@/utils/connectors";
import { Connector, useConnect, useDisconnect } from "@starknet-react/core";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  type StarknetkitConnector,
  useStarknetkitConnectModal,
} from "starknetkit";

export const useWalletHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: availableConnectors as StarknetkitConnector[],
  });

  const handleConnectWallet = useCallback(
    async (cntr: Connector) => {
      try {
        if (cntr.available()) {
          await connectAsync({ connector: cntr });
          dispatch(
            setCurrentConnector({
              id: cntr?.id,
              name: cntr?.name,
              icon: cntr?.icon,
            })
          );
          dispatch(setIsWalletConnected(true));
        }
      } catch (err: unknown) {
        console.error("[SOMETHING WENT WRONG]", err);
        toast.error(
          err instanceof Error ? err.message : "[SOMETHING WENT WRONG]"
        );
      }
    },
    [connectAsync]
  );

  const disconnectWallet = useCallback(async () => {
    await disconnectAsync();
    dispatch(resetWallet());
    toast.info("Wallet disconnected");
  }, [setCurrentConnector, setIsWalletConnected, setWalletAddress]);

  const connectWallet = useCallback(
    (connector: Connector) => {
      handleConnectWallet(connector);
    },
    [handleConnectWallet]
  );

  async function connectWalletWithModal() {
    const { connector } = await starknetkitConnectModal();
    if (!connector) {
      return;
    }
    await connectAsync({ connector: connector as Connector });
    dispatch(
      setCurrentConnector({
        id: connector?.id,
        name: connector?.name,
        icon: connector?.icon,
      })
    );
    dispatch(setIsWalletConnected(true));
  }

  return {
    connectWallet,
    disconnectWallet,
    connectWalletWithModal,
    handleConnectWallet,
  };
};
