"use client";

import { motion } from "framer-motion";
import { variants } from "@/constants";
import CustomButton from "./custom-button";
import Link from "next/link";

export default function NotFound() {
  const { fadeIn } = variants;

  return (
    <div className="flex flex-col items-center text-center gap-4">
      <motion.h1
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{
          once: true,
          amount: 0.7,
        }}
        className="text-primary"
      >
        Page Under Construction
      </motion.h1>
      <motion.p
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{
          once: true,
          amount: 0.7,
        }}
        className="text-base md:text-[23px] md:leading-[30px] font-regular max-w-4xl"
      >
        This section is currently under development. Please check back soon for
        updates, explore our current listings in the meantime, or go back to
        home page.
      </motion.p>

      <div className="flex items-center justify-center flex-col sm:flex-row w-full gap-4 mt-4 md:mt-6">
        <motion.div
          className="w-[calc(100%-10%)] sm:w-max"
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
            amount: 0.7,
          }}
        >
          <Link className="w-full sm:w-max" href="/">
            <CustomButton className="w-full sm:w-max" size={"lg"}>
              Return to Home
            </CustomButton>
          </Link>
        </motion.div>
        <motion.div
          className="w-[calc(100%-10%)] sm:w-max"
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
            amount: 0.7,
          }}
        >
          <Link className="w-[calc(100%-10%)] sm:w-max" href="/listings">
            <CustomButton
              className="w-[calc(100%-10%)] sm:w-max"
              size={"lg"}
              variant={"link"}
            >
              Browse Listings
            </CustomButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
