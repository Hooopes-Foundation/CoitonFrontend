"use client";

import { useWalletStore } from "@/store/wallet.store";
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
} from "@starknet-react/core";
import React, { useEffect, useMemo } from "react";
import CustomButton from "../shared/custom-button";
import { toast } from "sonner";
import Image from "next/image";
import { useTruncAddr } from "@/hooks/truncateAddress";

export const ConnectWallet = () => {
  const wltAddr = useWalletStore((state) => state.wltAddr);
  const isWltCntd = useWalletStore((state) => state.isWltCntd);
  const cntrr = useWalletStore((state) => state.cntrr);
  const setCntrr = useWalletStore((state) => state.setCntrr);
  const setWltAddr = useWalletStore((state) => state.setWltAddr);
  const setIsWltCntd = useWalletStore((state) => state.setIsWltCntd);

  const { connectors, connect, isPending, pendingConnector } = useConnect();
  const { address, status } = useAccount();
  const { disconnect } = useDisconnect();

  const truncateAddress = useTruncAddr(wltAddr as string);

  const connectWallet = (connector: Connector) => {
    try {
      if (connector.available()) {
        connect({ connector });
        setCntrr({
          id: connector?.id,
          name: connector?.name,
          icon: connector?.icon,
        });
        setIsWltCntd(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("UNKNOWN ERROR");
        console.log("[UNKNOWN_ERROR]", err);
      }
    }
  };

  const disconnectWallet = () => {
    try {
      disconnect();
      setCntrr(undefined);
      setWltAddr(undefined);
      setIsWltCntd(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("UNKNOWN ERROR");
        console.log("[UNKNOWN_ERROR]", err);
      }
    }
  };

  useEffect(() => {
    if (address) {
      setWltAddr(address);
    }
  }, [address]);

  useEffect(() => {
    console.log(status);
    if (status === "disconnected") {
      const storedConnector = cntrr ? cntrr?.id : null;

      if (storedConnector) {
        const matchingConnector = connectors.find(
          (connector) => connector.id === storedConnector
        );
        if (matchingConnector) {
          connectWallet(matchingConnector);
        }
      }
    }
  }, [status, connectors, isWltCntd]);

  return (
    <div className="flex flex-col gap-4 mt-12 max-w-2xl w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {connectors.map((connector) => {
          const isConnected = cntrr?.id === connector.id;
          const isLoading = isPending && pendingConnector?.id === connector.id;

          return (
            <CustomButton
              key={connector.id}
              size={"lg"}
              isLoading={isLoading}
              variant={isConnected ? "black" : "default"}
              onClick={
                isConnected ? disconnectWallet : () => connectWallet(connector)
              }
              disabled={
                (isPending && pendingConnector?.id !== connector.id) ||
                (!isConnected && isWltCntd)
              }
              className="!text-base"
            >
              {cntrr && pendingConnector?.id === connector.id && (
                <Image
                  src={String(cntrr?.icon)}
                  alt={String(cntrr?.id)}
                  width={24}
                  height={24}
                  className="object-contain mr-2"
                />
              )}
              {isConnected
                ? `Disconnect ${truncateAddress}`
                : `Connect ${connector.name}`}
            </CustomButton>
          );
        })}
      </div>
    </div>
  );
};

// import { useStarknetkitConnectModal, Connector } from "starknetkit";
// import { useWalletStore } from "@/store/wallet.store";
// import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
// import { toast } from "sonner";
// import { useEffect } from "react";
// import CustomButton from "../shared/custom-button";
// import Image from "next/image";

// export const ConnectWallet = () => {
// const wltAddr = useWalletStore((state) => state.wltAddr);
// const isWltCntd = useWalletStore((state) => state.isWltCntd);
// const cntrr = useWalletStore((state) => state.cntrr);
// const setWltAddr = useWalletStore((state) => state.setWltAddr);
// const setIsWltCntd = useWalletStore((state) => state.setIsWltCntd);
// const setCntrr = useWalletStore((state) => state.setCntrr);

//   const { isConnected, address } = useAccount();
//   const { connect, connectors } = useConnect();
//   const { disconnect } = useDisconnect();

//   const { starknetkitConnectModal } = useStarknetkitConnectModal({
//     // @ts-expect-error WILL COME BACK TO THAT SOON
//     connectors: connectors,
//     modalTheme: "light",
//   });

//   const connectWalletAccount = async () => {
//     try {
//       const { connector } = await starknetkitConnectModal();
//       // @ts-expect-error WILL COME BACK TO THAT SOON
//       connect({ connector });

//       setCntrr({
//         name: connector?.name,
//         id: connector?.id,
//         icon: connector?.icon,
//       });
//       setIsWltCntd(true);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         toast.error(error.message || "There was a problem with your request.");
//       } else {
//         console.log("UNKNOWN ERROR", error);
//       }
//     }
//   };

//   const disconnectWalletAccount = async () => {
//     try {
//       disconnect({ clearLastWallet: true });
//       setWltAddr(undefined);
//       setCntrr(undefined);
//       setIsWltCntd(false);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         toast.error(error.message || "There was a problem with your request.");
//       } else {
//         console.log("UNKNOWN ERROR", error);
//       }
//     }
//   };

//   useEffect(() => {
//     if (address && isConnected) {
//       setWltAddr(address);
//       setIsWltCntd(isConnected);
//     }
//   }, [address, isConnected]);

//   return (
//     <div className="flex flex-col gap-4 mt-12 max-w-md w-full">
//       <p>Address: {wltAddr ? wltAddr : "N/A"}</p>

//       {isWltCntd ? (
//         <CustomButton
//           className="w-full"
//           size={"lg"}
//           variant={"black"}
//           onClick={disconnectWalletAccount}
//         >
// {cntrr && (
//   <Image
//     src={String(cntrr?.icon)}
//     alt={String(cntrr?.id)}
//     width={24}
//     height={24}
//     className="object-contain mr-2"
//   />
// )}
//           {`Disconnect ${cntrr?.name}`}
//         </CustomButton>
//       ) : (
//         <div className="flex flex-col gap-4 ">
//           <CustomButton size={"lg"} onClick={connectWalletAccount}>
//             Connect with Modal
//           </CustomButton>
//         </div>
//       )}
//     </div>
//   );
// };

// // import { useStarknetkitConnectModal, Connector } from "starknetkit";
// // import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
// // import CustomButton from "@/components/shared/custom-button";
// // import { toast } from "sonner";
// // import { useTruncAddr } from "@/hooks/truncateAddress";
// // import { useEffect, useState } from "react";

// // import Image from "next/image";
// // import { useGlobalStore } from "@/store/wallet.store";

// // export const ConnectWallet = () => {
// //   // Add a state variable to track whether the wallet is initialized
// //   const [isWalletInitialized, setWalletInitialized] = useState(false);

// //   const { wallet, setWallet } = useGlobalStore((state) => ({
// //     wallet: state.wallet,
// //     setWallet: state.setWallet,
// //   }));

// //   const truncatedAddress = useTruncAddr(`${address}`);

// // const { starknetkitConnectModal } = useStarknetkitConnectModal({
// //   // @ts-expect-error WILL COME BACK TO THAT SOON
// //   connectors: connectors,
// //   modalTheme: "light",
// // });

// // const connectWalletAccount = async () => {
// //   try {
// //     const { connector } = await starknetkitConnectModal();
// //     // @ts-expect-error WILL COME BACK TO THAT SOON
// //     connect({ connector });

// //     const cntrrData = {
// //       name: connector?.name,
// //       id: connector?.id,
// //       icon: connector?.icon,
// //     };

// //     setWallet({
// //       wltAddr: address,
// //       isWltCntd: true,
// //       cntrr: cntrrData,
// //     });
// //   } catch (error: unknown) {
// //     if (error instanceof Error) {
// //       toast.error(error.message || "There was a problem with your request.");
// //     } else {
// //       console.log("UNKNOWN ERROR", error);
// //     }
// //   }
// // };

// // const disconnectWalletAccount = async () => {
// //   try {
// //     disconnect();

// //     setWallet({
// //       wltAddr: undefined,
// //       isWltCntd: false,
// //       cntrr: null,
// //     });
// //   } catch (error: unknown) {
// //     if (error instanceof Error) {
// //       toast.error(error.message || "There was a problem with your request.");
// //     } else {
// //       console.log("UNKNOWN ERROR", error);
// //     }
// //   }
// // };

// // useEffect(() => {
// //   if (address && isConnected && !isWalletInitialized) {
// //     setWallet({
// //       wltAddr: address,
// //       isWltCntd: isConnected,
// //       cntrr: wallet?.cntrr,
// //     });
// //     setWalletInitialized(true); // Prevent further updates
// //   }
// // }, [address, isConnected]);

// //   return (
// // <div className="flex flex-col gap-4 mt-12 max-w-md w-full">
// //   <p>Address: {wallet?.wltAddr ? wallet?.wltAddr : "N/A"}</p>

// //   {wallet?.isWltCntd ? (
// //     <CustomButton
// //       className="w-full"
// //       size={"lg"}
// //       variant={"black"}
// //       onClick={disconnectWalletAccount}
// //     >
// //       {wallet?.cntrr && (
// //         <Image
// //           src={String(wallet?.cntrr?.icon)}
// //           alt={String(wallet?.cntrr?.id)}
// //           width={24}
// //           height={24}
// //           className="object-contain mr-2"
// //         />
// //       )}
// //       {`Disconnect ${wallet?.cntrr?.name}`}
// //     </CustomButton>
// //   ) : (
// //     <div className="flex flex-col gap-4 ">
// //       <CustomButton size={"lg"} onClick={connectWalletAccount}>
// //         Connect with Modal
// //       </CustomButton>
// //     </div>
// //   )}
// // </div>
// //   );
// // };

// // <ul className="max-w-md w-full grid grid-cols-2 gap-4">
// //   {connectors.map((connector) => (
// //     <li key={connector.id}>
// //       <CustomButton
// //         className="w-full"
// //         onClick={async () => {
// //           connect({ connector });
// //           await connector?.connect();
// //           setCurrentConnector({
// //             name: connector?.name,
// //             id: connector?.id,
// //             icon: connector?.icon,
// //           });
// //         }}
// //       >
// //         {connector.name}
// //       </CustomButton>
// //     </li>
// //   ))}
// // </ul>
