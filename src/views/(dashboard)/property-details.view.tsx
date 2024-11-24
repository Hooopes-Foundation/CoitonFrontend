import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const tags = [
  {
    label: "Maiden price",
    value: "$410,000",
  },
  {
    label: "Stats",
    value: "$390",
  },
  {
    label: "Stats",
    value: "$28,000",
  },
  {
    label: "Stats",
    value: "5.2%",
  },
  {
    label: "Stats",
    value: "0.6%",
  },
  {
    label: "Listed",
    value: "31 DAYS AGO",
  },
];

export default function PropertyDetailsView() {
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

      <div className="flex w-full flex-col gap-6 rounded-xl border border-[#DFDFDF] bg-[#F9FAFB] p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-[54px]">
          <div className="flex flex-col gap-4">
            <p className="flex flex-col gap-2">
              <span className="font-sans_regular text-lg leading-none text-[#8B8B8B]">
                3 Mainland Bridge, Ikorodu W134FRF
              </span>
              <span className="font-sans_medium text-lg text-primary">
                Offer from $590,000
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
                    stroke-linejoin="round"
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
                  4 Bedroom
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
                  3 Baths
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
                  2 Car park
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
                  32 km/sq
                </span>
              </div>
            </div>
          </div>
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
        </div>

        <div className="flex flex-col gap-10 xl:flex-row xl:items-center">
          <div className="aspect-video w-full rounded-2xl bg-secondary lg:aspect-square"></div>

          <div className="flex w-full flex-col lg:max-w-[685px]">
            <div className="mb-5 flex flex-col gap-2 pb-10">
              <p className="font-sans_bold text-xl text-primary">Snapshot</p>
              <p className="font-lg space-x-2">
                <span className="font-sans_medium leading-[28.8px]">
                  This spacious three-bedroom apartment offers a perfect blend
                  of comfort and modern living. The open-concept layout features
                  a bright living room with large windows that invite natural
                  light, creating a warm and welcoming atmosphere. The kitchen
                  is fully equipped with sleek stainless-steel appliances, ample
                  cabinetry, and a convenient breakfast bar.
                </span>
                <span role="button" className="font-sans_medium text-[#08BAAC]">
                  Read more
                </span>
              </p>
            </div>

            <div className="mb-10 grid grid-cols-2 gap-10 border-b pb-10 lg:grid-cols-3">
              {tags.map((tag) => (
                <div key={tag.label} className="flex flex-col gap-[3px]">
                  <div className="flex items-center gap-2">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-black"
                    >
                      <path
                        d="M17.5 5.89941C18.3284 5.89941 19 6.57098 19 7.39941C19 8.22784 18.3284 8.89941 17.5 8.89941C16.6716 8.89941 16 8.22784 16 7.39941C16 6.57098 16.6716 5.89941 17.5 5.89941Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.77423 12.0433C1.77108 13.1637 1.7495 14.854 2.67016 16.0431C4.49711 18.4027 6.49674 20.4023 8.85633 22.2292C10.0454 23.1499 11.7357 23.1283 12.8561 22.1252C15.8979 19.4016 18.6835 16.5553 21.3719 13.4273C21.6377 13.1181 21.8039 12.7391 21.8412 12.333C22.0062 10.5374 22.3452 5.36408 20.9403 3.95915C19.5353 2.55422 14.362 2.89318 12.5664 3.05817C12.1603 3.09549 11.7813 3.26174 11.472 3.52752C8.34412 6.21587 5.49781 9.00152 2.77423 12.0433Z"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M13.7884 13.266C13.8097 12.865 13.9222 12.1314 13.3125 11.5739M13.3125 11.5739C13.1238 11.4014 12.866 11.2457 12.5149 11.1219C11.2583 10.679 9.71484 12.1614 10.8067 13.5183C11.3936 14.2476 11.8461 14.472 11.8035 15.3002C11.7735 15.8829 11.2012 16.4916 10.4469 16.7235C9.7916 16.9249 9.06876 16.6582 8.61156 16.1473C8.05332 15.5236 8.1097 14.9355 8.10492 14.6792M13.3125 11.5739L14.0006 10.8857M8.66131 16.2251L8.00781 16.8786"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p className="font-sans_regular text-lg text-[#949494]">
                      {tag.label}
                    </p>
                  </div>
                  <p className="font-sans_medium text-2xl text-[#8B8B8B]">
                    {tag.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-between gap-6">
              <div className="flex flex-col gap-[3px]">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-black"
                >
                  <path
                    d="M17.5 5.89941C18.3284 5.89941 19 6.57098 19 7.39941C19 8.22784 18.3284 8.89941 17.5 8.89941C16.6716 8.89941 16 8.22784 16 7.39941C16 6.57098 16.6716 5.89941 17.5 5.89941Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.77423 12.0433C1.77108 13.1637 1.7495 14.854 2.67016 16.0431C4.49711 18.4027 6.49674 20.4023 8.85633 22.2292C10.0454 23.1499 11.7357 23.1283 12.8561 22.1252C15.8979 19.4016 18.6835 16.5553 21.3719 13.4273C21.6377 13.1181 21.8039 12.7391 21.8412 12.333C22.0062 10.5374 22.3452 5.36408 20.9403 3.95915C19.5353 2.55422 14.362 2.89318 12.5664 3.05817C12.1603 3.09549 11.7813 3.26174 11.472 3.52752C8.34412 6.21587 5.49781 9.00152 2.77423 12.0433Z"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M13.7884 13.266C13.8097 12.865 13.9222 12.1314 13.3125 11.5739M13.3125 11.5739C13.1238 11.4014 12.866 11.2457 12.5149 11.1219C11.2583 10.679 9.71484 12.1614 10.8067 13.5183C11.3936 14.2476 11.8461 14.472 11.8035 15.3002C11.7735 15.8829 11.2012 16.4916 10.4469 16.7235C9.7916 16.9249 9.06876 16.6582 8.61156 16.1473C8.05332 15.5236 8.1097 14.9355 8.10492 14.6792M13.3125 11.5739L14.0006 10.8857M8.66131 16.2251L8.00781 16.8786"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="font-sans_bold text-xl">Potential Value</p>
                <p className="w-max rounded-[4px] bg-[#DEEDEC] px-3 py-[3px] font-sans_medium text-base text-primary">
                  High Confidence
                </p>
              </div>

              <div className="flex flex-col gap-[3px]">
                <p className="font-sans_regular text-lg text-[#949494]">
                  Low Range
                </p>
                <p className="font-sans_medium text-xl text-[#8B8B8B]">
                  $410,000
                </p>
              </div>

              <div className="flex flex-col gap-[3px]">
                <p className="font-sans_regular text-lg text-[#949494]">
                  Mid Range
                </p>
                <p className="font-sans_medium text-xl text-[#8B8B8B]">
                  $410,000
                </p>
              </div>

              <div className="flex flex-col gap-[3px]">
                <p className="font-sans_regular text-lg text-[#949494]">
                  High Range
                </p>
                <p className="font-sans_medium text-xl text-[#8B8B8B]">
                  $410,000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full gap-6 rounded-xl border border-[#DFDFDF] bg-[#F9FAFB] p-6 md:p-8">
        <div className="flex w-full max-w-lg flex-col gap-6">
          <div className="flex flex-col gap-16 rounded-xl border border-[#DFDFDF] p-8">
            <div className="flex flex-col gap-7">
              <p className="font-sans_medium text-xl">Agent details</p>

              <div className="flex flex-col">
                <p className="font-sans_medium">Zarah and Sons</p>
                <p className="text-[#949494]">Property is our cup of tea</p>
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

              <span>Contact Agent and View Listing</span>
            </Button>
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

        <div className="flex-1 overflow-hidden rounded-2xl border border-[#DFDFDF] bg-secondary">
          <img
            src="https://s3-alpha-sig.figma.com/img/8672/e9c4/25060dc2b607317806d0e48d8a7e4913?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YKbzVbJMu-lka8hvzFZ9ZwgLPY~9o80meoTzfjIrG6tqD-78WLQ3RDIxdiGtYLgYH-pKwSrB4JPt8FqHHuk-vBqXeE5ZVL5~MyOLAXKoT8A3gOUq02Kq7hWHt5bT29pthD3azoa~8byagRlYo5-3HxPHI~KO67sX6XDskTNBa-qDTv5vO-2i7WT~jN71nlkpnL5e1hb-MRSjkXzx-pEbu5NYJSa3vajfrvF3LI7V9khl8QaoXU~ZFa29xLrnTxH7cnmaPPoJPA1lwxk3GA4sCwZiMCTOYvMVpbMxSFwsmVURJWOz0WoViUX~LtCfC4NvglyQnf9tWb2pJK411llblw__"
            alt="map"
            className="size-full object-cover"
          />
        </div>
      </div>

      <div className="flex aspect-video w-full gap-6 rounded-xl border border-[#DFDFDF] p-6 md:p-8"></div>
    </div>
  );
}
