"use client";

import Wrapper from "@/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import { dummyProperties } from "@/lib/dummy";
import { MoveRight } from "lucide-react";
import { LiaEthereum } from "react-icons/lia";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { RxClock } from "react-icons/rx";

export default function Latest() {
  return (
    <Wrapper>
      <div className="flex flex-col gap-7 md:gap-14 my-16 md:my-32">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 md:gap-0">
            <h2 className="text-[#032724] md:leading-[80px]">Latest Updates</h2>
            <p className="text-muted-foreground">
              Below are a list of some of our featured properties,
            </p>
          </div>

          <Button variant={"black"} className="px-6 font-medium hidden md:flex">
            See More <MoveRight size={22} className="ml-3" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dummyProperties.slice(0, 3).map((property, _key) => (
            <div key={_key} className="flex flex-col group">
              <div className="relative bg-secondary backdrop-blur-3xl rounded-3xl w-full aspect-square">
                <div className="bg-background/80 backdrop-blur-xl rounded-[inherit] w-full h-full group-hover:h-[30%] absolute bottom-0 left-0 z-10 transition-all duration-500 overflow-hidden">
                  <img
                    src={property?.image[0]}
                    alt={property?.title}
                    className="size-full object-cover group-hover:scale-110 duration-300 delay-200"
                  />
                </div>

                <div className="size-full rounded-2xl pt-16 px-6 group-hover:pt-8 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all delay-300">
                  <h3 className="text-[#032724] font-medium flex items-center">
                    <LiaEthereum className="mr-1 size-8" />
                    {property?.price.toLocaleString()}
                  </h3>

                  <p className="flex items-center text-base font-medium">
                    <span className="line-clamp-1 flex-1">
                      {property?.address}
                    </span>
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <p className="flex items-center text-base text-muted-foreground">
                      <RxClock size={18} className="mr-2" />
                      {property?.createdAt}
                    </p>
                    <p className="flex items-center text-base text-muted-foreground">
                      <PiBuildingOfficeLight size={18} className="mr-2" />
                      {property?.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
