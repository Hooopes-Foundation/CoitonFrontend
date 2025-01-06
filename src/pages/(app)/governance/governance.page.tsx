import { assets } from "@/assets";
import ListingBoard from "@/components/shared/listing-board";
import MerchantTable from "@/components/shared/merchant-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilterHook } from "@/hooks/useFilters.hook";
import { byteArrayToString, toHex } from "@/lib/starknet/utils";
import { contract } from "@/utils/contract";
import { useReadContract } from "@starknet-react/core";
import { BsInbox } from "react-icons/bs";

export type Listing = {
  id: number;
  owner: string;
  hash: string;
  details: any;
};

export default function GovernancePage() {
  const { daoAddress, daoABI } = contract;
  const { filterCountry, filterPropertyType } = useFilterHook();

  const appTx = useReadContract({
    address: daoAddress,
    functionName: "get_unapproved_listings",
    abi: daoABI,
    args: [],
    watch: false,
  });

  const unapprovedListings =
    appTx?.data?.length > 0
      ? appTx?.data?.map((lst: any) => ({
          id: Number(lst.id),
          details: byteArrayToString(lst?.details),
          hash: String(lst.hash),
          owner: toHex(String(lst.owner)),
        }))
      : [];

  const isLoading = appTx?.isFetching || appTx?.isLoading || appTx?.isPending;

  // Filter unapproved listings based on active filters
  const filteredListings = unapprovedListings.filter(
    (listing: Listing) =>
      (filterCountry ? listing.details?.country === filterCountry : true) &&
      (filterPropertyType
        ? listing.details?.propertyType === filterPropertyType
        : true),
  );

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="relative flex h-[300px] w-full items-center overflow-clip rounded-2xl border bg-[#FCFCFC] p-[1px] md:h-[363px] md:rounded-3xl">
        <div className="space-y-1 px-10 py-11 md:px-16">
          <svg
            className="mb-8 ml-10 size-[141px]"
            viewBox="0 0 141 141"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M54.447 37.9926V47.651L16.6133 25.8033V16.1567L54.447 37.9926Z"
              className="fill-[#E7FEFC]"
              stroke="#056F67"
              strokeWidth="0.596934"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M54.447 86.2368V95.8951L16.6133 74.0475V64.4009L54.447 86.2368Z"
              className="fill-[#E7FEFC]"
              stroke="#056F67"
              strokeWidth="0.596934"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M76.0202 74.5723L67.0662 79.0494V79.9328L54.447 86.2366L16.6133 64.4006L40.4906 52.4619L67.0662 67.8031V69.403L76.0202 74.5723Z"
              fill="white"
              stroke="#056F67"
              strokeWidth="0.596934"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M124.577 86.5352V125.12L100.699 137.059V98.4738L124.577 86.5352Z"
              fill="white"
              stroke="#056F67"
              strokeWidth="0.596934"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M124.585 86.5354L100.708 98.4741L90.9535 92.8391L76.8541 84.6968L67.8881 79.5155L67.0762 79.0498L76.0302 74.5728L76.8421 75.0385L78.3345 75.8979L90.9535 83.1805L100.708 88.8157L115.619 81.354L124.585 86.5354Z"
              fill="white"
              stroke="#056F67"
              strokeWidth="0.596934"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M124.577 38.291V76.877L115.611 81.354L100.699 88.8156V50.2297L124.577 38.291Z"
              fill="white"
              stroke="#056F67"
              strokeWidth="0.596934"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M100.708 50.2294V88.8153L90.9535 83.1801L78.3345 75.8976L76.8421 75.0381L76.0302 74.5724L67.0762 69.403V30.8052L67.8881 31.2708L76.8541 36.4522L90.9535 44.5945L100.708 50.2294Z"
              className="fill-[#E7FEFC]"
              stroke="#056F67"
              strokeWidth="0.596934"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M124.585 38.2909L100.708 50.2296L90.9535 44.5947L76.8541 36.4524L67.8881 31.271L67.0762 30.8054L68.5566 30.0652L77.5225 25.5882L90.9535 18.8667L124.585 38.2909Z"
              fill="white"
              stroke="#056F67"
              strokeWidth="0.596934"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M77.5125 25.5885L68.5465 30.0655L67.0662 30.8057V31.6892L54.447 37.9928L16.6133 16.157L40.4906 4.21826L77.5125 25.5885Z"
              fill="white"
              stroke="#056F67"
              strokeWidth="0.596934"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M67.0761 31.689V41.3475L54.457 47.651V37.9926L67.0761 31.689Z"
              fill="white"
              stroke="#056F67"
              strokeWidth="0.596934"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M100.708 98.4737V137.059L67.0762 117.647V79.0493L67.8881 79.515L76.8541 84.6963L90.9535 92.8386L100.708 98.4737Z"
              className="fill-[#E7FEFC]"
              stroke="#056F67"
              strokeWidth="0.596934"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M67.0761 79.9331V89.5915L54.457 95.8951V86.2369L67.0761 79.9331Z"
              fill="white"
              stroke="#056F67"
              strokeWidth="0.596934"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h3 className="text-4xl font-normal italic text-primary md:text-5xl">
            New Listings
          </h3>
          <p className="text-base text-muted-foreground md:text-xl">
            New listings in need of approvals
          </p>
        </div>

        <img
          src={assets.shapes.clyShape}
          className="absolute -right-56 top-4 hidden sm:flex md:hidden lg:flex xl:-right-24"
        />
      </div>

      <Separator className="my-2 h-px w-full" />

      <div className="flex flex-col gap-6 xl:h-[422px] xl:flex-row">
        <div className="h-max w-full overflow-hidden rounded-2xl border border-[#DCF7F5] bg-[#F5FFFE] md:h-[422px] md:rounded-3xl xl:h-full xl:max-w-[504px]">
          <div className="my-4 flex h-[55px] items-center justify-between px-6 md:px-8">
            <p className="text-lg font-medium text-primary">Your Properties</p>

            <Button className="w-max border border-[#DCF7F5] !bg-[#E8FDFC] px-5 text-primary hover:!bg-[#E8FDFC]/90">
              <span className="text-sm font-medium">View More</span>
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 fill-none"
              >
                <path
                  d="M11.8538 5.85354L7.35375 10.3535C7.25993 10.4474 7.13268 10.5001 7 10.5001C6.86732 10.5001 6.74007 10.4474 6.64625 10.3535C6.55243 10.2597 6.49972 10.1325 6.49972 9.99979C6.49972 9.86711 6.55243 9.73986 6.64625 9.64604L10.2931 5.99979H0.5C0.367392 5.99979 0.240215 5.94711 0.146447 5.85334C0.0526785 5.75958 0 5.6324 0 5.49979C0 5.36718 0.0526785 5.24 0.146447 5.14624C0.240215 5.05247 0.367392 4.99979 0.5 4.99979H10.2931L6.64625 1.35354C6.55243 1.25972 6.49972 1.13247 6.49972 0.99979C6.49972 0.867108 6.55243 0.73986 6.64625 0.64604C6.74007 0.552219 6.86732 0.499512 7 0.499512C7.13268 0.499512 7.25993 0.552219 7.35375 0.64604L11.8538 5.14604C11.9002 5.19248 11.9371 5.24762 11.9623 5.30832C11.9874 5.36902 12.0004 5.43408 12.0004 5.49979C12.0004 5.5655 11.9874 5.63056 11.9623 5.69126C11.9371 5.75196 11.9002 5.8071 11.8538 5.85354Z"
                  className="fill-primary"
                />
              </svg>
            </Button>
          </div>

          <div className="h-[300px] overflow-hidden px-6 md:h-[342px] md:px-8">
            <div className="grid size-full grid-cols-2 rounded-t-2xl border border-b-0 border-[#DBEEED] bg-white">
              <div className="flex flex-col justify-center gap-2 border-r border-[#EFF9F8] p-6">
                <div className="flex w-max items-center gap-2 rounded-2xl border border-[#DBEEED] bg-[#F2FFFE] px-4 py-2 text-primary">
                  <img
                    src={assets.svgs.logoIcon}
                    className="size-[26px]"
                    width={26}
                    height={26}
                    alt=""
                  />
                  <p className="text-base font-bold md:text-xl">$15.67</p>
                </div>
                <p className="text-sm font-light text-muted-foreground md:text-lg">
                  Token
                </p>
              </div>
              <div className="flex flex-col justify-center gap-2 border-b border-[#EFF9F8] p-6">
                <div className="flex w-max items-center gap-2 rounded-2xl border border-[#DBEEED] bg-[#F2FFFE] px-4 py-2 text-primary">
                  <img
                    src={assets.svgs.bookmarkIcon}
                    className="size-[26px]"
                    width={26}
                    height={26}
                    alt=""
                  />
                  <p className="text-base font-bold md:text-xl">300</p>
                </div>
                <p className="text-sm font-light text-muted-foreground md:text-lg">
                  Saved Properties
                </p>
              </div>
              <div className="flex flex-col justify-center gap-2 border-t border-[#EFF9F8] p-6">
                <div className="flex w-max items-center gap-2 rounded-2xl border border-[#DBEEED] bg-[#F2FFFE] px-4 py-2 text-primary">
                  <img
                    src={assets.svgs.homeIcon}
                    className="size-[26px]"
                    width={26}
                    height={26}
                    alt=""
                  />
                  <p className="text-base font-bold md:text-xl">3</p>
                </div>
                <p className="text-sm font-light text-muted-foreground md:text-lg">
                  Properties Owned
                </p>
              </div>
              <div className="flex flex-col justify-center gap-2 border-l border-[#EFF9F8] p-6">
                <div className="flex w-max items-center gap-2 rounded-2xl border border-[#DBEEED] bg-[#F2FFFE] px-4 py-2 text-primary">
                  <img
                    src={assets.svgs.moneyIcon}
                    className="size-[26px]"
                    width={26}
                    height={26}
                    alt=""
                  />
                  <p className="text-base font-bold md:text-xl">10</p>
                </div>
                <p className="text-sm font-light text-muted-foreground md:text-lg">
                  Properties Rented
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex aspect-video w-full flex-1 items-center justify-center overflow-hidden rounded-2xl bg-[rgb(31,74,69)] md:rounded-3xl xl:aspect-auto xl:h-full">
          <video
            src={assets.video.coitonVideo}
            autoPlay
            loop
            muted
            aria-readonly={true}
            className="pointer-events-none w-full select-none"
          />
        </div>
      </div>

      <Separator className="my-2 h-px w-full" />

      <div className="rounded-2xl md:rounded-3xl md:border md:bg-background">
        <ListingBoard />

        {isLoading ? (
          <div className="mx-auto grid grid-cols-1 gap-4 overflow-y-auto py-6 md:gap-6 md:p-6 lg:grid-cols-2 2xl:grid-cols-3">
            {[...new Array(3)].map((_, _index) => (
              <div key={_index} className="group rounded-[24px] bg-white">
                <Skeleton className="relative aspect-[1.6] w-full overflow-hidden rounded-[inherit] bg-secondary" />

                <div className="flex flex-col gap-4 p-6 md:gap-6">
                  <Skeleton className="text-xl font-bold leading-none tracking-wide text-primary md:text-2xl" />

                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-8 w-[90%]" />
                    <Skeleton className="h-6 w-[50%]" />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-1 items-center justify-start gap-2">
                      <Skeleton className="size-6 rounded-full" />

                      <Skeleton className="h-6 flex-1" />
                    </div>
                    <div className="flex flex-1 items-center justify-center gap-2">
                      <Skeleton className="size-6 rounded-full" />

                      <Skeleton className="h-6 flex-1" />
                    </div>
                    <div className="flex flex-1 items-center justify-end gap-2">
                      <Skeleton className="size-6 rounded-full" />

                      <Skeleton className="h-6 flex-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredListings?.length === 0 ? (
          <div className="flex aspect-[3.2] w-full flex-col items-center justify-center">
            <BsInbox className="size-24 text-muted-foreground" />
            <p className="text-xl font-medium text-muted-foreground">
              No active property
            </p>
          </div>
        ) : (
          <div className="mx-auto py-6 md:p-6">
            <MerchantTable filteredListings={filteredListings} />
          </div>
        )}
      </div>
    </div>
  );
}
