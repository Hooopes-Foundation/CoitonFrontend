import { byteArrayToString, toHex } from "@/lib/starknet/utils";
import { contract } from "@/utils/contract";
import { useReadContract } from "@starknet-react/core";

export const useFetchListingHook = () => {
  const { daoAddress, daoABI } = contract;

  // Fetch approved listings
  const approvedListingsTx = useReadContract({
    address: daoAddress,
    functionName: "get_listings",
    abi: daoABI,
    args: [],
    watch: false,
  });

  // Fetch unapproved listings
  const unapprovedListingsTx = useReadContract({
    address: daoAddress,
    functionName: "get_unapproved_listings",
    abi: daoABI,
    args: [],
    watch: false,
  });

  // Process the fetched data
  const processListings = (data: any) => {
    return data?.length > 0
      ? data.map(
          (lst: {
            id: number;
            details: any;
            hash: string;
            region: any;
            owner?: string;
          }) => ({
            id: Number(lst?.id),
            details: byteArrayToString(lst?.details),
            hash: String(lst?.hash),
            region: byteArrayToString(lst?.region),
            owner: lst?.owner ? toHex(String(lst.owner)) : undefined,
          }),
        )
      : [];
  };

  const approvedListings = processListings(approvedListingsTx?.data);
  const unapprovedListings = processListings(unapprovedListingsTx?.data);

  // Return functions that access the precomputed data
  const fetchAllListings = (type: "approved" | "unapproved") => {
    return type === "approved" ? approvedListings : unapprovedListings;
  };

  return {
    fetchAllListings,
    isLoading: approvedListingsTx?.isLoading || unapprovedListingsTx?.isLoading,
    error: approvedListingsTx?.error || unapprovedListingsTx?.error,
  };
};
