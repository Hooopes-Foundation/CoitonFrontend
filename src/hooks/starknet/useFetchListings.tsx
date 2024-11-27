import { contract } from "@/lib/contract";
import { toHex } from "@/lib/dontpanicdao";
import { byteArrayToString } from "@/lib/utils";
import { useReadContract } from "@starknet-react/core";

export const useFetchListings = () => {
  const { contractAbi, contractAddress } = contract;

  const transaction = useReadContract({
    address: contractAddress,
    functionName: "get_listings",
    abi: contractAbi,
    args: [],
    watch: true,
  });

  const listings =
    transaction?.data?.length > 0
      ? transaction?.data?.map((lst: any) => ({
          id: Number(lst.id),
          details: JSON.parse(byteArrayToString(lst.details.split(","))),
          hash: String(lst.hash),
          owner: toHex(String(lst.owner)),
        }))
      : [];

  return { listings };
};
