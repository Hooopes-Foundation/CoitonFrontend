"use client";

import React from "react";

import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  argent,
  braavos,
  useInjectedConnectors,
  voyager,
} from "@starknet-react/core";
import { InjectedConnector } from "starknetkit/injected";
import {
  ArgentMobileConnector,
  isInArgentMobileAppBrowser,
} from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { Toaster } from "@/components/ui/sonner";

export function StarknetProvider({ children }: TPropsWithChildren) {
  const chains = [sepolia];
  const connectors = isInArgentMobileAppBrowser()
    ? [
        ArgentMobileConnector.init({
          options: {
            dappName: "Example dapp",
            projectId: "example-project-id",
            url: "",
          },
          inAppBrowserOptions: {},
        }),
      ]
    : [
        new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
        new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
        new WebWalletConnector({ url: "https://web.argent.xyz" }),
        ArgentMobileConnector.init({
          options: {
            dappName: "Example dapp",
            projectId: "example-project-id",
            url: "",
          },
          inAppBrowserOptions: {},
        }),
      ];

  return (
    <StarknetConfig
      chains={chains}
      provider={publicProvider()}
      connectors={connectors}
      explorer={voyager}
    >
      <Toaster richColors theme="light" />
      {children}
    </StarknetConfig>
  );
}
