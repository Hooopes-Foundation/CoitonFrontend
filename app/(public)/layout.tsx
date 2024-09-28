"use client";

import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

import { useMotionValue, useSpring, frame, motion } from "framer-motion";
import Image from "next/image";
import { assets } from "@/assets";
import { RefObject, useEffect, useRef } from "react";

const spring = { damping: 5, stiffness: 100, restDelta: 5 };

export function useFollowPointer(ref: RefObject<HTMLElement>) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;

      frame.read(() => {
        xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return { x, y };
}

export default function PublicLayout({ children }: TPropsWithChildren) {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="absolute -z-10 top-0 left-0 bg-gradient-to-b from-[#FFF4DE] via-[#FFF4DE]/50 to-background min-h-screen w-full" />
      <motion.div
        className="fixed top-0 left-0 hidden md:block pointer-events-none -z-[1]"
        ref={ref}
        style={{ x, y }}
      >
        <Image
          src={assets.svgs.logoIcon}
          alt="logo"
          width={24}
          height={24}
          priority
          quality={1000}
          className="object-contain size-6"
        />
      </motion.div>
      <Header />
      <main className="flex flex-1">{children}</main>
      <Footer />
    </div>
  );
}
