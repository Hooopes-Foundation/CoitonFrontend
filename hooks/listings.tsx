// hooks/listings.ts

import { ctxConfig } from "@/lib/blockchain";
import { objectToByteArray, stringToFelt } from "@/lib/utils";
import {
  useContract,
  useReadContract,
  useSendTransaction,
} from "@starknet-react/core";
import { useMemo } from "react";

export const useListings = () => {
  const fetchListings = () => {
    const readTx = useMemo(() => {
      if (!ctxConfig.CONTRACT_ADDR || !ctxConfig.CONTRACT_ABI) return null;
      return {
        address: ctxConfig.CONTRACT_ADDR as any,
        functionName: "get_listings",
        abi: ctxConfig.CONTRACT_ABI,
        args: [],
        watch: true,
      };
    }, [ctxConfig.CONTRACT_ADDR, ctxConfig.CONTRACT_ABI]);

    const tx = readTx ? useReadContract(readTx) : null;

    const refinedData = {
      ...tx,
      data:
        tx?.data?.length > 0
          ? tx?.data.map((lst: LISTING_INTERFACE) => ({
              id: Number(lst.id),
              details: lst.details,
              hash: lst.hash,
              owner: String(lst.owner),
            }))
          : [],
    };

    return refinedData;
  };

  const fetchUnapprovedListings = () => {
    const readTx = useMemo(() => {
      if (!ctxConfig.CONTRACT_ADDR || !ctxConfig.CONTRACT_ABI) return null;
      return {
        address: ctxConfig.CONTRACT_ADDR as any,
        functionName: "get_unapproved_listings",
        abi: ctxConfig.CONTRACT_ABI,
        args: [],
        watch: true,
      };
    }, [ctxConfig.CONTRACT_ADDR, ctxConfig.CONTRACT_ABI]);

    const tx = readTx ? useReadContract(readTx) : null;

    const refinedData = {
      ...tx,
      data:
        tx?.data?.length > 0
          ? tx?.data.map((lst: LISTING_INTERFACE) => ({
              id: Number(lst.id),
              details: lst.details,
              hash: lst.hash,
              owner: String(lst.owner),
            }))
          : [],
    };

    return refinedData;
  };

  const createListing = (details: any, hash: string) => {
    const { contract } = useContract({
      abi: ctxConfig.CONTRACT_ABI,
      address: ctxConfig.CONTRACT_ADDR,
    });

    const detailsByteArray = objectToByteArray(details); // Convert details to byte array

    // Set up the transaction call
    const calls = useMemo(() => {
      if (!contract || !detailsByteArray || !hash) return undefined;

      return [contract.populate("create_listing", [detailsByteArray, hash])];
    }, [contract, detailsByteArray, hash]);

    const tx = useSendTransaction({
      calls,
    });

    return { tx, calls };
  };

  const approveListing = (lstId: number) => {
    const listings = fetchListings();
    const currentListing: LISTING_INTERFACE =
      listings?.data &&
      listings?.data?.filter((item: LISTING_INTERFACE) => item?.id === lstId);

    const { contract } = useContract({
      abi: ctxConfig.CONTRACT_ABI,
      address: ctxConfig.CONTRACT_ADDR,
    });

    const calls = useMemo(() => {
      if (!contract || !currentListing) return undefined;

      return [
        contract.populate("approve_listing", [
          currentListing?.id,
          currentListing?.hash,
        ]),
      ];
    }, [contract, listings?.data]);

    const tx = useSendTransaction({
      calls,
    });

    return { tx, calls };
  };

  const stakeListingFee = (amount: number) => {
    const { contract } = useContract({
      abi: ctxConfig.CONTRACT_ABI,
      address: ctxConfig.CONTRACT_ADDR,
    });

    const calls = useMemo(() => {
      if (!contract || !amount) return undefined;

      return [contract.populate("stake_listing_fee", [amount])];
    }, [contract, amount]);

    const tx = useSendTransaction({
      calls,
    });

    return { tx, calls };
  };

  return {
    fetchListings,
    fetchUnapprovedListings,
    createListing,
    approveListing,
    stakeListingFee,
  };
};
