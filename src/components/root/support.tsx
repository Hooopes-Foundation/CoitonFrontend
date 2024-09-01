import { assets } from "@/assets";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Wrapper from "../shared/wrapper";

export default function Support() {
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
    <Wrapper>
      <div className="flex flex-col lg:flex-row lg:items-center gap-10 mg:gap-14 mb-28">
        <div className="lg:w-[458px] flex flex-col gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <div className="h-[38px] w-44 md:w-[248px] rounded-full border border-primary flex items-center justify-center text-primary text-sm md:text-base font-normal md:font-medium">
              Starknet-Backed
            </div>

            <div className="flex items-center gap-1 text-primary">
              <img
                src={assets.svgs.logoIcon}
                alt="coiton"
                width={34}
                height={34}
                className="size-9 object-contain"
              />
              <X size={12} />
              <img
                src={assets.svgs.starknetIcon}
                alt="starknet"
                width={34}
                height={34}
                className="size-9 object-contain"
              />
            </div>
          </div>
          <h1 className="text-primary font-normal">
            Decentralized <br className="hidden md:flex lg:hidden" />{" "}
            Real-Estate Tokenization
          </h1>
        </div>
        <div className="flex-1 bg-gradient-to-br from-[#FBFEFE] via-[#FBFEFE] to-[#57E741] md:h-[400px] rounded-2xl md:rounded-[24px] p-1 lg:p-[1.5px]">
          <div className="flex justify-center bg-white size-full rounded-[inherit] bg-gradient-to-b from-[#F9FFF8] to-[#DEFED9] relative overflow-clip">
            <motion.img
              src={assets.images.prop1}
              alt=""
              className="w-1/2 md:w-[297px] md:h-[359px] -ml-4 lg:-ml-0 lg:absolute cursor-pointer lg:left-[20px] lg:top-[65px] object-contain z-[2] shadow-2xl shadow-black/40 rounded-lg"
              style={{
                rotate: "-3.53deg",
              }}
              whileHover="whileHover"
              whileTap="whileTap"
              variants={imageVariants}
            />
            <motion.img
              src={assets.images.prop2}
              alt=""
              className="w-1/2 md:w-[297px] md:h-[359px] -ml-16 lg:-ml-0 lg:absolute cursor-pointer lg:left-[300px] lg:top-[45px] object-contain z-[1] shadow-2xl shadow-black/40 rounded-lg"
              style={{
                rotate: "0.23deg",
              }}
              whileHover="whileHover"
              whileTap="whileTap"
              variants={imageVariants}
            />
            <motion.img
              src={assets.images.prop3}
              alt=""
              className="w-1/2 md:w-[297px] md:h-[359px] -ml-12 lg:-ml-0 lg:absolute cursor-pointer lg:right-[20px] lg:top-[65px] object-contain z-0 shadow-2xl shadow-black/40 rounded-lg"
              style={{
                rotate: "2.94deg",
              }}
              whileHover="whileHover"
              whileTap="whileTap"
              variants={imageVariants}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
