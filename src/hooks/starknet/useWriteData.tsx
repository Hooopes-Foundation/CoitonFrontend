import { shortStringToFelt, stringToByteArray } from "@/lib/utils";
import {
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { useMemo, useState } from "react";
import { useContractInstance } from "../test/useContractInstance";
import { Contract } from "starknet";
import { contract } from "@/lib/contract";
import { useFetchAllowance } from "./useFetchAllowance";

export const useWriteData = ({
  funcName,
  inputs,
}: {
  funcName: string;
  inputs: any[];
}) => {
  const { contractAddress } = contract;
  const { getContractInstance, getErc20Instance } = useContractInstance();
  const contractInstance: Contract = getContractInstance();
  const erc20Instance: Contract = getErc20Instance();

  const [queryData, setQueryData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const { allowance } = useFetchAllowance();

  const transactionCall = useMemo(() => {
    if (!funcName || !inputs) return undefined;

    try {
      switch (funcName) {
        case "register_validator":
          return inputs.length
            ? {
                contractCall: [
                  contractInstance.populate("register_validator", [inputs[0]]),
                ],
                isValid: true,
              }
            : undefined;
        case "register_organization":
          if (inputs.length < 3) return undefined;
          const [id, name, region] = inputs;

          const nameFelt = shortStringToFelt(name)?.output?.toString(10);
          const regionFelt = shortStringToFelt(region)?.output?.toString(10);

          return {
            contractCall: [
              contractInstance.populate("register_organization", [
                id,
                nameFelt!,
                regionFelt!,
              ]),
            ],
            isValid: true,
          };
        case "create_listing":
          if (inputs.length < 2) return undefined;
          const [details, hash] = inputs.map(String);

          const detailsByte = stringToByteArray(JSON.stringify(details));
          const hashFelt = shortStringToFelt(hash)?.output?.toString(10);

          return {
            contractCall: [
              contractInstance.populate("create_listing", [
                detailsByte,
                hashFelt!,
              ]),
            ],
            isValid: true,
          };
        case "approve_listing":
          if (inputs.length < 2) return undefined;
          const [listingId, listingHash] = inputs;

          return {
            contractCall: [
              contractInstance.populate("approve_listing", [
                listingId,
                listingHash,
              ]),
            ],
            isValid: true,
          };
        case "stake_listing_fee":
          const stakingFee = BigInt("20000000000000000000");
          let allowanceSufficient = false;

          // Ensure allowance is of BigInt type before comparison
          const currentAllowance =
            allowance !== null ? BigInt(allowance) : null;

          if (currentAllowance !== null) {
            allowanceSufficient = currentAllowance >= stakingFee;
          }

          console.log({ allowance });

          if (!allowanceSufficient) {
            return {
              contractCall: [
                erc20Instance.populate("approve", [
                  contractAddress,
                  stakingFee,
                ]),
              ],
              isValid: true,
            };
          }

          return {
            contractCall: [contractInstance.populate("stake_listing_fee", [])],
            isValid: true,
          };
        case "set_erc1155":
          return inputs.length
            ? {
                contractCall: [
                  contractInstance.populate("set_erc1155", [inputs[0]]),
                ],
                isValid: true,
              }
            : undefined;
        case "upgrade":
          return inputs.length
            ? {
                contractCall: [
                  contractInstance.populate("upgrade", [inputs[0]]),
                ],
                isValid: true,
              }
            : undefined;
        default:
          return undefined;
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : JSON.stringify(err));
      console.error("[FUNCTION CALL ERROR]", err);
    }
  }, [funcName, inputs, contractInstance]);

  const transaction = useSendTransaction({
    calls: transactionCall?.isValid ? transactionCall.contractCall : undefined,
  });

  const receipt = useTransactionReceipt({
    hash: transaction?.data?.transaction_hash,
    watch: true,
  });

  // Execute function that will be called manually
  const execute = async () => {
    if (!transactionCall?.isValid) return;

    try {
      setError(null);
      const tx = await transaction.sendAsync();
      setQueryData({ transactionHash: tx?.transaction_hash });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : JSON.stringify(e));
      setQueryData(null);
    }
  };

  // Update state based on receipt status
  if (receipt?.isError && !error) {
    setError(receipt?.error?.message || "Transaction failed.");
    setQueryData(null);
  } else if (receipt?.isSuccess && receipt?.data?.value) {
    setQueryData(receipt.data.value);
  }

  return {
    result: { funcName, queryData },
    isLoading: transaction.isPending || receipt?.isLoading,
    error: transaction?.error || error,
    execute,
  };
};
