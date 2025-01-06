import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PiFolderOpenDuotone } from "react-icons/pi";
import { RxOpenInNewWindow } from "react-icons/rx";
import { MapView } from "@/components/shared/map-view";
import { contract } from "@/utils/contract";
import {
  useReadContract,
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { byteArrayToString, toHex } from "@/lib/starknet/utils";
import { I_LISTING_SLICE } from "@/store/slice/listing.slice";
import { variables } from "@/utils/variables";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn, truncateAddr } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useContractInstance } from "@/hooks/useContractInstance.hook";
import { Loader } from "lucide-react";
import { BiLeaf } from "react-icons/bi";

const images = Array.from(
  { length: 5 },
  (_, i) =>
    `https://freshcart.codescandy.com/tailwindcss/assets/images/products/product-single-img-${(i % 4) + 1}.jpg`,
);

const listingFormData = {
  // 1. Property Basics
  title: "Luxury Apartment",
  images: [
    new File(["image1"], "image1.jpg", { type: "image/jpeg" }),
    new File(["image2"], "image2.jpg", { type: "image/jpeg" }),
  ],
  imagesCid: images, // Optional
  videos: [new File(["video1"], "video1.mp4", { type: "video/mp4" })], // Optional
  videosCid: ["bafybeih8..."], // Optional
  description: "A beautiful luxury apartment in the heart of the city.",
  propertyType: "building",

  // 2. Address
  region: {
    country: {
      countryName: "United States",
      countryCode: "US",
      countryFlag: "🇺🇸", // Optional
      countryLat: 37.0902,
      countryLong: -95.7129,
    },
    state: {
      stateName: "California", // Optional
      stateCode: "CA", // Optional
      countryCode: "US", // Optional
      stateLat: 36.7783, // Optional
      stateLong: -119.4179, // Optional
    }, // Optional
    city: {
      cityName: "Los Angeles", // Optional
      stateCode: "CA", // Optional
      countryCode: "US", // Optional
      cityLat: 34.0522, // Optional
      cityLong: -118.2437, // Optional
    }, // Optional
  },
  zip: 90001,
  landmark: "Near Central Park",
  area: "Downtown LA",

  // 3. Details
  rangeFrom: 500000,
  rangeTo: 1000000,
  rooms: 5,
  bathrooms: 2,
  bedrooms: 3,
  yearBuilt: "2010-05-15", // Valid ISO date format
  structureType: "Apartment",
  propertySize: 1500,

  // 4. Amenities and Features
  interior: [
    { id: "1", text: "Fully Furnished" },
    { id: "2", text: "Modern Kitchen" },
  ],
  exterior: [
    { id: "3", text: "Balcony with view" },
    { id: "4", text: "Private Parking" },
  ],
  utilities: [
    { id: "5", text: "Central Heating" },
    { id: "6", text: "High-speed Internet" },
  ],
  others: [
    { id: "7", text: "Pet Friendly" },
    { id: "8", text: "Swimming Pool" },
  ], // Optional

  // 5. Floor Plan
  floorPlan: [
    new File(["floorplan1"], "floorplan1.pdf", { type: "application/pdf" }),
    new File(["floorplan2"], "floorplan2.pdf", { type: "application/pdf" }),
  ],
  floorPlanCid: images, // Optional
  license: [
    new File(["license1"], "license1.pdf", { type: "application/pdf" }),
  ],
  licenseCid: images, // Optional
};

export default function PropertyDetailsPage() {
  const [showMore, setShowMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    listingFormData?.imagesCid[0],
  );

  // const navigate = useNavigate();

  // const { id } = useParams();
  // const [searchParams] = useSearchParams();

  // const from = searchParams.get("from");
  // const isDao = from && from === "dao-page";

  // const { daoAddress, daoABI } = contract;

  // const listingTx = useReadContract({
  //   address: daoAddress,
  //   functionName: isDao ? "get_unapproved_listings" : "get_listings",
  //   abi: daoABI,
  //   args: [],
  //   watch: false,
  // });

  // const data: I_LISTING_SLICE[] =
  //   listingTx?.data?.length > 0
  //     ? listingTx?.data?.map((lst: I_LISTING_SLICE) => ({
  //         id: Number(lst.id),
  //         details: byteArrayToString(lst?.details?.split(",")),
  //         hash: String(lst.hash),
  //         owner: toHex(String(lst.owner)),
  //       }))
  //     : [];

  // const isLoading =
  //   listingTx?.isFetching || listingTx?.isLoading || listingTx?.isPending;

  // const listing = data.find((lst) => lst.id === Number(id));

  // if (isLoading)
  //   return (
  //     <div className="flex flex-col gap-4 py-4">
  //       <Skeleton className="aspect-video bg-background" />
  //       <Separator className="my-2 h-px w-full" />
  //       <Skeleton className="aspect-video bg-background" />
  //     </div>
  //   );

  // if (!isLoading && !listing) {
  //   navigate("/dashboard");
  //   return null;
  // }

  const addresses = [
    {
      label: "Address",
      value: listingFormData?.area,
    },
    {
      label: "Area /Landmark",
      value: listingFormData?.landmark,
    },
    {
      label: "City",
      value: listingFormData?.region?.city?.cityName,
    },
    {
      label: "State",
      value: listingFormData?.region?.state?.stateName,
    },
    {
      label: "ZIP",
      value: listingFormData?.zip,
    },
    {
      label: "Country",
      value: listingFormData?.region?.country?.countryName,
    },
  ];

  const details = [
    {
      label: "Property ID",
      value: "089123",
    },
    {
      label: "Price; from - to",
      value: `$${listingFormData?.rangeFrom.toLocaleString()} - $${listingFormData?.rangeTo.toLocaleString()}`,
    },
    {
      label: "Rooms",
      value: listingFormData?.rooms,
    },
    {
      label: "Bedrooms",
      value: listingFormData?.bedrooms,
    },
    {
      label: "Bathrooms",
      value: listingFormData?.bathrooms,
    },
    {
      label: "Year built",
      value: listingFormData?.yearBuilt,
    },
    {
      label: "Structure type",
      value: listingFormData?.structureType,
    },
    {
      label: "Property type",
      value: listingFormData?.propertyType,
    },
    {
      label: "Property Sizes",
      value: listingFormData?.propertySize,
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Property</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-1 flex-col gap-5 rounded-md sm:rounded-2xl sm:border sm:bg-background sm:p-6 md:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between md:flex-col lg:flex-row lg:gap-[54px]">
          <div className="flex flex-col gap-4">
            <p className="flex flex-col gap-2">
              <span className="text-base font-medium leading-none">
                {listingFormData?.area}
              </span>
              <span className="text-xl font-medium text-primary">
                Offer from ${listingFormData?.rangeFrom.toLocaleString()}
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <svg
                  className="size-4"
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

                <span className="text-sm font-normal leading-none text-[#8B8B8B]">
                  {listingFormData?.bedrooms} Bedroom
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="size-4"
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

                <span className="text-sm font-normal leading-none text-[#8B8B8B]">
                  {listingFormData?.bathrooms} Baths
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="size-4"
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

                <span className="text-sm font-normal leading-none text-[#8B8B8B]">
                  2 Car park
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="size-4"
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

                <span className="text-sm font-normal leading-none text-[#8B8B8B]">
                  32 km/sq
                </span>
              </div>
            </div>
          </div>

          <Button>
            <BiLeaf className="size-5" />
            <span>Purchase/Rent</span>
          </Button>
        </div>

        <div className="flex w-full flex-col gap-10 xl:flex-row xl:items-start">
          <div className="flex w-full flex-col gap-6 xl:sticky xl:top-24">
            <div className="aspect-[1.4] w-full overflow-hidden rounded-2xl border bg-secondary lg:aspect-[1.3]">
              <img
                src={selectedImage}
                alt={`Product image ${selectedImage}`}
                className="size-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listingFormData?.imagesCid.map((image) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={cn(
                    "relative flex-shrink-0 overflow-hidden rounded-md transition-all hover:opacity-90",
                    selectedImage === image
                      ? "ring-2 ring-primary"
                      : "opacity-50",
                  )}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${image}`}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-12 lg:max-w-[685px]">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold text-primary">Snapshot</p>
              <pre className="flex flex-col whitespace-pre-wrap text-left font-satoshi text-base md:text-base">
                <span
                  className={cn("md:font-normal", {
                    "line-clamp-6": !showMore,
                  })}
                >
                  {listingFormData?.description}
                </span>
                <span
                  role="button"
                  onClick={() => setShowMore(!showMore)}
                  className="w-max font-medium text-primary"
                >
                  {showMore ? "View Less" : "View More"}
                </span>
              </pre>
            </div>

            <div className="flex flex-col gap-2">
              <p className="mb-2 border-b pb-2 text-base font-semibold uppercase tracking-wide">
                Address
              </p>

              <div className="grid grid-cols-2 gap-12">
                {addresses.map((addr) => (
                  <div key={addr.label} className="flex flex-col">
                    <span className="text-base font-medium text-muted-foreground">
                      {addr.label}
                    </span>
                    <span className="text-lg font-medium">{addr?.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="mb-2 border-b pb-2 text-base font-semibold uppercase tracking-wide">
                Details
              </p>

              <div className="grid grid-cols-2 gap-12">
                {details.map((dtls) => (
                  <div key={dtls.label} className="flex flex-col">
                    <span className="text-base font-medium text-muted-foreground">
                      {dtls.label}
                    </span>
                    <span className="text-lg font-medium">{dtls.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-10 sm:gap-6">
              <div className="flex flex-col gap-1">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 5.7207C18.3284 5.7207 19 6.39227 19 7.2207C19 8.04913 18.3284 8.7207 17.5 8.7207C16.6716 8.7207 16 8.04913 16 7.2207C16 6.39227 16.6716 5.7207 17.5 5.7207Z"
                    stroke="#141B34"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.77423 11.8646C1.77108 12.985 1.7495 14.6753 2.67016 15.8644C4.49711 18.224 6.49674 20.2236 8.85633 22.0505C10.0454 22.9712 11.7357 22.9496 12.8561 21.9465C15.8979 19.2229 18.6835 16.3766 21.3719 13.2486C21.6377 12.9394 21.8039 12.5604 21.8412 12.1543C22.0062 10.3587 22.3452 5.18537 20.9403 3.78044C19.5353 2.37551 14.362 2.71447 12.5664 2.87946C12.1603 2.91678 11.7813 3.08303 11.472 3.34881C8.34412 6.03716 5.49781 8.82281 2.77423 11.8646Z"
                    stroke="#141B34"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M13.7884 13.0872C13.8097 12.6862 13.9222 11.9526 13.3125 11.3951M13.3125 11.3951C13.1238 11.2226 12.866 11.0669 12.5149 10.9431C11.2583 10.5003 9.71484 11.9826 10.8067 13.3395C11.3936 14.0688 11.8461 14.2932 11.8035 15.1214C11.7735 15.7041 11.2012 16.3128 10.4469 16.5447C9.7916 16.7461 9.06876 16.4794 8.61156 15.9685C8.05332 15.3448 8.1097 14.7567 8.10492 14.5004M13.3125 11.3951L14.0006 10.707M8.66131 16.0463L8.00781 16.6998"
                    stroke="#141B34"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-lg font-medium">Potential Value</p>
                <div className="rounded-sm bg-[#DEEDEC] px-3 py-1 text-sm font-medium tracking-wide text-primary">
                  High Confidence
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-medium text-muted-foreground">
                  Low Range
                </span>
                <span className="text-lg font-medium">$410,000</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-medium text-muted-foreground">
                  Mid Range
                </span>
                <span className="text-lg font-medium">$410,000</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-medium text-muted-foreground">
                  High Range
                </span>
                <span className="text-lg font-medium">$410,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-2 h-px w-full" />

      <div className="flex flex-1 flex-col gap-5 sm:rounded-2xl sm:border sm:bg-background sm:p-6 md:p-10 2xl:flex-row">
        <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-20 lg:p-10">
          <div className="flex flex-col gap-6">
            <p className="text-lg text-muted-foreground">Interior Details</p>

            <ul className="flex flex-col gap-2 pl-4">
              {listingFormData?.interior?.map((int) => (
                <li key={int.id} className="list-disc text-base font-medium">
                  {int.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-lg text-muted-foreground">Outdoor Details</p>

            <ul className="flex flex-col gap-2 pl-4">
              {listingFormData?.exterior?.map((ext) => (
                <li key={ext.id} className="list-disc text-base font-medium">
                  {ext.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-lg text-muted-foreground">Utilities</p>

            <ul className="flex flex-col gap-2 pl-4">
              {listingFormData?.utilities?.map((utils) => (
                <li key={utils.id} className="list-disc text-base font-medium">
                  {utils.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator className="my-2 h-px w-full" />

      <div className="flex flex-1 flex-col gap-5 sm:rounded-2xl sm:border sm:bg-background sm:p-6 md:p-10 2xl:flex-row">
        <div className="flex w-full flex-col gap-10 xl:flex-row">
          <div className="flex flex-1 flex-col gap-3">
            <p className="text-base text-muted-foreground">FLOOR PLANS</p>

            <p className="text-base">
              Living Spaces are more easily interpreted. All-In-Ones color floor
              plan option clearly defines your listing’s living spaces, making
              them obvious and clearly visible to your potential buyers/clients.
              Add extra value to your services. Color floor-plans show that you
              care about selling your client’s listing; they add a premium, high
              value look to any listing and can be used in your brochures, email
              and websites.
            </p>
          </div>

          <Carousel className="relative aspect-[1.5] flex-1 rounded-xl bg-secondary">
            <CarouselContent>
              {listingFormData?.floorPlanCid?.map((floorPlanCid, index) => (
                <CarouselItem key={index} className="aspect-[1.5]">
                  <div className="size-full overflow-hidden rounded-md border bg-secondary md:rounded-xl">
                    <img
                      src={floorPlanCid}
                      alt="floor plan"
                      className="size-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-6" />
            <CarouselNext className="right-6" />
          </Carousel>
        </div>
      </div>

      <Separator className="my-2 h-px w-full" />

      {listingFormData?.videosCid?.length && (
        <div className="flex aspect-video flex-1 flex-col gap-5 sm:rounded-2xl sm:border sm:bg-background sm:p-6 md:p-10 2xl:flex-row">
          <h1>Video</h1>
        </div>
      )}

      <Separator className="my-2 h-px w-full" />

      <div className="flex flex-1 flex-col gap-5 sm:rounded-2xl sm:border sm:bg-background sm:p-6 md:p-10 2xl:flex-row">
        <div className="flex w-full flex-col gap-6 sm:max-w-full xl:max-w-full xl:flex-row 2xl:max-w-lg 2xl:flex-col">
          <div className="flex flex-1 flex-col gap-16 rounded-md border p-6 sm:rounded-xl sm:p-8">
            <div className="flex flex-col gap-7">
              <p className="text-xl font-medium">Agent details</p>

              <div className="flex flex-col">
                <p className="font-medium">John Doe</p>
                <p className="text-muted-foreground">
                  Property is our cup of tea
                </p>
              </div>
            </div>

            <Button size={"lg"} className="rounded-full">
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

              <span>Contact Agent</span>
            </Button>
          </div>
          <div className="flex flex-1 flex-col gap-16 rounded-md border p-6 sm:rounded-xl sm:p-8">
            <div className="flex flex-col gap-7">
              <p className="text-xl font-medium">Inspection times</p>

              <div className="flex flex-col">
                <p className="text-muted-foreground">
                  Inspection and property viewing are still happening
                </p>
                <p className="text-lg font-medium text-primary sm:text-2xl">
                  Wednesday 3 Dec, 1:00pm - 1:40pm
                </p>
              </div>
            </div>

            <Button size={"lg"} className="rounded-full">
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

        <div className="-z-0 aspect-[1.4] flex-1 overflow-hidden rounded-xl border bg-secondary sm:rounded-2xl 2xl:aspect-auto">
          <MapView
            location={listingFormData?.region?.country?.countryName}
            center={[
              listingFormData?.region?.country?.countryLat,
              listingFormData?.region?.country?.countryLong,
            ]}
          />
        </div>
      </div>

      <Separator className="my-2 h-px w-full" />

      <div className="flex flex-1 flex-col gap-5 sm:rounded-2xl sm:border sm:bg-background sm:p-6 md:p-10 2xl:flex-row">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {listingFormData?.license.map((license, _index) => (
            <div
              key={_index}
              className="flex items-center gap-4 rounded-2xl bg-secondary p-4"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-background">
                <PiFolderOpenDuotone className="size-8" />
              </div>

              <div className="flex flex-1 flex-col">
                <p className="text-base font-medium md:text-lg">
                  {license?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  PDF - {license?.size}MB
                </p>
              </div>

              <div className="ml-auto mr-2">
                <Link target="_blank" to="/">
                  <RxOpenInNewWindow className="size-6" role="button" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const DaoActions = ({
  isDao,
  lstId,
  lstHash,
}: {
  isDao: boolean;
  lstId: number;
  lstHash: string;
}) => {
  const { getContractInstance } = useContractInstance();
  const contractInstance = getContractInstance();

  const calls = useMemo(() => {
    if (!isDao || !lstHash || !lstId) return undefined;

    return [contractInstance.populate("approve_listing", [lstId, lstHash])];
  }, [contractInstance, isDao, lstHash, lstId]);

  const transaction = useSendTransaction({
    calls,
  });

  const receipt = useTransactionReceipt({
    hash: transaction?.data?.transaction_hash,
    watch: true,
  });

  const isLoading = receipt?.isLoading || transaction?.isPending;

  const handleApproveListing = async () => {
    const hash = await transaction.sendAsync();
    console.log(hash);
  };

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row">
      <Button
        disabled={isLoading}
        onClick={handleApproveListing}
        variant={"secondary"}
        className="w-full rounded-full sm:w-[170px] md:w-full lg:w-[170px]"
      >
        {isLoading ? (
          <>
            <Loader className="size-4 animate-spin" />
            <span>Approving...</span>
          </>
        ) : (
          <>
            <svg
              className="size-5"
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
          </>
        )}
      </Button>
      <Button
        disabled={isLoading}
        className="w-full rounded-full sm:w-[170px] md:w-full lg:w-[170px]"
      >
        <svg
          className="size-5"
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
  );
};

// <div className="flex flex-col gap-4 py-4">
//   <Breadcrumb>
//     <BreadcrumbList>
//       <BreadcrumbItem>
//         <BreadcrumbLink asChild>
//           <Link to="/dashboard">Dashboard</Link>
//         </BreadcrumbLink>
//       </BreadcrumbItem>
//       <BreadcrumbSeparator />
//       <BreadcrumbItem>
//         <BreadcrumbPage>Property</BreadcrumbPage>
//       </BreadcrumbItem>
//     </BreadcrumbList>
//   </Breadcrumb>

//   <div className="flex flex-1 flex-col gap-5 rounded-md sm:rounded-2xl sm:border sm:bg-background sm:p-6 md:p-10">
//     <div className="flex flex-col gap-6 sm:flex-row sm:justify-between md:flex-col lg:flex-row lg:gap-[54px]">
//       <div className="flex flex-col gap-4">
//         <p className="flex flex-col gap-2">
//           <span className="text-base font-medium leading-none">
//             {listing?.details?.location?.name}
//           </span>
//           <span className="text-xl font-medium text-primary">
//             Offer from ${Number(listing?.details?.price).toLocaleString()}
//           </span>
//         </p>

//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex items-center gap-2">
//             <svg
//               className="size-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M22 17.5H2"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//               <path
//                 d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//             </svg>

//             <span className="text-sm font-normal leading-none text-[#8B8B8B]">
//               {listing?.details?.bedrooms ?? 0} Bedroom
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <svg
//               className="size-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M6 20L5 21M18 20L19 21"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//               <path
//                 d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M2 12H22"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//               <path
//                 d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//               <path
//                 d="M8 6L10.5 4"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//             </svg>

//             <span className="text-sm font-normal leading-none text-[#8B8B8B]">
//               {listing?.details?.bathrooms ?? 0} Baths
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <svg
//               className="size-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M22 21V9.61065C22 8.28771 22 7.62624 21.6561 7.11395C21.3123 6.60167 20.7034 6.35601 19.4856 5.86468L13.4856 3.44396C12.752 3.14799 12.3852 3 12 3C11.6148 3 11.248 3.14799 10.5144 3.44396L4.51444 5.86468C3.29663 6.35601 2.68773 6.60167 2.34387 7.11395C2 7.62624 2 8.28771 2 9.61065V21"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M16 19V21M8 19V21"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M7.5 14L7.74254 13.0299C8.10632 11.5747 8.28821 10.8472 8.83073 10.4236C9.37325 10 10.1232 10 11.6231 10H12.3769C13.8768 10 14.6267 10 15.1693 10.4236C15.7118 10.8472 15.8937 11.5747 16.2575 13.0299L16.5 14"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M17 14H7C6.44772 14 6 14.4477 6 15V18C6 18.5523 6.44772 19 7 19H17C17.5523 19 18 18.5523 18 18V15C18 14.4477 17.5523 14 17 14Z"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M8.5 16.4902V16.5002"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M15.5 16.4902V16.5002"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>

//             <span className="text-sm font-normal leading-none text-[#8B8B8B]">
//               {listing?.details?.parkingSpaces ?? 0} Car park
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <svg
//               className="size-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M12 12C7.46544 12 3.62948 14.9642 2.35747 19.044C1.99646 20.2019 1.81595 20.7809 2.26968 21.3904C2.7234 22 3.46112 22 4.93655 22H19.0634C20.5389 22 21.2766 22 21.7303 21.3904C22.184 20.7809 22.0035 20.2019 21.6425 19.044C20.3705 14.9642 16.5346 12 12 12Z"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//               <path
//                 d="M15 17H15.009"
//                 stroke="#949494"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M12 22C12 20.3431 10.6569 19 9 19C7.34315 19 6 20.3431 6 22"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//               <path
//                 d="M12 12V7.5M12 7.5V5C12 3.58579 12 2.87868 12.4393 2.43934C12.8787 2 13.5858 2 15 2H17.25C18.4228 2 19.0092 2 19.4131 2.30997C19.5171 2.38977 19.6102 2.48286 19.69 2.58686C20 2.99082 20 3.57721 20 4.75C20 5.92279 20 6.50918 19.69 6.91314C19.6102 7.01714 19.5171 7.11023 19.4131 7.19003C19.0092 7.5 18.4228 7.5 17.25 7.5H12Z"
//                 stroke="#949494"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//             </svg>

//             <span className="text-sm font-normal leading-none text-[#8B8B8B]">
//               {listing?.details?.sizeSqft ?? 0} km/sq
//             </span>
//           </div>
//         </div>
//       </div>

//       {isDao ? (
//         <DaoActions
//           isDao={isDao}
//           lstId={listing?.id as number}
//           lstHash={listing?.hash as string}
//         />
//       ) : (
//         <Button>
//           <svg
//             className="size-5"
//             viewBox="0 0 25 25"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M5.97632 17.5C4.98992 5.04502 13.8128 1.5121 20.8739 2.72417C21.159 6.85185 19.1394 8.39748 15.2931 9.11125C16.0358 9.88731 17.3482 10.8639 17.2066 12.0847C17.1059 12.9534 16.5159 13.3797 15.336 14.2322C12.7502 16.1004 9.75474 17.2785 5.97632 17.5Z"
//               stroke="white"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M4.90039 22.5C4.90039 16 8.74887 12.6818 11.4004 10.5"
//               stroke="white"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>

//           <span>Purchase/Rent</span>
//         </Button>
//       )}
//     </div>

//     <div className="flex flex-col gap-10 xl:flex-row xl:items-start">
//       <div className="aspect-[1.4] w-full overflow-hidden rounded-2xl bg-secondary lg:aspect-[1.2]">
//         <Carousel className="size-full">
//           <CarouselContent>
//             {listingMedia?.map((img: any, index: number) => (
//               <CarouselItem key={index}>
//                 <Card>
//                   <CardContent className="aspect-[1.4] !p-0 lg:aspect-[1.2]">
//                     <img
//                       src={`${variables?.gateway}/${img}`}
//                       alt={`${index + 1}`}
//                       className="size-full object-cover"
//                     />
//                   </CardContent>
//                 </Card>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious className="left-8 top-1/2 -translate-y-1/2" />
//           <CarouselNext className="right-8 top-1/2 -translate-y-1/2" />
//         </Carousel>
//       </div>

//       <div className="flex w-full flex-col lg:max-w-[685px]">
//         <div className="mb-5 flex flex-col gap-2">
//           <p className="text-xl font-bold text-primary">Description</p>
//           <pre className="flex flex-col whitespace-pre-wrap text-left font-satoshi text-base md:text-base">
//             <span
//               className={cn("md:font-normal", {
//                 "line-clamp-6": !showMore,
//               })}
//             >
//               {listing?.details?.description}
//             </span>
//             <span
//               role="button"
//               onClick={() => setShowMore(!showMore)}
//               className="font-medium text-primary"
//             >
//               {showMore ? "View Less" : "View More"}
//             </span>
//           </pre>
//         </div>
//       </div>
//     </div>
//   </div>

//   <Separator className="my-2 h-px w-full" />

//   <div className="flex flex-1 flex-col gap-5 sm:rounded-2xl sm:border sm:bg-background sm:p-6 md:p-10 2xl:flex-row">
//     <div className="flex w-full flex-col gap-6 sm:max-w-full xl:max-w-full xl:flex-row 2xl:max-w-lg 2xl:flex-col">
//       <div className="flex flex-1 flex-col gap-16 rounded-md border p-6 sm:rounded-xl sm:p-8">
//         <div className="flex flex-col gap-7">
//           <p className="text-xl font-medium">Agent details</p>

//           <div className="flex flex-col">
//             <p className="font-medium">John Doe</p>
//             <p className="text-muted-foreground">
//               Property is our cup of tea
//             </p>
//           </div>
//         </div>

//         <Button
//           onClick={() => navigate(`/profile/${listing?.owner}`)}
//           size={"lg"}
//           className="rounded-full"
//         >
//           <svg
//             width="27"
//             height="27"
//             viewBox="0 0 27 27"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M4.89453 11.654C4.89453 7.56846 4.89453 5.52572 6.16373 4.25651C7.43294 2.9873 9.47569 2.9873 13.5612 2.9873H15.1862C19.2717 2.9873 21.3145 2.9873 22.5836 4.25651C23.8529 5.52572 23.8529 7.56846 23.8529 11.654V15.9873C23.8529 20.0728 23.8529 22.1156 22.5836 23.3847C21.3145 24.654 19.2717 24.654 15.1862 24.654H13.5612C9.47569 24.654 7.43294 24.654 6.16373 23.3847C4.89453 22.1156 4.89453 20.0728 4.89453 15.9873V11.654Z"
//               stroke="white"
//               strokeWidth="1.5"
//             />
//             <path
//               d="M11.1771 13.7923C10.715 12.9864 10.4918 12.3283 10.3573 11.6612C10.1583 10.6748 10.6137 9.71108 11.3681 9.09618C11.687 8.8363 12.0525 8.92509 12.241 9.26336L12.6667 10.027C13.0041 10.6323 13.1728 10.935 13.1393 11.2559C13.1059 11.5767 12.8784 11.838 12.4234 12.3607L11.1771 13.7923ZM11.1771 13.7923C12.1126 15.4233 13.5806 16.8922 15.2136 17.8288M15.2136 17.8288C16.0195 18.2909 16.6775 18.5141 17.3446 18.6486C18.3311 18.8476 19.2947 18.3922 19.9096 17.6378C20.1695 17.3188 20.0808 16.9533 19.7425 16.7648L18.9788 16.3392C18.3735 16.0017 18.0709 15.833 17.75 15.8665C17.4291 15.9 17.1678 16.1275 16.6451 16.5825L15.2136 17.8288Z"
//               stroke="white"
//               strokeWidth="1.5"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M5.97786 7.32031H3.26953M5.97786 13.8203H3.26953M5.97786 20.3203H3.26953"
//               stroke="white"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>

//           <span>Contact Agent</span>
//         </Button>
//       </div>
//       <div className="flex flex-1 flex-col gap-16 rounded-md border p-6 sm:rounded-xl sm:p-8">
//         <div className="flex flex-col gap-7">
//           <p className="text-xl font-medium">Inspection times</p>

//           <div className="flex flex-col">
//             <p className="text-muted-foreground">
//               Inspection and property viewing are still happening
//             </p>
//             <p className="text-lg font-medium text-primary sm:text-2xl">
//               Wednesday 3 Dec, 1:00pm - 1:40pm
//             </p>
//           </div>
//         </div>

//         <Button size={"lg"} className="rounded-full">
//           <svg
//             width="27"
//             height="27"
//             viewBox="0 0 27 27"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M4.89453 11.654C4.89453 7.56846 4.89453 5.52572 6.16373 4.25651C7.43294 2.9873 9.47569 2.9873 13.5612 2.9873H15.1862C19.2717 2.9873 21.3145 2.9873 22.5836 4.25651C23.8529 5.52572 23.8529 7.56846 23.8529 11.654V15.9873C23.8529 20.0728 23.8529 22.1156 22.5836 23.3847C21.3145 24.654 19.2717 24.654 15.1862 24.654H13.5612C9.47569 24.654 7.43294 24.654 6.16373 23.3847C4.89453 22.1156 4.89453 20.0728 4.89453 15.9873V11.654Z"
//               stroke="white"
//               strokeWidth="1.5"
//             />
//             <path
//               d="M11.1771 13.7923C10.715 12.9864 10.4918 12.3283 10.3573 11.6612C10.1583 10.6748 10.6137 9.71108 11.3681 9.09618C11.687 8.8363 12.0525 8.92509 12.241 9.26336L12.6667 10.027C13.0041 10.6323 13.1728 10.935 13.1393 11.2559C13.1059 11.5767 12.8784 11.838 12.4234 12.3607L11.1771 13.7923ZM11.1771 13.7923C12.1126 15.4233 13.5806 16.8922 15.2136 17.8288M15.2136 17.8288C16.0195 18.2909 16.6775 18.5141 17.3446 18.6486C18.3311 18.8476 19.2947 18.3922 19.9096 17.6378C20.1695 17.3188 20.0808 16.9533 19.7425 16.7648L18.9788 16.3392C18.3735 16.0017 18.0709 15.833 17.75 15.8665C17.4291 15.9 17.1678 16.1275 16.6451 16.5825L15.2136 17.8288Z"
//               stroke="white"
//               strokeWidth="1.5"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M5.97786 7.32031H3.26953M5.97786 13.8203H3.26953M5.97786 20.3203H3.26953"
//               stroke="white"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>

//           <span>Add to calender</span>
//         </Button>
//       </div>
//     </div>

//     <div className="-z-0 aspect-[1.4] flex-1 overflow-hidden rounded-xl border bg-secondary sm:rounded-2xl 2xl:aspect-auto">
//       <MapView
//         location={listing?.details?.location?.name}
//         center={[
//           Number(listing?.details?.location?.latitude),
//           Number(listing?.details?.location?.latitude),
//         ]}
//       />
//     </div>
//   </div>

//   <Separator className="my-2 h-px w-full" />

//   <div className="flex flex-1 flex-col gap-5 sm:rounded-2xl sm:border sm:bg-background sm:p-6 md:p-10 2xl:flex-row">
//     <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
//       {listing?.details?.documentCids?.map((document) => (
//         <div
//           key={document}
//           className="flex items-center gap-4 rounded-2xl bg-secondary p-4"
//         >
//           <div className="flex size-14 items-center justify-center rounded-full bg-background">
//             <PiFolderOpenDuotone className="size-8" />
//           </div>

//           <div className="flex flex-1 flex-col">
//             <p className="text-base font-medium md:text-lg">Licence name</p>
//             <div className="flex items-center gap-2">
//               <p className="text-sm text-muted-foreground">PDF</p>
//               <p className="text-sm text-muted-foreground">·</p>
//               <p className="text-sm text-muted-foreground">0 KB</p>
//             </div>
//           </div>

//           <div className="ml-auto mr-2">
//             <Link
//               target="_blank"
//               //@ts-ignore
//               to={`${variables?.gateway}/${document}`}
//             >
//               <RxOpenInNewWindow className="size-6" role="button" />
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>;
