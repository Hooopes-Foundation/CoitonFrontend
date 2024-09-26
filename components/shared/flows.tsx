"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import MaxWrapper from "./max-wrapper";
import { assets } from "@/assets";
import Image from "next/image";
import LazyLottie from "./lazy-lottie";
import { useInView, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { variants } from "@/constants";

const coitonFlows: TCoitonFlow[] = [
  {
    title: "Browse Properties",
    description:
      "Explore a curated list of high-quality real estate opportunities.",
    gradient: "from-[#BEB5FF] via-[#391DFC] to-[#391DFC]",
    color: "text-[#391DFC]",
    border: "bg-[#BEB5FF] border-[#391DFC]",
    stack: (
      <div className="w-full aspect-[1.5] h-auto lg:h-[396px] relative overflow-hidden">
        <LazyLottie
          getAnimationData={assets.lottie.stackLottie}
          loop
          id="browse-property"
          width={120}
          height={396}
          className="size-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.95] lg:scale-[2.25] -z-10"
        />
      </div>
    ),
  },
  {
    title: "Buy Tokens",
    description:
      "Purchase fractional ownership in properties by buying tokens backed by real assets.",
    gradient: "from-[#7ad3fa] via-[#1A8FC1] to-[#1A8FC1]",
    color: "text-[#1A8FC1]",
    border: "bg-[#7ad3fa] border-[#1A8FC1]",
    stack: (
      <div className="w-full aspect-[1.5] h-auto lg:h-[397px] relative overflow-hidden">
        <Image
          src={assets.svgs.buyToken}
          alt="BUY TOKEN"
          fill
          priority
          quality={100}
          className="size-full object-contain"
        />
      </div>
    ),
  },
  {
    title: "Earn Returns",
    description:
      "Benefit from rental income and potential property appreciation, directly through your tokens.",
    gradient: "from-[#a0f36d] via-[#59C11A] to-[#59C11A]",
    color: "text-[#59C11A]",
    border: "bg-[#a0f36d] border-[#59C11A]",
    stack: (
      <div className="w-full aspect-[1.7] h-auto lg:h-[400px] relative overflow-hidden">
        <Image
          src={assets.svgs.earnReward}
          alt="EARN REWARD"
          fill
          priority
          quality={100}
          className="size-full object-contain scale-[1.21] ml-2 md:ml-4"
        />
      </div>
    ),
  },
];

function Flow({
  flow,
  index,
  setActiveFlow,
}: {
  flow: TCoitonFlow;
  index: number;
  setActiveFlow: Dispatch<SetStateAction<TCoitonFlow>>;
}) {
  const { fadeIn } = variants;

  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "75% 0px -75% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveFlow(flow);
    }
  }, [isInView, setActiveFlow, flow]);

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("left", 0.3 * index)}
      initial="hidden"
      whileInView={"show"}
      viewport={{
        once: false,
        amount: 0.7,
      }}
      custom={index}
      key={index}
      className={cn(
        "bg-gradient-to-br rounded-3xl w-full p-px mt-36 last:mb-24",
        flow.gradient
      )}
    >
      <div
        className={cn(
          "bg-background rounded-[inherit] size-full p-12 pl-16 flex flex-col gap-6",
          flow.color
        )}
      >
        <h2 className="relative">
          <span
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -left-8 rounded-full size-[10px] border-2",
              flow.border
            )}
          />
          {flow.title}
        </h2>
        <p className="text-xl font-light">{flow.description}</p>
      </div>
    </motion.div>
  );
}

export default function Flows() {
  const [activeFlow, setActiveFlow] = useState<TCoitonFlow>(coitonFlows[0]);

  return (
    <div className="mb-28">
      <MaxWrapper className="flex lg:hidden gap-7">
        <div className="flex-1 flex flex-col gap-24 md:gap-16 lg:gap-32">
          {coitonFlows.map((flow, index) => (
            <div key={index} className="flex flex-col gap-4 md:gap-2 lg:gap-10">
              <div
                className={cn(
                  "md:bg-gradient-to-br rounded-3xl w-full p-px lg:mt-36 lg:last:mb-24",
                  flow.gradient
                )}
              >
                <div
                  className={cn(
                    "bg-background rounded-[inherit] size-full md:p-8 lg:p-12 pl-8 md:pl-16 flex flex-col gap-3 lg:gap-6",
                    flow.color
                  )}
                >
                  <h2 className="relative">
                    <span
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 -left-8 rounded-full size-[10px] border-2",
                        flow.border
                      )}
                    />
                    {flow.title}
                  </h2>
                  <p className="text-base md:text-lg lg:text-xl font-normal lg:font-light">
                    {flow.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full lg:max-w-[682px] h-auto lg:h-[396px] overflow-y-clip">
                {flow.stack}
              </div>
            </div>
          ))}
        </div>
      </MaxWrapper>
      <MaxWrapper className="hidden lg:flex gap-[37px]">
        {/* Sticky section */}
        <div className="flex flex-col w-full max-w-[682px] h-[396px] overflow-y-clip sticky top-32">
          {activeFlow.stack}
        </div>

        {/* Scrollable sections */}
        <div className="flex-1 flex flex-col">
          {coitonFlows.map((flow, index) => (
            <Flow
              key={index}
              flow={flow}
              index={index}
              setActiveFlow={setActiveFlow}
            />
          ))}
        </div>
      </MaxWrapper>
    </div>
  );
}
