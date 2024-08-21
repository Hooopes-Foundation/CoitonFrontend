"use client";

import { cn } from "@/lib/utils";
import { useInView, motion } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

const reviews = [
  {
    feedback:
      "Coiton made it possible for me to invest in real estate without needing a huge capital. The process was seamless and secure!",
    name: "John Stevens",
    position: "CEO, Even Steven",
    image: "/svgs/john.svg",
  },
  {
    feedback:
      "Finally, a platform that brings real estate investment into the digital age. Coiton is the future!",
    name: "Yusuf Benson",
    position: "CTO, Benson's Properties",
    image: "/svgs/yusuf.svg",
  },
  {
    feedback:
      "Coiton's platform is user-friendly and efficient. I appreciate how easy it is to diversify my investment portfolio with real estate tokens.",
    name: "Ikenna Akpabio",
    position: "CEO, IK Investments",
    image: "/svgs/ikenne.svg",
  },
  {
    feedback:
      "As a property developer, Coiton has opened up new opportunities for me to connect with investors and fund my projects faster. It's a win-win!",
    name: "Frank Emmanuel",
    position: "Property Developer",
    image: "/svgs/frank.svg",
  },
];

export default function Reviews() {
  const reviewRef = useRef(null);

  const isInView = useInView(reviewRef, { margin: "0px 0px -60% 0px" });

  return (
    <div className="flex flex-col gap-32 mb-32" ref={reviewRef}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-[#032724] leading-[80px]">What Our Users Say</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
        {reviews.map((rv, _key) => (
          <motion.div
            key={_key}
            className={cn(
              "w-[344.38px] h-[416.83px] bg-background shadow-2xl shadow-black/20 border-2 border-[#C4C0C0] rounded-3xl transition-all duration-500 ease-in-out [&:nth-child(1)]:z-[1] [&:nth-child(1)]:translate-x-[250px] [&:nth-child(1)]:translate-y-12 [&:nth-child(1)]:rotate-[5deg] [&:nth-child(2)]:z-[0] [&:nth-child(2)]:translate-x-[100px] [&:nth-child(3)]:z-[0] [&:nth-child(3)]:-translate-x-[50px] [&:nth-child(3)]:translate-y-8 [&:nth-child(3)]:-rotate-[3deg] [&:nth-child(4)]:z-[1] [&:nth-child(4)]:-translate-x-[250px] [&:nth-child(4)]:translate-y-16 [&:nth-child(4)]:-rotate-[7deg] cursor-pointer",
              {
                "[&:nth-child(1)]:-rotate-[8.76deg] [&:nth-child(1)]:translate-x-[30px] [&:nth-child(1)]:translate-y-[40px] [&:nth-child(2)]:-rotate-[2.39deg] [&:nth-child(2)]:translate-x-[10px] [&:nth-child(2)]:-translate-y-[5px] [&:nth-child(3)]:rotate-[3.17deg] [&:nth-child(3)]:-translate-x-[10px] [&:nth-child(3)]:translate-y-[10px] [&:nth-child(4)]:rotate-[10.4deg] [&:nth-child(4)]:-translate-x-[30px] [&:nth-child(4)]:translate-y-[60px]":
                  isInView,
              }
            )}>
            <div className="size-full rounded-[inherit] p-10 flex flex-col justify-between">
              <div className="size-[116px] rounded-full bg-secondary relative">
                <Image
                  src={rv.image}
                  alt={rv.name}
                  fill
                  className="object-contain"
                />
              </div>

              <p className="text-base font-medium line-clamp-6">
                “{rv.feedback}”
              </p>

              <div className="flex flex-col items-end ml-auto">
                <p className="text-base font-medium">{rv.name}</p>
                <span className="text-sm text-muted-foreground">
                  {rv.position}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
