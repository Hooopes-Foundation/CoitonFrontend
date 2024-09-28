"use client";

import MaxWrapper from "./max-wrapper";
import { variants } from "@/constants";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoveRight } from "lucide-react";
import { assets } from "@/assets";
import { FollowerPointerCard } from "../aceternity/following-pointer";
import Carousel from "./carousel";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import { useRef } from "react";

export default function Banner() {
  const { fadeIn } = variants;

  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const translateX = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  return (
    <MaxWrapper>
      <div className="flex flex-col items-center text-center gap-4 relative">
        <motion.div
          variants={fadeIn("right", 0.7)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
          }}
          animate={{
            rotate: 10,
            translateY: [-10, 10],
            translateX: [-5, 5],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 3,
            delay: 3,
            ease: "easeInOut",
          }}
          className="absolute -top-[10px] md:-top-[180px] lg:-top-[100px] -left-[130px] md:-left-[150px] lg:-left-[200px] -z-10"
        >
          <motion.div
            className="rotate-[40deg]"
            style={{
              translateX: translateX,
              translateY: translateY,
            }}
          >
            <Image
              src={assets.shapes.octShape}
              alt="OCTAGON SHAPE"
              className="brightness-90 !w-[324px] !h-[310px] md:size-auto"
              width={324}
              height={310}
              priority
              quality={100}
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute top-[200px] md:-top-14 lg:top-[70px] -right-[90px] md:-right-[390px] lg:-right-[400px] -z-10"
          variants={fadeIn("left", 0.7)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
          }}
          animate={{
            rotate: 20,
            translateY: [-15, 15],
            translateX: [-10, 10],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 5,
            delay: 2,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="rotate-[57deg]"
            style={{
              translateX: translateY,
              translateY: translateX,
            }}
          >
            <Image
              src={assets.shapes.clyShape}
              alt="CYLINDER SHAPE"
              width={641}
              height={627}
              priority
              quality={100}
              className="brightness-90 !w-[641px] !h-[627px] md:size-auto"
            />
          </motion.div>
        </motion.div>

        <h1 className="text-primary font-normal">
          <motion.span
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{
              once: true,
              amount: 0.7,
            }}
          >
            Invest in Real Estate,
          </motion.span>{" "}
          <motion.i
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{
              once: true,
              amount: 0.7,
            }}
          >
            Reinvented.
          </motion.i>
        </h1>
        <motion.p
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
            amount: 0.7,
          }}
          className="text-base md:text-[23px] font-regular text-primary"
        >
          Bringing Nigeria&apos;s $2.4 Trillion Real Estate Market On-Chain with
          Blockchain Technology
        </motion.p>

        <motion.button
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
            amount: 0.7,
          }}
          className={buttonVariants({
            className: "mt-4 md:mt-6",
            size: "lg",
          })}
        >
          Get Started <MoveRight size={22} className="ml-2" />
        </motion.button>
      </div>

      <div className="relative mt-24 md:mt-36 lg:mt-56 mb-16 md:mb-28">
        <motion.div
          className="absolute -top-[140px] md:-top-[270px] left-1/2 -z-10 rotate-3 md:rotate-[5deg]"
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
            amount: 0.7,
          }}
          style={{
            translateX: "-50%",
          }}
          animate={{
            rotate: 5,
            translateY: [-5, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 3,
            ease: "easeInOut",
          }}
        >
          <Image
            src={assets.shapes.flatShape}
            alt="NOODLE SHAPE"
            className="brightness-90 !w-[699px] !h-[519px] md:size-auto"
            width={699}
            height={519}
            quality={100}
            priority
          />
        </motion.div>
        <FollowerPointerCard className="hidden lg:flex">
          <Carousel />
        </FollowerPointerCard>
        <div className="flex lg:hidden">
          <Carousel />
        </div>
      </div>
    </MaxWrapper>
  );
}
