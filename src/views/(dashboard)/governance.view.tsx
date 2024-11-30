import { assets } from "@/assets";
import { Button } from "@/components/ui/button";
import ListingBoard from "./_components/listing-board";

export default function GovernanceView() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="relative flex h-[363px] w-full items-center overflow-clip rounded-xl border-[2.5px] border-[#D6D6D6] bg-[#FCFCFC] p-[1px]">
        <div className="space-y-1 px-16 py-11">
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

          <h2 className="italic text-primary">New Listings</h2>
          <p className="text-xl text-[#BBBBBB]">
            New listings in need of approvals
          </p>
        </div>

        <img
          src={assets.shapes.clyShape}
          className="absolute -right-24 top-4"
        />
      </div>

      <div className="flex h-[422px] gap-6">
        <div className="w-full max-w-[504px] overflow-hidden rounded-3xl border border-[#DCF7F5] bg-[#F5FFFE]">
          <div className="my-4 flex h-[55px] items-center justify-between px-8">
            <h4 className="font-sans_medium text-lg text-primary">
              Your Properties
            </h4>

            <Button className="w-max border border-[#DCF7F5] !bg-[#E8FDFC] px-5 text-primary hover:!bg-[#E8FDFC]/90">
              <span className="font-sans_medium text-sm">View More</span>
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

          <div className="h-[342px] overflow-hidden px-8">
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
                  <p className="font-sans_bold text-xl">$15.67</p>
                </div>
                <p className="font-sans_light text-lg text-[#666666]">Token</p>
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
                  <p className="font-sans_bold text-xl">300</p>
                </div>
                <p className="font-sans_light text-lg text-[#666666]">
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
                  <p className="font-sans_bold text-xl">3</p>
                </div>
                <p className="font-sans_light text-lg text-[#666666]">
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
                  <p className="font-sans_bold text-xl">10</p>
                </div>
                <p className="font-sans_light text-lg text-[#666666]">
                  Properties Rented
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full flex-1 rounded-3xl bg-primary"></div>
      </div>

      <ListingBoard type="dao" />
    </div>
  );
}
