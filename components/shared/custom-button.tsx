"use client";

import { motion } from "framer-motion";
import { ButtonProps, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

type TCustomButton = {
  children: TNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  onClick?: () => void;
};

export default function CustomButton({
  children,
  variant,
  size,
  className,
  onClick,
}: TCustomButton) {
  return (
    <motion.div
      onClick={onClick}
      role="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={buttonVariants({
        variant: variant,
        size: size,
        className: cn(className),
      })}
    >
      {children}
    </motion.div>
  );
}
