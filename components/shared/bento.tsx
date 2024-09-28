"use client";

import { MoveRight, X } from "lucide-react";
import { IoMdCopy } from "react-icons/io";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { assets } from "@/assets";
import MaxWrapper from "./max-wrapper";
import Image from "next/image";
import { variants } from "@/constants";
import CustomButton from "./custom-button";

export default function Bento() {
  const { fadeIn } = variants;
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const clyTranslateY = useTransform(scrollYProgress, [1, 0], [-50, 50]);
  const clyTranslateX = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const octTranslateY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const octTranslateX = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const flatTranslateY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const flatTranslateX = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <MaxWrapper>
      <section
        className="grid grid-cols-1 lg:grid-cols-6 gap-6"
        ref={sectionRef}
      >
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
            amount: 0.7,
          }}
          className="col-span-1 lg:col-span-4 aspect-[1.3] md:aspect-[1.8] lg:aspect-auto lg:h-[500px] rounded-2xl md:rounded-[24px] p-px bg-gradient-to-bl from-[#33FFEE] to-primary text-primary"
        >
          <div className="size-full rounded-[inherit] bg-[#F2FFFE] p-8 md:py-12 lg:py-16 md:px-10 lg:px-12 flex flex-col justify-between relative overflow-hidden gap-6 lg:gap-0">
            <h2 className="text-[40px] md:text-5xl lg:text-[64px] leading-[50px] lg:leading-[80px] md:max-w-[514px]">
              Ready to Start Your Real Estate Journey?
            </h2>

            <CustomButton size={"lg"} className="w-max">
              Get Started <MoveRight size={20} className="ml-3" />
            </CustomButton>

            <motion.div
              className="absolute -right-32 md:-right-[320px] lg:-right-[150px] top-12 lg:top-[100px]"
              style={{
                translateX: clyTranslateY,
                translateY: clyTranslateX,
              }}
            >
              <motion.div
                className="rotate-[40deg]"
                animate={{
                  rotate: 10,
                  translateY: [-10, 10],
                  translateX: [-10, 10],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 7,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={assets.shapes.clyShape}
                  alt="CYLINDER SHAPE"
                  width={641}
                  height={627}
                  priority
                  quality={100}
                  className="brightness-90 w-80 md:!w-[641px] h-80 md:!h-[627px] md:size-auto"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
            amount: 0.7,
          }}
          className="col-span-1 lg:col-span-2 aspect-[1.3] md:aspect-[1.8] lg:aspect-auto lg:h-[500px] lg:max-w-[414px] w-full rounded-2xl md:rounded-[24px] p-px bg-gradient-to-bl from-[#FFE692] to-[#B69C46] text-[#9C7800]"
        >
          <div className="size-full rounded-[inherit] bg-[#FFFCF2] p-8 md:py-12 lg:py-16 md:px-10 lg:px-12 flex flex-col justify-between relative overflow-hidden">
            <h2 className="text-[40px] md:text-5xl lg:text-[64px] leading-[50px] lg:leading-[80px]">
              Dive Deeper into Coiton
            </h2>

            <CustomButton
              size={"lg"}
              className="w-max !bg-[#9C7800] hover:!bg-[#9C7800]/90"
            >
              Download Whitepaper <IoMdCopy size={22} className="ml-3" />
            </CustomButton>

            <motion.div
              className="absolute -right-[170px] md:-right-[210px] top-10 md:-top-[20px] lg:-top-[50px] md:size-[424px] lg:size-[324px] z-0"
              style={{
                translateX: octTranslateY,
                translateY: octTranslateX,
              }}
            >
              <motion.div
                className="rotate-[35deg]"
                animate={{
                  rotate: 5,
                  translateY: [5, -5],
                  translateX: [-5, 5],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 7,
                  delay: 3,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={assets.shapes.octYellowShape}
                  alt="OCTERGON SHAPE"
                  className="brightness-90 size-80 md:size-auto"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn("right", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
            amount: 0.7,
          }}
          className="col-span-1 lg:col-span-3 aspect-[1.3] md:aspect-[1.8] lg:aspect-auto lg:h-[500px] rounded-2xl md:rounded-[24px] p-px bg-primary text-primary"
        >
          <div className="size-full rounded-[inherit] bg-[rgb(2,66,60)] relative overflow-hidden">
            <video
              autoPlay
              loop
              muted
              className="size-full aspect-[1.5] object-cover pointer-events-none"
            >
              <source src={assets.video.coitonVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn("left", 0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
            amount: 0.7,
          }}
          className="col-span-1 lg:col-span-3 aspect-[1.3] lg:h-[500px] rounded-2xl md:rounded-[24px] p-px bg-gradient-to-bl from-[#C0ACFF] to-[#7851F0] text-[#5C41AD]"
        >
          <div className="size-full rounded-[inherit] bg-[#F9F7FF] p-8 md:py-12 lg:py-16 md:px-10 lg:px-12 flex flex-col justify-between relative overflow-hidden">
            <div className="lg:w-[458px] flex flex-col gap-3 relative z-[1]">
              <div className="flex items-center gap-4">
                <div className="h-[38px] w-44 md:w-[248px] rounded-full border border-[#5C41AD] flex items-center justify-center text-[#5C41AD] text-sm md:text-base font-normal md:font-medium">
                  Starknet-Backed
                </div>

                <div className="flex items-center gap-1 text-primary">
                  <Image
                    src={assets.svgs.logoIcon}
                    alt="coiton"
                    width={34}
                    height={34}
                    quality={100}
                    priority
                    className="size-9 object-contain"
                  />
                  <X size={12} />
                  <Image
                    src={assets.svgs.starknetIcon}
                    alt="starknet"
                    width={34}
                    height={34}
                    quality={100}
                    priority
                    className="size-9 object-contain"
                  />
                </div>
              </div>
              <h2 className="text-[#5C41AD] font-normal text-[40px] md:text-5xl lg:text-[64px] leading-[50px] lg:leading-[70px]">
                Starknet Becomes Coiton Partner
              </h2>
            </div>

            <div className="-rotate-[8deg] absolute -right-0 lg:-right-[50px] top-[140px] md:top-[160px] lg:top-[200px] w-96 h-72 md:w-[658.06px] md:h-max">
              <motion.div
                className="absolute top-0 left-0"
                style={{
                  rotate: 5,
                  translateX: flatTranslateX,
                  translateY: flatTranslateY,
                }}
              >
                <Image
                  src={assets.shapes.flatPurpleShape}
                  alt="FLAT NOODLE SHAPE"
                  className="brightness-90 w-full size-72 md:size-auto"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </MaxWrapper>
  );
}
