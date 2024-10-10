"use client";

import { motion } from "framer-motion";
import { ButtonProps, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

type TCustomButton = {
  children: TNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

export default function CustomButton({
  children,
  variant,
  size,
  className,
  onClick,
  disabled,
  isLoading,
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
        className: cn(className, {
          "opacity-50 pointer-events-none": disabled,
        }),
      })}
    >
      {isLoading ? (
        <>
          <Loader className="animate-spin mr-2 size-5" /> Please wait...
        </>
      ) : (
        children
      )}
    </motion.div>
  );
}
