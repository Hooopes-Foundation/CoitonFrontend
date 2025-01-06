import { assets } from "@/assets";
import ScrollTop from "@/components/shared/scroll-top";
import { Separator } from "@/components/ui/separator";
import { Outlet } from "react-router-dom";

export default function ProposalsLayout() {
  return (
    <div className="flex-1 flex relative w-full py-4 flex-col gap-4">
      <ScrollTop />
      <div className="h-[200px] sm:h-[240px] w-full rounded-2xl md:rounded-3xl bg-gradient-to-l from-[#0D857C] to-[#0EB9AC] p-[1px]">
        <div className="flex size-full overflow-hidden rounded-[inherit] bg-gradient-to-r from-[#056F67] to-[#0AADA1] text-white">
          <div className="lg:px-12 lg:min-w-[665px]">
            <div className="size-full mx-auto lg:border-x border-[#0FAB9F]">
              <div className="flex size-full items-center justify-center">
                <div className="flex w-full flex-col gap-1 border-y border-[#0FAB9F] px-6 py-4 lg:p-4">
                  <h4 className="font-normal italic tracking-wider text-2xl sm:text-3xl">
                    Proposals
                  </h4>
                  <span className="font-light text-base lg:text-xl text-[#B1EDE9]">
                    Invest, Verify, and Unlock Real Estate Potential
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-full hidden xl:flex flex-1">
            <img
              src={assets.shapes.clyShape}
              className="absolute hidden sm:flex md:hidden lg:flex -right-56 xl:-right-24 -top-10"
            />
          </div>
        </div>
      </div>

      <Separator className="h-px w-full my-2" />

      <Outlet />
    </div>
  );
}
