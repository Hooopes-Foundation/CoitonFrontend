"use client";

import MaxWrapper from "@/components/shared/max-wrapper";
import { useStarknetkitConnectModal } from "starknetkit";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import CustomButton from "@/components/shared/custom-button";
import { truncateAddress } from "@/lib/utils";
import { toast } from "sonner";

export default function StarknetTest() {
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    // @ts-expect-error WILL COME BACK TO THAT SOON
    connectors: connectors,
    modalTheme: "light",
  });

  const connectWallet = async () => {
    try {
      const { connector } = await starknetkitConnectModal();
      // @ts-expect-error WILL COME BACK TO THAT SOON
      await connectAsync({ connector });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "There was a problem with your request.");
      } else {
        console.log("UNKNOWN ERROR", error);
      }
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnectAsync();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "There was a problem with your request.");
      } else {
        console.log("UNKNOWN ERROR", error);
      }
    }
  };

  return (
    <section className="w-full py-16 sm:py-24 md:py-36 overflow-x-clip flex-1">
      <MaxWrapper className="flex flex-col items-center">
        <h2 className="text-primary">CONTRACT INTERACTION</h2>

        <div className="mt-12 flex flex-col items-center gap-4">
          {isConnected ? (
            <CustomButton onClick={disconnectWallet}>
              Disconnect Wallet
            </CustomButton>
          ) : (
            <CustomButton onClick={connectWallet}>Connect Wallet</CustomButton>
          )}

          <p className="text-lg font-bold">
            Address: {address ? truncateAddress(address) : "N/A"}
          </p>
        </div>
      </MaxWrapper>
    </section>
  );
}
