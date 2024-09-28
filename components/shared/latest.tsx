"use client";

import { MoveRight } from "lucide-react";
import { LiaEthereum } from "react-icons/lia";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { RxClock } from "react-icons/rx";
import MaxWrapper from "./max-wrapper";
import { dummyProperties, variants } from "@/constants";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import CustomButton from "./custom-button";
import Image from "next/image";

export default function Latest() {
  const { fadeIn } = variants;

  const fadInAnimate = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.8,
        delay: 0.5 * index,
      },
    }),
  };

  const [activeCard, setActiveCard] = useState(1);

  return (
    <MaxWrapper>
      <div className="flex flex-col gap-7 md:gap-14 my-16 md:my-32">
        <div className="flex items-end justify-between">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{
              once: true,
              amount: 0.7,
            }}
            className="flex flex-col gap-2 md:gap-0"
          >
            <h2 className="text-[#032724] md:leading-[80px]">Latest Updates</h2>
            <p className="text-muted-foreground">
              Below are a list of some of our featured properties,
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{
              once: true,
              amount: 0.7,
            }}
          >
            <CustomButton
              variant={"black"}
              className="px-6 font-medium hidden md:flex"
            >
              See More <MoveRight size={22} className="ml-3" />
            </CustomButton>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dummyProperties.map((property, _index) => (
            <motion.div
              variants={fadInAnimate}
              initial="initial"
              whileInView={"animate"}
              viewport={{
                once: true,
                amount: 0.7,
              }}
              onMouseOver={() => setActiveCard(_index + 1)}
              key={property.image[0]}
              custom={_index}
              className="flex flex-col"
            >
              <div className="relative border-2 border-border/20 shadow-2xl shadow-black/20 bg-background rounded-3xl w-full aspect-square overflow-hidden">
                <div
                  className={cn(
                    "bg-background/80 rounded-2xl w-full h-full absolute bottom-0 left-0 z-10 transition-all duration-500 overflow-hidden",
                    {
                      "h-[30%] brightness-50": activeCard === _index + 1,
                    }
                  )}
                >
                  <Image
                    fill
                    priority
                    quality={100}
                    src={property?.image[0]}
                    alt={property?.title}
                    className={cn(
                      "size-full object-cover duration-300 delay-200",
                      {
                        "scale-110": activeCard === _index + 1,
                      }
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "size-full rounded-2xl pt-16 px-6 flex flex-col gap-2 opacity-0 transition-all delay-300",
                    {
                      "pt-8 opacity-100": activeCard === _index + 1,
                    }
                  )}
                >
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
            </motion.div>
          ))}
        </div>
      </div>
    </MaxWrapper>
  );
}
