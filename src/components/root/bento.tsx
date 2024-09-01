import { MoveRight, X } from "lucide-react";
import { IoMdCopy } from "react-icons/io";
import { Button } from "../ui/button";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Wrapper from "../shared/wrapper";
import { assets } from "@/assets";

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
    <Wrapper>
      <section className="flex flex-col pt-16 gap-6" ref={sectionRef}>
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:h-[500px]">
          <div className="aspect-[1.3] md:aspect-[1.8] lg:h-full w-full lg:w-auto lg:flex-1 rounded-2xl md:rounded-[24px] p-px bg-gradient-to-bl from-[#33FFEE] to-primary text-primary">
            <div className="size-full rounded-[inherit] bg-[#F2FFFE] py-6 md:py-12 lg:py-16 px-5 md:px-10 lg:px-12 flex flex-col justify-between relative overflow-hidden gap-6 lg:gap-0">
              <h2 className="text-4xl md:text-5xl leading-[50px] lg:leading-[80px] md:max-w-[514px]">
                Ready to Start Your Real Estate Journey?
              </h2>

              <Button size={"lg"} className="w-max">
                Get Started <MoveRight size={20} className="ml-3" />
              </Button>

              <motion.div
                className="absolute -right-32 md:-right-[320px] lg:-right-[150px] top-12 lg:top-[100px]"
                style={{
                  translateX: clyTranslateY,
                  translateY: clyTranslateX,
                }}>
                <motion.img
                  src={assets.shapes.clyShape}
                  alt=""
                  className="rotate-[40deg] brightness-90 size-72 md:size-auto"
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
          <div className="aspect-[1.3] md:aspect-[1.8] lg:h-full lg:max-w-[414px] w-full rounded-2xl md:rounded-[24px] p-px bg-gradient-to-bl from-[#FFE692] to-[#B69C46] text-[#9C7800]">
            <div className="size-full rounded-[inherit] bg-[#FFFCF2] py-6 md:py-12 lg:py-16 px-5 md:px-10 lg:px-12 flex flex-col justify-between relative overflow-hidden">
              <h2 className="text-4xl md:text-5xl leading-[50px] lg:leading-[80px]">
                Dive Deeper into Coiton
              </h2>

              <Button
                size={"lg"}
                className="w-max bg-[#9C7800] hover:bg-[#9C7800]/90">
                Download Whitepaper <IoMdCopy size={22} className="ml-3" />
              </Button>

              <motion.div
                className="absolute -right-[170px] md:-right-[210px] -top-[20px] lg:-top-[50px] md:size-[424px] lg:size-[324px]"
                style={{
                  translateX: octTranslateY,
                  translateY: octTranslateX,
                }}>
                <motion.img
                  src={assets.shapes.octYellowShape}
                  alt=""
                  className="rotate-[35deg] brightness-90 size-72 md:size-auto"
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
        <div className="flex flex-col-reverse lg:flex-row items-center gap-6 lg:h-[500px]">
          <div className="aspect-[1.3] md:aspect-[1.8] lg:h-full w-full lg:w-auto lg:max-w-[579px] rounded-2xl md:rounded-[24px] p-px bg-primary text-primary">
            <div className="size-full rounded-[inherit] bg-[rgb(2,66,60)] relative overflow-hidden">
              <video
                src={assets.videos.coitonVideo}
                loop
                muted
                autoPlay
                className="size-full object-cover aspect-[1.5]"
              />
            </div>
          </div>
          <div className="aspect-[1.3] md:aspect-[1.8] lg:h-full w-full lg:w-auto lg:flex-1 rounded-2xl md:rounded-[24px] p-px bg-gradient-to-bl from-[#C0ACFF] to-[#7851F0] text-[#5C41AD]">
            <div className="size-full rounded-[inherit] bg-[#F9F7FF] py-6 md:py-12 lg:py-16 px-5 md:px-10 lg:px-12 flex flex-col justify-between relative overflow-hidden">
              <div className="lg:w-[458px] flex flex-col gap-3 relative z-[1]">
                <div className="flex items-center gap-4">
                  <div className="h-[38px] w-44 md:w-[248px] rounded-full border border-[#5C41AD] flex items-center justify-center text-[#5C41AD] text-sm md:text-base font-normal md:font-medium">
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
                <h2 className="text-[#5C41AD] font-normal text-4xl md:text-5xl leading-[50px] lg:leading-[70px]">
                  Starknet Becomes Coiton Partner
                </h2>
              </div>

              <div className="-rotate-[8deg] absolute -right-0 lg:-right-[50px] top-[140px] md:top-[160px] lg:top-[200px] w-96 h-72 md:w-[658.06px] md:h-max">
                <motion.img
                  src={assets.shapes.flatPurpleShape}
                  alt=""
                  className="brightness-90 absolute top-0 left-0 w-full size-72 md:size-auto"
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
    </Wrapper>
  );
}
