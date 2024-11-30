import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { MapView } from "@/components/shared/map-view";
import {
  useReadContract,
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { contract } from "@/lib/contract";
import { byteArrayToString } from "@/lib/utils";
import { toHex } from "@/lib/dontpanicdao";
import { useContractInstance } from "@/hooks/test/useContractInstance";
import { useMemo } from "react";
import { toast } from "sonner";

export default function PropertyDetailsView() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const from = searchParams.get("from");

  const { contractAbi, contractAddress } = contract;

  const unAppTx = useReadContract({
    address: contractAddress,
    functionName: "get_unapproved_listings",
    abi: contractAbi,
    args: [],
    watch: true,
  });

  const appTx = useReadContract({
    address: contractAddress,
    functionName: "get_listings",
    abi: contractAbi,
    args: [],
    watch: true,
  });

  // approve_listing;

  const unapprovedListings =
    unAppTx?.data?.length > 0
      ? unAppTx?.data?.map((lst: any) => ({
          id: Number(lst.id),
          details: byteArrayToString(lst.details.split(",")),
          hash: String(lst.hash),
          owner: toHex(String(lst.owner)),
        }))
      : [];

  const approvedListings =
    appTx?.data?.length > 0
      ? appTx?.data?.map((lst: any) => ({
          id: Number(lst.id),
          details: byteArrayToString(lst.details.split(",")),
          hash: String(lst.hash),
          owner: toHex(String(lst.owner)),
        }))
      : [];

  const selectedListing =
    from && from === "dao-page"
      ? unapprovedListings.filter((ppty: any) => Number(ppty.id) === Number(id))
      : approvedListings.filter((ppty: any) => Number(ppty.id) === Number(id));

  const { getContractInstance } = useContractInstance();
  const contractInstance = getContractInstance();

  const approveCall = useMemo(() => {
    if (!selectedListing?.hash) {
      toast.error("Something went wrong");
      return;
    }
    return [
      contractInstance.populate("approve_listing", [selectedListing?.hash]),
    ];
  }, [contractInstance, selectedListing?.hash]);

  const approveTx = useSendTransaction({
    calls: approveCall,
  });

  const approveReceipt = useTransactionReceipt({
    hash: approveTx?.data?.transaction_hash,
    watch: true,
  });

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Link
          to="/dashboard"
          className="font-sans_medium text-lg tracking-wide opacity-40"
        >
          Home
        </Link>
        <ChevronLeft className="size-4" />
        <p className="font-sans_medium text-lg tracking-wide">Property</p>
      </div>

      <div className="flex w-full flex-col gap-6 rounded-xl border border-[#DFDFDF] bg-[#F9FAFB] bg-background p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-[54px]">
          <div className="flex flex-col gap-4">
            <p className="flex flex-col gap-2">
              <span className="font-sans_regular text-lg leading-none text-[#8B8B8B]">
                {selectedListing[0]?.details?.location.name}
              </span>
              <span className="font-sans_medium text-lg text-primary">
                Offer from $
                {Number(selectedListing[0]?.details?.price).toLocaleString()}
              </span>
            </p>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 17.5H2"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>

                <span className="font-sans_regular text-lg leading-none text-[#8B8B8B]">
                  {selectedListing[0]?.details?.bedrooms ?? 0} Bedroom
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 20L5 21M18 20L19 21"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12H22"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 6L10.5 4"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>

                <span className="font-sans_regular text-lg leading-none text-[#8B8B8B]">
                  {selectedListing[0]?.details?.bathrooms ?? 0} Baths
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 21V9.61065C22 8.28771 22 7.62624 21.6561 7.11395C21.3123 6.60167 20.7034 6.35601 19.4856 5.86468L13.4856 3.44396C12.752 3.14799 12.3852 3 12 3C11.6148 3 11.248 3.14799 10.5144 3.44396L4.51444 5.86468C3.29663 6.35601 2.68773 6.60167 2.34387 7.11395C2 7.62624 2 8.28771 2 9.61065V21"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 19V21M8 19V21"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 14L7.74254 13.0299C8.10632 11.5747 8.28821 10.8472 8.83073 10.4236C9.37325 10 10.1232 10 11.6231 10H12.3769C13.8768 10 14.6267 10 15.1693 10.4236C15.7118 10.8472 15.8937 11.5747 16.2575 13.0299L16.5 14"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 14H7C6.44772 14 6 14.4477 6 15V18C6 18.5523 6.44772 19 7 19H17C17.5523 19 18 18.5523 18 18V15C18 14.4477 17.5523 14 17 14Z"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 16.4902V16.5002"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 16.4902V16.5002"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="font-sans_regular text-lg leading-none text-[#8B8B8B]">
                  {selectedListing[0]?.details?.parkingSpaces ?? 0} Car park
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12C7.46544 12 3.62948 14.9642 2.35747 19.044C1.99646 20.2019 1.81595 20.7809 2.26968 21.3904C2.7234 22 3.46112 22 4.93655 22H19.0634C20.5389 22 21.2766 22 21.7303 21.3904C22.184 20.7809 22.0035 20.2019 21.6425 19.044C20.3705 14.9642 16.5346 12 12 12Z"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 17H15.009"
                    stroke="#949494"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22C12 20.3431 10.6569 19 9 19C7.34315 19 6 20.3431 6 22"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 12V7.5M12 7.5V5C12 3.58579 12 2.87868 12.4393 2.43934C12.8787 2 13.5858 2 15 2H17.25C18.4228 2 19.0092 2 19.4131 2.30997C19.5171 2.38977 19.6102 2.48286 19.69 2.58686C20 2.99082 20 3.57721 20 4.75C20 5.92279 20 6.50918 19.69 6.91314C19.6102 7.01714 19.5171 7.11023 19.4131 7.19003C19.0092 7.5 18.4228 7.5 17.25 7.5H12Z"
                    stroke="#949494"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>

                <span className="font-sans_regular text-lg leading-none text-[#8B8B8B]">
                  {selectedListing[0]?.details?.sizeSqft ?? 0} km/sq
                </span>
              </div>
            </div>
          </div>

          {from && from === "dao-page" ? (
            <div className="flex items-center gap-4">
              <Button
                onClick={async () => await approveTx.sendAsync()}
                disabled={approveReceipt?.isLoading || approveTx?.isPending}
                variant={"secondary"}
                size={"lg"}
                className="w-[270px]"
              >
                <svg
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.50391 12.5003C3.50391 7.83539 3.50391 5.50292 4.95311 4.0537C6.40233 2.60449 8.7348 2.60449 13.3997 2.60449C18.0646 2.60449 20.3971 2.60449 21.8464 4.0537C23.2956 5.50292 23.2956 7.83539 23.2956 12.5003C23.2956 17.1652 23.2956 19.4977 21.8464 20.947C20.3971 22.3962 18.0646 22.3962 13.3997 22.3962C8.7348 22.3962 6.40233 22.3962 4.95311 20.947C3.50391 19.4977 3.50391 17.1652 3.50391 12.5003Z"
                    stroke="#056F67"
                    strokeWidth="2"
                  />
                  <path
                    d="M9.23047 14.3229C9.23047 14.3229 10.8971 15.2734 11.7305 16.6667C11.7305 16.6667 14.2305 11.1979 17.5638 9.375"
                    stroke="#056F67"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span>Approve</span>
              </Button>
              <Button
                disabled={approveReceipt?.isLoading || approveTx?.isPending}
                size={"lg"}
                className="w-[270px]"
              >
                <svg
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0234 9.375L9.77344 15.6246M16.0234 15.625L9.77344 9.37541"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.00391 12.5003C3.00391 7.83539 3.00391 5.50292 4.45311 4.0537C5.90233 2.60449 8.2348 2.60449 12.8997 2.60449C17.5646 2.60449 19.8971 2.60449 21.3464 4.0537C22.7956 5.50292 22.7956 7.83539 22.7956 12.5003C22.7956 17.1652 22.7956 19.4977 21.3464 20.947C19.8971 22.3962 17.5646 22.3962 12.8997 22.3962C8.2348 22.3962 5.90233 22.3962 4.45311 20.947C3.00391 19.4977 3.00391 17.1652 3.00391 12.5003Z"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>

                <span>Decline</span>
              </Button>
            </div>
          ) : (
            <Button>
              <svg
                className="size-5"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.97632 17.5C4.98992 5.04502 13.8128 1.5121 20.8739 2.72417C21.159 6.85185 19.1394 8.39748 15.2931 9.11125C16.0358 9.88731 17.3482 10.8639 17.2066 12.0847C17.1059 12.9534 16.5159 13.3797 15.336 14.2322C12.7502 16.1004 9.75474 17.2785 5.97632 17.5Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.90039 22.5C4.90039 16 8.74887 12.6818 11.4004 10.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Purchase/Rent</span>
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-10 xl:flex-row xl:items-center">
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-secondary lg:aspect-[1.2]">
            <Carousel className="size-full">
              <CarouselContent>
                {selectedListing[0]?.details?.photos.map(
                  (img: any, index: number) => (
                    <CarouselItem key={index}>
                      <Card>
                        <CardContent className="aspect-[1.2] !p-0">
                          <img
                            src={`https://bronze-gigantic-quokka-778.mypinata.cloud/ipfs/${img?.path}`}
                            alt={`${index + 1}`}
                            className="size-full object-cover"
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ),
                )}
              </CarouselContent>
              <CarouselPrevious className="left-8 top-1/2 -translate-y-1/2" />
              <CarouselNext className="right-8 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>

          <div className="flex w-full flex-col lg:max-w-[685px]">
            <div className="mb-5 flex flex-col gap-2">
              <p className="font-sans_bold text-xl text-primary">Description</p>
              <p className="font-lg space-x-2">
                <span className="font-sans_medium leading-[28.8px]">
                  {selectedListing[0]?.details?.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full gap-6 rounded-xl border border-[#DFDFDF] bg-[#F9FAFB] bg-background p-6 md:p-8">
        <div className="flex w-full max-w-lg flex-col gap-6">
          <div className="flex flex-col gap-16 rounded-xl border border-[#DFDFDF] p-8">
            <div className="flex flex-col gap-7">
              <p className="font-sans_medium text-xl">Agent details</p>

              <div className="flex flex-col">
                <p className="font-sans_medium">John Doe</p>
                <p className="text-[#949494]">Property is our cup of tea</p>
              </div>
            </div>

            <Link
              to={`/profile/${selectedListing[0]?.owner}`}
              className="w-full"
            >
              <Button size={"lg"} className="w-full">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.89453 11.654C4.89453 7.56846 4.89453 5.52572 6.16373 4.25651C7.43294 2.9873 9.47569 2.9873 13.5612 2.9873H15.1862C19.2717 2.9873 21.3145 2.9873 22.5836 4.25651C23.8529 5.52572 23.8529 7.56846 23.8529 11.654V15.9873C23.8529 20.0728 23.8529 22.1156 22.5836 23.3847C21.3145 24.654 19.2717 24.654 15.1862 24.654H13.5612C9.47569 24.654 7.43294 24.654 6.16373 23.3847C4.89453 22.1156 4.89453 20.0728 4.89453 15.9873V11.654Z"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M11.1771 13.7923C10.715 12.9864 10.4918 12.3283 10.3573 11.6612C10.1583 10.6748 10.6137 9.71108 11.3681 9.09618C11.687 8.8363 12.0525 8.92509 12.241 9.26336L12.6667 10.027C13.0041 10.6323 13.1728 10.935 13.1393 11.2559C13.1059 11.5767 12.8784 11.838 12.4234 12.3607L11.1771 13.7923ZM11.1771 13.7923C12.1126 15.4233 13.5806 16.8922 15.2136 17.8288M15.2136 17.8288C16.0195 18.2909 16.6775 18.5141 17.3446 18.6486C18.3311 18.8476 19.2947 18.3922 19.9096 17.6378C20.1695 17.3188 20.0808 16.9533 19.7425 16.7648L18.9788 16.3392C18.3735 16.0017 18.0709 15.833 17.75 15.8665C17.4291 15.9 17.1678 16.1275 16.6451 16.5825L15.2136 17.8288Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.97786 7.32031H3.26953M5.97786 13.8203H3.26953M5.97786 20.3203H3.26953"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span>Contact Agent and View Listing</span>
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-16 rounded-xl border border-[#DFDFDF] p-8">
            <div className="flex flex-col gap-7">
              <p className="font-sans_medium text-xl">Inspection times</p>

              <div className="flex flex-col">
                <p className="text-[#949494]">
                  Inspection and property viewing are still happening
                </p>
                <p className="font-sans_medium text-2xl text-primary">
                  Wednesday 3 Dec, 1:00pm - 1:40pm
                </p>
              </div>
            </div>

            <Button size={"lg"}>
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89453 11.654C4.89453 7.56846 4.89453 5.52572 6.16373 4.25651C7.43294 2.9873 9.47569 2.9873 13.5612 2.9873H15.1862C19.2717 2.9873 21.3145 2.9873 22.5836 4.25651C23.8529 5.52572 23.8529 7.56846 23.8529 11.654V15.9873C23.8529 20.0728 23.8529 22.1156 22.5836 23.3847C21.3145 24.654 19.2717 24.654 15.1862 24.654H13.5612C9.47569 24.654 7.43294 24.654 6.16373 23.3847C4.89453 22.1156 4.89453 20.0728 4.89453 15.9873V11.654Z"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  d="M11.1771 13.7923C10.715 12.9864 10.4918 12.3283 10.3573 11.6612C10.1583 10.6748 10.6137 9.71108 11.3681 9.09618C11.687 8.8363 12.0525 8.92509 12.241 9.26336L12.6667 10.027C13.0041 10.6323 13.1728 10.935 13.1393 11.2559C13.1059 11.5767 12.8784 11.838 12.4234 12.3607L11.1771 13.7923ZM11.1771 13.7923C12.1126 15.4233 13.5806 16.8922 15.2136 17.8288M15.2136 17.8288C16.0195 18.2909 16.6775 18.5141 17.3446 18.6486C18.3311 18.8476 19.2947 18.3922 19.9096 17.6378C20.1695 17.3188 20.0808 16.9533 19.7425 16.7648L18.9788 16.3392C18.3735 16.0017 18.0709 15.833 17.75 15.8665C17.4291 15.9 17.1678 16.1275 16.6451 16.5825L15.2136 17.8288Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.97786 7.32031H3.26953M5.97786 13.8203H3.26953M5.97786 20.3203H3.26953"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Add to calender</span>
            </Button>
          </div>
        </div>

        <div className="-z-0 flex-1 overflow-hidden rounded-2xl border border-[#DFDFDF] bg-secondary">
          <MapView
            location={selectedListing[0]?.details?.location.name}
            center={[
              Number(selectedListing[0]?.details?.location?.latitude),
              Number(selectedListing[0]?.details?.location?.longitude),
            ]}
          />
        </div>
      </div>

      <div className="flex w-full gap-6 rounded-xl border border-[#DFDFDF] bg-background p-6 md:p-8">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* {selectedListing[0]?.details?.propertyDocuments.map(
            (document: any, index: number) => (
              <div key={index} className="group rounded-[24px] border bg-white">
                <div className="relative h-[240px] overflow-hidden rounded-[inherit] bg-secondary">
                  <img
                    src={
                      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={selectedListing[0]?.details?.title}
                    className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-col gap-6 p-6">
                  <h4 className="font-sans_medium text-xl leading-none text-[#1D2939]">
                    Certificate of Ownership
                  </h4>

                  <div className="flex flex-col gap-2">
                    <span className="font-sans_light text-base leading-none text-[#475467]">
                      Document type
                    </span>
                  </div>

                  <Button className="w-max px-6">
                    <span>View</span>
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0013 18.8337C14.6037 18.8337 18.3346 15.1027 18.3346 10.5003C18.3346 5.89795 14.6037 2.16699 10.0013 2.16699C5.39893 2.16699 1.66797 5.89795 1.66797 10.5003C1.66797 15.1027 5.39893 18.8337 10.0013 18.8337Z"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.41797 17.583L6.58974 13.1888C6.82767 12.2967 6.94663 11.8505 7.28344 11.5918C7.62025 11.333 8.08194 11.333 9.0053 11.333H10.9973C11.9206 11.333 12.3824 11.333 12.7191 11.5918C13.056 11.8505 13.175 12.2967 13.4129 13.1888L14.5846 17.583"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.91797 11.3337L9.23205 8.30112C9.55972 7.54503 9.72355 7.16699 10.0013 7.16699C10.2791 7.16699 10.4429 7.54503 10.7706 8.30112L12.0846 11.3337"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            ),
          )} */}
        </div>
      </div>
    </div>
  );
}
