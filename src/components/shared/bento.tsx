"use client";

import { MoveRight, X } from "lucide-react";
import { IoMdCopy } from "react-icons/io";
import { Button } from "../ui/button";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Bento() {
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
    <section className="flex flex-col pt-16 gap-6" ref={sectionRef}>
      <div className="flex items-center gap-6 h-[500px]">
        <div className="h-full flex-1 rounded-[24px] p-px bg-gradient-to-bl from-[#33FFEE] to-primary text-primary">
          <div className="size-full rounded-[inherit] bg-[#F2FFFE] py-16 px-12 flex flex-col justify-between relative overflow-hidden">
            <h2 className="leading-[80px] max-w-[514px]">
              Ready to Start Your Real Estate Journey?
            </h2>

            <Button size={"lg"} className="w-max">
              Get Started <MoveRight size={20} className="ml-3" />
            </Button>

            <motion.div
              className="absolute -right-[150px] top-[100px]"
              style={{
                translateX: clyTranslateY,
                translateY: clyTranslateX,
              }}>
              <motion.img
                src="/images/cly.png"
                alt=""
                className="rotate-[40deg] brightness-90"
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
              />
            </motion.div>
          </div>
        </div>
        <div className="h-full max-w-[414px] w-full rounded-[24px] p-px bg-gradient-to-bl from-[#FFE692] to-[#B69C46] text-[#9C7800]">
          <div className="size-full rounded-[inherit] bg-[#FFFCF2] py-16 px-12 flex flex-col justify-between relative overflow-hidden">
            <h2 className="leading-[80px]">Dive Deeper into Coiton</h2>

            <Button
              size={"lg"}
              className="w-max bg-[#9C7800] hover:bg-[#9C7800]/90">
              Download Whitepaper <IoMdCopy size={22} className="ml-3" />
            </Button>

            <motion.div
              className="absolute -right-[210px] -top-[50px] size-[324px]"
              style={{
                translateX: octTranslateY,
                translateY: octTranslateX,
              }}>
              <motion.img
                src="/images/oct-yellow.png"
                alt=""
                className="rotate-[35deg] brightness-90"
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
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 h-[500px]">
        <div className="h-full w-full max-w-[579px] rounded-[24px] p-px bg-primary text-primary">
          <div className="size-full rounded-[inherit] bg-[rgb(2,66,60)] relative overflow-hidden">
            <video
              src="/videos/coiton.mp4"
              loop
              muted
              autoPlay
              className="size-full object-cover"
            />
          </div>
        </div>
        <div className="h-full flex-1 rounded-[24px] p-px bg-gradient-to-bl from-[#C0ACFF] to-[#7851F0] text-[#5C41AD]">
          <div className="size-full rounded-[inherit] bg-[#F9F7FF] py-16 px-12 flex flex-col justify-between relative overflow-hidden">
            <div className="w-[458px] flex flex-col gap-3 relative z-[1]">
              <div className="flex items-center gap-4">
                <div className="h-[38px] w-[248px] rounded-full border border-[#5C41AD] flex items-center justify-center text-[#5C41AD] text-base font-medium">
                  Starknet-Backed
                </div>

                <div className="flex items-center gap-1 text-primary">
                  <Image
                    src="/svgs/logo.svg"
                    alt="coiton"
                    width={34}
                    height={34}
                    priority
                    className="size-9 object-contain"
                  />
                  <X size={12} />
                  <Image
                    src="/svgs/starknet.svg"
                    alt="coiton"
                    width={34}
                    height={34}
                    priority
                    className="size-9 object-contain"
                  />
                </div>
              </div>
              <h2 className="text-[#5C41AD] font-normal leading-[70px]">
                Starknet Becomes Coiton Partner
              </h2>
            </div>

            <div className="-rotate-[8deg] absolute -right-[50px] top-[200px] w-[658.06px] h-max bg-red-500/50">
              <motion.img
                src="/images/flat-purple.png"
                alt=""
                className="brightness-90 absolute top-0 left-0 w-full"
                style={{
                  rotate: 5,
                  translateX: flatTranslateX,
                  translateY: flatTranslateY,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
