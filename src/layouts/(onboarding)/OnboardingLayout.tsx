import { useCredential } from "@/hooks/useCredential";
import { useWalletStore } from "@/store/wallet.store";
import { useAccount, useConnect } from "@starknet-react/core";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Connector } from "starknetkit";

export default function OnboardingLayout() {
  const { getUserDetails } = useCredential();
  const { address, status, isConnected } = useAccount();
  const { connectors, connectAsync } = useConnect();
  const navigate = useNavigate();

  const setCredential = useWalletStore((state) => state.setCredential);
  const currentConnector = useWalletStore((state) => state.currentConnector);
  const setWalletAddress = useWalletStore((state) => state.setWalletAddress);
  const setCurrentConnector = useWalletStore(
    (state) => state.setCurrentConnector,
  );
  const setIsWalletConnected = useWalletStore(
    (state) => state.setIsWalletConnected,
  );

  async function connectWallet(connector: Connector) {
    try {
      if (connector.available()) {
        connectAsync({ connector });
        setIsWalletConnected(true);
        setCurrentConnector({
          id: connector?.id,
          name: connector?.name,
          icon: connector?.icon,
        });
      }
    } catch (err: unknown) {
      console.log("[SOMETHING WENT WRONG]", err);
      toast.error(
        err instanceof Error ? err.message : "[SOMETHING WENT WRONG]",
      );
    }
  }

  useEffect(() => {
    if (address && isConnected) {
      setWalletAddress(address);
      const user = getUserDetails();
      if (user) {
        setCredential(user);
        navigate("/dashboard");
      }
    }
  }, [address, isConnected]);

  useEffect(() => {
    if (status === "disconnected") {
      const storedConnector = currentConnector ? currentConnector?.id : null;

      if (storedConnector) {
        const matchingConnector = connectors.find(
          (connector) => connector.id === storedConnector,
        );
        if (matchingConnector) {
          connectWallet(matchingConnector);
        }
      }
    }
  }, []);

  return (
    <div className="flex h-full flex-col">
      <Outlet />
    </div>
  );
}
