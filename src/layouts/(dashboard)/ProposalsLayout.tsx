import { assets } from "@/assets";
import { Outlet } from "react-router-dom";

export default function ProposalsLayout() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="h-[240px] w-full rounded-3xl bg-gradient-to-l from-[#0D857C] to-[#0EB9AC] p-[1px]">
        <div className="flex size-full overflow-hidden rounded-[inherit] bg-gradient-to-r from-[#056F67] to-[#0AADA1] text-white">
          <div className="w-1/2 px-12">
            <div className="size-full border-x border-[#0FAB9F]">
              <div className="flex size-full items-center justify-center">
                <div className="flex w-full flex-col gap-1 border-y border-[#0FAB9F] p-4">
                  <p className="font-serif_regular text-xl italic leading-none md:text-[38px]">
                    Proposals
                  </p>
                  <span className="font-sans_light text-xl text-[#B1EDE9]">
                    Invest, Verify, and Unlock Real Estate Potential
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-full w-1/2">
            <img
              src={assets.shapes.clyShape}
              className="absolute -right-24 -top-10"
            />
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
