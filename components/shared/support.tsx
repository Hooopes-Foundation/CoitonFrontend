"use client";

import { assets } from "@/assets";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import MaxWrapper from "./max-wrapper";
import Image from "next/image";
import { variants } from "@/constants";

export default function Support() {
  const { fadeIn } = variants;

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      translateY: -10,
      zIndex: 2,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 2,
    },
  };

  return (
    <MaxWrapper>
      <div className="flex flex-col lg:flex-row lg:items-center gap-10 mg:gap-14 mb-28">
        <div className="lg:w-[458px] flex flex-col gap-4 md:gap-6">
          <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{
              once: true,
              amount: 0.7,
            }}
            className="flex items-center gap-4"
          >
            <div className="h-[38px] w-44 md:w-[248px] rounded-full border border-primary flex items-center justify-center text-primary text-sm md:text-base font-normal md:font-medium">
              Starknet-Backed
            </div>

            <div className="flex items-center gap-1 text-primary">
              <Image
                src={assets.svgs.logoIcon}
                alt="coiton"
                width={34}
                height={34}
                className="size-9 object-contain"
              />
              <X size={12} />
              <Image
                src={assets.svgs.starknetIcon}
                alt="starknet"
                width={34}
                height={34}
                className="size-9 object-contain"
              />
            </div>
          </motion.div>
          <motion.h1
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{
              once: true,
              amount: 0.7,
            }}
            className="text-primary font-normal"
          >
            Decentralized <br className="hidden md:flex lg:hidden" />{" "}
            Real-Estate Tokenization
          </motion.h1>
        </div>
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
            amount: 0.7,
          }}
          className="flex-1 bg-gradient-to-br from-[#FBFEFE] via-[#FBFEFE] to-[#57E741] md:h-[400px] rounded-2xl md:rounded-[24px] p-1 lg:p-[1.5px]"
        >
          <div className="flex justify-center bg-white size-full rounded-[inherit] bg-gradient-to-b from-[#F9FFF8] to-[#DEFED9] relative overflow-clip">
            <motion.div
              className="w-1/2 md:w-[297px] md:h-[359px] lg:absolute cursor-pointer lg:left-[20px] lg:top-[65px] z-[2]"
              style={{
                rotate: "-3.53deg",
              }}
              whileHover="whileHover"
              whileTap="whileTap"
              variants={imageVariants}
            >
              <Image
                src={assets.images.prop1}
                alt="PROPERTY 1"
                width={297}
                height={359}
                priority
                quality={100}
                className="w-1/2 md:w-[297px] md:h-[359px] -ml-4 lg:-ml-0 object-contain shadow-2xl shadow-black/40 rounded-lg"
              />
            </motion.div>

            <motion.div
              className="w-1/2 md:w-[297px] md:h-[359px] lg:absolute cursor-pointer lg:left-[300px] lg:top-[45px] z-[1]"
              style={{
                rotate: "0.23deg",
              }}
              whileHover="whileHover"
              whileTap="whileTap"
              variants={imageVariants}
            >
              <Image
                src={assets.images.prop2}
                alt="PROPERTY 2"
                width={297}
                height={359}
                priority
                quality={100}
                className="w-1/2 md:w-[297px] md:h-[359px] -ml-16 lg:-ml-0  object-contain shadow-2xl shadow-black/40 rounded-lg"
              />
            </motion.div>

            <motion.div
              className="w-1/2 md:w-[297px] md:h-[359px] lg:absolute cursor-pointer lg:right-[20px] lg:top-[65px] z-0"
              style={{
                rotate: "2.94deg",
              }}
              whileHover="whileHover"
              whileTap="whileTap"
              variants={imageVariants}
            >
              <Image
                src={assets.images.prop3}
                alt="PROPERTY 3"
                width={297}
                height={359}
                priority
                quality={100}
                className="w-1/2 md:w-[297px] md:h-[359px] -ml-12 lg:-ml-0  object-contain shadow-2xl shadow-black/40 rounded-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </MaxWrapper>
  );
}
