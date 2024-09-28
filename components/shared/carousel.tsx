"use client";

import { assets } from "@/assets";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { variants } from "@/constants";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";

export default function Carousel() {
  const { fadeIn } = variants;

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
          const img = new window.Image(); // Use window.Image
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
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="show"
      //   whileInView={"show"}
      viewport={{
        once: true,
        amount: 0.7,
      }}
      className="bg-secondary rounded-2xl md:rounded-3xl w-full aspect-[1.4] md:aspect-[1.6] relative overflow-hidden"
    >
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
        <Image
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
            <p className="w-[210px] md:w-[317px] text-base md:text-2xl lg:text-[23px]">
              {slides[currentIndex].title}
            </p>

            <div className="flex items-center gap-4">
              <Button
                size={"icon"}
                className="bg-transparent border border-white cursor-none"
                onClick={handlePrev}
              >
                <MoveLeft size={20} />
              </Button>
              <Button
                size={"icon"}
                className="bg-transparent border border-white cursor-none"
                onClick={handleNext}
              >
                <MoveRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
