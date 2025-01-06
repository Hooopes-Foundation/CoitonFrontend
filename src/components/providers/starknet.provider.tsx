import { variables } from "@/utils/variables";
import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  useInjectedConnectors,
  voyager,
  jsonRpcProvider,
} from "@starknet-react/core";
import { ReactNode } from "react";

export function StarknetProvider({ children }: { children: ReactNode }) {
  const chains = [sepolia];

  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
    order: "random",
  });

  return (
    <StarknetConfig
      chains={chains}
      provider={jsonRpcProvider({
        rpc: () => ({ nodeUrl: variables.rpcUrl }),
      })}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
