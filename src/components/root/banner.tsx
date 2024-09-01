import { useEffect, useMemo, useRef, useState } from "react";
import Wrapper from "../shared/wrapper";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { assets } from "@/assets";
import { FollowerPointerCard } from "../aceternity/following-pointer";

export default function Banner() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const translateX = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  return (
    <Wrapper>
      <div
        id="#banner"
        className="flex flex-col items-center text-center gap-4 relative">
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
          className="absolute -top-[10px] md:-top-[180px] lg:-top-[100px] -left-[130px] md:-left-[150px] lg:-left-[260px] -z-10">
          <motion.img
            src={assets.shapes.octShape}
            alt=""
            className="rotate-[40deg] brightness-90 size-72 md:size-auto"
            style={{
              translateX: translateX,
              translateY: translateY,
            }}
          />
        </motion.div>
        <motion.div
          className="absolute top-[200px] md:-top-14 lg:top-[70px] -right-[90px] md:-right-[390px] lg:-right-[470px] -z-10"
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
            src={assets.shapes.clyShape}
            alt=""
            className="rotate-[57deg] brightness-90 size-72 md:size-auto"
            style={{
              translateX: translateY,
              translateY: translateX,
            }}
          />
        </motion.div>
        <h1 className="text-primary font-normal">
          Invest in Real Estate, <i>Reinvented</i>.
        </h1>
        <p className="text-base md:text-[23px] font-regular text-primary">
          Bringing Nigeria&apos;s $2.4 Trillion Real Estate Market On-Chain with
          Blockchain Technology
        </p>

        <Button size={"lg"} className="mt-4 md:mt-6">
          Get Started <MoveRight size={22} className="ml-2" />
        </Button>
      </div>

      <div className="relative mt-24 md:mt-36 lg:mt-56 mb-16 md:mb-28">
        <motion.img
          src={assets.shapes.flatShape}
          alt=""
          className="absolute -top-[140px] md:-top-[270px] left-1/2 -z-10 rotate-3 md:rotate-[5deg] brightness-90 size-72 md:size-auto"
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
        />
        <FollowerPointerCard className="hidden lg:flex">
          <Carousel />
        </FollowerPointerCard>
        <div className="flex lg:hidden">
          <Carousel />
        </div>
      </div>
    </Wrapper>
  );
}

function Carousel() {
  const slides = useMemo(
    () => [
      {
        image:
          "https://plus.unsplash.com/premium_photo-1697730288131-6684ca63584b?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Luxury Villa, Banana Island, Lagos",
      },
      {
        image:
          "https://images.unsplash.com/photo-1643297551340-19d8ad4f20ad?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "4 Bedroom Duplex, Lekki Phase 1, Lagos",
      },
      {
        image:
          "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "3 Bedroom Apartment, Victoria Island, Lagos",
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);

  useEffect(() => {
    const imagePromises = slides.map(
      (slide) =>
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = () => resolve();
          img.onerror = () => reject();
        })
    );

    Promise.all(imagePromises).then(() => {
      setPreloadedImages(slides.map((slide) => slide.image));
    });
  }, [slides]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-secondary rounded-2xl md:rounded-3xl w-full aspect-[1.4] md:aspect-[1.5] relative overflow-hidden">
      {preloadedImages.length > 0 ? (
        <motion.img
          src={preloadedImages[currentIndex]}
          alt={slides[currentIndex].title}
          width={1384}
          height={787}
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="size-full object-cover"
          loading="lazy"
        />
      ) : (
        <img
          src={assets.svgs.placeholderSvg}
          alt=""
          width={1384}
          height={787}
          className="size-full object-cover"
          loading="lazy"
        />
      )}

      <div className="absolute bottom-0 left-0 size-full flex justify-end flex-col">
        <div className="h-[262px] text-primary-foreground py-5 md:py-10 px-6 md:px-12 bg-gradient-to-b from-transparent to-black/80">
          <div className="flex items-end justify-between size-full mt-auto">
            <p className="w-[210px] md:w-[317px] lg:w-[217px] text-base md:text-2xl lg:text-[23px]">
              {slides[currentIndex].title}
            </p>

            <div className="flex items-center gap-4">
              <Button
                size={"icon"}
                className="bg-transparent border border-white"
                onClick={handlePrev}>
                <MoveLeft size={20} />
              </Button>
              <Button
                size={"icon"}
                className="bg-transparent border border-white"
                onClick={handleNext}>
                <MoveRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
