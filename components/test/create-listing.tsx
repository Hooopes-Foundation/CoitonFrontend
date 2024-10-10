import {
  byteArrayToObject,
  cn,
  feltToString,
  generateRandomListings,
  objectToByteArray,
  stringToFelt,
} from "@/lib/utils";
import CustomButton from "../shared/custom-button";
import { useListings } from "@/hooks/listings";
import { useContract, useSendTransaction } from "@starknet-react/core";
import { ctxConfig } from "@/lib/blockchain";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { useWalletStore } from "@/store/wallet.store";
import { useGenerateHash } from "@/hooks/hashGenerator";
import { ByteArray } from "starknet";

const listingDetails = {
  title: "Cairo Apartment",
  price: 1000,
  description: "A lovely apartment in the heart of Cairo",
  location: "Downtown Cairo",
  amenities: [
    "WiFi",
    "Air Conditioning",
    "Swimming Pool",
    "Gym",
    "Parking",
    "Laundry",
    "Pets Allowed",
  ],
  images: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ],
  owner: {
    name: "John Doe",
    contact: "john.doe@example.com",
    phone: "+20 123 456 7890",
  },
  availability: {
    availableFrom: "2024-10-15",
    availableTo: "2025-01-15",
  },
  size: {
    area: 120, // in square meters
    bedrooms: 2,
    bathrooms: 2,
  },
  optionalFeatures: {
    furnished: true,
    petFriendly: false,
    smokingAllowed: false,
  },
  ratings: {
    averageRating: 4.5,
    numberOfReviews: 10,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Convert JS string to Cairo ByteArray structure
function stringToByteArray(str: string): ByteArray {
  const strBytes = new TextEncoder().encode(str);
  const chunks: bigint[] = [];

  for (let i = 0; i < strBytes.length; i += 31) {
    const chunk = strBytes.slice(i, i + 31);
    // Convert chunk to bigint
    const chunkHex = Buffer.from(chunk).toString("hex");
    const chunkBigInt = BigInt("0x" + chunkHex);
    chunks.push(chunkBigInt);
  }

  return {
    data: chunks,
    pending_word: 0n,
    pending_word_len: 0n,
  };
}

// Generate a simple hash from the listing details
function generateHash(str: string): bigint {
  let hash = 0n;
  const strBytes = new TextEncoder().encode(str);

  for (let i = 0; i < strBytes.length; i++) {
    hash = (hash * 31n + BigInt(strBytes[i])) % (2n ** 251n - 1n);
  }

  return hash;
}

// Define the listing details type based on the Cairo contract
interface ListingDetails {
  title: string;
  description: string;
  price: number;
  // Add other fields as needed
}

export default function CreateListing() {
  const wltAddr = useWalletStore((state) => state.wltAddr);

  const { generateRandomHash } = useGenerateHash();

  const [listing, setListing] = useState<typeof listingDetails | any>(null);

  const handleGenerateListing = () => {
    setListing(generateRandomListings());
  };

  // const [listing, setListing] = useState<ListingDetails | null>(null);

  // const handleGenerateListing = () => {
  //   const newListing: ListingDetails = {
  //     title: `Listing ${Math.floor(Math.random() * 1000)}`,
  //     description: `Description for listing ${Math.floor(
  //       Math.random() * 1000
  //     )}`,
  //     price: Math.floor(Math.random() * 1000),
  //     // Add other fields as needed
  //   };
  //   setListing(newListing);
  // };

  const { contract } = useContract({
    abi: ctxConfig.CONTRACT_ABI,
    address: ctxConfig.CONTRACT_ADDR,
  });

  const calls = useMemo(() => {
    if (!contract || !wltAddr || !listing) return undefined;

    const detailsStr = JSON.stringify({});
    // const byteArray = objectToByteArray(detailsStr as any);

    // Generate hash
    const hash = generateHash(detailsStr);

    // Prepare the contract call
    return [contract.populate("create_listing", [detailsStr, hash])];
    // try {
    // } catch (error) {
    //   console.error("Error preparing contract call:", error);
    //   toast.error("Error preparing transaction");
    //   return undefined;
    // }
  }, [contract, wltAddr, listing]);

  const tx = useSendTransaction({
    calls,
  });

  const handleCreateListing = async () => {
    try {
      if (!tx) {
        throw new Error("Transaction not prepared");
      }
      tx.send();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err?.message);
      } else {
        toast.error("UNKNOWN CUSTOM ERROR");
      }
    }
  };

  const handleHashListing = () => {
    if (!listing) return undefined;
    const dt = objectToByteArray(listing as any);
    console.log(dt);
  };

  return (
    <div className="space-y-1 w-full">
      <p className="text-base font-bold uppercase">Create Listing</p>

      <CustomButton
        size={"lg"}
        className="w-full !mb-2"
        onClick={handleGenerateListing}
      >
        Generate Listing
      </CustomButton>

      <CustomButton
        size={"lg"}
        className="w-full !mb-2"
        onClick={handleHashListing}
      >
        Hash Listing
      </CustomButton>

      <CustomButton
        size={"lg"}
        className="w-full !mb-2"
        disabled={listing === null}
        onClick={handleCreateListing}
      >
        Create Listing
      </CustomButton>

      <div
        className={cn(
          "p-4 border border-primary bg-primary/10 rounded-sm flex flex-col gap-2 overflow-scroll",
          {
            "border-blue-700 bg-blue-500/20": tx?.status === "pending",
            "border-yellow-700 bg-yellow-500/20": tx?.status === "idle",
            "border-red-500 bg-red-500/20": tx?.isError,
            "pointer-events-none select-none opacity-50 border-border bg-secondary":
              !wltAddr,
          }
        )}
      >
        <div className="flex gap-2">
          <pre
            className={cn("font-sans text-primary text-sm font-semibold", {
              "text-blue-700": tx?.status === "pending",
              "text-yellow-700": tx?.status === "idle",
              "text-red-500": tx?.isError,
              "text-foreground": !wltAddr,
            })}
          >
            {JSON.stringify(listing, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
