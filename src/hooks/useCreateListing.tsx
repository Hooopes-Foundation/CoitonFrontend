import { useMemo } from "react";
import {
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { stringToByteArray } from "@/lib/utils";
import { useContractInstance } from "./test/useContractInstance";
import { useGetHash } from "./useGetHash";
import { CREATE_LISTING_SCHEMA } from "@/lib/validators";
import { useFetchAllowance } from "./starknet/useFetchAllowance";
import { contract } from "@/lib/contract";
import { Contract } from "starknet";

export const useCreateListing = ({
  listing,
}: {
  listing: CREATE_LISTING_SCHEMA;
}) => {
  const { getContractInstance } = useContractInstance();
  const contractInstance = getContractInstance();

  const { hash } = useGetHash(listing?.title);

  const createListingCalls = useMemo(() => {
    if (!listing || !hash) return undefined;

    const listingByte = stringToByteArray(JSON.stringify(listing));
    // const hashFelt = shortStringToFelt(hash)?.output?.toString(10);

    return [contractInstance.populate("create_listing", [listingByte, hash])];
  }, [contractInstance, listing, hash]);

  const listingTx = useSendTransaction({
    calls: createListingCalls,
  });

  const listingReceipt = useTransactionReceipt({
    hash: listingTx?.data?.transaction_hash,
    watch: true,
  });

  return { listingTx, listingReceipt };
};

export const useStakeListingFee = () => {
  const { contractAddress } = contract;
  const { getContractInstance, getErc20Instance } = useContractInstance();
  const contractInstance: Contract = getContractInstance();
  const erc20Instance: Contract = getErc20Instance();

  const { allowance } = useFetchAllowance();

  const stakingFeeCalls = useMemo(() => {
    console.log({ allowance });

    const stakingFee = BigInt("20000000000000000000");
    let allowanceSufficient = false;

    // Ensure allowance is of BigInt type before comparison
    const currentAllowance = allowance !== null ? BigInt(allowance) : null;

    if (currentAllowance !== null) {
      allowanceSufficient = currentAllowance >= stakingFee;
    }

    if (!allowanceSufficient) {
      return [erc20Instance.populate("approve", [contractAddress, stakingFee])];
    }

    return [contractInstance.populate("stake_listing_fee", [])];
  }, [contractInstance, allowance]);

  const stakingFeeTx = useSendTransaction({
    calls: stakingFeeCalls,
  });

  const stakingFeeReceipt = useTransactionReceipt({
    hash: stakingFeeTx?.data?.transaction_hash,
    watch: true,
  });

  return { stakingFeeTx, stakingFeeReceipt };
};
