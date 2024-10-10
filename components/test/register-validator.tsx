"use client";

import { useRegisterValidator } from "@/hooks/validator";
import { ctxConfig } from "@/lib/blockchain";
import { cn, genRanId } from "@/lib/utils";
import { useValidatorStore } from "@/store/validator.store";
import { useWalletStore } from "@/store/wallet.store";
import {
  useAccount,
  useContract,
  useSendTransaction,
} from "@starknet-react/core";
import { Loader, MoveRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import CustomButton from "../shared/custom-button";

export const RegisterValidator = () => {
  const wltAddr = useWalletStore((state) => state.wltAddr);
  const isWltCntd = useWalletStore((state) => state.isWltCntd);

  const vId = useValidatorStore((state) => state.vId);
  const setVId = useValidatorStore((state) => state.setVId);

  const { contract } = useContract({
    abi: ctxConfig.CONTRACT_ABI,
    address: ctxConfig.CONTRACT_ADDR,
  });

  const calls = useMemo(() => {
    if (!contract || !wltAddr) return undefined;
    return [contract.populate("register_validator", [vId])];
  }, [contract, wltAddr, vId]);

  const tx = useSendTransaction({
    calls,
  });

  const handleSubmit = () => {
    try {
      tx.send();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err?.message);
      } else {
        toast.error("UNKNOWN CUSTOM ERROR");
      }
    }
  };

  const generateId = () => {
    const id = genRanId(4);
    setVId(id);
  };

  return (
    <div className="space-y-1 w-full">
      <p className="text-base font-bold uppercase">Register Validator</p>
      <div className="flex flex-col gap-4 w-full">
        <CustomButton
          onClick={generateId}
          size={"lg"}
          disabled={tx?.isPending || tx?.status === "pending"}
        >
          Generate Validator ID
        </CustomButton>
        <CustomButton
          onClick={handleSubmit}
          size={"lg"}
          disabled={
            vId === undefined || tx?.isPending || tx?.status === "pending"
          }
          isLoading={tx?.isPending || tx?.status === "pending"}
        >
          Register Validator {vId !== undefined && `(${vId})`}
        </CustomButton>
      </div>
    </div>
  );
};
