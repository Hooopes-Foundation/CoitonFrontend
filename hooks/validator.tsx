import { useMemo } from "react";
import { useSendTransaction } from "@starknet-react/core";
import { stringToFelt } from "@/lib/utils";
import { useWalletStore } from "@/store/wallet.store";
import { useValidatorStore } from "@/store/validator.store";

export const useRegisterValidator = (contract: any) => {
  const wltAddr = useWalletStore((state) => state.wltAddr);
  const vId = useValidatorStore((state) => state.vId);

  const calls = useMemo(() => {
    if (!contract || !wltAddr || typeof vId !== "string") return undefined;
    return [contract?.populate("register_validator", [vId])];
  }, [contract, wltAddr, vId]);

  const tx = useSendTransaction({
    calls,
  });

  return { tx };
};
