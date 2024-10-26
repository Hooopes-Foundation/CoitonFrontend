import { shortStringToFelt, stringToByteArray } from "@/lib/utils";
import {
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { useEffect, useMemo, useState } from "react";
import { useContractInstance } from "../test/useContractInstance";
import { Contract } from "starknet";

export const useWriteData = ({
  funcName,
  inputs,
}: {
  funcName: string;
  inputs: any[];
}) => {
  const { getContractInstance } = useContractInstance();
  const contractInstance: Contract = getContractInstance();

  const [queryData, setQueryData] = useState<any>(null);

  const registerValidatorCall = useMemo(() => {
    if (!inputs.length || !contractInstance) return undefined;

    return {
      contractCall: [
        contractInstance.populate("register_validator", [inputs[0]]),
      ],
      isValid: true,
    };
  }, [inputs[0], contractInstance]);

  const registerOrganizationCall = useMemo(() => {
    if (!inputs.length || !contractInstance) return undefined;

    let id = inputs[0],
      name = inputs[1],
      region = inputs[2];

    if (!name || !region || !id) return undefined;

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
  }, [inputs, contractInstance]);

  const createListingCall = useMemo(() => {
    if (!inputs[0] || !inputs[1] || !contractInstance) return undefined;

    let details = String(inputs[0]),
      hash = String(inputs[1]);

    const detailsByte = stringToByteArray(details).data;

    if (detailsByte && hash) {
      console.log(detailsByte, hash);
    }

    return {
      contractCall: [
        contractInstance.populate("create_listing", [detailsByte, hash]),
      ],
      isValid: true,
    };
  }, [inputs, contractInstance]);

  const getTransactionCall = () => {
    switch (funcName) {
      case "register_validator":
        return registerValidatorCall;
      case "register_organization":
        return registerOrganizationCall;
      case "create_listing":
        return createListingCall;
      default:
        return undefined;
    }
  };

  const currentCall = getTransactionCall();

  const transaction = useSendTransaction({
    calls: currentCall?.isValid ? currentCall.contractCall : undefined,
  });

  const receipt = useTransactionReceipt({
    hash: transaction.data?.transaction_hash,
    watch: true,
  });

  useEffect(() => {
    if (receipt?.data) {
      setQueryData(null);
    } else if (receipt?.data) {
      setQueryData(receipt.data);
    }
  }, [receipt?.data]);

  return {
    result: { funcName, queryData, transaction },
    isLoading: receipt?.isLoading || transaction?.isPending,
    error: transaction?.error ?? receipt?.error,
  };
};
