"use client";

import MaxWrapper from "@/components/shared/max-wrapper";
import { GetListings } from "@/components/test/get-listings";
import { GetUnApprovedListings } from "@/components/test/get-unapproved-listings";
import { RegisterValidator } from "@/components/test/register-validator";
import { RegisterOrganization } from "@/components/test/register-organization";
import { ConnectWallet } from "@/components/test/connect-wallet";
import { cn } from "@/lib/utils";
import GetOrganizations from "@/components/test/get-organizations";
import { useWalletStore } from "@/store/wallet.store";
import CreateListing from "@/components/test/create-listing";

export default function StarknetTest() {
  const wltAddr = useWalletStore((state) => state.wltAddr);
  const crntTab = useWalletStore((state) => state.crntTab);
  const setCrntTab = useWalletStore((state) => state.setCrntTab);

  return (
    <section className="w-full py-16 sm:py-24 md:py-36 overflow-x-clip flex-1">
      <MaxWrapper className="flex flex-col items-center">
        <h2 className="text-primary">CONTRACT INTERACTION</h2>

        <ConnectWallet />

        <div className="flex items-start gap-6 max-w-5xl w-full mt-12 mx-auto">
          <div className="flex flex-col max-w-[150px] w-full gap-4">
            <span className="opacity-50 text-sm font-semibold text-foreground bg-secondary rounded-full py-0.5 px-2.5 border w-max">
              disconnected
            </span>
            <span className="text-sm font-semibold text-primary bg-primary/10 rounded-full py-0.5 px-2.5 border border-primary w-max">
              connected
            </span>
            <span className="text-sm font-semibold text-red-500 bg-red-500/20 rounded-full py-0.5 px-2.5 border border-red-500 w-max">
              isError
            </span>
            <span className="text-sm font-semibold border-yellow-700 bg-yellow-500/20 text-yellow-700 rounded-full py-0.5 px-2.5 border w-max">
              paused
            </span>
            <span className="text-sm font-semibold border-blue-500 bg-blue-500/20 text-blue-700 rounded-full py-0.5 px-2.5 border w-max">
              isLoading
            </span>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex border-b">
              {(["GETTER_FN", "SETTER_FN"] as const).map((tab) => (
                <div
                  key={tab}
                  role="button"
                  onClick={() => setCrntTab(tab)}
                  className={cn(
                    "px-6 py-2 font-medium cursor-pointer hover:bg-secondary",
                    {
                      "border-b-2 border-primary": crntTab === tab,
                    }
                  )}
                >
                  {tab.replace("_FN", "")} {/* Simplified display */}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {crntTab === "GETTER_FN" ? (
                <>
                  <GetListings address={wltAddr} />
                  <GetUnApprovedListings address={wltAddr} />
                  <GetOrganizations address={wltAddr} />
                </>
              ) : (
                <>
                  <RegisterValidator />
                  <RegisterOrganization />
                  <CreateListing />
                </>
              )}
            </div>
          </div>
        </div>
      </MaxWrapper>
    </section>
  );
}
