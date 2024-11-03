import { contract } from "@/lib/contract";
import { toHex } from "@/lib/dontpanicdao";
import { byteArrayToString, feltToShortString } from "@/lib/utils";
import { useReadContract } from "@starknet-react/core";
import { useEffect, useState } from "react";

export const useQueryData = ({
  funcName,
  inputs,
}: {
  funcName: string;
  inputs: any[];
}) => {
  const { contractAbi, contractAddress } = contract;

  const [queryData, setQueryData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const transaction = useReadContract({
    address: contractAddress,
    functionName: funcName,
    abi: contractAbi,
    args: inputs,
    watch: false,
  });

  useEffect(() => {
    if (transaction?.data && queryData !== transaction?.data) {
      let refinedData;

      try {
        switch (funcName) {
          case "version":
            refinedData = String(transaction?.data);
            break;
          case "hash":
            refinedData = String(transaction?.data);
            break;
          case "get_owner":
          case "get_erc20":
          case "get_erc721":
          case "get_erc1155":
            refinedData = toHex(String(transaction?.data));
            break;
          case "get_unapproved_listings":
          case "get_listings":
            refinedData =
              transaction?.data?.length > 0
                ? transaction?.data?.map((lst: any) => ({
                    id: Number(lst.id),
                    details: JSON.parse(
                      byteArrayToString(lst.details.split(",")),
                    ),
                    hash: String(lst.hash),
                    owner: toHex(String(lst.owner)),
                  }))
                : [];

            console.log(transaction?.data);

            break;
          case "get_organizations":
            refinedData = transaction?.data
              ? transaction?.data?.map((org: any) => ({
                  id: Number(org.id),
                  name: feltToShortString(org.name)?.output,
                  region: feltToShortString(org.region)?.output,
                  validator: Number(org.validator),
                  domain: toHex(String(org.domain)),
                }))
              : [];
            break;
          case "get_organization":
            refinedData = {
              id: Number(transaction?.data.id),
              name: feltToShortString(transaction?.data.name)?.output,
              region: feltToShortString(transaction?.data.region)?.output,
              validator: Number(transaction?.data.validator),
              domain: toHex(String(transaction?.data.domain)),
            };
            break;
          default:
            refinedData = transaction?.data;
        }

        setQueryData(refinedData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error("[FUNCTION CALL ERROR]", err);
      }
    }

    if (transaction?.error) {
      setError(transaction.error.message);
      console.error("[Transaction Error]", transaction.error);
    }
  }, [transaction?.data, transaction?.error, funcName]);

  return {
    result: { funcName, queryData },
    isLoading: transaction?.isLoading,
    error,
  };
};
