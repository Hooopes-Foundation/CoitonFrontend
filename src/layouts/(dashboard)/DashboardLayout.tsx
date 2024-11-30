import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
import { useEffect } from "react";
import { Connector } from "starknetkit";
import { toast } from "sonner";
import { useAccount, useConnect } from "@starknet-react/core";
import { useWalletStore } from "@/store/wallet.store";
import { useCredential } from "@/hooks/useCredential";

export default function DashboardLayout() {
  const { getUserDetails } = useCredential();
  const { address, status, isConnected } = useAccount();
  const { connectors, connectAsync } = useConnect();
  const navigate = useNavigate();

  const walletAddress = useWalletStore((state) => state.walletAddress);
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
        await connectAsync({ connector });
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
    if (address) {
      setWalletAddress(address);
    }
  }, [address]);

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

  useEffect(() => {
    if (walletAddress && isConnected) {
      const user = getUserDetails();

      if (!user) {
        navigate("/onboarding");
        setCredential(undefined);
      } else {
        setCredential(user);
        console.log(user);
      }
    }
  }, [walletAddress, isConnected]);

  return (
    <div className="flex flex-1 bg-[#F9FAFB]">
      <Sidebar />
      {/* <StartOnboarding /> */}

      <main className="flex flex-1 flex-col">
        <Navbar />
        <div className="mx-auto w-full max-w-[1610px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
