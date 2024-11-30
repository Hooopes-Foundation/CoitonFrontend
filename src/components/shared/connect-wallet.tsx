import { Connector } from "starknetkit";
import { useAccount, useConnect } from "@starknet-react/core";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useCallback, useEffect } from "react";
import { useWalletStore } from "@/store/wallet.store";
import { toast } from "sonner";
import { connectorsInfo } from "@/static";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function ConnectWallet() {
  const { address, status } = useAccount();
  const { connectors, connectAsync } = useConnect();
  //    const { disconnectAsync } = useDisconnect();

  const walletAddress = useWalletStore((state) => state.walletAddress);
  const setIsAuthenticated = useOnboardingStore(
    (state) => state.setIsAuthenticated,
  );
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
        setIsAuthenticated(true);
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

  //    async function disconnectWallet() {
  //      try {
  //        await disconnectAsync();
  //        setCurrentConnector(undefined);
  //        setWalletAddress(undefined);
  //        setIsWalletConnected(false);
  //      } catch (err: unknown) {
  //        console.log("[SOMETHING WENT WRONG]", err);
  //        toast.error(
  //          err instanceof Error ? err.message : "[SOMETHING WENT WRONG]",
  //        );
  //      }
  //    }

  const handleConnectWallet = useCallback(
    (connector: Connector) => {
      connectWallet(connector);
    },
    [connectWallet],
  );

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
  }, [status, connectors, walletAddress]);

  return connectorsInfo.map((connectorInfo) => {
    const connector = connectors.find((c) => c.id === connectorInfo.id);

    return (
      <div key={connectorInfo.id} className="flex h-[58px] items-center">
        {connector ? (
          <Button onClick={() => handleConnectWallet(connector)}>
            Connect {connectorInfo.name} wallet
          </Button>
        ) : (
          <Link
            to={connectorInfo.installLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center justify-center rounded-none border border-border/30 px-5 py-1.5 font-semibold tracking-wide hover:bg-secondary/80"
          >
            Install {connectorInfo.name} wallet
          </Link>
        )}
      </div>
    );
  });
}

// function ConnectWallet() {
//   const { address, status } = useAccount();
//   const { connectors, connectAsync, connector } = useConnect();
//   const { disconnectAsync } = useDisconnect();

//   const walletAddress = useWalletStore((state) => state.walletAddress);
//   const isWalletConnected = useWalletStore((state) => state.isWalletConnected);
//   const currentConnector = useWalletStore((state) => state.currentConnector);
//   const setWalletAddress = useWalletStore((state) => state.setWalletAddress);
//   const setCurrentConnector = useWalletStore(
//     (state) => state.setCurrentConnector,
//   );
//   const setIsWalletConnected = useWalletStore(
//     (state) => state.setIsWalletConnected,
//   );

//   async function connectWallet(connector: Connector) {
//     try {
//       if (connector.available()) {
//         connectAsync({ connector });
//         setIsWalletConnected(true);
//         setCurrentConnector({
//           id: connector?.id,
//           name: connector?.name,
//           icon: connector?.icon,
//         });
//       }
//     } catch (err: unknown) {
//       console.log("[SOMETHING WENT WRONG]", err);
//       toast.error(
//         err instanceof Error ? err.message : "[SOMETHING WENT WRONG]",
//       );
//     }
//   }

//   async function disconnectWallet() {
//     try {
//       await disconnectAsync();
//       setCurrentConnector(undefined);
//       setWalletAddress(undefined);
//       setIsWalletConnected(false);
//     } catch (err: unknown) {
//       console.log("[SOMETHING WENT WRONG]", err);
//       toast.error(
//         err instanceof Error ? err.message : "[SOMETHING WENT WRONG]",
//       );
//     }
//   }

//   const handleConnectWallet = useCallback(
//     (connector: Connector) => {
//       connectWallet(connector);
//     },
//     [connectWallet],
//   );

//   useEffect(() => {
//     if (address) {
//       setWalletAddress(address);
//     }
//   }, [address]);

//   useEffect(() => {
//     if (status === "disconnected") {
//       const storedConnector = currentConnector ? currentConnector?.id : null;

//       if (storedConnector) {
//         const matchingConnector = connectors.find(
//           (connector) => connector.id === storedConnector,
//         );
//         if (matchingConnector) {
//           connectWallet(matchingConnector);
//         }
//       }
//     }
//   }, [status, connectors, walletAddress]);

//   return (
//     <div className="flex items-center gap-4">
//       {isWalletConnected ? (
//         <div className="flex w-full items-center justify-between border border-[#c7f39f] bg-[#f3ffef] p-4 text-[#0d633a]">
//           <p className="flex items-center font-sans_medium">
//             <Check className="mr-2 size-5" />
//             <span>
//               Connected {connector?.name}: {address}
//             </span>
//           </p>

//           <p
//             className="font-sans_bold underline"
//             role="button"
//             onClick={disconnectWallet}
//           >
//             Disconnect
//           </p>
//         </div>
//       ) : (
// connectorsInfo.map((connectorInfo) => {
//   const connector = connectors.find((c) => c.id === connectorInfo.id);

//   return (
//     <div key={connectorInfo.id} className="flex h-[58px] items-center">
//       {connector ? (
//         <Button onClick={() => handleConnectWallet(connector)}>
//           Connect {connectorInfo.name} wallet
//         </Button>
//       ) : (
//         <Link
//           to={connectorInfo.installLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex cursor-pointer items-center justify-center rounded-none border border-border/30 px-5 py-1.5 font-semibold tracking-wide hover:bg-secondary/80"
//         >
//           Install {connectorInfo.name} wallet
//         </Link>
//       )}
//     </div>
//   );
// })
//       )}
//     </div>
//   );
// }
