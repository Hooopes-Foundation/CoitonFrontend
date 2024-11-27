import { assets } from "@/assets";
import { Button } from "@/components/ui/button";

export default function TradingView() {
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

          <h2 className="italic text-primary">Trading</h2>
          <p className="text-xl text-[#BBBBBB]">
            Invest, Verify, and Unlock Real Estate Potential
          </p>
        </div>

        <img
          src={assets.shapes.clyShape}
          className="absolute -right-24 top-4"
        />
      </div>

      <div className="relative flex w-full items-center justify-between gap-8 overflow-clip rounded-xl bg-[#08847B] p-8 text-white md:gap-10 md:p-10">
        <div className="h-[768px] w-full max-w-[810px] bg-primary"></div>
        <div className="flex h-[642px] w-[470px] flex-col justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="font-serif_italic">
              Under <br /> Constrruction
            </h2>
            <p>We are working 24/7 to make sure that this update drops ASAP.</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-center">
              Click link to get notified when we drop the sweetness
            </p>
            <Button size={"lg"} variant={"secondary"}>
              <span className="text-primary">Join Waitlist</span>
              <svg
                width="24"
                height="23"
                viewBox="0 0 24 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.126 3.10059C7.71996 3.10672 5.93636 3.19035 4.7965 4.33039C3.56641 5.56069 3.56641 7.54082 3.56641 11.501C3.56641 15.4613 3.56641 17.4415 4.7965 18.6717C6.02659 19.9021 8.00641 19.9021 11.9661 19.9021C15.9256 19.9021 17.9055 19.9021 19.1356 18.6717C20.2754 17.5317 20.359 15.7478 20.3652 12.3412"
                  stroke="#056F67"
                  strokeWidth="1.58333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.9525 3.5631L11.0781 12.489M19.9525 3.5631C19.4914 3.10142 16.3852 3.14445 15.7286 3.1538M19.9525 3.5631C20.4136 4.02479 20.3706 7.13496 20.3612 7.79248"
                  stroke="#056F67"
                  strokeWidth="1.58333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
