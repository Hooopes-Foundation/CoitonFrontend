"use client";

import Wrapper from "@/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight, X } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FollowerPointerCard } from "@/components/aceternity/following-pointer";
import Flows from "@/components/shared/flows";
import Bento from "@/components/shared/bento";
import { LiaEthereum } from "react-icons/lia";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { RxClock } from "react-icons/rx";
import { MdOutlineArrowForward } from "react-icons/md";
import Reviews from "@/components/shared/reviews";

const dummyProperties = [
  {
    id: 1,
    isApproved: true,
    title: "Sunny Villa",
    propertyType: "House",
    address: "123 Sunshine St, Miami, FL",
    createdAt: "June 14, 2023",
    price: 500000,
    image: [
      "https://images.pexels.com/photos/1481105/pexels-photo-1481105.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 2,
    isApproved: true,
    title: "Cozy Cottage",
    propertyType: "Cottage",
    address: "456 Oak Lane, Asheville, NC",
    createdAt: "June 14, 2023",
    price: 300000,
    image: [
      "https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 3,
    isApproved: true,
    title: "Urban Apartment",
    propertyType: "Apartment",
    address: "789 Main St, New York, NY",
    createdAt: "June 14, 2023",
    price: 750000,
    image: [
      "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 4,
    isApproved: true,
    title: "Luxury Condo",
    propertyType: "Condo",
    address: "101 Ocean Dr, Los Angeles, CA",
    createdAt: "June 14, 2023",
    price: 1200000,
    image: [
      "https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 5,
    isApproved: false,
    title: "Suburban Home",
    propertyType: "House",
    address: "202 Maple St, Dallas, TX",
    createdAt: "June 14, 2023",
    price: 600000,
    image: [
      "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
];

export default function HomePage() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const translateX = useTransform(scrollYProgress, [0, 1], [-150, 150]);

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
    <section className="w-full py-36 overflow-x-clip" ref={sectionRef}>
      <Wrapper>
        <div className="flex flex-col items-center text-center gap-4 relative">
          <motion.div
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
            className="absolute -top-[100px] -left-[260px]">
            <motion.img
              src="/images/oct.png"
              alt=""
              className="rotate-[40deg] brightness-90"
              style={{
                translateX: translateX,
                translateY: translateY,
              }}
            />
          </motion.div>
          <motion.div
            className="absolute top-[70px] -right-[470px]"
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
            }}>
            <motion.img
              src="/images/cly.png"
              alt=""
              className="rotate-[57deg] brightness-90"
              style={{
                translateX: translateY,
                translateY: translateX,
              }}
            />
          </motion.div>
          <h1 className="text-primary font-normal">
            Invest in Real Estate, <i>Reinvented</i>.
          </h1>
          <p className="text-[23px] font-regular text-primary">
            Bringing Nigeria&apos;s $2.4 Trillion Real Estate Market On-Chain
            with Blockchain Technology
          </p>

          <Button size={"lg"} className="mt-6">
            Get Started <MoveRight size={22} className="ml-2" />
          </Button>
        </div>
        <div className="relative mt-56 mb-28">
          <motion.img
            src="/images/flat.png"
            alt=""
            className="absolute -top-[270px] left-[328px] rotate-[22deg] -z-10 brightness-90"
            animate={{
              rotate: 5,
              translateY: [-5, 5],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3,
              ease: "easeInOut",
            }}
          />
          <FollowerPointerCard>
            <div className="bg-secondary rounded-3xl w-full h-[787px] relative overflow-hidden">
              <Image
                src="/images/test.jpg"
                alt="test property"
                width={1384}
                height={787}
                priority
                quality={100}
                className="size-full object-cover"
              />

              <div className="absolute bottom-0 left-0 size-full flex justify-end flex-col">
                <div className="h-[262px] text-primary-foreground py-10 px-12 bg-gradient-to-b from-transparent to-black/90">
                  <div className="flex items-end justify-between size-full mt-auto">
                    <p className="w-[217px] text-[23px]">
                      4 Bedroom Duplex, Lekki Phase 1, Lagos
                    </p>

                    <div className="flex items-center gap-4">
                      <Button
                        size={"icon"}
                        className="bg-transparent border border-white">
                        <MoveLeft size={20} />
                      </Button>
                      <Button
                        size={"icon"}
                        className="bg-transparent border border-white">
                        <MoveRight size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FollowerPointerCard>
        </div>
        <div className="flex items-center gap-14 mb-28">
          <div className="w-[458px] flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="h-[38px] w-[248px] rounded-full border border-primary flex items-center justify-center text-primary text-base font-medium">
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
            <h1 className="text-primary font-normal">
              Decentralized Real-Estate Tokenization
            </h1>
          </div>
          <div className="flex-1 bg-gradient-to-br from-[#FBFEFE] via-[#FBFEFE] to-[#57E741] h-[400px] rounded-[24px] p-[1.5px]">
            <div className="bg-white size-full rounded-[inherit] bg-gradient-to-b from-[#F9FFF8] to-[#DEFED9] relative overflow-clip">
              <motion.img
                width={297}
                height={359}
                src="/images/prop1.png"
                alt=""
                className="absolute cursor-pointer left-[20px] top-[65px] object-contain z-[2] shadow-2xl shadow-black/40"
                style={{
                  rotate: "-3.53deg",
                }}
                whileHover="whileHover"
                whileTap="whileTap"
                variants={imageVariants}
              />
              <motion.img
                width={297}
                height={359}
                src="/images/prop2.png"
                alt=""
                className="absolute cursor-pointer left-[300px] top-[45px] object-contain z-[1] shadow-2xl shadow-black/40"
                style={{
                  rotate: "0.23deg",
                }}
                whileHover="whileHover"
                whileTap="whileTap"
                variants={imageVariants}
              />
              <motion.img
                width={297}
                height={359}
                src="/images/prop3.png"
                alt=""
                className="absolute cursor-pointer right-[20px] top-[65px] object-contain z-0 shadow-2xl shadow-black/40"
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

        <Flows />

        <Bento />

        <div className="flex flex-col gap-14 my-32">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-[#032724] leading-[80px]">Latest Updates</h2>
              <p className="text-muted-foreground">
                Below are a list of some of our featured properties,
              </p>
            </div>

            <Button variant={"black"} className="px-6 font-medium">
              See More <MoveRight size={22} className="ml-3" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dummyProperties.slice(0, 3).map((property, _key) => (
              <div key={_key} className="flex flex-col group">
                <div className="relative bg-secondary backdrop-blur-3xl rounded-3xl w-full aspect-square">
                  <div className="bg-background/80 backdrop-blur-xl rounded-[inherit] w-full h-full group-hover:h-[30%] absolute bottom-0 left-0 z-10 transition-all duration-500 overflow-hidden">
                    <Image
                      src={property?.image[0]}
                      alt={property?.title}
                      fill
                      priority
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

        <Reviews />
      </Wrapper>
    </section>
  );
}
